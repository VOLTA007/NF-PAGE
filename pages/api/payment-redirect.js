import dbConnectLogin from '@/utils/dbConnectLogin'
import UserLogin from '@/models/UserLogin'

dbConnectLogin()

export default async function handler(req, res) {
    try {
        const { email } = req.body 

        const { paymentStatus } = req.query

        if (paymentStatus === 'SUCCESS') {
            // Payment successful
            const updatedUser = await UserLogin.findOneAndUpdate(
                { email },
                { is_subscribed: true },
                { new: true }
            )

            if (updatedUser) {
                console.log('User subscription updated successfully')
                res.writeHead(302, { Location: '/Home' })
                return res.end()
            } else {
                console.log('User not found or update failed')
                return res
                    .status(404)
                    .json({ error: 'User not found or update failed' })
            }
        } else if (paymentStatus === 'FAILED') {
            // Payment failed
            console.log('Payment failed')
            return res.status(200).json({ message: 'Payment failed' })
        } else {
            // Invalid payment status
            console.log('Invalid payment status')
            return res.status(400).json({ error: 'Invalid payment status' })
        }
    } catch (error) {
        console.error('Error processing payment response:', error)
        return res
            .status(500)
            .json({ error: 'Error processing payment response' })
    }
}
