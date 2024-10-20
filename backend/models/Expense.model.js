const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    share: { type: Number, required: true }
});

const expenseSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    splitMethod: { type: String, required: true },
    participants: [participantSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);
