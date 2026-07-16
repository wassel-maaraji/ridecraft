import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  
  // Form State
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: 'Something to ask about us', 
    message: '' 
  });
  
  // 'idle' | 'sending' | 'success'
  const [status, setStatus] = useState('idle'); 

  // Safely load user and messages
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('user'));
      setUser(u);
      if (u?.role === 'admin') {
        const msgs = JSON.parse(localStorage.getItem('ridecraft_messages') || '[]');
        setMessages(msgs);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending'); // Triggers the loading animation

    // Simulate a secure network request (1.5 seconds)
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('ridecraft_messages') || '[]');
        // Add new message to the TOP of the list
        const newMessage = { ...formData, id: Date.now(), date: new Date().toLocaleString() };
        localStorage.setItem('ridecraft_messages', JSON.stringify([newMessage, ...existing]));
        
        // Update navbar notification bell
        window.dispatchEvent(new Event('storage'));
        
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'Something to ask about us', message: '' });
        
        // Reset form after 4 seconds
        setTimeout(() => setStatus('idle'), 4000);
      } catch (error) {
        console.error("Failed to send message", error);
        setStatus('idle');
      }
    }, 1500);
  };

  const clearMessages = () => {
    if (window.confirm("Delete all messages permanently?")) {
      localStorage.removeItem('ridecraft_messages');
      setMessages([]);
      window.dispatchEvent(new Event('storage'));
    }
  };

  // ==========================================
  // ADMIN VIEW: SECURE INBOX
  // ==========================================
  if (user?.role === 'admin') {
    return (
      <div className="container" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
          <div>
            <h2 style={{ margin: '0 0 5px 0' }}>Admin Inbox</h2>
            <p style={{ color: '#888', margin: 0 }}>Manage user reports, inquiries, and administration contacts.</p>
          </div>
          <button onClick={clearMessages} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Clear Inbox
          </button>
        </div>
        
        {messages.length === 0 ? (
          <div style={{ background: '#121215', padding: '50px', borderRadius: '10px', textAlign: 'center', border: '1px dashed #333' }}>
            <h3 style={{ color: '#aaa', margin: 0 }}>Inbox is empty</h3>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {messages.map(m => (
              <div key={m.id} style={{ 
                background: '#121215', 
                padding: '25px', 
                borderRadius: '10px', 
                border: '1px solid #222',
                borderLeft: `4px solid ${m.subject === 'Reports/Complaints' ? '#ef4444' : m.subject === 'Contact Administration' ? '#eab308' : '#3b82f6'}` 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <div>
                    <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{m.name}</strong>
                    <span style={{ color: '#888', marginLeft: '10px' }}>&lt;{m.email}&gt;</span>
                  </div>
                  <span style={{ color: '#666', fontSize: '0.85rem' }}>{m.date}</span>
                </div>
                
                <div style={{ display: 'inline-block', background: '#1a1a1f', padding: '6px 12px', borderRadius: '4px', fontSize: '0.85rem', color: '#fff', marginBottom: '15px', border: '1px solid #333' }}>
                  {m.subject}
                </div>
                
                <p style={{ margin: 0, lineHeight: '1.6', color: '#ccc', background: '#0a0a0c', padding: '15px', borderRadius: '5px' }}>
                  {m.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // USER VIEW: PROFESSIONAL CONTACT FORM
  // ==========================================
  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', background: '#121215', borderRadius: '15px', overflow: 'hidden', border: '1px solid #222' }}>
        
        {/* LEFT SIDE: COMPANY INFO */}
        <div style={{ background: 'linear-gradient(135deg, #1a1a1f 0%, #121215 100%)', padding: '40px', borderRight: '1px solid #222' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Get in Touch</h2>
          <p style={{ color: '#888', lineHeight: '1.6', marginBottom: '40px' }}>
            Whether you have a question about our inventory, need to report an issue, or want to speak with administration, our team is ready to help.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div>
              <h4 style={{ color: '#fff', margin: '0 0 5px 0' }}>Headquarters</h4>
              <p style={{ color: '#aaa', margin: 0 }}>123 Ridecraft Blvd, Moto City, MC 90210</p>
            </div>
            <div>
              <h4 style={{ color: '#fff', margin: '0 0 5px 0' }}>Direct Support</h4>
              <p style={{ color: '#aaa', margin: 0 }}>support@ridecraft.com</p>
            </div>
            <div>
              <h4 style={{ color: '#fff', margin: '0 0 5px 0' }}>Phone</h4>
              <p style={{ color: '#aaa', margin: 0 }}>+1 (800) 555-RIDE</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: THE FORM */}
        <div style={{ padding: '40px' }}>
          {status === 'success' ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: '#22c55e22', color: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '20px' }}>✓</div>
              <h3 style={{ margin: '0 0 10px 0' }}>Message Received</h3>
              <p style={{ color: '#888' }}>Thank you for reaching out, {user?.name || 'Rider'}. We will review your message shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: '#888', fontSize: '0.85rem', marginBottom: '8px' }}>FULL NAME</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{ width: '100%', padding: '12px 15px', background: '#0a0a0c', border: '1px solid #333', borderRadius: '6px', color: '#fff' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: '#888', fontSize: '0.85rem', marginBottom: '8px' }}>EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{ width: '100%', padding: '12px 15px', background: '#0a0a0c', border: '1px solid #333', borderRadius: '6px', color: '#fff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#888', fontSize: '0.85rem', marginBottom: '8px' }}>INQUIRY TYPE</label>
                <select 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  style={{ width: '100%', padding: '12px 15px', background: '#0a0a0c', border: '1px solid #333', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}
                >
                  <option value="Something to ask about us">Something to ask about us</option>
                  <option value="Reports/Complaints">Reports / Complaints</option>
                  <option value="Contact Administration">Contact Administration</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: '#888', fontSize: '0.85rem', marginBottom: '8px' }}>YOUR MESSAGE</label>
                <textarea 
                  required 
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  style={{ width: '100%', padding: '12px 15px', background: '#0a0a0c', border: '1px solid #333', borderRadius: '6px', color: '#fff', resize: 'vertical' }}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                style={{ 
                  background: status === 'sending' ? '#888' : '#e63946', 
                  color: '#fff', 
                  padding: '15px', 
                  border: 'none', 
                  borderRadius: '6px', 
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer', 
                  fontWeight: 'bold', 
                  marginTop: '10px',
                  transition: 'background 0.3s'
                }}
              >
                {status === 'sending' ? 'Transmitting Securely...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}