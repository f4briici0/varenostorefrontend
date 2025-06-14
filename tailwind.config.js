/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gantari: ["Gantari", "sans-serif"],
        geist: ["Geist", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        customGreen: "#31A48D",
        customRed: "#C51111",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
