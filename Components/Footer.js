import Link from 'next/link'

export default function Footer() {

    return (
        <>
            <footer className="bg-white rounded-lg shadow-lg m-8 text-center dark:bg-gray-800 bottom-0  xl:mx-56">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2024{' '}
                        <Link
                            href="/Academy/Home"
                            className="hover:underline text-center"
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
                            >
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/Academy/Login"
                                className="hover:underline me-4 md:me-6"
                            >
                                Login/Signup
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/Academy/Pricing"
                                className="hover:underline me-4 md:me-6"
                            >
                                Pricing
                            </Link>
                        </li>
                    </ul>
                </div>
            </footer>
            <div className="pb-4"></div>
        </>
    )
}
