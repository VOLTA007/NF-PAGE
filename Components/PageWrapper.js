import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import Footer from '@/Components/Footer'
import Header from '@/Components/Header'
import NavBar2 from '@/Components/NavBar2'
import NavbarDesktop from '@/Components/NavbarDesktop'
import Innernav from './Innernav'
import { useMediaQuery } from '@react-hook/media-query'
import { useRecoilState } from 'recoil'
import { isMobileState } from '../utils/recoilState'

const PageWrapper = ({ children, session }) => {
    const [isMobileUserAgent, setIsMobileUserAgent] = useState(false)
    const [isMobileWidth, setIsMobileWidth] = useState(false)
    const [isMobileRecoil, setIsMobileRecoil] = useRecoilState(isMobileState)
    const [isactive, setIsactive] = useState(false)
    const pathname = usePathname()

    // Check mobile status based on user agent
    useEffect(() => {
        const checkIsMobileUserAgent = () => {
            const userAgent = navigator.userAgent
            const isMobile =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    userAgent
                )
            setIsMobileUserAgent(isMobile)
        }

        checkIsMobileUserAgent()
    }, [])

    // Check mobile status based on width with media query
    const isMobileWidthHook = useMediaQuery('(max-width: 1023px)') // Adjust width breakpoint as needed

    useEffect(() => {
        setIsMobileWidth(isMobileWidthHook)
    }, [isMobileWidthHook])

    // Update recoil state based on both checks
    useEffect(() => {
        const isMobile = isMobileUserAgent || isMobileWidth
        setIsMobileRecoil(isMobile)
    }, [isMobileUserAgent, isMobileWidth, setIsMobileRecoil])

    if (isMobileRecoil === null) {
        return <div></div>
    }

    const variants = {
        open: {
            width: '100vw',
            height: '240px',
            top: '-40px',
            right: '-8px',
            transition: {
                duration: 0.75,
                ease: [0.76, 0, 0.24, 1],
            },
        },
        closed: {
            width: 100,
            height: 40,
            top: '0px',
            right: '0px',
            transition: {
                duration: 0.75,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.35,
            },
        },
    }

    return (
        <>
            <NextUIProvider>
                <SessionProvider session={session}>
                    <AnimatePresence mode="wait">
                        <motion.div key={pathname}>
                            {isMobileRecoil && <Header />}
                            {isMobileRecoil && (
                                <>
                                    <div className="absolute top-[65px] right-[8px] z-40">
                                        <motion.div
                                            className="bg-slate-100 dark:bg-gray-900 rounded-[25px] relative z-40"
                                            variants={variants}
                                            animate={
                                                isactive ? 'open' : 'closed'
                                            }
                                            initial="closed"
                                        >
                                            <AnimatePresence>
                                                {isactive && <Innernav />}
                                            </AnimatePresence>
                                        </motion.div>
                                    </div>
                                    <NavBar2
                                        isactive={isactive}
                                        setIsactive={setIsactive}
                                    />
                                </>
                            )}
                            {!isMobileRecoil && <NavbarDesktop />}
                            {children}
                            <Footer />
                        </motion.div>
                    </AnimatePresence>
                </SessionProvider>
            </NextUIProvider>
        </>
    )
}

export default PageWrapper
