/** @type {import('tailwindcss').Config} */
const twColors = require("tailwindcss/colors");
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    colors: {
      ...twColors,

      primary: {
          50: "#eef6ff",
          100: "#d7e6ff",
          200: "#afccff",
          300: "#88b3ff",
          400: "#6099ff",
          500: "#3880ff",
          600: "#2d66cc",
          700: "#224d99",
          800: "#163366",
          900: "#0b1a33"
      },

      secondary: {
        '50': '#fff9ed',
        '100': '#fff1d5',
        '200': '#fedeaa',
        '300': '#fdc674',
        '400': '#fcad52',
        '500': '#fa8615',
        '600': '#eb6b0b',
        '700': '#c3510b',
        '800': '#9a4012',
        '900': '#7c3612',
        '950': '#431907',
      },


      danger: {
        '50': '#fef2f2',
        '100': '#fee2e2',
        '200': '#fecaca',
        '300': '#fca5a5',
        '400': '#f87171',
        '500': '#ef4444',
        '600': '#dc2626',
        '700': '#b91c1c',
        '800': '#991b1b',
        '900': '#7f1d1d',
        '950': '#450a0a',
      },

      appGreen: {
        100: "#dceade",
        200: "#b9d4bd",
        300: "#97bf9c",
        400: "#74a97b",
        500: "#51945a",
        600: "#417648",
        700: "#315936",
        800: "#203b24",
        900: "#101e12",
      },

      menuLinkColor: "#82888c",
      headingGray: "#666666",
    },
    extend: {},
    fontFamily: {
      lexend: ["'lexend', sans-serif"],
    },
  },
  plugins: [],
};
