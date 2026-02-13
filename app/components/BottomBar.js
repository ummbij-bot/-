'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

export default function BottomBar() {
  const pathname = usePathname();

  const tabs = [
    { id: 'home', name: '홈', icon: 'Home', href: '/' },
    { id: 'map', name: '지도', icon: 'Map', href: '/map' },
    { id: 'community', name: '커뮤니티', icon: 'Users', href: '/community' }, // Newly added
    { id: 'shop', name: '상점', icon: 'ShoppingBag', href: '/shop' },
    { id: 'profile', name: 'MY', icon: 'User', href: '/profile' },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-white border-t border-gray-100 z-50 flex items-center justify-around"
      style={{
        maxWidth: '430px',
        height: 'var(--bottom-bar-height)', // Use the variable from globals.css
        padding: '0 8px 12px 8px',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.04)'
      }}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        
        return (
          <Link 
            key={tab.id} 
            href={tab.href} 
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all active:scale-90"
            style={{
              opacity: isActive ? 1 : 0.6,
            }}
          >
            <div className={`p-1.5 rounded-2xl transition-colors ${isActive ? 'bg-blue-50' : 'bg-transparent'}`}>
              <Icon 
                  name={tab.icon} 
                  size={isActive ? 26 : 24} 
                  color={isActive ? 'var(--primary)' : '#8B95A1'} 
                  strokeWidth={isActive ? 2.5 : 2}
              />
            </div>
            <span style={{ 
                fontSize: '10px', 
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--primary)' : '#8B95A1',
                marginTop: '-2px'
            }}>
                {tab.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
