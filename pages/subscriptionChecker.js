const cron = require('node-cron')
const UserLogin = require('../models/UserLogin')
const dbcon2 = require('../utils/dbcon2')

dbcon2()

// Define a cron job to run every second
cron.schedule('* * * * * *', async () => {
    try {
        const currentDate = new Date()
        const result = await UserLogin.updateMany(
            {
                subscription_expiration_date: {
                    $lte: currentDate, // Find documents where subscription_expiration_date is less than or equal to today
                },
                is_subscribed: true, // Only update documents that are currently subscribed
            },
            {
                $set: {
                    is_subscribed: false,
                    subscription_expiration_date: null,
                },
            }
        )

        console.log(
            `Subscription status updated for ${result.nModified} user(s).`
        )
    } catch (error) {
        console.error('Error updating subscription status:', error)
    }
})
