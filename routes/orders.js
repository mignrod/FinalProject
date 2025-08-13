const express = require('express');
const router = express.Router();

const ordersControllers = require('../controller/orders');
const validator = require('../middleware/validate');
const { isAuthenticate } = require('../middleware/authenticate');

router.post(
  '/',
  validator.saveOrders,
  isAuthenticate,
  ordersControllers.createOrders
);
router.delete('/:orderId', isAuthenticate, ordersControllers.deleteOrder);
router.get(
  '/customer/:customerId',
  isAuthenticate,
  ordersControllers.getOrdersByCustomer
);
router.put(
  '/:orderId',
  validator.saveOrders,
  isAuthenticate,
  ordersControllers.updateOrders
);

module.exports = router;
