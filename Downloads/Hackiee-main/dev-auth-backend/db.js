const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // You should use environment variables in a real application
        // Example: process.env.MONGO_URI
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/veriskill');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
