'use client';

export default function CircleProgress({ current, goal, points, label, size = 200, strokeWidth = 12, color }) {
  const radius = size / 2;
  const normalizedRadius = radius - strokeWidth;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(current / goal, 1) * circumference);

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        height={size}
        width={size}
        style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
      >
        {/* Track */}
        <circle
          stroke="#F2F4F6"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress */}
        <circle
          stroke={color || 'var(--primary)'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ 
            strokeDashoffset, 
            transition: 'stroke-dashoffset 1.0s ease-out',
            strokeLinecap: 'round' // Friendly rounded ends
          }}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      
      {/* Label only if size is large enough, otherwise caller handles it */}
      {size >= 120 && (
          <div className="absolute inset-0 flex-center flex-col">
            <span className="text-3xl font-bold text-primary">{current.toLocaleString()}</span>
            <span className="text-xs text-secondary mt-1">/ {goal.toLocaleString()}</span>
          </div>
      )}
    </div>
  );
}
