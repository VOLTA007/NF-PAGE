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
                        <Link
                            className='relative before:rounded-[12px] rounded-[15px] text-black transition-[padding] duration-[0.3s] ease-[ease-in-out] pl-10 pr-8 pt-4 pb-2 border-[3px] border-solid border-[#776e62] before:content-[""] before:absolute before:z-[-1] before:h-full before:w-full before:bg-white before:transition-all before:duration-[0.3s] before:ease-[ease-in-out] before:border-r-[3px] before:border-r-white before:border-b-[3px] before:border-b-white before:border-solid before:left-2 before:top-2 hover:px-9 hover:py-3 hover:before:left-0 hover:before:top-0 
                        -webkit-transition: padding 0.3s  before:-webkit-transition: all 0.3s'
                            href="/Academy/Home"
                            scroll={false}
                        >
                            Home
                        </Link>
                        <Link
                            className='relative before:rounded-[12px] rounded-[15px] text-black transition-[padding] duration-[0.3s] ease-[ease-in-out] pl-10 pr-8 pt-4 pb-2 border-[3px] border-solid border-[#776e62] before:content-[""] before:absolute before:z-[-1] before:h-full before:w-full before:bg-white before:transition-all before:duration-[0.3s] before:ease-[ease-in-out] before:border-r-[3px] before:border-r-white before:border-b-[3px] before:border-b-white before:border-solid before:left-2 before:top-2 hover:px-9 hover:py-3 hover:before:left-0 hover:before:top-0 
                        -webkit-transition: padding 0.3s  before:-webkit-transition: all 0.3s'
                            href="/Academy/Pricing"
                            scroll={false}
                        >
                            Subscribe
                        </Link>
                        <Link
                            className='relative before:rounded-[12px] rounded-[15px] text-black transition-[padding] duration-[0.3s] ease-[ease-in-out] pl-10 pr-8 pt-4 pb-2 border-[3px] border-solid border-[#776e62] before:content-[""] before:absolute before:z-[-1] before:h-full before:w-full before:bg-white before:transition-all before:duration-[0.3s] before:ease-[ease-in-out] before:border-r-[3px] before:border-r-white before:border-b-[3px] before:border-b-white before:border-solid before:left-2 before:top-2 hover:px-9 hover:py-3 hover:before:left-0 hover:before:top-0 
                        -webkit-transition: padding 0.3s  before:-webkit-transition: all 0.3s'
                            href="/Academy/About"
                            scroll={false}
                        >
                            About us
                        </Link>
                    </div>
                </div>
                <div className="flex justify-start items-center gap-8">
                    {status === 'unauthenticated' && (
                        <>
                            <Link
                                className={styles.btnhover}
                                href="/Academy/Login"
                                scroll={false}
                            >
                                Login / Sign up
                            </Link>
                        </>
                    )}
                    <Link
                        className='relative before:rounded-[12px] rounded-[15px] text-black transition-[padding] duration-[0.3s] ease-[ease-in-out] pl-10 pr-8 pt-4 pb-2 border-[3px] border-solid border-[#776e62] before:content-[""] before:absolute before:z-[-1] before:h-full before:w-full before:bg-white before:transition-all before:duration-[0.3s] before:ease-[ease-in-out] before:border-r-[3px] before:border-r-white before:border-b-[3px] before:border-b-white before:border-solid before:left-2 before:top-2 hover:px-9 hover:py-3 hover:before:left-0 hover:before:top-0 
                        -webkit-transition: padding 0.3s  before:-webkit-transition: all 0.3s'
                        href="/Academy/Profile"
                    >
                        My Profile
                    </Link>
                    {status === 'authenticated' && (
                        <>
                            <div className="w-[68.96px]">
                                <button
                                    type="button"
                                    className={`${
                                        logOut
                                            ? styles.loader
                                            : 'bg-[hsl(9,61%,61%)] text-black rounded-md p-2'
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
