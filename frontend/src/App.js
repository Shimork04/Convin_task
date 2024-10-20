import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddUser from './components/AddUser';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import DownloadBalanceSheet from './components/DownloadBalanceSheet';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Expense Manager</h1>
        <nav>
          <Link to="/add-user">Add User</Link>
          <Link to="/add-expense">Add Expense</Link>
          <Link to="/expenses">View Expenses</Link>
          <Link to="/download">Download Balance Sheet</Link>
        </nav>
        <Routes>
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/download" element={<DownloadBalanceSheet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
