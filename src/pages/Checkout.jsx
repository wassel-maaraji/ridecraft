import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle fake payment processing
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a 2-second API call for payment validation
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
      clearCart(); // Empty the cart upon success
    }, 2000);
  };

  // 1. Edge Case: User navigates here with an empty cart
  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Your cart is empty.</h2>
        <button className="btn-primary" onClick={() => navigate('/')}>Return to Shop</button>
      </div>
    );
  }

  // 2. Success State: Order confirmed
  if (orderPlaced) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
        <h2>Order Confirmed!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          Your premium ride is being prepared for delivery. A confirmation has been sent to your email.
        </p>
        <button className="btn-primary" onClick={() => navigate('/')}>Return to Shop</button>
      </div>
    );
  }

  // 3. Main Checkout Layout
  return (
    <div className="container">
      <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '30px' }}>
        Secure Checkout
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        
        {/* Left Column: Form */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--surface-color)', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          
          <h3 style={{ marginBottom: '20px' }}>Shipping Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Full Name</label>
              <input type="text" required placeholder="John Doe" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Email Address</label>
              <input type="email" required placeholder="john@example.com" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Shipping Address</label>
              <input type="text" required placeholder="123 Rider Blvd" />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>City</label>
                <input type="text" required placeholder="Los Angeles" />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>ZIP Code</label>
                <input type="text" required placeholder="90001" />
              </div>
            </div>
          </div>

          <h3 style={{ margin: '30px 0 20px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>Payment Info</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Card Number</label>
              <input type="text" required placeholder="0000 0000 0000 0000" maxLength="16" />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Expiry</label>
                <input type="text" required placeholder="MM/YY" maxLength="5" />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>CVV</label>
                <input type="password" required placeholder="123" maxLength="4" />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '30px', padding: '15px', fontSize: '1.1rem' }} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing Payment...' : `Pay $${total.toLocaleString()}`}
          </button>
        </form>

        {/* Right Column: Order Summary */}
        <div style={{ backgroundColor: '#121215', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img 
                    src={item.images} 
                    alt={item.model} 
                    style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} 
                  />
                  <span style={{ fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--text-muted)', marginRight: '8px' }}>{item.quantity}x</span>
                    {item.make} {item.model}
                  </span>
                </div>
                
                <span style={{ fontWeight: 'bold' }}>
                  ${(item.price * item.quantity).toLocaleString()}
                </span>
                
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Total</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
              ${total.toLocaleString()}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}