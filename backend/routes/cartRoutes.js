const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET /api/cart - Get cart items for a user
router.get('/', cartController.getCart);

// POST /api/cart/add - Add item to cart
router.post('/add', cartController.addToCart);

// PUT /api/cart/update - Update cart item quantity
router.put('/update', cartController.updateCart);

// DELETE /api/cart/remove - Remove item from cart
router.delete('/remove', cartController.removeFromCart);

module.exports = router;
