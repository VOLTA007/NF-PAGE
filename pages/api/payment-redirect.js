import dbConnectLogin from '@/utils/dbConnectLogin'
import UserLogin from '@/models/UserLogin'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

dbConnectLogin()

export default async function handler(req, res) {
  
  const router = useRouter()

    try {
        // Retrieve the user session
        const session = await getSession({ req })

        // Parse query parameters from the request URL
        const { paymentStatus } = req.query

        if (paymentStatus === 'SUCCESS') {
            // Payment successful
            if (session) {
                // Find user by email and update is_subscribed to true
                const userEmail = session.user.email
                const updatedUser = await UserLogin.findOneAndUpdate(
                    { email: userEmail },
                    { is_subscribed: true },
                    { new: true }

                )

                if (updatedUser) {
                    router.push('/Home')
                    console.log('User subscription updated successfully')
                    res.status(200).json({ message: 'Payment successful' })
                } else {
                    console.log('User not found or update failed')
                    res.status(404).json({
                        error: 'User not found or update failed',
                    })
                }
            } else {
                console.log('Session not found')
                res.status(401).json({ error: 'User session not found' })
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
    } catch (error) {
        console.error('Error processing payment response:', error)
        res.status(500).json({ error: 'Error processing payment response' })
    }
}
