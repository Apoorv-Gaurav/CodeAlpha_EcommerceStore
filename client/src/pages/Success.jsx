
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="success-page">
      <div className="success-icon">🎉</div>
      <h2 className="success-title">THANK YOU FOR FUN ORDER!</h2>
      <p className="success-subtitle">IT WILL GET DELIVER IN FEW DECADES.</p>
      
      <div className="order-details-box" style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', margin: '1.5rem 0', border: '1px dashed #ccc', textAlign: 'left', display: 'inline-block', minWidth: '300px' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#333' }}>Order Details</h3>
        <p style={{ margin: '0.5rem 0', color: '#555' }}><strong>Order Number:</strong> #FUN-{Math.floor(1000000 + Math.random() * 9000000)}</p>
        <p style={{ margin: '0.5rem 0', color: '#555' }}><strong>Status:</strong> Packing (Very Slowly)</p>
        <p style={{ margin: '0.5rem 0', color: '#555' }}><strong>Estimated Delivery:</strong> Sometime next century</p>
      </div>

      <div className="success-actions">
        <Link to="/orders" className="success-btn view-orders-btn">
          View Orders
        </Link>
        <Link to="/" className="success-btn keep-shopping-btn">
          Keep Shopping
        </Link>
      </div>
    </div>
  );
};

export default Success;
