import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../api/axios';

export default function Home() {
  const [motorcycles, setMotorcycles] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get('/motorcycle').then(res => setMotorcycles(res.data));
  }, []);

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2 style={{ marginBottom: '30px' }}>Featured Inventory</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {motorcycles.map(m => (
          <div key={m.id} style={{ background: '#121215', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
            
            {/* THE MISSING IMAGE TAG IS BACK */}
            <img 
              src={m.image || m.images || 'https://via.placeholder.com/300x200?text=No+Image'} 
              alt={`${m.make} ${m.model}`} 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} 
            />
            
            <h4 style={{ margin: '0 0 10px 0' }}>{m.make} {m.model}</h4>
            <p style={{ color: '#aaa', margin: '0 0 15px 0' }}>${m.price}</p>
            
            {/* ADD TO CART BUTTON (Fixed and pushed to bottom) */}
            <button 
              onClick={() => addToCart(m)} 
              style={{ background: '#e63946', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginTop: 'auto' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}