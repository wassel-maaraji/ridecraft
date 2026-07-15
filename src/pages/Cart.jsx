import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handleCheckout = () => {
    alert("Encrypted Connection: Contacting Payment Gateway...");
    setTimeout(() => {
      // 1. Get existing garage items or start fresh
      const existingGarage = JSON.parse(localStorage.getItem('ridecraft_garage') || '[]');
      
      // 2. Add current cart items to the garage
      localStorage.setItem('ridecraft_garage', JSON.stringify([...existingGarage, ...cart]));
      
      // 3. Clear the cart
      clearCart();
      
      // 4. Notify and redirect user to see their new bikes!
      alert("Transaction Approved! Your bikes have been sent to your Garage.");
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2 style={{ marginBottom: '30px' }}>Your Cart</h2>
      
      {cart.length === 0 ? (
        <p style={{ color: '#888' }}>Your cart is empty.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {cart.map((item, index) => (
            <div key={index} style={{ background: '#121215', padding: '20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: 0 }}>{item.make} {item.model}</h4>
                <p style={{ margin: '5px 0 0', color: '#22c55e' }}>${Number(item.price).toLocaleString()}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{ background: '#ef4444', border: 'none', padding: '8px 12px', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}>
                Remove
              </button>
            </div>
          ))}

          <div style={{ marginTop: '20px', padding: '20px', borderTop: '1px solid #333' }}>
            <h3>Total: ${total.toLocaleString()}</h3>
            
            <button 
              onClick={handleCheckout}
              style={{ background: '#22c55e', color: '#fff', padding: '15px 30px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', marginTop: '20px' }}
            >
              Proceed to Secure Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}