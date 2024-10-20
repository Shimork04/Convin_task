const express = require('express');
const { downloadCSV, downloadPDF } = require('../controllers/balanceSheetController');
const router = express.Router();

router.get('/csv', downloadCSV);
router.get('/pdf', downloadPDF);

module.exports = router;
