const defaultTheme = require("tailwindcss/defaultTheme");

// THIS OBJECT SHOULD BE SIMILAR TO ./helpers/theme.js
const themeConstants = {
  paper: "#FFFFFF",
  primary: "#8F2168",
  primaryHover: "#6c194f",
  black: "#1C1C1F",
  grey: "#727272",
};

module.exports = {
  mode: "jit",
  purge: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
    "./hoc/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        paper: themeConstants.paper,
        primary: themeConstants.primary,
        primaryHover: themeConstants.primaryHover,
        black: themeConstants.black,
        grey: themeConstants.grey,
        ...defaultTheme.colors,
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Cairo: ["Cairo", "sans-serif"],
      },
    },

    // We over ride the whole screens with breakpoints for width. The 'ha' breakpoint will help us in blocking hover animations on devices not supporting hover.
    screens: {
      ...defaultTheme.screens,
      ...defaultTheme.breakpoints,
      ha: { raw: "(hover: hover)" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
