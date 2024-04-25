import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const NavBar2 = ({ isactive, setIsactive }) => {

    const sideMenuRef = useRef(null)



    useEffect(() => {
        function handleClickOutside(event) {
            if (
                isactive &&
                sideMenuRef.current &&
                !sideMenuRef.current.contains(event.target)
            ) {
                setIsactive(false) // Close the menu when clicking outside
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isactive, setIsactive])

    return (
        <div
            onClick={() => setIsactive(!isactive)}
            className="absolute top-[65px] right-2 uppercase h-[40px] w-[100px] bg-limee rounded-[25px] cursor-pointer overflow-hidden z-40"
        >
            <motion.div
                ref={sideMenuRef}
                className="relative h-full w-full"
                animate={{ top: isactive ? '-100%' : '0' }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
                <div className="absolute top-full bg-black w-full h-full flex items-center justify-center text-white">
                    <p>Close</p>
                </div>

                <div className="h-full w-full flex items-center justify-center dark:text-black">
                    <p>Menu</p>
                </div>
            </motion.div>
        </div>
    )
}

export default NavBar2
