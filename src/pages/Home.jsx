import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import api from '../api/axios';

export default function Home() {
  const [motorcycles, setMotorcycles] = useState([]);
  
  // Filtering States
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(30000); 
  
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/motorcycle').then(res => setMotorcycles(res.data));
  }, []);

  // Authentication Check for Purchasing
  const handleAddToCart = (motorcycle) => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert("Access Denied: Please log in to start building your garage.");
      navigate('/auth');
      return;
    }
    addToCart(motorcycle);
  };

  const categories = ['All', ...new Set(motorcycles.map(m => m.make))];

  const filteredBikes = motorcycles.filter(m => {
    const matchCategory = category === 'All' || m.make === category;
    const matchPrice = Number(m.price) <= maxPrice;
    return matchCategory && matchPrice;
  });

  return (
    <div className="container" style={{ padding: '40px 20px', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
      
      {/* THE SIDEBAR (Filters) */}
      <aside style={{ width: '250px', flexShrink: 0, background: '#121215', padding: '25px', borderRadius: '10px', border: '1px solid #222', position: 'sticky', top: '20px' }}>
        <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>Filters</h3>
        
        <div style={{ marginBottom: '30px' }}>
          <h4 style={{ color: '#aaa', marginBottom: '15px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Brand / Make</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {categories.map(cat => (
              <li key={cat}>
                <button 
                  onClick={() => setCategory(cat)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: category === cat ? '#e63946' : '#fff', 
                    cursor: 'pointer', 
                    textAlign: 'left', 
                    width: '100%', 
                    fontWeight: category === cat ? 'bold' : 'normal',
                    padding: '5px 0',
                    transition: 'color 0.2s'
                  }}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#aaa', marginBottom: '15px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Max Price: ${maxPrice.toLocaleString()}
          </h4>
          <input 
            type="range" 
            min="0" 
            max="30000" 
            step="500" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', accentColor: '#e63946' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.8rem', marginTop: '10px' }}>
            <span>$0</span>
            <span>$30k+</span>
          </div>
        </div>
      </aside>

      {/* THE INVENTORY GRID */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ margin: 0 }}>Featured Inventory</h2>
          <span style={{ color: '#888', background: '#121215', padding: '5px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>
            Showing {filteredBikes.length} results
          </span>
        </div>

        {filteredBikes.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', background: '#121215', borderRadius: '8px', border: '1px dashed #333' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#aaa' }}>No motorcycles found matching your filters.</h4>
            <button onClick={() => {setCategory('All'); setMaxPrice(30000);}} style={{ background: 'none', border: 'none', color: '#e63946', cursor: 'pointer', textDecoration: 'underline' }}>Reset Filters</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {filteredBikes.map(m => (
              
              /* APPLYING THE NEW PRO CLASSES HERE */
              <div key={m.id} className="pro-card" style={{ background: '#121215', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', border: '1px solid #222', overflow: 'hidden' }}>
                
                <div style={{ overflow: 'hidden', borderRadius: '8px', marginBottom: '15px' }}>
                  <img 
                    src={m.image || m.images || 'https://via.placeholder.com/300x200?text=No+Image'} 
                    alt={`${m.make} ${m.model}`} 
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                  />
                </div>
                
                <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: '700' }}>{m.make} {m.model}</h4>
                <p style={{ color: '#22c55e', margin: '0 0 20px 0', fontWeight: '800', fontSize: '1.1rem' }}>${Number(m.price).toLocaleString()}</p>
                
                <button 
                  onClick={() => handleAddToCart(m)} 
                  className="btn-primary"
                  style={{ background: '#e63946', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', width: '100%', marginTop: 'auto' }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}