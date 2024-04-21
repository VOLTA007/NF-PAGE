import { useState, useEffect } from 'react'
import styles from '@/styles/Login.module.css'
import axios from 'axios'
import domain from '@/utils/Config'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import PageWrapper from '@/Components/PageWrapper'


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
                                href="/Home"
                                className={`dark:text-white underline`}
                            >
                                Home Page 🏠💪:D
                            </Link>
                        </button>
                    </div>
                ) : (
                    <form
                        onSubmit={handleFormSubmit}
                        className="mx-auto max-w-[400px] w-[350px] h-[400px] bg-[#edfb14] rounded-xl grid grid-rows-4 mt-[100px] m-8 p-5 gap-6"
                    >
                        <h1 className="place-self-center text-center">
                            Login{' '}
                            <span className="flex items-center justify-center">
                                <img
                                    src="./icons8-login-90.png"
                                    className="w-8 h-auto"
                                ></img>
                            </span>
                            Welcome To Nutrifit :)
                        </h1>
                        <div className={styles.inputcontainer}>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                value={email}
                                className={`${styles.input} rounded-md p-2  ${
                                    isLoading ? styles.disabled : ''
                                }`}
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                required
                            />
                            <img
                                src="./email.png"
                                className={`${styles.icon}`}
                                style={{ maxHeight: '20px', maxWidth: '20px' }}
                                alt="Email icon"
                            />
                        </div>
                        <div className={styles.inputcontainer}>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                value={password}
                                className={`${styles.input} rounded-md p-2 ${
                                    isLoading ? styles.disabled : ''
                                }`}
                                disabled={isLoading}
                            />
                            <img
                                src="./padlock.png"
                                className={`${styles.icon} `}
                                style={{ maxHeight: '20px', maxWidth: '20px' }}
                                alt="Password icon"
                            />
                        </div>
                        <div>
                            <p>
                                Create Account Here!{' '}
                                <Link className="underline" href="/Signup">
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
