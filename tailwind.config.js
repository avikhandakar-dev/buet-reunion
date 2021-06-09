module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ["Geomanist", "sans-serif"],
      cursive: ["Limelight", "cursive"],
    },
    extend: {
      screens: {
        standalone: { raw: "(display-mode:standalone)" },
      },
      colors: {
        primary: "#129AFE",
        primaryDark: "#4C4ACE",
        blue: "#129AFE",
        sky: "#16BBFF",
        darkBlue: "#40f",
        darkSky: "#05f",
        violet: "#70f",
        darkBrown: "#25282C",
        "gradient-1-start": "#f3cbab",
        "gradient-1-stop": "#feedca",
        "gradient-2-start": "#b1e5f9",
        "gradient-2-stop": "#f4d2fe",
        "gradient-3-start": "#dbb4f3",
        "gradient-3-stop": "#efb7d7",
        "gradient-4-start": "#efa971",
        "gradient-4-stop": "#e4cafe",
        "gradient-5-start": "#f4d2fe",
        "gradient-5-stop": "#b1e5f9",
      },
      backgroundImage: (theme) => ({
        "gradient-1": "url('/img/bg/bg-1.png')",
        "gradient-2": "url('/img/bg/bg-2.png')",
      }),
      boxShadow: {
        menu: "0 4px 21px 0 rgb(49 49 49 / 10%)",
        input: "0 2px 4px 0 rgb(0 0 0 / 6%)",
        blogCard: "0 0 0 1px rgb(0 0 0 / 10%)",
      },
      minWidth: {
        500: "500px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
