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
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        },
    },
}

export default NextAuth(authOptions)
