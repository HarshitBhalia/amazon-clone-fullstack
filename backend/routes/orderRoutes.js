const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST /api/orders - Place a new order
router.post('/', orderController.placeOrder);

// GET /api/orders/detail/:orderId - Get order by ID (must be before /:userId)
router.get('/detail/:orderId', orderController.getOrderById);

// GET /api/orders/:userId - Get all orders for a user
router.get('/:userId', orderController.getOrdersByUser);

module.exports = router;
