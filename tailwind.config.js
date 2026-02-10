/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: '#FDFBF7',
                coffee: '#4A3B32',
                'coffee-light': '#6B5B52',
                'orange-accent': '#C86B28',
                'orange-hover': '#A85B18',
                'grey-body': '#555555',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Lato"', 'sans-serif'],
            },
            boxShadow: {
                'neumorph': '10px 10px 20px #e6e4df, -10px -10px 20px #ffffff',
                'neumorph-sm': '5px 5px 10px #e6e4df, -5px -5px 10px #ffffff',
                'inner-neumorph': 'inset 5px 5px 10px #e6e4df, inset -5px -5px 10px #ffffff',
            }
        },
    },
    plugins: [],
}
