import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnectLogin from '@/utils/dbConnectLogin'
import UserLogin from '@/models/UserLogin'

// Establish database connection
dbConnectLogin()

// Define authentication options
const authOptions = {
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'test@example.com',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials
                const user = await UserLogin.findOne({ email })

                if (!user || user.password !== password) {
                    return null // Authentication failed
                }

                return user // Authentication succeeded, return user object
            },
        }),
    ],
}

export default authOptions
