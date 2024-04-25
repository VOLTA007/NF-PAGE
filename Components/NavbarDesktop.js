import React, { useState } from 'react'
import styles from '../styles/NavbarDesktop.module.css'
import Link from 'next/link'
import Toggler from './Toggler'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'


const NavbarDesktop = () => {
    const router = useRouter()
    const session = useSession()
    const [logOut, setlogOut] = useState(false)
    const status = session.status

    const handleClick = () => {
        setlogOut(!logOut)
        setTimeout(() => {
            signOut()
        }, 2000)
    }

    const handleLogo = () => {
        router.push('/Academy/Home')
    }
    
    return (
        <>
            <div className={styles.header1}>
                <p className={styles.paragraph1}>Welcome To Nutri Fit</p>
            </div>
            <nav className={styles.navcontainer}>
                <div className="flex justify-center items-center gap-10">
                    <img
                        className={styles.Logo}
                        src="/Nutrifitlogo.jpg"
                        alt="Logo"
                        onClick={handleLogo}
                    />
                    <div className="flex justify-center items-center gap-10">
                        <Link href="/Academy/Home" scroll={false}>
                            Home
                        </Link>
                        <Link href="/Academy/Pricing" scroll={false}>
                            Pricing
                        </Link>
                        <Link href="/Academy/About" scroll={false}>
                            About us
                        </Link>
                    </div>
                </div>
                <div className="flex justify-start items-center gap-8">
                    {status === 'unauthenticated' && (
                        <>
                            <Link
                                className="bg-[hsl(63,96%,53%)] text-black p-1 rounded-sm"
                                href="/Academy/Login"
                                scroll={false}
                            >
                                Login / Sign up
                            </Link>
                        </>
                    )}
                    {status === 'authenticated' && (
                        <>
                            <div className="w-[68.96px]">
                                <button
                                    type="button"
                                    className={`${
                                        logOut
                                            ? styles.loader
                                            : 'bg-[hsl(63,96%,53%)] text-black rounded-md p-2'
                                    }`}
                                    onClick={handleClick}
                                >
                                    {logOut ? '' : 'Logout'}
                                </button>
                            </div>
                        </>
                    )}
                    <div className="flex mb-16">
                        <Toggler />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavbarDesktop
