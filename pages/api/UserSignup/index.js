import { createRouter } from 'next-connect'
import dbConnectLogin from '@/utils/dbConnectLogin'
import UserLogin from '@/models/UserLogin'

dbConnectLogin()

const router = createRouter().post(async (req, res) => {
    try {
        const { username, email, password } = req.body

        // Check if the email already exists in the database
        const existingUser = await UserLogin.findOne({ email })

        if (existingUser) {
            // If the user already exists, return an error
            return res
                .status(401)
                .json({ success: false, message: 'User already exists' })
        }

        // Check if password meets the minimum length requirement (e.g., 8 characters)
        if (password.length < 8) {
            // If password length is less than 8 characters, return an error
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Password must be at least 8 characters long',
                })
        }

        // Create a new user object with the email and hashed password
        const newUser = new UserLogin({
            username,
            email,
            password,
        })

        // Save the new user to the database
        await newUser.save()

        // Send a success response
        res.status(200).json({
            success: true,
            message: 'User registered successfully',
        })
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response
        console.error('Error registering user:', error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
})

export default router.handler({
    onError: (err, req, res) => {
        console.error(err.stack)
        res.status(err.statusCode || 500).end(err.message)
    },
})
