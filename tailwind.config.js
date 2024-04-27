/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './Components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                limee: 'hsl(83, 97%, 72%)',
            },
        },
    },
    plugins: [nextui()],
}
