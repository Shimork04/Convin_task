import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/expenses');
        setExpenses(response.data);
      } catch (error) {
        alert('Error fetching expenses: ' + error.message);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              <strong>Amount:</strong> {expense.amount}, <strong>Split Method:</strong> {expense.splitMethod}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
