import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/router'

const UserWelcome = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [username, setUsername] = useState('')
    const { data: session, status } = useSession()

    const handleClick = () => {
        // Redirect to the desired URL
        router.push('/Academy/Profile')
    }

    useEffect(() => {
        const fetchUsername = async () => {
            if (status === 'authenticated') {
                try {
                    const response = await axios.get(
                        `/api/username?email=${session.user.email}`
                    )
                    const { username: fetchedUsername } = response.data
                    setUsername(fetchedUsername)
                } catch (error) {
                    console.error('Error fetching username:', error)
                } finally {
                    setIsLoading(false)
                }
            } else {
                // If session is unauthenticated, set the username to empty string
                setUsername('')
                setIsLoading(false) // Ensure to set loading to false in both cases
            }
        }

        fetchUsername()
    }, [session, status])

    return (
        <>
            <div style={{ paddingTop: '60px' }}></div>

            <>
                <div className="flex justify-center items-center">
                    <nav
                        className="flex px-5 py-3 justify-center items-center text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                        aria-label="Breadcrumb"
                        style={{ width: '80px' }}
                    >
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li key="home" className="inline-flex items-center">
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
                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                    </svg>
                                    Home
                                </a>
                            </li>
                        </ol>
                    </nav>
                </div>
            </>
        </>
    )
}

export default UserWelcome
