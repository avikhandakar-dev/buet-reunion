module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ["Geomanist", "sans-serif"],
      cursive: ["Limelight", "cursive"],
    },
    extend: {
      typography(theme) {
        return {
          dark: {
            css: {
              color: theme("colors.gray.300"),
              '[class~="lead"]': { color: theme("colors.gray.400") },
              a: { color: theme("colors.yellow.400") },
              strong: { color: theme("colors.gray.100") },
              "ul > li::before": { backgroundColor: theme("colors.gray.700") },
              hr: { borderColor: theme("colors.gray.800") },
              blockquote: {
                color: theme("colors.gray.100"),
                borderLeftColor: theme("colors.gray.800"),
              },
              h1: { color: theme("colors.gray.100") },
              h2: { color: theme("colors.gray.100") },
              h3: { color: theme("colors.gray.100") },
              h4: { color: theme("colors.gray.100") },
              code: { color: theme("colors.gray.100") },
              "a code": { color: theme("colors.gray.100") },
              pre: {
                color: theme("colors.gray.200"),
                backgroundColor: theme("colors.gray.800"),
              },
              thead: {
                color: theme("colors.gray.100"),
                borderBottomColor: theme("colors.gray.700"),
              },
              "tbody tr": { borderBottomColor: theme("colors.gray.800") },
            },
          },
        };
      },
      screens: {
        standalone: { raw: "(display-mode:standalone)" },
      },
      colors: {
        primary: "#129AFE",
        primaryDark: "#4C4ACE",
        sky: "#16BBFF",
        darkBlue: "#40f",
        darkSky: "#05f",
        violet: "#70f",
        darkBrown: "#25282C",
        adminBgLight: "#F8F6F2",
        adminTextDark: "#C7D4FA",
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
        "gradient-6-start": "#F7D440",
        "gradient-6-stop": "#ED1F1F",
        "gradient-7-start": "#11cdef",
        "gradient-7-stop": "#1171ef",
      },
      backgroundImage: (theme) => ({
        "gradient-1": "url('/img/bg/bg-1.png')",
        "gradient-2": "url('/img/bg/bg-2.png')",
      }),
      boxShadow: {
        menu: "0 4px 21px 0 rgb(49 49 49 / 10%)",
        projectBar: "0 1px 8px 0 rgb(49 49 49 / 10%)",
        input: "0 2px 4px 0 rgb(0 0 0 / 6%)",
        blogCard: "0 0 0 1px rgb(0 0 0 / 10%)",
      },
      minWidth: {
        500: "500px",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      transform: ["group-hover"],
      translate: ["group-hover"],
      typography: ["dark"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
