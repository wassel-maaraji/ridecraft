import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { CartContext } from '../context/CartContext';

export default function Home() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Bring in the addToCart function from our global state
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await api.get('/motorcycle');
        setMotorcycles(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycles();
  }, []);

  if (loading) return <h2>Loading inventory...</h2>;
  if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Our Motorcycles</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        
        {motorcycles.map((moto) => (
          <div key={moto.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            {/* Note: In a real app, use the actual moto.images url here */}
            <div style={{ height: '150px', backgroundColor: '#f0f0f0', marginBottom: '10px' }}>
               <p style={{textAlign: 'center', paddingTop: '60px'}}>Image Placeholder</p>
            </div>
            <h3>{moto.make} {moto.model}</h3>
            <p><strong>Category:</strong> {moto.category}</p>
            <p><strong>Engine:</strong> {moto.engine_cc}cc</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${moto.price}</p>
            
            <button 
              onClick={() => addToCart(moto)}
              style={{ padding: '10px', width: '100%', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Add to Cart
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}