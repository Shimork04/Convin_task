const mongoose = require('mongoose')
const dotenv = require('dotenv')


dotenv.config();


// function for connecting mongodb database
const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Database sucessfully connected (MongoDB)'); 
    }
    catch (error){
        console.log('Error connecting to database:', error.message);
        process.exit(1);
    }
};

module.exports = { connectDB };