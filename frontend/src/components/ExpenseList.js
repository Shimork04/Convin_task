import { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await axios.get('http://localhost:3000/api/expenses');
      setExpenses(response.data);
    };
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>{`Amount: ${expense.amount}, Split Method: ${expense.splitMethod}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
