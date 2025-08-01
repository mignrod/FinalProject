const express = require('express');
const router = express.Router();

const customersController = require('../controller/customers');
const validation = require('../middleware/validate');

router.get('/', customersController.getAllCustomers);
router.get('/:id', customersController.getCustomerById);
router.get('/:username', customersController.getCustomersByUsername); // Giving some problems fetching data
router.post('/', customersController.createCustomers);

module.exports = router;
