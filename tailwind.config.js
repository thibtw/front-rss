/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        roboto: ["Roboto", "system-ui", "sans-serif"],
        jakarta: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
