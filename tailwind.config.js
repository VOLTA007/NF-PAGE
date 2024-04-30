// tailwind.config.js

const { nextui } = require('@nextui-org/react')

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}', // Include pages
        './Components/**/*.{js,ts,jsx,tsx}', // Include components (ensure lowercase 'components' directory)
        './app/**/*.{js,ts,jsx,tsx}', // Include app files
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}', // Include NextUI theme files
    ],
    darkMode: 'selector', // Use 'class' to enable dark mode via CSS class
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [
        nextui(), // Enable NextUI plugin
    ],
}
