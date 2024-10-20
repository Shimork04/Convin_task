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
