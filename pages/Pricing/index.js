import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faDollarSign,
    faStairs,
    faTurnUp,
    faGear,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

const Pricing = () => {
    const [isclicked, setisclicked] = useState(null)
    const [istrue, setistrue] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedPlan, setSelectedPlan] = useState(null)
    const router = useRouter()

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
                    pathname: `/Pricing/${selectedPlan}-${selectedCountry}`,
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

    return (
        <>
                <div style={{ paddingTop: '40px' }}></div>

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

                <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 justify-center place-items-center mx-auto max-w-7xl px-10">
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
                            journey towards better health and fitness. Build a
                            solid understanding of healthy eating and exercise
                            habits to lay the groundwork for success. Join us
                            and discover the benefits of a balanced lifestyle!
                        </p>
                        <button
                            type="button"
                            className=" mt-8 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => handleShowModal('beginner')}
                        >
                            Subscribe Now
                        </button>
                    </div>

                    <div className="bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-grey-950 relative max-w-md overflow-hidden rounded-xl border border-grey-900 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat px-8 py-16 shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
                        <span className="mb-4 inline-flex items-center justify-center rounded-md bg-green-600 p-2 shadow-lg px-3">
                            <FontAwesomeIcon
                                icon={faTurnUp}
                                style={{ color: '#FFD43B' }}
                            />
                        </span>
                        <h3 className="mb-2 font-medium tracking-tight dark:text-white text-black">
                            Basic 2 Month
                        </h3>
                        <p className="text-sm text-slate-400 text-balance">
                            🌟 Basic (2 Month Plan): Dive deeper into nutrition
                            and exercise with our Basic program. Enhance your
                            knowledge and skills to accelerate your progress
                            towards your fitness goals. Experience the benefits
                            of consistent workouts and smart eating choices!
                        </p>
                        <button
                            type="button"
                            className=" mt-8 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => handleShowModal('basic')}
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
                            🌟 Advanced (3 Month Plan): Take your fitness to the
                            next level with our Advanced program. Master
                            advanced nutrition strategies and challenging
                            workouts to sculpt your body and enhance your
                            performance. Enjoy the benefits of pushing your
                            limits and achieving peak fitness!
                        </p>
                        <button
                            type="button"
                            className=" mt-8 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => handleShowModal('advanced')}
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
                            🌟 Premium (6 Month Plan): Experience the ultimate
                            fitness transformation with our Premium program.
                            Gain access to exclusive benefits including
                            personalized training, advanced nutrition guidance,
                            and expert support. Commit to your fitness journey
                            and reap the rewards of optimal health and wellness!
                        </p>
                        <button
                            type="button"
                            className="mt-8 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => handleShowModal('premium')}
                        >
                            Subscribe Now
                        </button>
                    </div>
                </div>
        </>
    )
}
export default Pricing

