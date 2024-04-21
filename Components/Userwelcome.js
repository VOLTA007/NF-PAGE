import React, { useEffect, useState } from 'react'
import Subscription from '@/Components/Subscription'
import { useSession } from 'next-auth/react'
import axios from 'axios'

const UserWelcome = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [username, setUsername] = useState('')
    const { data: session, status } = useSession()

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
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                        Home
                                    </a>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div style={{ paddingTop: '20px' }}></div>
                    <div className="bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-grey-950 overflow-hidden rounded-xl border border-grey-900 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat text-nowrap lg:mx-[300px] mx-3 px-[10px] py-3 shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
                        <div className="grid grid-cols-2 py-8 gap-x-1 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 justify-center place-items-center mx-auto max-w-8xl">
                            <div className="gap-4 flex justify-center items-center sm:justify-start ">
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
                                <p className="dark:text-white text-lg">
                                    Welcome😊 <br></br> {username}{' '}
                                </p>
                            </div>

                            <div>
                                <Subscription />
                            </div>
                        </div>
                    </div>
                </>
        </>
    )
}

export default UserWelcome
