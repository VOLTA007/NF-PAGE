import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/NavBar.module.css'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import Toggler from './Toggler'

export default function NavBar() {
    const [showOverlay, setShowOverlay] = useState(false)
    const [manualClose, setManualClose] = useState(false)
    const [logOut, setlogOut] = useState(false)
    const sideMenuRef = useRef(null)
    const session = useSession()
    const status = session.status

    const isXShape = showOverlay

    const handleClick = () => {
        setlogOut(!logOut)
        setTimeout(() => {
            signOut()
        }, 2000)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                showOverlay &&
                sideMenuRef.current &&
                !sideMenuRef.current.contains(event.target)
            ) {
                if (!manualClose) {
                    setShowOverlay(false)
                }
                setManualClose(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [showOverlay, manualClose])

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay)
        setManualClose(!showOverlay)
    }

    return (
        <>
            <div className={styles.navcontainer}>
                <div className={styles.logomenu}>
                    <img
                        className={styles.Logo}
                        src="./Nutrifitlogo.jpg"
                        alt="Logo"
                    ></img>
                    <nav
                        className={`${styles.hamburger} ${
                            isXShape ? styles.xShape : ''
                        }`}
                        onClick={toggleOverlay}
                    >
                        <span className={styles.line}></span>
                        <span className={styles.line}></span>
                        <span className={styles.line}></span>
                    </nav>
                    <div
                        className={`${styles.sidemenu} ${
                            showOverlay ? styles.active : ''
                        }`}
                        ref={sideMenuRef}
                    >
                        <ul
                            className={`${styles.ull} ${
                                showOverlay ? '' : styles.hidden
                            } flex flex-col items-center justify-center`}
                        >
                            <li
                                className={`${styles.li} ${
                                    showOverlay ? '' : styles.hidden
                                }`}
                            >
                                <Link
                                    href="/Home"
                                    onClick={toggleOverlay}
                                    className="flex items-center"
                                >
                                    Home
                                    <span>
                                        <img
                                            className="w-6"
                                            src="./icons8-home-48.png"
                                            alt="Home Icon"
                                        ></img>
                                    </span>
                                </Link>
                            </li>
                            {status === 'unauthenticated' && (
                                <>
                                    <li
                                        className={`${
                                            styles.li
                                        } bg-[hsl(63,96%,53%)] text-black p-1 rounded-sm ${
                                            showOverlay ? '' : styles.hidden
                                        }`}
                                    >
                                        <Link
                                            href="/Login"
                                            onClick={toggleOverlay}
                                            className="flex items-center"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li className={styles.li}>
                                <Link className="p-2" href="/Pricing">
                                    Pricing
                                </Link>
                            </li>
                            <li className={styles.li}>
                                <Link className="p-2" href="/About">
                                    About us
                                </Link>
                            </li>
                            {status === 'authenticated' && (
                                <>
                                    <li
                                        className={`${
                                            showOverlay ? '' : styles.hidden
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            className={`${
                                                logOut
                                                    ? styles.loader
                                                    : 'bg-red-950 rounded-md p-2'
                                            }`}
                                            onClick={handleClick}
                                        >
                                            {logOut ? '' : 'Logout'}
                                        </button>
                                        <div
                                            style={{ paddingTop: '40px' }}
                                        ></div>
                                    </li>
                                </>
                            )}
                            <li
                                className={`${
                                    showOverlay ? '' : styles.hidden
                                }`}
                            >
                                <div style={{ paddingTop: '10px' }}></div>
                                <Toggler />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div
                className={`${styles.overlay} ${
                    showOverlay ? styles.active : ''
                }`}
            ></div>
        </>
    )
}
