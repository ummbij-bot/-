'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiMap, FiShoppingBag, FiUser } from 'react-icons/fi';

export default function BottomBar() {
  const pathname = usePathname();

  const tabs = [
    { id: 'home', name: '홈', icon: FiHome, href: '/' },
    { id: 'map', name: '지도', icon: FiMap, href: '/map' },
    { id: 'shop', name: '포인트샵', icon: FiShoppingBag, href: '/shop' },
    { id: 'profile', name: '내 정보', icon: FiUser, href: '/profile' },
  ];

  return (
    <nav className="bottom-bar">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        const Icon = tab.icon;
        
        return (
          <Link 
            key={tab.id} 
            href={tab.href} 
            className={`nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon />
            <span>{tab.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
