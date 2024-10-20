import { useState } from 'react';
import axios from 'axios';

const AddExpense = () => {
  const [expense, setExpense] = useState({ amount: '', participants: [], splitMethod: 'equal' });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/expenses', expense);
      alert('Expense added successfully!');
    } catch (error) {
      alert('Error adding expense: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required />
      <select name="splitMethod" onChange={handleChange}>
        <option value="equal">Equal</option>
        <option value="exact">Exact</option>
        <option value="percentage">Percentage</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;
