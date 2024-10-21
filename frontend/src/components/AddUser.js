import { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/users/', user);
      alert('User added successfully!');
      setUser({ name: '', email: '', password: '' }); // Reset form
    } catch (error) {
      if (error.response) {
        alert('Error adding user: ' + error.response.data.message);
      } else {
        alert('Error adding user: ' + error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="name" 
        placeholder="Name" 
        value={user.name}
        onChange={handleChange} 
        required 
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        value={user.email}
        onChange={handleChange} 
        required 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        value={user.password}
        onChange={handleChange} 
        required 
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
