// dbcon2.js
const mongoose = require('mongoose');

async function dbcon2() {
    try {
        await mongoose.connect('mongodb+srv://volta0007:X5913lock1@cluster0.l8jlgt1.mongodb.net/UserLogin')
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = dbcon2;
