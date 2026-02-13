/**
 * Motion Sensor 기반 걸음 수 측정
 * 
 * - Device Motion API 사용
 * - 가속도 피크 감지로 걸음 수 계산
 * - iOS 13+ 권한 요청 지원
 */

export class StepCounter {
  constructor(onStepDetected, options = {}) {
    this.onStepDetected = onStepDetected;
    this.lastY = 0;
    this.lastStepTime = 0;
    
    // 시니어용 낮은 임계값 (더 민감하게)
    this.stepThreshold = options.threshold || 1.2;
    this.minStepInterval = options.minStepInterval || 300; // 최소 걸음 간격 (ms)
    
    this.isRunning = false;
    this.handleMotion = this.handleMotion.bind(this);
  }
  
  /**
   * 센서 시작 (권한 요청 포함)
   */
  async start() {
    if (this.isRunning) return;
    
    // iOS 13+ 권한 요청
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
    
    // DeviceMotion 지원 확인
    if (!window.DeviceMotionEvent) {
      throw new Error('이 기기는 걸음 수 센서를 지원하지 않습니다.');
    }
    
    window.addEventListener('devicemotion', this.handleMotion);
    this.isRunning = true;
    console.log('✅ Step counter started');
  }
  
  /**
   * 센서 중지
   */
  stop() {
    window.removeEventListener('devicemotion', this.handleMotion);
    this.isRunning = false;
    console.log('🛑 Step counter stopped');
  }
  
  /**
   * 가속도 데이터 처리
   */
  handleMotion(event) {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration || acceleration.y === null) return;
    
    const y = acceleration.y;
    const delta = Math.abs(y - this.lastY);
    
    // 피크 감지: 임계값 초과 + 최소 간격 체크
    const now = Date.now();
    if (delta > this.stepThreshold && 
        now - this.lastStepTime > this.minStepInterval) {
      this.lastStepTime = now;
      this.onStepDetected();
      
      // 디버깅용 (개발 중에만 사용)
      // console.log('👣 Step detected! Delta:', delta.toFixed(2));
    }
    
    this.lastY = y;
  }
  
  /**
   * 센서 지원 여부 확인
   */
  static isSupported() {
    return typeof window !== 'undefined' && 
           typeof DeviceMotionEvent !== 'undefined';
  }
}
