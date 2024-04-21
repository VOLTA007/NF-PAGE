import { createRouter } from 'next-connect'
import cors from 'cors'
import dbConnectLogin from '@/utils/dbConnectLogin'
import UserLogin from '@/models/UserLogin'

dbConnectLogin()

const corsOptions = {
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204,
}

const router = createRouter()

// Apply CORS middleware to the router
router.use(cors(corsOptions))

// Define your POST route handler
router.post(async (req, res) => {
    try {
        const { email, password } = req.body

        // Find the user by email
        const user = await UserLogin.findOne({ email })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            })
        }

        // Compare the provided password with the password stored in the database
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            })
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
})

export default router.handler({
    onError: (err, req, res) => {
        console.error(err.stack)
        res.status(err.statusCode || 500).end(err.message)
    },
})
