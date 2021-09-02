module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        primary: "#02d767",
        secondary: "#f74b6d",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
