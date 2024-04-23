import dbConnectLogin from '@/utils/dbConnectLogin'
import UserLogin from '@/models/UserLogin'
import { getSession } from 'next-auth/react'

dbConnectLogin()

export default async function handler(req, res) {
    const session = await getSession({ req })

    try {
        const email = session?.user?.email
        const { paymentStatus } = req.query

        if (paymentStatus === 'SUCCESS') {
            // Payment successful, update user subscription
            const filter = { email: email }

            const updatedUser = await UserLogin.findOneAndUpdate(
                filter,
                { is_subscribed: true },
                { new: true }
            )

            if (updatedUser) {
                console.log('User subscription updated successfully')

                // Close the current tab using JavaScript
                return res.status(200).send(`
                    <script>
                        // Attempt to close the current tab
                        window.close();
                    </script>
                `)
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
