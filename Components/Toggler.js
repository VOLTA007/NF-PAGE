import React, { useEffect } from 'react'
import { FaMoon } from 'react-icons/fa'
import { BsSunFill } from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import { isDarkS } from '../utils/recoilstate3'

import { Switch } from '@nextui-org/react'

const Toggler = () => {
    const [darkMode, setDarkMode] = useRecoilState(isDarkS)

    useEffect(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('theme')
        // Check system preference for dark mode
        const prefersDarkMode = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches

        // Determine initial dark mode state
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
            setDarkMode(true) // Enable dark mode
        } else {
            setDarkMode(false) // Disable dark mode
        }
    }, [setDarkMode])

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode
        setDarkMode(newDarkMode) // Toggle dark mode state

        // Update localStorage with the new theme preference
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
    }

    useEffect(() => {
        // Add or remove 'dark' class from <html> based on darkMode state
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    return (
        <div className="flex justify-end mt-4 mr-4">
            <div className="relative w-16 h-8 flex items-center cursor-pointer rounded-full p-1">
                <Switch
                    defaultSelected
                    size="lg"
                    color="success"
                    startContent={<FaMoon />}
                    endContent={<BsSunFill />}
                    onClick={toggleDarkMode}
                ></Switch>
            </div>
        </div>
    )
}

export default Toggler
