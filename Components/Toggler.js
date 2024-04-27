import React, { useEffect, useState } from 'react'
import { FaMoon } from 'react-icons/fa'
import { BsSunFill } from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import { isDarkS } from '../utils/recoilstate3'

const Toggler = () => {
    const [darkMode, setDarkMode] = useRecoilState(isDarkS)

    useEffect(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('theme')
        // Check system preference for dark mode
        const prefersDarkMode = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches

        // Set dark mode state based on savedTheme and prefersDarkMode
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
            setDarkMode(true) // Enable dark mode
        } else {
            setDarkMode(false) // Disable dark mode
        }
    }, [setDarkMode])

    useEffect(() => {
        // Add or remove 'dark' class from <html> based on darkMode state
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode)
    }

    return (
        <div className="flex justify-end mt-4 mr-4">
            <div
                className="relative w-16 h-8 flex items-center bg-gray-400 dark:bg-slate-600 cursor-pointer rounded-full p-1"
                onClick={toggleDarkMode}
            >
                <FaMoon className="text-white" size={18} />

                <div
                    className={`absolute bg-white dark:bg-slate-550 w-6 h-6 rounded-full shadow-md transition-transform duration-300 ${
                        darkMode ? 'translate-x-8' : 'translate-x-0'
                    }`}
                ></div>

                <BsSunFill
                    className="ml-auto bg-yellow-500 text-white rounded-full p-1"
                    size={18}
                />
            </div>
        </div>
    )
}

export default Toggler
