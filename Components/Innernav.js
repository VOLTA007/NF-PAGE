import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'


const Innernav = () => {
    const pers = {
        initial: {
            opacity: 0,
            rotateX: 90,
            translateY: 80,
            translateX: -20,
        },
        enter: (i) => ({
            opacity: 1,
            transition: { delay: 0.5 + i * 0.1 },
            rotateX: 0,
            translateY: 0,
            translateX: 0,
            ease: [0.215, 0.61, 0.355, 1],
        }),
        exit: (i) => ({
            opacity: 0,
            transition: { delay: 0.1 + i * 0.1 },
            translateY: 80,
            translateX: -20,
        }),
    }


    const tog = {
        initial: {
            opacity: 0,
            transition: { delay: 1.5},
            rotateX: 90,
            translateY: 80,
            translateX: -20,
        },
        enter: ({
            opacity: 1,
            transition: { delay: 1 },
            rotateX: 0,
            translateY: 0,
            translateX: 0,
            ease: [0.215, 0.61, 0.355, 1],
        }),
        exit: ({
            opacity: 0,
        }),
    }

    const { data: session } = useSession() // Using next-auth's useSession hook

    const Links = [
        { title: 'Home', href: '/Academy/Home' },
        { title: 'About', href: '/Academy/About' },
        { title: 'Pricing', href: '/Academy/Pricing' },
        {
            title: session?.user ? 'Logout' : 'Login', // Check if user is authenticated
            href: session?.user ? '#' : '/Academy/Login', // Use '#' for Logout when authenticated
            onClick: () => {
                if (session?.user) {
                    // If user is authenticated, perform sign out
                    signOut()
                }
            },
        },
    ]

    return (
        <div className="h-full pt-[60px] pr-[40px] pb-[50px] pl-[40px] box-border text-2xl">
            <div className="flex gap-1 flex-col">
                {Links.map((link, i) => (
                    <div key={i}>
                        <motion.div
                            custom={i}
                            variants={pers}
                            animate="enter"
                            exit="exit"
                            initial="initial"
                        >
                            {link.onClick ? (
                                <Link
                                    className="dark:text-black"
                                    href={link.href}
                                    onClick={link.onClick}
                                    scroll={false}
                                >
                                    {link.title}
                                </Link>
                            ) : (
                                <Link
                                    className="dark:text-black"
                                    href={link.href}
                                    scroll={false}
                                >
                                    {link.title}
                                </Link>
                            )}
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Innernav
