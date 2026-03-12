import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/api';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, subtotal, cartCount, clearCart } = useCart();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    // Validate
    if (!shippingDetails.name || !shippingDetails.address ||
        !shippingDetails.city || !shippingDetails.state || !shippingDetails.zipCode) {
      setError('Please fill in all required fields.');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty. Add items before checking out.');
      return;
    }

    setPlacing(true);
    try {
      const response = await placeOrder(shippingDetails);
      if (response.data.success) {
        clearCart();
        navigate(`/order-confirmation/${response.data.data.id}`);
      } else {
        setError(response.data.message || 'Failed to place order.');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page" id="checkout-page">
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <p>Add items to your cart before proceeding to checkout.</p>
          <button onClick={() => navigate('/')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page" id="checkout-page">
      <div className="checkout-header">
        <h1><FiLock className="lock-icon" /> Secure Checkout</h1>
      </div>

      <div className="checkout-layout">
        <div className="checkout-form-section">
          <form onSubmit={handlePlaceOrder}>
            <div className="checkout-card">
              <h2>1. Shipping Address</h2>
              {error && <div className="checkout-error">{error}</div>}

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={shippingDetails.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={shippingDetails.address}
                  onChange={handleInputChange}
                  placeholder="Street address, apartment, suite, floor"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={shippingDetails.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipCode">PIN Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={shippingDetails.zipCode}
                    onChange={handleInputChange}
                    placeholder="6-digit PIN code"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={shippingDetails.country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="checkout-card">
              <h2>2. Review Items</h2>
              <div className="checkout-items">
                {cartItems.map(item => (
                  <div key={item.product_id} className="checkout-item">
                    <img src={item.image_url} alt={item.name} className="checkout-item-image" />
                    <div className="checkout-item-info">
                      <h4>{item.name}</h4>
                      <p className="checkout-item-price">₹{parseFloat(item.price).toLocaleString('en-IN')}</p>
                      <p className="checkout-item-qty">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="checkout-card checkout-place-order">
              <button
                type="submit"
                className="place-order-btn"
                id="place-order-btn"
                disabled={placing}
              >
                {placing ? 'Placing Order...' : 'Place Your Order'}
              </button>
              <p className="order-total-text">
                Order total: <strong>₹{parseFloat(subtotal).toLocaleString('en-IN')}</strong>
              </p>
              <p className="order-disclaimer">
                By placing your order, you agree to Amazon Clone's terms and conditions.
              </p>
            </div>
          </form>
        </div>

        <div className="checkout-summary-section">
          <div className="checkout-summary-card">
            <button
              type="button"
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={placing}
            >
              {placing ? 'Placing...' : 'Place Your Order'}
            </button>
            <div className="summary-details">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Items ({cartCount}):</span>
                <span>₹{parseFloat(subtotal).toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span className="free-text">FREE</span>
              </div>
              <hr />
              <div className="summary-row total">
                <span>Order Total:</span>
                <span className="total-amount">₹{parseFloat(subtotal).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
