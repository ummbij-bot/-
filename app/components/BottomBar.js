'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

export default function BottomBar() {
  const pathname = usePathname();

  const tabs = [
    { id: 'home', name: '홈', icon: 'Home', href: '/' },
    { id: 'map', name: '지도', icon: 'Map', href: '/map' }, // Updated to 'Map' which Lucide has
    { id: 'shop', name: '상점', icon: 'ShoppingBag', href: '/shop' },
    { id: 'profile', name: 'MY', icon: 'User', href: '/profile' },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-white border-t border-gray-100 z-50"
      style={{
        maxWidth: '430px',
        height: '64px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '8px 0'
      }}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        
        return (
          <Link 
            key={tab.id} 
            href={tab.href} 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              flex: '1',
              height: '100%',
              transition: 'transform 0.2s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Icon 
                name={tab.icon} 
                size={24} 
                color={isActive ? 'var(--primary)' : 'var(--text-tertiary)'} 
                strokeWidth={isActive ? 2.5 : 2}
            />
            <span style={{ 
                fontSize: '11px', 
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--primary)' : 'var(--text-tertiary)'
            }}>
                {tab.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
