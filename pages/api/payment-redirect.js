import dbConnectLogin from '@/utils/dbConnectLogin'
import UserLogin from '@/models/UserLogin'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

// Pricing information based on subscription types and currency
const pricing = {
    Beginner: {
        EGP: 400,
        USD: 50,
    },
    Advanced: {
        EGP: 600,
        USD: 100,
    },
    Premium: {
        EGP: 999,
        USD: 150,
    },
}

dbConnectLogin()

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)

    try {
        const { paymentStatus } = req.query
        const email = session?.user?.email

        if (paymentStatus === 'SUCCESS') {
            const { amount, currency } = req.query

            // Determine subscription type based on amount and currency
            let subscriptionType = null
            if (currency === 'EGP') {
                if (amount == 400) subscriptionType = 'Beginner'
                else if (amount == 600) subscriptionType = 'Advanced'
                else if (amount == 999) subscriptionType = 'Premium'
            } else if (currency === 'USD') {
                if (amount == 100) subscriptionType = 'Beginner'
                else if (amount == 200) subscriptionType = 'Advanced'
                else if (amount == 300) subscriptionType = 'Premium'
            }

            if (subscriptionType) {
                const subscriptionPeriodInMonths = {
                    Beginner: 1,
                    Advanced: 3,
                    Premium: 6,
                }[subscriptionType]

                // Calculate the expiration date based on current date + subscription period
                const currentDate = new Date()
                const expirationDate = new Date(
                    currentDate.setMonth(
                        currentDate.getMonth() + subscriptionPeriodInMonths
                    )
                )

                const updatedUser = await UserLogin.findOneAndUpdate(
                    { email: email },
                    {
                        is_subscribed: true,
                        subscription_type: subscriptionType,
                        subscription_expiration_date: expirationDate,
                    },
                    { new: true }
                )

                if (updatedUser) {
                    console.log('User subscription updated successfully')
                    return res.status(200).send(`
                        <script>
                            window.close();
                        </script>
                    `)
                } else {
                    console.log('User not found or update failed')
                    return res
                        .status(404)
                        .json({ error: 'User not found or update failed' })
                }
            } else {
                console.log('Invalid subscription type or amount')
                return res
                    .status(400)
                    .json({ error: 'Invalid subscription type or amount' })
            }
        } else if (
            paymentStatus === 'FAILED' ||
            paymentStatus === 'CANCELLED'
        ) {
            // Payment failed or cancelled
            console.log('Payment failed or cancelled')
            return res.status(200).send(`
                <script>
                    window.close();
                </script>
            `)
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
