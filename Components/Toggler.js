import React, { useEffect, useState } from 'react'
import { FaMoon } from 'react-icons/fa'
import { BsSunFill } from 'react-icons/bs'

const Toggler = () => {
    const [darkMode, setdarkMode] = useState()

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        if (theme === 'dark') {
            setdarkMode(true)
        }
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])

    return (
        <div className="flex justify-end">
            <div
                className="relative w-16 h-8 flex items-center 
            bg-gray-400 dark:bg-slate-600 cursor-pointer 
            rounded-full p-1 mr-1.5"
                onClick={() => setdarkMode(!darkMode)}
            >
                <FaMoon className="text-black" size={18} />

                <div
                    className={`absolute bg-white dark:bg-slate-550 w-6 h-6 rounded-full shadow-md transition-transform duration-300 ${
                        darkMode ? 'translate-x-0' : 'translate-x-8'
                    }`}
                ></div>

                <BsSunFill className="ml-auto bg-yellow-500 size-5 rounded-full" />
            </div>
        </div>
    )
}

export default Toggler
