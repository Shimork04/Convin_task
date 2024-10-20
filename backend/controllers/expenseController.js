const Expense = require('../models/Expense.model.js');


// 1. logic to calculate splitting, three parts - euql, exact, percentage
// 2. add expense method
// 3. get expense method

const calculateSplit = (amount, participants, method) => {
    if(method === 'equal'){
        const share = ( amount / participants.length );
        return participants.map(p => ({userId: p.userId, share}));
    }

    if(method === 'exact'){
        const total = participants.reduce((sum, p) => sum + p.share, 0);
        if(total !== amount) 
            throw new Error('Exact amounts must sum to total.');

        return participants;
    }


    if(method === 'percentage'){
        const total = participants.reduce((sum, p) => sum + p.share, 0);
        if(totalPrecentage !== 100) 
            throw new Error('Percentages must sum to 100%!');
        return participants.map(p => ({userId: p.userId, share: (p.share /100) * amount }));
    }

    throw new Error('This type of Expense Spiliting not supported.');
};

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
  
  const getExpenses = async (req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
  };
  
  module.exports = { addExpense, getExpenses };