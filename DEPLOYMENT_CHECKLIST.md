# 🚀 GoldenWalk 배포 전 최종 체크리스트

## ✅ 완료된 사항

- [x] 빌드 성공 (39개 페이지)
- [x] 모바일 반응형 최적화
- [x] BottomBar 가로 배열
- [x] Firebase 보안 규칙 작성
- [x] Vercel 설정 파일 (vercel.json)
- [x] 배포 가이드 문서 작성

---

## 📋 배포 전 준비사항

### 1. Firebase 프로젝트 생성 ⚠️ **필수**

```
1. https://console.firebase.google.com/ 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름: goldenwalk-production
4. Google Analytics 활성화
5. 웹 앱 추가하여 API 키 받기
```

### 2. Naver Maps API 키 발급 (선택사항)

```
1. https://www.ncloud.com/ 접속
2. Maps API → Web Dynamic Map
3. Client ID 발급
```

### 3. GitHub Repository 생성

```
1. GitHub에서 새 레포지토리 생성
2. 이름: goldenwalk
3. Private/Public 선택
```

---

## 🎯 배포 실행 (2가지 방법)

### 방법 A: GitHub + Vercel (권장) ⭐

```bash
# 1. Git 커밋 (로컬에서)
cd goldenwalk
git add .
git commit -m "Production ready - Mobile optimized, 39 pages"

# 2. GitHub에 푸시
git remote add origin https://github.com/YOUR_USERNAME/goldenwalk.git
git branch -M main
git push -u origin main

# 3. Vercel Import
# - https://vercel.com/new 접속
# - GitHub 레포지토리 선택
# - 환경변수 입력
# - Deploy 클릭!
```

### 방법 B: Vercel CLI (직접 배포)

```bash
# 1. CLI 설치
npm install -g vercel

# 2. 로그인
vercel login

# 3. 배포
vercel --prod
```

---

## 🔐 Vercel 환경변수 입력

배포 시 다음 환경변수를 입력해야 합니다:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# 선택사항
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=
```

---

## 🧪 배포 후 테스트

Live URL에서 확인:
- [ ] 홈 페이지 로드
- [ ] Google 로그인 작동
- [ ] 상점 페이지 기프티콘 표시
- [ ] 모바일 뷰 (430px) 확인
- [ ] BottomBar 가로 배열
- [ ] PWA "홈 화면에 추가" 가능

---

## 📱 예상 배포 URL

```
https://goldenwalk.vercel.app
또는
https://your-custom-domain.com
```

---

## 🎊 배포 완료 후

1. **베타 유저 100명 모집**
   - 네이버 카페, 당근마켓
   - 시니어 커뮤니티

2. **피드백 수집**
   - Google Forms
   - 사용성 개선

3. **B2B 영업 시작**
   - Smart City 제안서
   - 보험사 데이터 판매
   - 제약사 임상 데이터

---

**모든 준비 완료! GitHub에 푸시만 하면 배포됩니다!** 🚀
