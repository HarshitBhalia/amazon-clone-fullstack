import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiCalendar } from 'react-icons/fi';
import { getOrdersByUser } from '../services/api';

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrdersByUser();
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders-page" id="order-history-page">
        <div className="cart-loading">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page" id="order-history-page">
      <h1 className="orders-heading">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <FiPackage className="no-orders-icon" />
          <h2>No orders yet</h2>
          <p>Looks like you haven't placed any orders. Start shopping to see your orders here!</p>
          <Link to="/" className="continue-shopping-btn">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card" id={`order-${order.id}`}>
              <div className="order-card-header">
                <div className="order-header-left">
                  <div className="order-header-item">
                    <span className="header-label">ORDER PLACED</span>
                    <span className="header-value">
                      {new Date(order.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="order-header-item">
                    <span className="header-label">TOTAL</span>
                    <span className="header-value">
                      ₹{parseFloat(order.total_amount).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="order-header-item">
                    <span className="header-label">SHIP TO</span>
                    <span className="header-value">{order.shipping_name}</span>
                  </div>
                </div>
                <div className="order-header-right">
                  <span className="header-label">ORDER # {order.id}</span>
                  <Link to={`/order-confirmation/${order.id}`} className="order-detail-link">
                    View order details
                  </Link>
                </div>
              </div>

              <div className="order-card-body">
                <div className="order-status">
                  <span className={`status-badge ${order.status?.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
                <div className="order-items-preview">
                  {order.items?.map(item => (
                    <div key={item.id} className="order-item-preview">
                      <img src={item.product_image} alt={item.product_name} className="order-item-image" />
                      <div className="order-item-info">
                        <Link to={`/product/${item.product_id}`} className="order-item-name">
                          {item.product_name}
                        </Link>
                        <p className="order-item-qty">Qty: {item.quantity}</p>
                        <p className="order-item-price">
                          ₹{parseFloat(item.price).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistoryPage;
