// tailwind.config.js

const { nextui } = require('@nextui-org/react')

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}', // Include pages
        './components/**/*.{js,ts,jsx,tsx}', // Include components (ensure lowercase 'components' directory)
        './app/**/*.{js,ts,jsx,tsx}', // Include app files
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}', // Include NextUI theme files
    ],
    darkMode: 'class', // Use 'class' to enable dark mode via CSS class
    theme: {
        extend: {
            colors: {
                limee: 'hsl(83, 97%, 72%)', // Example custom color
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [
        nextui(), // Enable NextUI plugin
    ],
}
