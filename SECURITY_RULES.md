# Security Rules for GoldenWalk Production

## ⚠️ IMPORTANT
These are STRICT production security rules.
Users can only read/write their own data.

---

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper Functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    // Users can only read/write their own profile
    match /users/{userId} {
      allow read: if isAuthenticated() && isOwner(userId);
      allow write: if isAuthenticated() && isOwner(userId);
      
      // User vitality data
      match /vitality/{document=**} {
        allow read: if isAuthenticated() && isOwner(userId);
        allow write: if isAuthenticated() && isOwner(userId);
      }
      
      // User family connections
      match /family/{memberId} {
        allow read: if isAuthenticated() && isOwner(userId);
        allow write: if isAuthenticated() && isOwner(userId);
      }
    }
    
    // Partners (stores) - read-only for users
    match /partners/{partnerId} {
      allow read: if isAuthenticated();
      allow write: if false; // Only admins via backend
    }
    
    // Gifticons - read-only for users
    match /gifticons/{gifticonId} {
      allow read: if isAuthenticated();
      allow write: if false; // Only admins via backend
    }
    
    // User purchases
    match /purchases/{purchaseId} {
      allow read: if isAuthenticated() && isOwner(resource.data.userId);
      allow create: if isAuthenticated() && isOwner(request.resource.data.userId);
      allow update, delete: if false; // Immutable after creation
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## Realtime Database Rules (if used)

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    ".read": false,
    ".write": false
  }
}
```

---

## Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // User profile images
    match /users/{userId}/profile/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024 // 5MB limit
                   && request.resource.contentType.matches('image/.*');
    }
    
    // User family snap photos
    match /users/{userId}/family-snaps/{fileName} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId
                   && request.resource.size < 10 * 1024 * 1024 // 10MB limit
                   && request.resource.contentType.matches('image/.*');
    }
    
    // Deny all other access
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 📝 배포 방법

### Firebase Console에서 배포

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. 프로젝트 선택
3. **Firestore Database** → Rules 탭
4. 위의 Firestore Rules 복사/붙여넣기
5. **게시** 클릭

6. **Storage** → Rules 탭
7. 위의 Storage Rules 복사/붙여넣기
8. **게시** 클릭

### CLI로 배포 (선택사항)

```bash
# Firebase CLI 설치
npm install -g firebase-tools

# 로그인
firebase login

# 초기화
firebase init firestore
firebase init storage

# Rules 파일 편집 후 배포
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

---

## 🧪 테스트 방법

Firebase Console → Firestore/Storage → Rules 탭 → Simulator

**테스트 시나리오**:
1. ✅ 인증된 사용자가 본인 데이터 읽기 - 성공
2. ❌ 인증된 사용자가 타인 데이터 읽기 - 실패
3. ❌ 미인증 사용자가 모든 데이터 접근 - 실패

---

## ⚠️ 중요 보안 체크리스트

- [ ] API 키는 환경변수로 관리
- [ ] Firebase Admin SDK는 서버에서만 사용
- [ ] 모든 민감한 작업은 Cloud Functions에서 처리
- [ ] Production 환경에서는 테스트 계정 비활성화
