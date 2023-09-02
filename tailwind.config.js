/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkmetal: "#1c1c1c"
      },
      listStyleImage: {
        dash: "url(./assets/images/dash.svg)"
      },
      backgroundImage: {
        piano: "url('./assets/bgs/person-playing-piano.jpg')",
        sunset: "url('./assets/bgs/sunset.jpg')"
      }
    },
  }
}

