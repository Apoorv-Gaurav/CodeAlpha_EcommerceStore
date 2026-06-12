import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, getCartTotal, getDiscountAmount, getFinalTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    phone: '',
    street: '',
    city: '',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (cartItems.length === 0) {
    return <Navigate to="/cart" />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate fake payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          items: cartItems,
          total: getFinalTotal(),
          address: formData,
          paymentMethod
        })
      });
      if (res.ok) {
        clearCart();
        navigate('/success');
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-left">
          <h2 className="checkout-title">Checkout</h2>
          
          <form onSubmit={handleSubmit} className="checkout-form" id="checkout-form">
            <div className="form-section">
              <h3>Delivery Address</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Street Address</label>
                <input type="text" name="street" value={formData.street} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>PIN Code</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Options</h3>
              <div className="payment-options">
                <label className={`payment-option ${paymentMethod === 'UPI' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="UPI" 
                    checked={paymentMethod === 'UPI'} 
                    onChange={(e) => setPaymentMethod(e.target.value)} 
                  />
                  <span>UPI (Google Pay, PhonePe, Paytm)</span>
                </label>
                <label className={`payment-option ${paymentMethod === 'Card' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="Card" 
                    checked={paymentMethod === 'Card'} 
                    onChange={(e) => setPaymentMethod(e.target.value)} 
                  />
                  <span>Credit / Debit Card</span>
                </label>
                <label className={`payment-option ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="COD" 
                    checked={paymentMethod === 'COD'} 
                    onChange={(e) => setPaymentMethod(e.target.value)} 
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        <div className="checkout-right">
          <div className="order-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item._id} className="summary-item">
                  <span>{item.quantity} x {item.name}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="summary-total" style={{ borderBottom: 'none', paddingBottom: '0', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Subtotal</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>₹{getCartTotal()}</span>
            </div>
            <div className="summary-total" style={{ borderTop: 'none', paddingTop: '0', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', color: 'var(--blinkit-green)' }}>
              <span style={{ fontSize: '1rem' }}>Fun Discount (98%)</span>
              <span style={{ fontSize: '1rem' }}>-₹{getDiscountAmount()}</span>
            </div>
            <div className="summary-total">
              <span>Final Amount</span>
              <span>₹{getFinalTotal()}</span>
            </div>
            
            <button 
              type="submit" 
              form="checkout-form" 
              className={`pay-now-btn ${isProcessing ? 'processing' : ''}`}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing Payment...' : `Pay Now • ₹${getFinalTotal()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
