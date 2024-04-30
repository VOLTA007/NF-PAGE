import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faDollarSign,
    faStairs,
    faTurnUp,
    faGear,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { RadioGroup, Radio } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { io } from 'socket.io-client'
import axios from 'axios'
import { Card, CardFooter, Image, Button } from '@nextui-org/react'


export const PricingComp = () => {
    const { data: session, status } = useSession()
    const isAuthenticated = status === 'authenticated'
    const [isclicked, setisclicked] = useState(null)
    const [istrue, setistrue] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedPlan, setSelectedPlan] = useState(null)
    const router = useRouter()

    const [subtrue, setSubtrue] = useState(null)


    useEffect(() => {
        const fetchSubs = async () => {
            try {
                if (status === 'authenticated') {
                    const response = await axios.get(
                        `/api/subs?email=${session?.user?.email}`
                    )
                    const { is_subscribed } = response.data

                    setSubtrue(is_subscribed)
                }
            } catch (error) {
                console.error('Error fetching subs:', error)
            }
        }

        const socket = io('http://localhost:3001')

        // Listen for data updates from the server
        socket.on('dataUpdate', () => {
            fetchSubs() // Call fetchSubs when data updates are received
        })

        // Initial fetch when isAuthenticated or session.user.email changes
        if (isAuthenticated) {
            fetchSubs()
        }

        // Clean up socket connection when component unmounts
        return () => {
            socket.disconnect()
        }
    }, [isAuthenticated, session?.user?.email])

    const handleCountrySelection = (countryCode) => {
        setSelectedCountry(countryCode)
    }

    const handleContinue = () => {
        if (selectedCountry && selectedPlan) {
            const queryParams = {
                planId: selectedPlan,
                selectedCountry,
            }

            router.push(
                {
                    pathname: `/Academy/Pricing/${selectedPlan}-${selectedCountry}`,
                    query: queryParams,
                },
                undefined,
                { shallow: true }
            )
        }
    }

    const handleShowModal = (planId) => {
        setSelectedPlan(planId)
        setistrue(true)
        setisclicked('ok')
    }

    const handllog = () => {
        router.push('/Academy/Profile')
    }

    return (
        <>
            <div style={{ paddingTop: '40px' }}></div>
            {subtrue ? (
                <>
                    <div className="flex justify-center items-center">
                        <Card
                            isFooterBlurred
                            radius="lg"
                            className="border-none"
                        >
                            <Image
                                alt="Woman listing to music"
                                className="object-cover"
                                height={200}
                                src="/diamond.gif"
                                width={200}
                            />
                            <CardFooter className=" justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                <p className="text-tiny text-black ">
                                    Your are Subscribed
                                </p>
                                <Button
                                    className="text-tiny bg-black/20 text-black"
                                    variant="flat"
                                    color="default"
                                    radius="lg"
                                    size="sm"
                                    onClick={handllog}
                                >
                                    My Profile
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </>
            ) : (
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
                                        <FontAwesomeIcon
                                            icon={faDollarSign}
                                            className="px-1"
                                        />
                                        Pricing
                                    </a>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div style={{ paddingTop: '100px' }}></div>

                    <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 justify-center place-items-center mx-auto max-w-7xl px-10">
                        <div className="bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-grey-950 relative max-w-md overflow-hidden rounded-xl border border-grey-900 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat px-8 py-10 shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
                            <span className="mb-4 inline-flex items-center justify-center rounded-md bg-blue-600 p-2 shadow-lg">
                                <FontAwesomeIcon
                                    icon={faStairs}
                                    style={{
                                        '--fa-primary-color': '#37abb3',
                                        '--fa-secondary-color': '#251f51',
                                    }}
                                />
                            </span>
                            <h3 className="mb-2 font-medium tracking-tight dark:text-white text-black">
                                Beginner 1 Month
                            </h3>
                            <p className="text-sm text-slate-400 text-balance">
                                🌟 Beginner (1 Month Plan): Explore foundational
                                nutrition and fitness concepts to kickstart your
                                journey towards better health and fitness. Build
                                a solid understanding of healthy eating and
                                exercise habits to lay the groundwork for
                                success. Join us and discover the benefits of a
                                balanced lifestyle!
                            </p>
                            <button
                                type="button"
                                className=" mt-8 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={() => handleShowModal('Beginner')}
                            >
                                Subscribe Now
                            </button>
                        </div>

                        <div className="bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-grey-950 relative max-w-md overflow-hidden rounded-xl border border-grey-900 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat px-8 py-16 shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
                            <span className="mb-4 inline-flex items-center justify-center rounded-md bg-yellow-600 p-2 shadow-lg">
                                <FontAwesomeIcon
                                    icon={faGear}
                                    flip="both"
                                    size="lg"
                                    style={{ color: '#74C0FC' }}
                                />
                            </span>
                            <h3 className="mb-2 font-medium tracking-tight dark:text-white text-black">
                                Advanced 3 Month
                            </h3>
                            <p className="text-sm text-slate-400 text-balance">
                                🌟 Advanced (3 Month Plan): Take your fitness to
                                the next level with our Advanced program. Master
                                advanced nutrition strategies and challenging
                                workouts to sculpt your body and enhance your
                                performance. Enjoy the benefits of pushing your
                                limits and achieving peak fitness!
                            </p>
                            <button
                                type="button"
                                className=" mt-8 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={() => handleShowModal('Advanced')}
                            >
                                Subscribe Now
                            </button>
                        </div>

                        <div className="bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-grey-950 relative max-w-md overflow-hidden rounded-xl border border-grey-900 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat px-8 py-16 shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
                            <span className="mb-4 px-2 inline-flex items-center justify-center rounded-md bg-red-600 p-2 shadow-lg">
                                💎
                            </span>
                            <h3 className="mb-2 font-medium tracking-tight dark:text-white text-black">
                                Premium 6 Month
                            </h3>
                            <p className="text-sm text-slate-400 text-balance">
                                🌟 Premium (6 Month Plan): Experience the
                                ultimate fitness transformation with our Premium
                                program. Gain access to exclusive benefits
                                including personalized training, advanced
                                nutrition guidance, and expert support. Commit
                                to your fitness journey and reap the rewards of
                                optimal health and wellness!
                            </p>
                            <button
                                type="button"
                                className="mt-8 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={() => handleShowModal('Premium')}
                            >
                                Subscribe Now
                            </button>
                        </div>
                    </div>

                    {istrue ? (
                        isclicked === 'ok' ? (
                            <motion.div
                                className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-30"
                                initial={{ y: '200vh' }}
                                animate={{ y: '0%' }}
                                exit={{ y: '-200vh' }}
                                transition={{
                                    duration: 0.5,
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 20,
                                }}
                            >
                                <div className="lg:w-[1200px] w-[330px] bg-slate-900 lg:h-[600px] h-[400px] flex flex-col justify-center items-center p-4 rounded-[30px] relative">
                                    {/* Close button */}
                                    <button
                                        className="absolute top-4 right-4 text-white cursor-pointer"
                                        onClick={() => setisclicked('wrong')}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>

                                    {/* Render different content based on authentication status */}
                                    {status === 'authenticated' ? (
                                        // User is authenticated, render content for country selection
                                        <div className="flex flex-col items-center">
                                            <RadioGroup
                                                label="Select Your Country"
                                                value={selectedCountry}
                                                onChange={(e) =>
                                                    handleCountrySelection(
                                                        e.target.value
                                                    )
                                                }
                                                className="mb-2"
                                            >
                                                {/* Options for authenticated user */}
                                                <div className="pb-3"></div>
                                                <label
                                                    style={{ color: 'white' }}
                                                >
                                                    <Radio value="EGP" />
                                                    Egypt [EGP]
                                                </label>
                                                <div className="pb-3"></div>
                                                <label
                                                    style={{ color: 'white' }}
                                                >
                                                    <Radio value="USD" />
                                                    Other Country [USD]
                                                </label>
                                            </RadioGroup>

                                            <button
                                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                                onClick={handleContinue}
                                                disabled={!selectedCountry} // Disable button if no country is selected
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    ) : (
                                        // User is not authenticated, show login prompt
                                        <p className="text-white underline">
                                            <Link href="/Academy/Login">
                                                Please Login First
                                            </Link>
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ) : isclicked === 'wrong' ? (
                            <motion.div
                                className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-30"
                                initial={{ y: '200vh' }}
                                animate={{ y: '100%' }}
                                exit={{ y: '-200vh' }}
                                transition={{
                                    duration: 0.5,
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 20,
                                }}
                            >
                                <div className="lg:w-[1200px] w-[330px] bg-slate-900 lg:h-[600px] h-[400px] flex flex-col justify-center items-center p-4 rounded-[30px] relative">
                                    {/* Close button */}
                                    <button
                                        className="absolute top-4 right-4 text-white cursor-pointer"
                                        onClick={() => setisclicked('wrong')}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>

                                    {/* Content */}
                                    <h1 className="text-white text-center">
                                        Choose Your Country
                                    </h1>
                                </div>
                            </motion.div>
                        ) : (
                            <div></div>
                        )
                    ) : null}
                </>
            )}
        </>
    )
}
