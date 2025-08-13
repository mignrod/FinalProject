const express = require('express');
const router = express.Router();

const customersController = require('../controller/customers');
const validation = require('../middleware/validate');
const { isAuthenticate } = require('../middleware/authenticate');

router.get('/', customersController.getAllCustomers);
router.get('/:id', customersController.getCustomerById);
router.get('/:username', customersController.getCustomersByUsername); // Giving some problems fetching data
router.post(
  '/',
  validation.saveCustomers,
  isAuthenticate,
  customersController.createCustomers
);
router.put(
  '/:id',
  validation.saveCustomers,
  isAuthenticate,
  customersController.updateCustomersById
);
router.delete('/:id', isAuthenticate, customersController.deleteCustomers);

module.exports = router;
