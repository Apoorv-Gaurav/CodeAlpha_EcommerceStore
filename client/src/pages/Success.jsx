
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="success-page">
      <div className="success-icon">🎉</div>
      <h2 className="success-title">Order Placed Successfully!</h2>
      <p className="success-subtitle">Your fake payment was successful and items will be delivered shortly.</p>
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
