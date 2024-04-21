import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Footer from '@/Components/Footer'
import Header from '@/Components/Header'
import NavBar2 from '@/Components/NavBar2'
import NavbarDesktop from '@/Components/NavbarDesktop'
import Innernav from './Innernav'


const PageWrapper = ({ children }) => {
    const [isMobile, setIsMobile] = useState(null)
    const [isactive, setIsactive] = useState(false)
    const pathname = usePathname()

    const [dimensions, setDimensions] = useState({
        height: 0,
        width: 0,
    })

    useEffect(() => {
        const resize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            })
        }

        // Initial resize
        resize()

        // Event listener for window resize
        window.addEventListener('resize', resize)

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    useEffect(() => {
        const checkIsMobile = () => {
            const isMobileUserAgent =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                )
            setIsMobile(isMobileUserAgent)
        }

        checkIsMobile()
    }, [])

    if (isMobile === null) {
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
                <SessionProvider>
                    <AnimatePresence mode="wait">
                        <motion.div key={pathname}>
                            <div
                                style={{
                                    opacity: dimensions.width > 0 ? 0 : 1,
                                }}
                                className="w-full h-[calc(100vh+600px)] t-[-300px] left-0 fixed pointer-events-none z-50 bg-black"
                            ></div>
                            {dimensions.width > 0 && <SVG {...dimensions} />}
                            {isMobile ? <Header /> : <div></div>}
                            {isMobile ? (
                                <>
                                    <div className="absolute top-[65px] right-[8px] z-40">
                                        <motion.div
                                            className="bg-[#c9fd74] rounded-[25px] relative z-40"
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
                            ) : (
                                <NavbarDesktop />
                            )}
                            {children}
                            <Footer />
                        </motion.div>
                    </AnimatePresence>
                </SessionProvider>
            </NextUIProvider>
        </>
    )
}

const SVG = ({ width, height }) => {
    const initialPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 300
    `

    const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 300
    `

    const anim = (variants) => {
        return {
            initial: 'initial',
            animate: 'enter',
            exit: 'exit',
            variants,
        }
    }

    const curve = {
        initial: {
            d: initialPath,
        },
        enter: {
            d: targetPath,
            transition: {
                duration: 0.75,
                delay: 0.3,
                ease: [0.76, 0, 0.24, 1],
            },
        },
        exit: {
            d: initialPath,
            transition: {
                duration: 0.75,
                ease: [0.76, 0, 0.24, 1],
            },
        },
    }

    const slide = {
        initial: {
            top: '-300px',
        },
        enter: {
            top: '-100vh',
            transition: {
                duration: 0.75,
                delay: 0.3,
                ease: [0.76, 0, 0.24, 1],
            },
            transitionEnd: {
                top: '100vh',
            },
        },
        exit: {
            top: '-300px',
            transition: {
                duration: 0.75,
                ease: [0.76, 0, 0.24, 1],
            },
        },
    }

    return (
        <motion.svg
            {...anim(slide)}
            className="w-full h-[calc(100vh+600px)] t-[-300px] left-0 fixed pointer-events-none z-50"
        >
            <motion.path {...anim(curve)}></motion.path>
        </motion.svg>
    )
}

export default PageWrapper
