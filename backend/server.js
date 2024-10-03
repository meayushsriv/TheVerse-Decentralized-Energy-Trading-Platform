const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express();
const connectDB = require('./config/db');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/usage', require('./routes/usageRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




