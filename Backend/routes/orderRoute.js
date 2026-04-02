const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getUserOrders, updateOrderStatus } = require('../controllers/orderController');
const { authenticateUser, authorizeAdmin } = require('../middleware/auth');

router.post('/', authenticateUser, createOrder);
router.get('/', authenticateUser, authorizeAdmin, getOrders);
router.get('/user', authenticateUser, getUserOrders);
router.put('/:id/status', authenticateUser, authorizeAdmin, updateOrderStatus);

module.exports = router;