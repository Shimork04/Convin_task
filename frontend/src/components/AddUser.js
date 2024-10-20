import { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [user, setUser] = useState({ name: '', email: '', mobile: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/users/', user);
      alert('User added successfully!');
    } catch (error) {
      alert('Error adding user: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="mobile" placeholder="Mobile" onChange={handleChange} required />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
