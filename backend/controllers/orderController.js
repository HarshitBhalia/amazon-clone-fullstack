const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');

const orderController = {
  // POST /api/orders  body: { userId, shippingDetails }
  async placeOrder(req, res) {
    try {
      const { userId = 1, shippingDetails } = req.body;

      if (!shippingDetails || !shippingDetails.name || !shippingDetails.address || 
          !shippingDetails.city || !shippingDetails.state || !shippingDetails.zipCode) {
        return res.status(400).json({ success: false, message: 'All shipping details are required' });
      }

      // Get cart items
      const cartItems = await cartModel.getCart(userId);
      if (cartItems.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart is empty' });
      }

      // Calculate total
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + (parseFloat(item.price) * item.quantity), 0
      );

      // Create order
      const order = await orderModel.createOrder(userId, totalAmount, shippingDetails);

      // Add order items
      const orderItems = cartItems.map(item => ({
        product_id: item.product_id,
        name: item.name,
        image_url: item.image_url,
        quantity: item.quantity,
        price: item.price
      }));
      await orderModel.addOrderItems(order.id, orderItems);

      // Clear cart
      await cartModel.clearCart(userId);

      // Return order with items
      const fullOrder = await orderModel.getOrderById(order.id);
      res.status(201).json({ success: true, data: fullOrder });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ success: false, message: 'Server error placing order' });
    }
  },

  // GET /api/orders/:userId
  async getOrdersByUser(req, res) {
    try {
      const { userId } = req.params;
      const orders = await orderModel.getOrdersByUser(userId);
      res.json({ success: true, data: orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ success: false, message: 'Server error fetching orders' });
    }
  },

  // GET /api/orders/detail/:orderId
  async getOrderById(req, res) {
    try {
      const { orderId } = req.params;
      const order = await orderModel.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      res.json({ success: true, data: order });
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ success: false, message: 'Server error fetching order' });
    }
  }
};

module.exports = orderController;
