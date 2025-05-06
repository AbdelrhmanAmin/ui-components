import { background } from 'storybook/internal/theming'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/stories/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: ['class', '[data-mode="dark"]'],
    theme: {
        extend: {
            colors: {
                primary: '#18181b',
                secondary: '#f8fafc',
                background: 'black',
                muted: '#a1a1aa',
                border: '#484848',
            },
        },
    },
    plugins: [],
}
