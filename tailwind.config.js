/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#16ABF8",
      secondary: "#E5E5E5",
      "text-secondary": "#888888",
      "text-secondary-2": "#4A4A4A",
      white: "#fff",
      "gray-light": "#F4F4F4",
      blue: "#428BC1",
      purple: "#8942C1",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#00A790",
      yellow: "#F8A541",
      red: "#ED4C5C",
      "gray-dark": "#273444",
      gray: "#8492a6",
      danger: "#ED4C5C",
    },
    boxShadow: {
      card: "0px 6px 10px rgba(0, 0, 0, 0.1)",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
