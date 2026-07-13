import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Calculate total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate an API call to a payment gateway
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      clearCart(); // Empty the cart upon successful payment
      
      // Redirect back to home after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  if (cart.length === 0 && !paymentSuccess) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>No items to checkout</h2>
        <button onClick={() => navigate('/')} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Return to Shop
        </button>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', color: '#28a745' }}>
        <h2>Payment Successful!</h2>
        <p>Thank you for your order. Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px' }}>
      <h2>Checkout</h2>
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h3>Order Total: ${cartTotal.toLocaleString()}</h3>
      </div>

      <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
          <input type="text" required style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Card Number</label>
          <input type="text" pattern="\d{16}" placeholder="1234123412341234" maxLength="16" required style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Expiry (MM/YY)</label>
            <input type="text" pattern="\d{2}/\d{2}" placeholder="12/26" required style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>CVV</label>
            <input type="text" pattern="\d{3,4}" placeholder="123" maxLength="4" required style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isProcessing}
          style={{ 
            marginTop: '10px', 
            padding: '15px', 
            backgroundColor: isProcessing ? '#6c757d' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isProcessing ? 'Processing Payment...' : `Pay $${cartTotal.toLocaleString()}`}
        </button>
      </form>
    </div>
  );
}