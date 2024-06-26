import Link from 'next/link'
import Toggler from './Toggler'
import { useSession } from 'next-auth/react'

export default function Footer() {
        const session = useSession()
        const status = session.status

    return (
        <>
            <footer className="bg-white rounded-lg shadow-lg m-8 text-center dark:bg-gray-800 bottom-0  xl:mx-56">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2024{' '}
                        <Link
                            href="/Academy/Home"
                            className="hover:underline text-center"
                            scroll={false}
                        >
                            NutriFit™
                        </Link>
                        . All Rights Reserved.&nbsp;
                    </span>
                    <ul className="flex flex-wrap justify-center items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <Link
                                href="/Academy/About"
                                className="hover:underline me-4 md:me-6"
                                scroll={false}
                            >
                                About us
                            </Link>
                        </li>
                        {status === 'authenticated' ? (
                            <li>
                                <Link
                                    href="/Academy/Profile"
                                    className="hover:underline me-4 md:me-6"
                                    scroll={false}
                                >
                                    My Profile
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    href="/Academy/Login"
                                    className="hover:underline me-4 md:me-6"
                                    scroll={false}
                                >
                                    Login/Signup
                                </Link>
                            </li>
                        )}

                        <li>
                            <Link
                                href="/Academy/Pricing"
                                className="hover:underline me-4 md:me-6"
                                scroll={false}
                            >
                                Subscribe
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="hidden">
                    <Toggler />
                </div>
            </footer>
            <div className="pb-4"></div>
        </>
    )
}
