const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    participants: [{ userId: String, share: Number }],
    splitMethod: { type: String, enum: ['equal', 'exact', 'percentage'], required: true },
}, { timestamps: true });

expenseSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Expense', expenseSchema);
