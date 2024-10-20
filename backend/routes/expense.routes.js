const express = require('express');
const { 
    addExpense, 
    getExpenses, 
    downloadExpensesAsPDF, 
    downloadExpensesAsCSV 
} = require('../controllers/expenseController');
const { authenticateUser } = require('../middlewares/auth.js');
const router = express.Router();

router.post('/', authenticateUser, addExpense);
router.get('/', authenticateUser, getExpenses);
router.get('/download/pdf', authenticateUser, downloadExpensesAsPDF);
router.get('/download/csv', authenticateUser, downloadExpensesAsCSV);

module.exports = router;
