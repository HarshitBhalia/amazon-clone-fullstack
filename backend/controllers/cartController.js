const cartModel = require('../models/cartModel');

const cartController = {
  // GET /api/cart?userId=1
  async getCart(req, res) {
    try {
      const userId = req.query.userId || 1;
      const items = await cartModel.getCart(userId);
      const count = await cartModel.getCartCount(userId);

      // Calculate totals
      const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

      res.json({
        success: true,
        data: {
          items,
          count,
          subtotal: subtotal.toFixed(2),
          total: subtotal.toFixed(2)
        }
      });
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ success: false, message: 'Server error fetching cart' });
    }
  },

  // POST /api/cart/add  body: { userId, productId, quantity }
  async addToCart(req, res) {
    try {
      const { userId = 1, productId, quantity = 1 } = req.body;
      if (!productId) {
        return res.status(400).json({ success: false, message: 'Product ID is required' });
      }
      const item = await cartModel.addToCart(userId, productId, quantity);
      const count = await cartModel.getCartCount(userId);
      res.json({ success: true, data: item, cartCount: count });
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ success: false, message: 'Server error adding to cart' });
    }
  },

  // PUT /api/cart/update  body: { userId, productId, quantity }
  async updateCart(req, res) {
    try {
      const { userId = 1, productId, quantity } = req.body;
      if (!productId || quantity === undefined) {
        return res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
      }
      const item = await cartModel.updateCartItem(userId, productId, quantity);
      const count = await cartModel.getCartCount(userId);
      res.json({ success: true, data: item, cartCount: count });
    } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ success: false, message: 'Server error updating cart' });
    }
  },

  // DELETE /api/cart/remove  body: { userId, productId }
  async removeFromCart(req, res) {
    try {
      const { userId = 1, productId } = req.body;
      if (!productId) {
        return res.status(400).json({ success: false, message: 'Product ID is required' });
      }
      await cartModel.removeFromCart(userId, productId);
      const count = await cartModel.getCartCount(userId);
      res.json({ success: true, message: 'Item removed from cart', cartCount: count });
    } catch (error) {
      console.error('Error removing from cart:', error);
      res.status(500).json({ success: false, message: 'Server error removing from cart' });
    }
  }
};

module.exports = cartController;
