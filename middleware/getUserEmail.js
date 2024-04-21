import { getSession } from 'next-auth/react'

// Middleware function to retrieve user email from session
const getUserEmailMiddleware = async (req, res, next) => {
    try {
        const session = await getSession({ req })

        if (session) {
            // Attach user email to the request object
            req.userEmail = session.user.email
        }

        next() // Proceed to the next middleware or API route handler
    } catch (error) {
        console.error('Error retrieving session:', error)
        res.status(500).json({ error: 'Error retrieving session' })
    }
}

export default getUserEmailMiddleware
