const express = require('express');
const { addExpense, getExpenses } = require('../controllers/expenseController');
const { validateExpense, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

router.post('/', validateExpense, handleValidationErrors, addExpense);
router.get('/', getExpenses);

module.exports = router;
