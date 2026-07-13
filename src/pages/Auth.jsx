import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../api/axios'; 

export default function Auth() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.get('/users');
      const users = response.data;

      const foundUser = users.find((u) => u.email === email);

      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser));g
        if (foundUser.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      } else {
        setError('User not found. Please check your email.');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError('An error occurred while connecting to the server.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Login to Ridecraft</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px' }}
        />
       
        <input
          type="password"
          placeholder="Enter your password"
          required
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
}