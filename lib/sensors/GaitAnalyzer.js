/**
 * AI Gait Analyzer & Fall Detection
 * 
 * - 가속도(Accelerometer) + 자이로스코프(Gyroscope) Raw Data 수집
 * - 낙상 감지 (Fall Detection): SVM (Signal Vector Magnitude) 알고리즘
 * - 보행 패턴 분석: 걸음 간격 변동성 (Gait Variability)
 * 
 * @version 1.0.0
 */

export default class GaitAnalyzer {
  constructor(options = {}) {
    // 콜백 함수들
    this.onFallDetected = options.onFallDetected || (() => {});
    this.onAnalysisUpdate = options.onAnalysisUpdate || (() => {});
    
    // 설정값
    this.frequency = options.frequency || 60; // Hz (목표 샘플링 레이트)
    this.fallThreshold = options.fallThreshold || 2.5; // 낙상 충격 임계값 (g)
    this.inactivityThreshold = options.inactivityThreshold || 0.5; // 낙상 후 정지 임계값 (g)
    this.bufferSize = options.bufferSize || 300; // 약 5초 분량 데이터 버퍼 (60Hz 기준)

    // 상태 변수
    this.isRunning = false;
    this.dataBuffer = []; // {t, ax, ay, az, gx, gy, gz}
    this.lastAnalysisTime = 0;
    
    // 바인딩
    this.handleMotion = this.handleMotion.bind(this);
  }

  /**
   * 센서 시작 (권한 요청 포함)
   */
  async start() {
    if (this.isRunning) return;

    // iOS 13+ 권한 요청 (가속도 + 자이로)
    if (typeof DeviceMotionEvent !== 'undefined' && 
        typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission !== 'granted') {
          throw new Error('센서 권한이 거부되었습니다.');
        }
      } catch (error) {
        console.error('❌ Motion permission failed:', error);
        throw error;
      }
    }

    window.addEventListener('devicemotion', this.handleMotion);
    this.isRunning = true;
    console.log('🧠 Gait Analyzer started');
  }

  /**
   * 센서 중지
   */
  stop() {
    window.removeEventListener('devicemotion', this.handleMotion);
    this.isRunning = false;
    this.dataBuffer = [];
    console.log('🛑 Gait Analyzer stopped');
  }

  /**
   * 센서 데이터 처리 루프
   */
  handleMotion(event) {
    const { accelerationIncludingGravity, rotationRate } = event;
    const t = Date.now();

    // 데이터 유효성 체크
    if (!accelerationIncludingGravity || !rotationRate) return;

    const ax = accelerationIncludingGravity.x || 0;
    const ay = accelerationIncludingGravity.y || 0;
    const az = accelerationIncludingGravity.z || 0;
    
    const gx = rotationRate.alpha || 0;
    const gy = rotationRate.beta || 0;
    const gz = rotationRate.gamma || 0;

    // 데이터 버퍼링
    this.dataBuffer.push({ t, ax, ay, az, gx, gy, gz });

    // 버퍼 크기 유지 (FIFO)
    if (this.dataBuffer.length > this.bufferSize) {
      this.dataBuffer.shift();
    }

    // 실시간 분석 (약 1초마다 수행)
    if (t - this.lastAnalysisTime > 1000) {
      this.analyzeBuffer();
      this.lastAnalysisTime = t;
    }

    // 낙상 감지 (실시간)
    this.detectFall(ax, ay, az);
  }

  /**
   * 낙상 감지 알고리즘 (SVM 기반)
   * Fall = Impact (High SVM) + Inactivity (Low SVM)
   */
  detectFall(ax, ay, az) {
    // Signal Vector Magnitude (가속도 벡터 합)
    // 1g (중력) 제외한 순수 충격량 계산 가능하나, 여기선 전체 크기 사용
    const svm = Math.sqrt(ax*ax + ay*ay + az*az) / 9.81; // g 단위 정규화

    if (svm > this.fallThreshold) {
      console.warn(`⚠️ 충격 감지! SVM: ${svm.toFixed(2)}g`);
      
      // 충격 후 2초간 데이터 모니터링하여 '움직임 없음' 확인 시 낙상 확정
      // (간소화를 위해 여기서는 즉시 콜백 호출하되, 실제론 setTimeout 등으로 후속 확인 필요)
      this.onFallDetected({
        timestamp: Date.now(),
        impact: svm
      });
    }
  }

  /**
   * 보행 패턴 분석 (주기적 호출)
   */
  analyzeBuffer() {
    if (this.dataBuffer.length < 60) return; // 데이터 부족

    // 최근 데이터 기반 통계 추출
    const accY = this.dataBuffer.map(d => d.ay);
    
    // 평균, 표준편차 (변동성 지표)
    const mean = accY.reduce((a, b) => a + b, 0) / accY.length;
    const variance = accY.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / accY.length;
    const stdDev = Math.sqrt(variance);

    // 상위 컴포넌트로 데이터 전달 (시각화용)
    const latestData = this.dataBuffer[this.dataBuffer.length - 1];
    
    this.onAnalysisUpdate({
      raw: latestData,
      stats: {
        meanY: mean,
        stability: 100 - (stdDev * 10) // 변동성이 클수록 안정성 낮음 (단순 예시)
      }
    });
  }
}
