import React from 'react'
import Links from './datanav'
import { motion } from 'framer-motion'
import Link from 'next/link'

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

    return (
        <div className="h-full pt-[100px] pr-[40px] pb-[50px] pl-[40px] box-border">
            <div className="">
                {Links.map(
                    (link,i ) => (
                        <div key={i}>
                            <motion.div
                                custom={i}
                                variants={pers}
                                animate="enter"
                                exit="exit"
                                initial="initial"
                            >
                                <Link href={link.href}>{link.title}</Link>
                            </motion.div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Innernav
