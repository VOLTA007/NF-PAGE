import { useState, useEffect } from 'react'
import styles from '@/styles/Login.module.css'
import axios from 'axios'
import domain from '@/utils/Config'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [notificationVisible, setNotificationVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [isstatus, setIsstatus] = useState(null)
    const router = useRouter()
    const session = useSession()
    const status = session.status

    useEffect(() => {
        setIsstatus(status)
    }, [status])

    async function handleFormSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios.post(`${domain}/UserLogin`, {
                email,
                password,
            })
            const { success } = response.data

            if (success) {
                setMessage('Logged in Successfully')
                setNotificationVisible(true)
                setTimeout(async () => {
                    setNotificationVisible(false)
                    await signIn('credentials', { email, password })
                }, 4250)
            } else {
                setNotificationVisible(true)
                setTimeout(() => {
                    setNotificationVisible(false)
                }, 5000)
                setMessage('Invalid email or password. Please try again.')
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setNotificationVisible(true)
                setTimeout(() => {
                    setNotificationVisible(false)
                }, 5000)
                setMessage('Invalid Email or Password. Please try again.')
            } else {
                setNotificationVisible(true)
                setTimeout(() => {
                    setNotificationVisible(false)
                }, 5000)
                console.error('Error logging in:', error)
                setMessage(
                    'An error occurred while logging in. Please try again later.'
                )
            }
        } finally {
            setTimeout(async () => {
                setIsLoading(false)
            }, 6000)
        }
    }

    if (isstatus === 'loading') {
        return <div></div>
    }

    return (
        <>
            <div style={{ paddingTop: '20px' }}></div>
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
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                Login
                            </a>
                        </li>
                    </ol>
                </nav>
            </div>
            {status === 'authenticated' ? (
                <div className="flex items-center justify-center h-[50vh]">
                    <p className={`dark:text-white`}>Logged in--</p>
                    <br></br>
                    <button>
                        <Link
                            href="/Academy/Profile"
                            className={`dark:text-white underline`}
                            scroll={false}
                        >
                            My Profile💪:D
                        </Link>
                    </button>
                </div>
            ) : (
                <form
                    onSubmit={handleFormSubmit}
                    className="mx-auto max-w-[400px] w-[350px] h-[400px] bg-[#edfb14] rounded-xl grid grid-rows-4 mt-[100px] m-8 p-5 gap-6"
                >
                    <h1 className="place-self-center text-center dark:text-black">
                        Login{' '}
                        <span className="flex items-center justify-center">
                            <img
                                src="/icons8-login-90.png"
                                className="w-8 h-auto"
                            ></img>
                        </span>
                        Welcome To Nutrifit :)
                    </h1>

                    <div className="max-w-sm mx-auto">
                        <label
                            htmlFor="website-admin"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        ></label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg
                                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 16"
                                >
                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                </svg>
                            </span>
                            <input
                                type="email"
                                className={`${
                                    isLoading ? styles.disabled : ''
                                } rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                placeholder="Name@email.com"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                required
                            />
                        </div>
                    </div>

                    <div className="max-w-sm mx-auto">
                        <label
                            htmlFor="website-admin"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        ></label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </span>
                            <input
                                type="password"
                                className={`${
                                    isLoading ? styles.disabled : ''
                                } rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <p className="dark:text-black">
                            Create Account Here!{' '}
                            <Link
                                className="underline"
                                href="/Academy/Signup"
                                scroll={false}
                            >
                                Signup
                            </Link>
                        </p>
                    </div>
                    <button
                        className={`${styles.but} ${
                            isLoading ? styles.loading : ''
                        }`}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className={styles.loader}></div>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
            )}
            {notificationVisible && (
                <div
                    className={`${styles.notification} ${
                        notificationVisible ? styles.show : ''
                    }`}
                >
                    {message}
                    <div className={styles.bar}></div>
                </div>
            )}
        </>
    )
}
