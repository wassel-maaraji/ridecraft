import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        // Fetch all users to verify credentials
        const response = await api.get('/users');
        const user = response.data.find(
          u => u.email === formData.email && u.password === formData.password
        );
        
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          window.dispatchEvent(new Event('storage')); // Force navbar to update instantly
          navigate('/');
        } else {
          setError('Invalid email or password. Please try again.');
        }
      } else {
        // Register a new standard user
        const newUser = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: 'user',
          createdAt: new Date().toISOString()
        };
        const response = await api.post('/users', newUser);
        localStorage.setItem('user', JSON.stringify(response.data));
        window.dispatchEvent(new Event('storage')); // Force navbar to update instantly
        navigate('/');
      }
    } catch (err) {
      setError('An error occurred with the database. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '65vh' }}>
      
      <div style={{ backgroundColor: 'var(--surface-color)', padding: '40px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', width: '100%', maxWidth: '420px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.3)', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {!isLogin && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required={!isLogin} placeholder="John Doe" />
            </div>
          )}
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="rider@example.com" />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required placeholder="••••••••" />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '10px', padding: '15px', fontSize: '1.1rem' }}>
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '25px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }} 
            style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: 0, fontWeight: 'bold', fontSize: '0.95rem' }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>

      </div>
    </div>
  );
}