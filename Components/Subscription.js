import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const Subscription = () => {
    const { data: session, status } = useSession()
    const isAuthenticated = status === 'authenticated'
    const [isSubscribed, setIsSubscribed] = useState(null)
    const [isSubstype, setSubstype] = useState(null)
    const [isSubexp, setSubexp] = useState(null)

    useEffect(() => {
        const fetchSubs = async () => {
            try {
                if (isAuthenticated && session?.user?.email) {
                    const response = await axios.get(
                        `/api/subs?email=${session.user.email}`
                    )
                    const {
                        is_subscribed,
                        subscription_type,
                        subscription_expiration_date,
                    } = response.data
                    setIsSubscribed(is_subscribed)
                    setSubstype(subscription_type)
                    setSubexp(subscription_expiration_date)
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


    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
    }

    return (
        <>
            {isAuthenticated && (
                <>
                    {isSubscribed ? (
                        <>
                            <div className="relative left-6">
                                <div className="bg-green-400 rounded-sm p-2">
                                    <p>Status: Subscribed</p>
                                    <p style={{ marginTop: '8px' }}>
                                        Sub Type: {isSubstype}
                                    </p>
                                    <p style={{ marginTop: '8px' }}>
                                        Sub Expiration Date:{' '}
                                        {isSubexp ? formatDate(isSubexp) : ''}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="relative left-6">
                            <div className="bg-red-400 rounded-sm p-2">
                                Unsubscribed
                            </div>
                        </div>
                    )}
                </>
            )}

            {!isAuthenticated && <div></div>}
        </>
    )
}

export default Subscription
