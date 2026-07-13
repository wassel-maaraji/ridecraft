import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateItemQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate the total price of all items dynamically
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Handle the empty state
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any motorcycles yet.</p>
        <Link to="/" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Browse Inventory
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h2>Shopping Cart</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        {cart.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            
            {/* Item Details */}
            <div>
              <h3 style={{ margin: '0 0 5px 0' }}>{item.make} {item.model}</h3>
              <p style={{ margin: 0, color: '#555' }}>Price: ${item.price}</p>
            </div>

            {/* Quantity Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                style={{ width: '30px', height: '30px', cursor: 'pointer' }}
              >
                -
              </button>
              <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
              <button 
                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                style={{ width: '30px', height: '30px', cursor: 'pointer' }}
              >
                +
              </button>
            </div>

            {/* Item Total & Remove */}
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
                ${item.price * item.quantity}
              </p>
              <button 
                onClick={() => removeFromCart(item.id)}
                style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'right' }}>
        <h3>Total: ${cartTotal.toLocaleString()}</h3>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' }}>
          <button 
            onClick={clearCart}
            style={{ padding: '10px 20px', backgroundColor: 'transparent', border: '1px solid #dc3545', color: '#dc3545', borderRadius: '5px', cursor: 'pointer' }}
          >
            Clear Cart
          </button>
          <button 
            onClick={() => navigate('/checkout')}
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      
    </div>
  );
}