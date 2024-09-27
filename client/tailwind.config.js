/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    // adding extra properties to container
    container: {
      padding: "5rem",
      // padding: "10rem",
    },
  },
  plugins: [],
};
