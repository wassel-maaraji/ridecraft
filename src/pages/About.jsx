// src/pages/About.jsx
export default function About() {
  const stats = [
    { label: 'System Uptime', value: '99.9%' },
    { label: 'DB Latency', value: '12ms' },
    { label: 'Auth Status', value: 'Secure' }
  ];

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <h2 style={{ marginBottom: '30px' }}>Pro System Tools</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#121215', padding: '30px', borderRadius: '10px', border: '1px solid #333', textAlign: 'center' }}>
            <div style={{ color: '#888', fontSize: '0.8rem' }}>{s.label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '10px' }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}