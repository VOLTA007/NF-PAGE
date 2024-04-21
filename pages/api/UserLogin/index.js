import dbConnectLogin from '@/utils/dbConnectLogin'
import UserLogin from '@/models/UserLogin'
import NextCors from 'nextjs-cors'

dbConnectLogin()

export default async function handler(req, res) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
    })

    try {
        const { email, password } = req.body

        // Find the user by email
        const user = await UserLogin.findOne({ email })

        if (!user) {
            // If user does not exist, return an error
            return res
                .status(401)
                .json({ success: false, message: 'Invalid email or password' })
        }

        // Compare the provided password with the password stored in the database
        if (user.password !== password) {
            // If passwords do not match, return an error
            return res
                .status(401)
                .json({ success: false, message: 'Invalid email or password' })
        }

        // Authentication successful
        res.status(200).json({ success: true, message: 'Login successful' })
    } catch (error) {
        console.error('Error authenticating user:', error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}