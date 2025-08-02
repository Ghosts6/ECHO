/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#222831',
        'secondary': '#393E46',
        'accent': '#00ADB5',
        'neutral': '#EEEEEE',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        overlayShow: {
          '0%': { 'background-color': 'rgba(0, 0, 0, 0)' },
          '100%': { 'background-color': 'rgba(0, 0, 0, 0.5)' },
        },
        typing: {
          "from": { width: "0" },
          "to": { width: "100%" }
        },
        blinkCaret: {
          "from, to": { "border-color": "transparent" },
          "50%": { "border-color": "orange" }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-out': 'fadeOut 0.5s ease-in',
        'overlay-show': 'overlayShow 0.3s ease-in-out forwards',
        'typing': 'typing 3.5s steps(40, end), blinkCaret .75s step-end infinite',
      }
    },
  },
  plugins: [],
}