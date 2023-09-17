/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "midnight-blue": "#2d3e50",
        "vivid-red": "#ff0001",
        "sea-green": "#2ac58b",
        "grey-base-100": "#f1f2f4",
        "grey-base-200": "#e5e9f4",
        "grey-base-300": "#a8a8a8",
        "bright-yellow": "#fedb41",
        "royal-blue": "#0055ff",
        "jet-black": "#1f1f1f",
      },
    },
  },
  plugins: [],
};
