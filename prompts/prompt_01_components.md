# 🎨 역할 1: 공통 컴포넌트 개발자

너는 **GoldenWalk (마실)** 프로젝트의 UI/UX 컴포너트 개발자야. 이미 정의된 `app/globals.css`를 활용해서 재사용 가능한 React 컴포넌트들을 만들어야 해.

## 🛠 작업 파일
1. `components/BottomBar.js`: 하단 탭바 (홈, 지도, 포인트샵, 내 정보)
2. `components/CircleProgress.js`: 대시보드용 원형 걸음수 그래프
3. `components/StoreCard.js`: 가로 스크롤 매장 정보 카드
4. `components/CouponCard.js`: 포인트샵용 쿠폰 교환 카드

## 📌 핵심 지침
- 모든 컴포넌트는 `app/globals.css`에 정의된 클래스(`btn`, `card`, `tab-item` 등)를 사용해.
- 시니어 사용자를 위해 글씨 크기와 터치 영역을 충분히 확보해.
- 모바일 전용 디자인이므로 `app-shell` 내부에서 잘 보이도록 설계해.

### 예시 코드 구조 (BottomBar.js)
```javascript
import Link from 'next/link';

export default function BottomBar({ activeTab }) {
  const tabs = [
    { id: 'home', name: '홈', icon: '🏠', href: '/' },
    { id: 'map', name: '지도', icon: '🗺️', href: '/map' },
    { id: 'shop', name: '포인트샵', icon: '🛍️', href: '/shop' },
    { id: 'profile', name: '내 정보', icon: '👤', href: '/profile' },
  ];

  return (
    <nav className="bottom-bar">
      {tabs.map((tab) => (
        <Link key={tab.id} href={tab.href} className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}>
          <span className="tab-icon">{tab.icon}</span>
          <span>{tab.name}</span>
        </Link>
      ))}
    </nav>
  );
}
```
