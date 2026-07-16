import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // View state controls whether we see the cart items or the payment form
  const [view, setView] = useState('cart'); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({ name: '', number: '', exp: '', cvc: '' });

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API network request for a payment gateway
    setTimeout(() => {
      const existingGarage = JSON.parse(localStorage.getItem('ridecraft_garage') || '[]');
      localStorage.setItem('ridecraft_garage', JSON.stringify([...existingGarage, ...cart]));
      clearCart();
      setIsProcessing(false);
      
      alert("Payment Authorized! Your new machines are waiting in your Garage.");
      navigate('/dashboard');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem' }}>Your Cart is Empty</h2>
        <p style={{ color: '#888', marginTop: '10px' }}>Head to the shop to find your next ride.</p>
        <button onClick={() => navigate('/')} className="btn-primary" style={{ padding: '12px 25px', marginTop: '20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', color: '#fff' }}>
          Browse Inventory
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px' }}>{view === 'cart' ? 'Your Cart' : 'Secure Checkout'}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: view === 'cart' ? '1fr' : '1fr 350px', gap: '30px' }}>

        {/* LEFT COLUMN: Main Content area based on the current view state */}
        {view === 'cart' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cart.map((item, index) => (
              <div key={index} className="glass-panel" style={{ padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <img src={item.image || item.images || 'https://via.placeholder.com/150'} alt={item.model} style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{item.make} {item.model}</h4>
                    <p style={{ margin: '5px 0 0', color: '#22c55e', fontWeight: 'bold' }}>${Number(item.price).toLocaleString()}</p>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} style={{ background: '#ef4444', border: 'none', padding: '8px 15px', borderRadius: '5px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
                  Remove
                </button>
              </div>
            ))}

            <div className="glass-panel" style={{ padding: '25px', borderRadius: '10px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>Total: <span style={{ color: '#22c55e' }}>${total.toLocaleString()}</span></h3>
              <button onClick={() => setView('checkout')} className="btn-primary" style={{ padding: '15px 30px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', color: '#fff' }}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM UI */
          <div className="glass-panel" style={{ padding: '35px', borderRadius: '10px' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Payment Details</h3>
            
            <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '8px', letterSpacing: '1px' }}>NAME ON CARD</label>
                <input type="text" required value={paymentData.name} onChange={e => setPaymentData({...paymentData, name: e.target.value})} placeholder="Amin Doe" style={{ width: '100%', padding: '12px 15px', background: '#0a0a0c', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '1rem' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '8px', letterSpacing: '1px' }}>CARD NUMBER</label>
                <input type="text" required maxLength="19" value={paymentData.number} onChange={e => setPaymentData({...paymentData, number: e.target.value})} placeholder="0000 0000 0000 0000" style={{ width: '100%', padding: '12px 15px', background: '#0a0a0c', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '1rem', letterSpacing: '2px' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '8px', letterSpacing: '1px' }}>EXPIRY (MM/YY)</label>
                  <input type="text" required maxLength="5" value={paymentData.exp} onChange={e => setPaymentData({...paymentData, exp: e.target.value})} placeholder="12/26" style={{ width: '100%', padding: '12px 15px', background: '#0a0a0c', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '1rem' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '8px', letterSpacing: '1px' }}>CVC</label>
                  <input type="text" required maxLength="4" value={paymentData.cvc} onChange={e => setPaymentData({...paymentData, cvc: e.target.value})} placeholder="123" style={{ width: '100%', padding: '12px 15px', background: '#0a0a0c', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '1rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button type="button" onClick={() => setView('cart')} disabled={isProcessing} style={{ flex: 1, padding: '15px', background: 'transparent', border: '1px solid #555', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Back to Cart
                </button>
                <button type="submit" disabled={isProcessing} className="btn-primary" style={{ flex: 2, padding: '15px', border: 'none', borderRadius: '6px', cursor: isProcessing ? 'not-allowed' : 'pointer', fontWeight: 'bold', color: '#fff' }}>
                  {isProcessing ? 'Processing Transaction...' : `Pay $${total.toLocaleString()}`}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* RIGHT COLUMN: Order Summary (Only visible when the view state is set to 'checkout') */}
        {view === 'checkout' && (
          <div className="glass-panel" style={{ padding: '25px', borderRadius: '10px', height: 'fit-content' }}>
            <h4 style={{ marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Order Summary</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
              {cart.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#aaa' }}>{item.make} {item.model}</span>
                  <span>${Number(item.price).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #333', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
              <span>Total</span>
              <span style={{ color: '#22c55e' }}>${total.toLocaleString()}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}