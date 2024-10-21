# **Expense Tracker Application**  

This project is a **full-stack Expense Tracker App** built using **React.js** on the frontend and **Node.js with Express.js** on the backend as part of Convin Backend Intern Task. It provides features like user management, expense tracking, balance sheet downloads, and advanced features such as **MongoDB integration for large datasets**, **user authentication and authorization**, **error handling**, and **input validation**. The application is optimized for **performance and scalability**, ensuring a smooth experience even with high data volumes.  

## **Table of Contents**  
1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Installation and Setup](#installation-and-setup)  
4. [MongoDB Configuration](#mongodb-configuration)  
5. [Authentication and Authorization](#authentication-and-authorization)  
6. [Error Handling and Validation](#error-handling-and-validation)  
7. [Performance Optimization](#performance-optimization)  
8. [Unit and Integration Testing](#unit-and-integration-testing)  
9. [Code Quality](#code-quality)  
10. [Contributing](#contributing)  
11. [License](#license)  

---

## **Features**  
- **User Management:**  
  - Add, manage, and authenticate users.  
  - Secure user registration and login with **JWT-based authorization**.  

- **Expense Tracking:**  
  - Add, view, and manage expenses with **split method options** (equal, exact, percentage).  
  - Download **balance sheets** in PDF and CSV formats.  

- **MongoDB Integration:**  
  - Efficiently handle **large datasets** using MongoDB for seamless performance.  

- **Error Handling and Validation:**  
  - Comprehensive error handling and input validation at both client and server levels.  

- **Performance Optimization:**  
  - Optimized queries and pagination for **handling large datasets** efficiently.  

- **Testing:**  
  - Includes **unit and integration tests** to ensure correctness and reliability.

---

## **Tech Stack**  
- **Frontend:** React.js, CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Token)  
- **Testing:** Jest, Supertest  
- **API Requests:** Axios  

---

## **Installation and Setup**  

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies for frontend and backend:**

  ```bash
  cd frontend
  npm install
  cd ../backend
  npm install
  ```

3. **Start the MongoDB server:**

  Make sure MongoDB is installed and running on your machine. Alternatively, you can    use MongoDB Atlas for a cloud-based setup.

4. **Configure environment variables:**

   Create a .env file in the server directory with the following variables:
  ```bash
  MONGODB_URI=mongodb://localhost:27017/expense-tracker
  JWT_SECRET=your_jwt_secret
  PORT=3000
  ```

5. Run the backend server:

  ```bash
  cd server
  npm run dev
  ```

6. Run the frontend application:

  ```bash
  cd client
  npm start
  ```

## MongoDB Configuration
MongoDB is used to handle large datasets efficiently. For cloud-based databases, follow these steps:

Create a MongoDB Atlas account and connect it to your project.
Replace MONGODB_URI in your .env with the provided Atlas connection string.
Use indexes on frequently queried fields (like userId and date) to enhance query performance.


## Authentication and Authorization
User Registration and Login: Secured with bcrypt for password hashing.
JWT Tokens: Used for authentication.
Authorization: Protects routes to ensure only authenticated users can perform specific actions. 
Example:

  ```bash
  const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access Denied');
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
};

  ```

## Error Handling and Validation

  ```bash
  // seperate function for user validation (bonus function)

const { check, validationResult } = require('express-validator');

// Validate user input
exports.validateUser = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('mobile').notEmpty().withMessage('Mobile number is required'),
];

// Validate expense input
exports.validateExpense = [
    check('amount').isNumeric().withMessage('Amount must be a number'),
    check('splitMethod').isIn(['equal', 'exact', 'percentage']).withMessage('Invalid split method'),
];

// Handle validation errors
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


  ```

Test :

  ```bash
  const request = require('supertest');
const app = require('../server'); // Assuming server.js exports the express app
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User Integration Tests', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ name: 'Test User', email: 'test@example.com', password: '123456', mobile: '1234567890' });

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('Test User');
    });

    it('should get all users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

  ```

## Performance Optimization

**Pagination: Limits the number of records fetched at once to improve performance.**
```bash
const getExpenses = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const expenses = await Expense.find()
    .skip((page - 1) * limit)
    .limit(limit);
  res.json(expenses);
};
```

**Indexes: Use MongoDB indexes for faster queries.**

## Unit and Integration Testing
This project includes unit and integration tests using Jest and Supertest to ensure functionality and reliability.

  ```bash
  npm test
  ```


## Code Quality
1. Correctness: Functionality meets all requirements.
2. Code Quality: Clean, readable, and maintainable code with proper comments.
3. Documentation: Comprehensive README for easy setup and use.
4. Innovation: Implements creative solutions such as split methods for expenses and downloadable balance sheets.
