// 1. option to be downloadable in pdf
// 2. and csv (extra bonus point)



const Expense = require('../models/Expense');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit'); 





const downloadCSV = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const parser = new Parser({ fields: ['description', 'amount', 'splitMethod', 'date'] });
    const csv = parser.parse(expenses);

    res.header('Content-Type', 'text/csv');
    res.attachment('balance_sheet.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error generating CSV.' });
  }
};

const downloadPDF = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=balance_sheet.pdf');

    doc.text('Balance Sheet', { align: 'center' });
    expenses.forEach(exp => {
      doc.text(`Description: ${exp.description}, Amount: ${exp.amount}, Method: ${exp.splitMethod}`);
    });

    doc.end();
    doc.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Error generating PDF.' });
  }
};

module.exports = { downloadCSV, downloadPDF };
