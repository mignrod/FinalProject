const express = require("express");
const router = express.Router();

const paymentsController = require('../controller/payments');
const validation = require('../middleware/validate');

router.get('/', paymentsController.getAllPayments);
router.get('/:id', paymentsController.getSinglePayment);
router.post('/', validation.savePayment, paymentsController.createPayment);
router.put('/:id', validation.savePayment, paymentsController.updatePayment);
router.delete('/:id', paymentsController.deletePayment);


module.exports = router;