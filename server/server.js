const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const  UserLogin = require('../models/UserLogin') // Assuming UserLogin model is exported correctly

const app = express()
const server = http.createServer(app)

app.use(cors())

// Connect to MongoDB (replace with your connection string)
mongoose
    .connect(
        'mongodb+srv://volta0007:X5913lock1@cluster0.l8jlgt1.mongodb.net/UserLogin')
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err)
    })

// Function to update subscriptions that have expired
async function updateExpiredSubscriptions() {
    console.log('Running subscription update task...')
    try {
        const currentDate = new Date()
        const result = await UserLogin.updateMany(
            {
                subscription_expiration_date: { $lte: currentDate },
                is_subscribed: true,
            },
            {
                $set: {
                    is_subscribed: false,
                    subscription_expiration_date: null,
                },
            }
        )
        console.log(`${result.nModified} subscriptions updated.`)
    } catch (error) {
        console.error('Error updating subscriptions:', error)
    }
}

// Schedule the function to run every 1 second (for testing)
const intervalInMilliseconds = 5000 // 1 second
setInterval(() => {
    console.log('Interval task running...')
    updateExpiredSubscriptions()
}, intervalInMilliseconds)

// Start the server
const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
