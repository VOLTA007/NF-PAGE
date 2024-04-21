import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const Subscription = () => {
    const { data: session, status } = useSession()
    const isAuthenticated = status === 'authenticated'
    const [isSubscribed, setIsSubscribed] = useState(null)

    useEffect(() => {
        const fetchSubs = async () => {
            try {
                if (isAuthenticated && session?.user?.email) {
                    const response = await axios.get(
                        `/api/subs?email=${session.user.email}`
                    )
                    const { is_subscribed } = response.data
                    setIsSubscribed(is_subscribed)
                }
            } catch (error) {
                console.error('Error fetching subs:', error)
            }
        }

        // Connect to the WebSocket server
        const socket = io('http://localhost:3001')

        // Listen for data updates from the server
        socket.on('dataUpdate', () => {
            fetchSubs() // Call fetchSubs when data updates are received
        })

        // Fetch initial subscription status on component mount or when isAuthenticated changes
        if (isAuthenticated) {
            fetchSubs()
        }

        // Clean up the WebSocket connection
        return () => {
            socket.disconnect()
        }
    }, [isAuthenticated, session?.user?.email]) // Re-run the effect when isAuthenticated or session.user.email changes

    if (isSubscribed === null) {
        return <div></div>
    }

    return (
        <>
            {isAuthenticated && (
                <>
                    {isSubscribed ? (
                        <div className="relative left-6">
                            <div className="bg-green-400 rounded-sm p-2">
                                Subscribed
                            </div>
                        </div>
                    ) : (
                        <div className="relative left-6">
                            <div className="bg-red-400 rounded-sm p-2">
                                Unsubscribed
                            </div>
                        </div>
                    )}
                </>
            )}

            {!isAuthenticated && (
                <div>{/* Content for unauthenticated users */}</div>
            )}
        </>
    )
}

export default Subscription
