import dbConnectLogin from '@/utils/dbConnectLogin'
import UserLogin from '@/models/UserLogin'
import getUserEmailMiddleware from '@/middleware/getUserEmail'
import { getSession } from 'next-auth/react'

dbConnectLogin()

// Apply the getUserEmailMiddleware before the payment API handler
export default async function handler(req, res) {
    try {
        // Middleware to retrieve user email from session
        await getUserEmailMiddleware(req, res, async () => {
            // Now req.userEmail should contain the user's email from the session
            const userEmail = req.userEmail

            // Parse query parameters from the request URL
            const { paymentStatus } = req.query

            if (paymentStatus === 'SUCCESS') {
                // Payment successful
                if (userEmail) {
                    // Find user by email and update is_subscribed to true
                    const updatedUser = await UserLogin.findOneAndUpdate(
                        { email: userEmail },
                        { is_subscribed: true },
                        { new: true }
                    )

                    if (updatedUser) {
                        console.log('User subscription updated successfully')
                        res.writeHead(302, { Location: '/Home' })
                        res.end()
                    } else {
                        console.log('User not found or update failed')
                        res.status(404).json({
                            error: 'User not found or update failed',
                        })
                    }
                } else {
                    console.log('User email not found in session')
                    res.status(401).json({
                        error: 'User email not found in session',
                    })
                }
            } else if (paymentStatus === 'FAILED') {
                // Payment failed
                console.log('Payment failed')
                res.status(200).json({ message: 'Payment failed' })
            } else {
                // Invalid payment status
                console.log('Invalid payment status')
                res.status(400).json({ error: 'Invalid payment status' })
            }
        })
    } catch (error) {
        console.error('Error processing payment response:', error)
        res.status(500).json({ error: 'Error processing payment response' })
    }
}
