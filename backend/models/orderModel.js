const pool = require('../config/db');

const orderModel = {
  // Create a new order
  async createOrder(userId, totalAmount, shippingDetails) {
    const { name, address, city, state, zipCode, country } = shippingDetails;
    const result = await pool.query(
      `INSERT INTO orders (user_id, total_amount, shipping_name, shipping_address, shipping_city, shipping_state, shipping_zip, shipping_country)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [userId, totalAmount, name, address, city, state, zipCode, country || 'India']
    );
    return result.rows[0];
  },

  // Add items to an order
  async addOrderItems(orderId, items) {
    const values = items.map((item, i) => {
      const offset = i * 5;
      return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5})`;
    }).join(', ');

    const params = items.flatMap(item => [
      orderId, item.product_id, item.name, item.image_url, item.quantity, item.price
    ]);

    // Build the query properly
    const placeholders = items.map((item, i) => {
      const offset = i * 6;
      return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6})`;
    }).join(', ');

    const flatParams = items.flatMap(item => [
      orderId, item.product_id, item.name, item.image_url, item.quantity, item.price
    ]);

    const result = await pool.query(
      `INSERT INTO order_items (order_id, product_id, product_name, product_image, quantity, price)
       VALUES ${placeholders}
       RETURNING *`,
      flatParams
    );
    return result.rows;
  },

  // Get order by ID with items
  async getOrderById(orderId) {
    const orderResult = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    if (orderResult.rows.length === 0) return null;

    const itemsResult = await pool.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [orderId]
    );

    return {
      ...orderResult.rows[0],
      items: itemsResult.rows
    };
  },

  // Get all orders for a user
  async getOrdersByUser(userId) {
    const ordersResult = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    const orders = [];
    for (const order of ordersResult.rows) {
      const itemsResult = await pool.query(
        'SELECT * FROM order_items WHERE order_id = $1',
        [order.id]
      );
      orders.push({
        ...order,
        items: itemsResult.rows
      });
    }

    return orders;
  }
};

module.exports = orderModel;
