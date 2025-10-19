/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      screens:{
        xs:"350px",
        "xs-sm":"400px",
        sm:"500px",
        "sm-md":"620px",
      }
    },
  },
  plugins: [],
}

