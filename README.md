# Expense Management Application

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
  - [User Endpoints](#user-endpoints)
  - [Expense Endpoints](#expense-endpoints)
- [Testing](#testing)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

## Project Description
The Expense Management Application is a web-based tool that helps users manage and track their expenses. It allows users to add expenses, split them among participants using different methods, and view their individual and overall expenses. The application also includes user management features with authentication and authorization.

## Features
- User Management:
  - Create and retrieve user accounts.
  - Password hashing for secure storage.
- Expense Management:
  - Add expenses and split them using three methods: Equal, Exact, and Percentage.
  - Calculate individual shares based on the selected splitting method.
- Balance Sheet:
  - View individual and overall expenses.
  - Download balance sheets in PDF and CSV formats.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- bcrypt for password hashing
- HTML, CSS, JavaScript for the frontend
- Bootstrap for UI components
- PDFKit for PDF generation
- json2csv for CSV conversion

## Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/expense-management-app.git
   cd expense-management-app

2. **Install dependencies**

```bash
npm install
```

3. **Create a .env file in the root directory**
```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=3000
```

4. **Run the application**
```bash
npm start
```


## Usage

Access the application by navigating to http://localhost:3000 in your browser.
Register a new user to start adding and managing expenses.

## API Documentation
**User Endpoints**
1. Create User

POST /api/users
Request Body:
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}

2. Get All Users
GET /api/users

3. Get User by ID
GET /api/users/:id

4. Delete User
DELETE /api/users/:id

5. Expense Endpoints

Add Expense
POST /api/expenses
Request Body:
json
{
  "amount": 1000,
  "participants": [
    { "userId": "userId1", "share": 50 },
    { "userId": "userId2", "share": 50 }
  ],
  "splitMethod": "percentage"
}

Get All Expenses
GET /api/expenses

## Testing
To run tests, use the following command:

```bash
npm test
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.
