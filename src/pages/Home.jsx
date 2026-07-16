import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../api/axios';

export default function Home() {
  const [motorcycles, setMotorcycles] = useState([]);
  
  // Filtering States
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(30000); 
  
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get('/motorcycle').then(res => setMotorcycles(res.data));
  }, []);

  // Dynamically extract unique brands (makes) from your MockAPI data
  const categories = ['All', ...new Set(motorcycles.map(m => m.make))];

  // The filtering engine
  const filteredBikes = motorcycles.filter(m => {
    const matchCategory = category === 'All' || m.make === category;
    const matchPrice = Number(m.price) <= maxPrice;
    return matchCategory && matchPrice;
  });

  return (
    <div className="container" style={{ padding: '40px 20px', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
      
      {/* 1. THE SIDEBAR (Filters) */}
      <aside style={{ width: '250px', flexShrink: 0, background: '#121215', padding: '25px', borderRadius: '10px', border: '1px solid #222', position: 'sticky', top: '20px' }}>
        <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>Filters</h3>
        
        {/* Dynamic Category List */}
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

        {/* Price Slider */}
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

      {/* 2. THE INVENTORY GRID */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ margin: 0 }}>Featured Inventory</h2>
          <span style={{ color: '#888', background: '#121215', padding: '5px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>
            Showing {filteredBikes.length} results
          </span>
        </div>

        {filteredBikes.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', background: '#121215', borderRadius: '8px', border: '1px dashed #333' }}>
            <h4 style={{ margin: 0, color: '#aaa' }}>No motorcycles found matching your filters.</h4>
            <button onClick={() => {setCategory('All'); setMaxPrice(30000);}} style={{ background: 'none', border: 'none', color: '#e63946', marginTop: '10px', cursor: 'pointer', textDecoration: 'underline' }}>Reset Filters</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {filteredBikes.map(m => (
              <div key={m.id} style={{ background: '#121215', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', border: '1px solid #222' }}>
                <img 
                  src={m.image || m.images || 'https://via.placeholder.com/300x200?text=No+Image'} 
                  alt={`${m.make} ${m.model}`} 
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} 
                />
                
                <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{m.make} {m.model}</h4>
                <p style={{ color: '#22c55e', margin: '0 0 20px 0', fontWeight: 'bold', fontSize: '1.1rem' }}>${Number(m.price).toLocaleString()}</p>
                
                <button 
                  onClick={() => addToCart(m)} 
                  style={{ background: '#e63946', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginTop: 'auto' }}
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