import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnectLogin from '@/utils/dbConnectLogin'
import UserLogin from '@/models/UserLogin'

dbConnectLogin()

export const authOptions = {
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'test@example.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials
                const user = await UserLogin.findOne({ email })

                if (!user || user.password !== password) {
                    return null
                }
                if (user || user.password === password) {
                    return user
                } else {
                    return null
                }
            },
        }),
    ],
}

export default NextAuth(authOptions)
