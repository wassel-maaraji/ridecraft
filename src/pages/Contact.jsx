// src/pages/Contact.jsx
import { useState } from 'react';

export default function Contact() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('ridecraft_messages') || '[]'));

  const clearMessages = () => {
    localStorage.removeItem('ridecraft_messages');
    setMessages([]);
  };

  if (user?.role === 'admin') {
    return (
      <div className="container" style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Message Center</h2>
          <button onClick={clearMessages} style={{ background: '#ef4444', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Clear All</button>
        </div>
        {messages.map(m => (
          <div key={m.id} style={{ background: '#1a1a1f', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
            <strong>{m.name}</strong> <span style={{ color: '#888' }}>{m.email}</span>
            <p style={{ marginTop: '10px' }}>{m.message}</p>
          </div>
        ))}
      </div>
    );
  }

  // ... [Keep your existing standard Contact form code here for non-admins] ...
}