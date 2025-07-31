const express = require('express');
const router = express.Router();

const customersController = require('../controller/customers');
const validation = require('../middleware/validate');

router.get('/', customersController.getAllCustomers);

module.exports = router;
