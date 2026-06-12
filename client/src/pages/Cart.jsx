import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, getCartTotal, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page" style={{ textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--blinkit-green)' }}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 style={{ marginBottom: '2rem' }}>Checkout</h2>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item._id} className="cart-item">
            <div className="cart-item-info">
              <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
              <div>
                <div className="cart-item-title">{item.name}</div>
                <div style={{ color: 'var(--text-muted)' }}>{item.weight}</div>
                <div style={{ fontWeight: 'bold' }}>₹{item.price}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => updateQuantity(item._id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button className="qty-btn" onClick={() => updateQuantity(item._id, 1)}>+</button>
              </div>
              <button 
                onClick={() => removeFromCart(item._id)}
                className="remove-item-btn"
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total">
        Grand Total: ₹{getCartTotal()}
      </div>

      <button className="checkout-btn" onClick={handleCheckout}>
        {user ? `Proceed to Checkout • ₹${getCartTotal()}` : 'Login to Checkout'}
      </button>
    </div>
  );
};

export default Cart;
