import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage } from 'react-icons/fi';
import { getOrderById } from '../services/api';

function OrderConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(id);
        setOrder(response.data.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="confirmation-page" id="order-confirmation-page">
        <div className="cart-loading">
          <div className="spinner"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="confirmation-page" id="order-confirmation-page">
        <div className="order-not-found">
          <h2>Order not found</h2>
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page" id="order-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-success">
          <FiCheckCircle className="success-icon" />
          <h1>Order Placed Successfully!</h1>
          <p className="order-id">Order #{order.id}</p>
          <p className="confirmation-message">
            Thank you for your purchase! Your order has been confirmed and will be shipped soon.
          </p>
        </div>

        <div className="confirmation-details">
          <div className="confirmation-card">
            <h3><FiPackage /> Order Details</h3>
            <div className="confirmation-meta">
              <div className="meta-item">
                <span className="meta-label">Order Date:</span>
                <span className="meta-value">
                  {new Date(order.created_at).toLocaleDateString('en-IN', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Order Status:</span>
                <span className="meta-value status-badge">{order.status}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Ship to:</span>
                <span className="meta-value">
                  {order.shipping_name}, {order.shipping_address}, {order.shipping_city}, {order.shipping_state} - {order.shipping_zip}
                </span>
              </div>
            </div>
          </div>

          <div className="confirmation-card">
            <h3>Items Ordered</h3>
            <div className="confirmation-items">
              {order.items?.map(item => (
                <div key={item.id} className="confirmation-item">
                  <img src={item.product_image} alt={item.product_name} className="confirmation-item-image" />
                  <div className="confirmation-item-info">
                    <h4>{item.product_name}</h4>
                    <p>Qty: {item.quantity}</p>
                    <p className="confirmation-item-price">
                      ₹{parseFloat(item.price).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="confirmation-card total-card">
            <div className="confirmation-total">
              <span>Order Total:</span>
              <span className="total-amount">
                ₹{parseFloat(order.total_amount).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/orders" className="view-orders-btn">View Order History</Link>
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
