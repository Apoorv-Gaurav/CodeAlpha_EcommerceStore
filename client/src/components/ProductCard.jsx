
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  
  const cartItem = cartItems.find(item => item._id === product._id);

  return (
    <div className="product-card">
      <div className="delivery-tag">
        ⏱ {product.deliveryTime}
      </div>
      <div className="img-container">
        <img src={product.imageUrl} alt={product.name} className={!product.inStock ? 'sold-out-img' : ''} />
        {!product.inStock && <div className="sold-out-watermark">Sold Out</div>}
      </div>
      <div className="product-weight">{product.weight}</div>
      <div className="product-name">{product.name}</div>
      <div className="card-bottom">
        <div className="product-price">₹{product.price}</div>
        
        {cartItem ? (
          <div className="qty-controls">
            <button className="qty-btn" onClick={() => updateQuantity(product._id, -1)}>-</button>
            <span>{cartItem.quantity}</span>
            <button className="qty-btn" onClick={() => updateQuantity(product._id, 1)}>+</button>
          </div>
        ) : (
          <button 
            className="add-btn" 
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            ADD
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
