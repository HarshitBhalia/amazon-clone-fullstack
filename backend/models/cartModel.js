const pool = require('../config/db');

const cartModel = {
  // Get cart items for a user with product details
  async getCart(userId) {
    const result = await pool.query(
      `SELECT c.id, c.quantity, c.product_id, c.user_id,
              p.name, p.price, p.image_url, p.stock, p.original_price
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1
       ORDER BY c.created_at DESC`,
      [userId]
    );
    return result.rows;
  },

  // Add item to cart (upsert - increment if exists)
  async addToCart(userId, productId, quantity) {
    const result = await pool.query(
      `INSERT INTO cart (user_id, product_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_id)
       DO UPDATE SET quantity = cart.quantity + $3, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [userId, productId, quantity]
    );
    return result.rows[0];
  },

  // Update item quantity in cart
  async updateCartItem(userId, productId, quantity) {
    if (quantity <= 0) {
      return await cartModel.removeFromCart(userId, productId);
    }
    const result = await pool.query(
      `UPDATE cart SET quantity = $3, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $1 AND product_id = $2
       RETURNING *`,
      [userId, productId, quantity]
    );
    return result.rows[0];
  },

  // Remove item from cart
  async removeFromCart(userId, productId) {
    const result = await pool.query(
      'DELETE FROM cart WHERE user_id = $1 AND product_id = $2 RETURNING *',
      [userId, productId]
    );
    return result.rows[0];
  },

  // Clear all items from cart for a user
  async clearCart(userId) {
    await pool.query('DELETE FROM cart WHERE user_id = $1', [userId]);
  },

  // Get cart item count
  async getCartCount(userId) {
    const result = await pool.query(
      'SELECT COALESCE(SUM(quantity), 0) as count FROM cart WHERE user_id = $1',
      [userId]
    );
    return parseInt(result.rows[0].count);
  }
};

module.exports = cartModel;
