import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/orders/${user._id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const handleRemoveOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to remove this order from your history?')) return;
    
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        setOrders(prev => prev.filter(order => order._id !== orderId));
      } else {
        alert('Failed to remove order.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="orders-page" style={{ textAlign: 'center' }}>
        <h2>Please log in to view your orders</h2>
        <Link to="/login" className="orders-login-link">Go to Login</Link>
      </div>
    );
  }

  if (loading) return <div className="loader"></div>;

  return (
    <div className="orders-page">
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="orders-login-link">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <span className="order-id">Order #{order._id.slice(-6)}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>
                <span className={`order-status status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <img src={item.imageUrl} alt={item.name} className="order-item-img" />
                    <div className="order-item-details">
                      <span className="order-item-name">{item.name}</span>
                      <span className="order-item-meta">{item.weight} × {item.quantity}</span>
                    </div>
                    <span className="order-item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Total: <strong>₹{order.total}</strong></span>
                <button 
                  onClick={() => handleRemoveOrder(order._id)}
                  style={{ background: '#ff4d4f', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
