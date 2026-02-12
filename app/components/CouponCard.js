'use client';

export default function CouponCard({ emoji, name, cost }) {
  const handleExchange = () => {
    if (confirm(`'${name}'을(를)\n${cost}P로 교환하시겠습니까?`)) {
      alert('교환이 완료되었습니다! 내 쿠폰함에서 확인하세요.');
    }
  };

  return (
    <div className="card card-glass flex-between" style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ 
          width: '64px', 
          height: '64px', 
          background: 'var(--bg-surface)', 
          borderRadius: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '32px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {emoji}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '17px', marginBottom: '4px' }}>{name}</div>
          <div style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>{cost}P</div>
        </div>
      </div>
      <button 
        className="btn btn-primary" 
        onClick={handleExchange}
        style={{ padding: '10px 20px', fontSize: '14px', minHeight: 'unset' }}
      >
        교환
      </button>
    </div>
  );
}
