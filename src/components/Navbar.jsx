import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [msgCount, setMsgCount] = useState(0);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext); 

  useEffect(() => {
    const loadData = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
      setMsgCount(JSON.parse(localStorage.getItem('ridecraft_messages') || '[]').length);
    };
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  return (
    <nav style={{ padding: '15px 30px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none' }}>RIDECRAFT</Link>
      
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#aaa', textDecoration: 'none' }}>Shop</Link>
        <Link to="/cart" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
          Cart {cart.length > 0 && `(${cart.length})`}
        </Link>
        
        {user?.role === 'admin' ? (
          <>
            <Link to="/about" style={{ color: '#eab308', textDecoration: 'none' }}>Pro Tools</Link>
            <Link to="/contact" style={{ color: msgCount > 0 ? '#ef4444' : '#aaa', textDecoration: 'none' }}>Inbox {msgCount > 0 && `(${msgCount})`}</Link>
            <Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Admin</Link>
          </>
        ) : (
          <>
            {/* THIS WAS MISSING: The Contact link for regular users & guests */}
            <Link to="/contact" style={{ color: '#aaa', textDecoration: 'none' }}>Contact Us</Link>
            
            {user && <Link to="/dashboard" style={{ color: '#aaa', textDecoration: 'none' }}>My Dashboard</Link>}
          </>
        )}

        {user ? (
          <>
            <Link to="/profile" style={{ color: '#aaa', textDecoration: 'none' }}>Profile</Link>
            <button onClick={handleLogout} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
          </>
        ) : (
          <Link to="/auth" style={{ background: '#e63946', padding: '8px 16px', borderRadius: '4px', color: '#fff', textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}