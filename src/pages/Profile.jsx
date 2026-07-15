import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/auth');
    } else {
      setUser(storedUser);
      setFormData({ name: storedUser.name || '', email: storedUser.email || '' });
    }
  }, [navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name: formData.name, email: formData.email };
    
    // Save updated info to localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    // Trigger navbar update
    window.dispatchEvent(new Event('storage'));
    
    setUpdated(true);
    setTimeout(() => setUpdated(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        Profile Settings
      </h2>
      
      <div style={{ background: '#121215', padding: '30px', borderRadius: '8px', border: '1px solid #333' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#e63946', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {formData.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 style={{ margin: 0 }}>{user.role === 'admin' ? 'Administrator' : 'Rider'}</h3>
            <p style={{ margin: 0, color: '#888' }}>Manage your account details</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>Full Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{ width: '100%', padding: '10px', background: '#1a1a1f', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>Email Address</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{ width: '100%', padding: '10px', background: '#1a1a1f', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
              required 
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{ padding: '12px', marginTop: '10px' }}>
            Save Changes
          </button>
          
          {updated && <p style={{ color: '#22c55e', textAlign: 'center', margin: '10px 0 0' }}>Profile updated successfully!</p>}
        </form>
      </div>
    </div>
  );
}