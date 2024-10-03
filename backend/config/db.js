const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async () => {
    try{

       const conn = await mongoose.connect(process.env.MONGO_URI);
       console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
    }

    module.exports = connectDB;
