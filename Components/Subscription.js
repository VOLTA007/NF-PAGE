import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Toggler from './Toggler'
import { useRecoilValue } from 'recoil'
import { isMobileState } from '../utils/recoilState'
import { useRouter } from 'next/router'

const Subscription = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const isAuthenticated = status === 'authenticated'
    const [isSubscribed, setIsSubscribed] = useState(null)
    const [isSubstype, setSubstype] = useState(null)
    const [isSubexp, setSubexp] = useState(null)
    const [isusername, setusername] = useState(null)
    const isMobile = useRecoilValue(isMobileState)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/Academy/Login')
        }
    }, [status, router])

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
                        username,
                    } = response.data
                    setIsSubscribed(is_subscribed)
                    setSubstype(subscription_type)
                    setSubexp(subscription_expiration_date)
                    setusername(username)
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

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
    }

    const handlelog = () => {
        router.push('/Academy/Login')
    }

    return (
        <>
            <div style={{ paddingTop: '20px' }}></div>
            {isMobile && <Toggler />}

            {isAuthenticated && (
                <>
                    {isSubscribed ? (
                        <>
                            <div style={{ paddingTop: '20px' }}></div>
                            <div className="flex justify-center items-center">
                                <nav
                                    className="flex px-5 py-3 justify-center items-center text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                                    aria-label="Breadcrumb"
                                    style={{ width: '80px' }}
                                >
                                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                        <li
                                            key="home"
                                            className="inline-flex items-center"
                                        >
                                            <a
                                                href="#"
                                                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                                            >
                                                <svg
                                                    className="w-3 h-3 me-2.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                Profile
                                            </a>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div style={{ paddingTop: '20px' }}></div>
                            <div className="lg:flex justify-center items-center pl-4 pr-4">
                                <div className="bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-grey-950 overflow-hidden rounded-xl border border-grey-900 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat text-nowrap lg:mx-[300px] mx-3 px-[10px] py-3 shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
                                    <div className="grid py-1 justify-start place-items-center mx-auto max-w-8xl">
                                        <div className="relative flex items-center">
                                            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                                <svg
                                                    className="absolute w-10 h-10 text-gray-400 -right-0 top-2"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <p className="ml-3">{isusername}</p>
                                        </div>
                                    </div>
                                    <p>
                                        Status:{' '}
                                        <span className="text-green-400">
                                            Subscribed
                                        </span>
                                    </p>
                                    <p style={{ marginTop: '8px' }}>
                                        Sub Type: {isSubstype}
                                    </p>
                                    <p style={{ marginTop: '8px' }}>
                                        Sub Expiration Date:{' '}
                                        {isSubexp ? formatDate(isSubexp) : ''}
                                    </p>
                                </div>
                            </div>
                            <div
                                className="h-screen"
                                style={{ height: 'calc(100vh - 560px)' }}
                            ></div>
                        </>
                    ) : (
                        <>
                            <div style={{ paddingTop: '20px' }}></div>
                            <div className="flex justify-center items-center">
                                <nav
                                    className="flex px-5 py-3 justify-center items-center text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                                    aria-label="Breadcrumb"
                                    style={{ width: '80px' }}
                                >
                                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                        <li
                                            key="home"
                                            className="inline-flex items-center"
                                        >
                                            <a
                                                href="#"
                                                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                                            >
                                                <svg
                                                    className="w-3 h-3 me-2.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                Profile
                                            </a>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div style={{ paddingTop: '20px' }}></div>
                            <div className="lg:flex justify-center items-center pl-4 pr-4">
                                <div className="bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-grey-950 overflow-hidden rounded-xl border border-grey-900 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat text-nowrap lg:mx-[300px] mx-3 px-[10px] py-3 shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
                                    <div className="grid py-1 justify-start place-items-center mx-auto max-w-8xl">
                                        <div className="relative flex items-center">
                                            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                                <svg
                                                    className="absolute w-10 h-10 text-gray-400 -right-0 top-2"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <p className="ml-3">{isusername}</p>
                                        </div>
                                    </div>
                                    <p>
                                        Status:{' '}
                                        <span className="text-red-400">
                                            Unsubscribed
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div
                                className="h-screen"
                                style={{ height: 'calc(100vh - 560px)' }}
                            ></div>
                        </>
                    )}
                </>
            )}

            {status === 'unauthenticated' && (
                <>
                    <div
                        className="h-screen"
                        style={{ height: 'calc(100vh - 560px)' }}
                    ></div>
                </>
            )}
        </>
    )
}

export default Subscription
