/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#7145D6",
        primaryDarker: "#4B1ABB",
        secondary: "#EBEBEB",
        third: "#D9D9D9",
        thirdDarker: "#CFCAD9",
      }
    },
  },
  plugins: [],
}

