import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 1. Security Check: Load user from localStorage
  useEffect(() => {
    const userString = localStorage.getItem('user');
    
    if (!userString) {
      navigate('/auth'); // Redirect to login if not authenticated
      return;
    }
    
    const loggedInUser = JSON.parse(userString);
    setUser(loggedInUser);
    
    // Pre-fill the form with the user's current data
    setFormData({ 
      name: loggedInUser.name || '', 
      email: loggedInUser.email || '' 
    });
  }, [navigate]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // UPDATE: Save new details to MockAPI and localStorage
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // Send a PUT request to update the user in the database
      const response = await api.put(`/users/${user.id}`, formData);
      const updatedUser = response.data;
      
      // Update our local source of truth
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear the session
    navigate('/auth'); // Send back to login screen
  };

  if (!user) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading profile...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      
      {/* Profile Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>My Profile</h2>
        <button 
          onClick={handleLogout}
          style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>

      {/* Status Message */}
      {message.text && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          borderRadius: '4px', 
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24'
        }}>
          {message.text}
        </div>
      )}

      {/* Account Details Form */}
      <div style={{ backgroundColor: '#f4f4f9', padding: '30px', borderRadius: '8px' }}>
        <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              required 
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
          </div>

          <div style={{ marginTop: '10px' }}>
            <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '0.9rem' }}>
              <strong>Role:</strong> <span style={{ textTransform: 'capitalize' }}>{user.role}</span> 
              <br />
              <strong>Account ID:</strong> {user.id}
            </p>

            <button 
              type="submit" 
              disabled={isSaving}
              style={{ 
                padding: '12px 24px', 
                backgroundColor: isSaving ? '#6c757d' : '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: isSaving ? 'not-allowed' : 'pointer',
                width: '100%'
              }}
            >
              {isSaving ? 'Saving Changes...' : 'Save Profile Updates'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}