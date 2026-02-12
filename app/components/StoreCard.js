export default function StoreCard({ emoji, name, distance, points }) {
  return (
    <div className="card shadow-sm" style={{ 
      minWidth: '160px', 
      padding: '16px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      textAlign: 'center',
      gap: '8px',
      border: '1px solid rgba(0,0,0,0.05)'
    }}>
      <div style={{ fontSize: '32px', filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.1))' }}>{emoji}</div>
      <div style={{ fontWeight: 700, fontSize: '15px' }}>{name}</div>
      <div className="text-sm">{distance}</div>
      <div style={{ 
        color: 'var(--gold-dark)', 
        fontWeight: 800, 
        marginTop: '4px',
        padding: '4px 12px',
        background: 'var(--gold-subtle)',
        borderRadius: '12px',
        fontSize: '13px'
      }}>
        +{points}P
      </div>
    </div>
  );
}
