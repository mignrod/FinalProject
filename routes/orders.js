const express = require('express');
const router = express.Router();

const ordersControllers = require('../controller/orders');
const validator = require('../middleware/validate');

router.post('/', validator.saveOrders, ordersControllers.createOrders);
router.delete('/:orderId', ordersControllers.deleteOrder);
router.get('/customer/:customerId', ordersControllers.getOrdersByCustomer);
router.put('/:orderId', validator.saveOrders, ordersControllers.updateOrders);

module.exports = router;
