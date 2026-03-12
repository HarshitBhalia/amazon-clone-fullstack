import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      removeItem(item.product_id);
    } else if (newQuantity <= item.stock) {
      updateQuantity(item.product_id, newQuantity);
    }
  };

  const discount = item.original_price
    ? Math.round(((item.original_price - item.price) / item.original_price) * 100)
    : 0;

  return (
    <div className="cart-item" id={`cart-item-${item.product_id}`}>
      <Link to={`/product/${item.product_id}`} className="cart-item-image-link">
        <img src={item.image_url} alt={item.name} className="cart-item-image" />
      </Link>
      <div className="cart-item-details">
        <Link to={`/product/${item.product_id}`} className="cart-item-title">
          {item.name}
        </Link>
        <p className="cart-item-stock">
          {item.stock > 0 ? (
            <span className="in-stock">In Stock</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </p>
        <div className="cart-item-price">
          <span className="cart-price">₹{parseFloat(item.price).toLocaleString('en-IN')}</span>
          {item.original_price && (
            <>
              <span className="cart-original-price">
                ₹{parseFloat(item.original_price).toLocaleString('en-IN')}
              </span>
              <span className="cart-discount">({discount}% off)</span>
            </>
          )}
        </div>
        <div className="cart-item-actions">
          <div className="quantity-controls">
            <button
              className="qty-btn"
              id={`qty-decrease-${item.product_id}`}
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              {item.quantity === 1 ? <FiTrash2 size={14} /> : <FiMinus size={14} />}
            </button>
            <span className="qty-value">{item.quantity}</span>
            <button
              className="qty-btn"
              id={`qty-increase-${item.product_id}`}
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= item.stock}
            >
              <FiPlus size={14} />
            </button>
          </div>
          <span className="cart-divider">|</span>
          <button
            className="remove-btn"
            id={`remove-${item.product_id}`}
            onClick={() => removeItem(item.product_id)}
          >
            <FiTrash2 size={14} /> Delete
          </button>
        </div>
      </div>
      <div className="cart-item-subtotal">
        <span className="subtotal-label">Subtotal:</span>
        <span className="subtotal-value">
          ₹{(parseFloat(item.price) * item.quantity).toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
}

export default CartItem;
