'use client';

export default function CircleProgress({ current, goal, points, label }) {
  const radius = 80; // Slightly smaller to fit better
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(current / goal, 1) * circumference);

  return (
    <div style={{ position: 'relative', width: '240px', height: '240px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="animate-float">
      <svg
        height={radius * 2}
        width={radius * 2}
        style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="gradGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9F4A" />
            <stop offset="100%" stopColor="#FF6B6B" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle
          stroke="var(--gray-200)"
          strokeWidth={stroke}
          style={{ stroke: '#F0F0F0' }}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="url(#gradGold)"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ 
            strokeDashoffset, 
            transition: 'stroke-dashoffset 1.5s ease-out',
            strokeLinecap: 'round',
            filter: 'url(#glow)'
          }}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      
      <div style={{ position: 'absolute', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', color: 'var(--text-tertiary)', fontWeight: 600, marginBottom: '4px' }}>{label || '오늘의 걸음'}</div>
        <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
          {current.toLocaleString()}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          목표 {goal.toLocaleString()}
        </div>
        {points > 0 && (
          <div style={{ 
            marginTop: '12px', 
            background: 'var(--mint-light)', 
            color: 'var(--mint-dark)', 
            padding: '6px 14px', 
            borderRadius: '20px', 
            fontSize: '13px', 
            fontWeight: 700,
            boxShadow: '0 4px 10px rgba(78, 205, 196, 0.2)'
          }}>
            +{points}P
          </div>
        )}
      </div>
    </div>
  );
}
