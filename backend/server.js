const express = require('express');
const userRoutes = require('../backend/routes/user.routes');
const balanceSheetRoutes = require('../backend/routes/balanceSheet.routes');
const expenseRoutes = require('../backend/routes/expense.routes');

const bodyParser = require('body-parser');


const dotenv = require('dotenv');
dotenv.config();
const app = express();

// calling daatabase connect function
const connectDB = require('./config/db');
connectDB();

// express app
app.use(bodyParser.json());

//api calls
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/balanceSheet', balanceSheetRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




