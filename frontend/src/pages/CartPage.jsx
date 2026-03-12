import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { FiShoppingBag } from 'react-icons/fi';

function CartPage() {
  const { cartItems, cartCount, subtotal, loading } = useCart();

  if (loading) {
    return (
      <div className="cart-page" id="cart-page">
        <div className="cart-loading">
          <div className="spinner"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page" id="cart-page">
        <div className="empty-cart">
          <FiShoppingBag className="empty-cart-icon" />
          <h2>Your Amazon Clone Cart is empty</h2>
          <p>Your shopping cart is waiting. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more.</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page" id="cart-page">
      <div className="cart-layout">
        <div className="cart-items-section">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <span className="cart-deselect">Price</span>
          </div>
          <hr />
          <div className="cart-items-list">
            {cartItems.map(item => (
              <CartItem key={item.product_id} item={item} />
            ))}
          </div>
          <div className="cart-total-inline">
            Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'}):
            <span className="cart-total-value"> ₹{parseFloat(subtotal).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="cart-summary-section">
          <div className="cart-summary-card">
            <p className="free-delivery-note">
              ✓ Your order is eligible for FREE Delivery.
            </p>
            <p className="cart-summary-total">
              Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'}):
              <span className="total-amount"> ₹{parseFloat(subtotal).toLocaleString('en-IN')}</span>
            </p>
            <Link to="/checkout" className="checkout-btn" id="proceed-to-checkout">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
