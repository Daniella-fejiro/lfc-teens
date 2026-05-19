export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003C8F",
        accent: "#C8102E",
        gold: "#D4A017",
        navy: "#001F4D",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Roboto", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
}