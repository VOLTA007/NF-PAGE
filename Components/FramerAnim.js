'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useEffect, useState } from 'react'

export const FramerAnim = () => {
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

    return (
        <>
            <div
                style={{
                    opacity: dimensions.width > 0 ? 0 : 1,
                }}
                className="w-full h-[calc(100vh+600px)] t-[-300px] left-0 fixed pointer-events-none z-50 bg-black"
            ></div>
            {dimensions.width > 0 && <SVG {...dimensions} />}
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
