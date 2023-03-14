/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        plus100: "#fffcf2",
        plus200: "#ccc5b9",
        plus300: "#403d39",
        plus400: "#252422",
        plusOrange: "#eb5e28",
      },
      textColor:{
        plus100: "#fffcf2",
        plus200: "#ccc5b9",
        plus300: "#403d39",
        plus400: "#252422",
        plusOrange: "#eb5e28",
      },
    },
  },
  variants:{
    extend:{
      display:['group-focus'],
      opacity:['group-focus'],
      inset:['group-focus'],
    }
  },
  plugins: [],
}