const Expense = require('../models/Expense.model');
const PDFDocument = require('pdfkit');
const { createObjectCsvStringifier } = require('csv-writer');

// Calculate split
const calculateSplit = (amount, participants, method) => {
    if (method === 'equal') {
        const share = amount / participants.length;
        return participants.map(p => ({ userId: p.userId, share }));
    } else if (method === 'exact') {
        const total = participants.reduce((sum, p) => sum + p.share, 0);
        if (total !== amount) throw new Error('Exact amounts must sum to total.');
        return participants;
    } else if (method === 'percentage') {
        const totalPercentage = participants.reduce((sum, p) => sum + p.share, 0);
        if (totalPercentage !== 100) throw new Error('Percentages must sum to 100%.');
        return participants.map(p => ({ userId: p.userId, share: (p.share / 100) * amount }));
    } else {
        throw new Error('Unsupported split method.');
    }
};

// Add Expense Logic 
const addExpense = async (req, res) => {
    try {
        const { amount, participants, splitMethod } = req.body;
        const calculatedParticipants = calculateSplit(amount, participants, splitMethod);
        const expense = await Expense.create({ ...req.body, participants: calculatedParticipants });
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get Expenses Logic
const getExpenses = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const expenses = await Expense.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.json(expenses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Generate PDF
const downloadExpensesAsPDF = async (req, res) => {
    try {
        const expenses = await Expense.find();
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="expenses.pdf"');

        doc.pipe(res);

        doc.fontSize(20).text('Expenses Report', { align: 'center' });
        doc.moveDown();

        expenses.forEach(expense => {
            doc
                .fontSize(14)
                .text(`Amount: ${expense.amount}, Split Method: ${expense.splitMethod}`)
                .moveDown();

            expense.participants.forEach(p => {
                doc.text(`- User ID: ${p.userId}, Share: ${p.share}`);
            });

            doc.moveDown().moveDown();
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate PDF.' });
    }
};

// Generate CSV
const downloadExpensesAsCSV = async (req, res) => {
    try {
        const expenses = await Expense.find();
        const csvStringifier = createObjectCsvStringifier({
            header: [
                { id: 'amount', title: 'Amount' },
                { id: 'splitMethod', title: 'Split Method' },
                { id: 'userId', title: 'User ID' },
                { id: 'share', title: 'Share' },
            ],
        });

        let records = [];
        expenses.forEach(expense => {
            expense.participants.forEach(p => {
                records.push({
                    amount: expense.amount,
                    splitMethod: expense.splitMethod,
                    userId: p.userId,
                    share: p.share,
                });
            });
        });

        const csvData = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="expenses.csv"');
        res.status(200).send(csvData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate CSV.' });
    }
};

module.exports = { addExpense, getExpenses, downloadExpensesAsPDF, downloadExpensesAsCSV };
