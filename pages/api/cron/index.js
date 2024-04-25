import dbConnectLogin from '@/utils/dbConnectLogin'
import UserLogin from '@/models/UserLogin'

// Connect to the database
dbConnectLogin()

// Define the API handler function
export default async function handler(req, res) {
    try {
        const currentDate = new Date()
        const result = await UserLogin.updateMany(
            {
                subscription_expiration_date: {
                    $lte: currentDate,
                },
                is_subscribed: true,
            },
            {
                $set: {
                    is_subscribed: false,
                    subscription_type: null,
                    subscription_expiration_date: null,
                },
            }
        )

        console.log(
            `Subscription status updated for ${result.nModified} user(s).`
        )

        res.status(200).json({
            message: `Subscription status updated for ${result.nModified} user(s).`,
        })
    } catch (error) {
        console.error('Error updating subscription status:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
