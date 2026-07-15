import { useState, useEffect } from 'react';

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [garage, setGarage] = useState([]);

  useEffect(() => {
    // Load purchased bikes from localStorage
    const savedGarage = JSON.parse(localStorage.getItem('ridecraft_garage') || '[]');
    setGarage(savedGarage);
  }, []);

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Welcome back, {user?.name || 'Standard User'}!</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* MY GARAGE PANEL */}
        <div style={{ background: '#121215', padding: '30px', borderRadius: '10px', border: '1px solid #333' }}>
          <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px' }}>My Garage</h3>
          
          {garage.length === 0 ? (
            <p style={{ color: '#888' }}>No vehicles purchased yet. Start your journey in the shop!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
              {garage.map((bike, index) => (
                <div key={index} style={{ background: '#1a1a1f', padding: '15px', borderRadius: '5px', borderLeft: '4px solid #22c55e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'block' }}>{bike.make} {bike.model}</strong>
                    <span style={{ color: '#888', fontSize: '0.8rem' }}>VIN: {Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                  </div>
                  <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '0.9rem' }}>OWNED</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PAYMENT SECURITY PANEL */}
        <div style={{ background: '#121215', padding: '30px', borderRadius: '10px', border: '1px solid #333' }}>
          <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px' }}>Payment Security</h3>
          <p style={{ color: '#888', marginBottom: '5px' }}>Active Card</p>
          <div style={{ background: '#1a1a1f', padding: '15px', borderRadius: '8px', border: '1px solid #444', marginBottom: '15px', letterSpacing: '2px' }}>
            **** **** **** 4242
          </div>
          <button style={{ background: '#333', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
            Manage Methods
          </button>
        </div>
        
      </div>
    </div>
  );
}