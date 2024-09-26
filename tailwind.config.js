/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'false',
  mode: "jit",
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};