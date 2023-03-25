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
        plus250: "#ddbea9",
        plus300: "#403d39",
        plus400: "#252422",
        plusGreen100 : "#b7b7a4",
        plusGreen150 : "#a5a58d",
        plusGreen200 : "#6b705c",
        plusOrange: "#eb5e28",
      },
      textColor:{
        plus100: "#fffcf2",
        plus200: "#ccc5b9",
        plus250: "#ddbea9",
        plus300: "#403d39",
        plus400: "#252422",
        plusGreen100 : "#b7b7a4",
        plusGreen150 : "#a5a58d",
        plusGreen200 : "#6b705c",
        plusOrange: "#eb5e28",
      },
      borderColor:{
        plus100: "#fffcf2",
        plus200: "#ccc5b9",
        plus250: "#ddbea9",
        plus300: "#403d39",
        plus400: "#252422",
        plusGreen100 : "#b7b7a4",
        plusGreen150 : "#a5a58d",
        plusGreen200 : "#6b705c",
        plusOrange: "#eb5e28",
      }
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