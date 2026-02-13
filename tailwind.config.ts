import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
          DEFAULT: "#2D7A7A",
        },
        "teal-dark": "#1a5c5c",
        mint: "#e6f7f5",
        "mint-light": "#f0faf9",
        "slate-dark": "#1e293b",
        "slate-body": "#475569",
        gold: "#d4a853",
        "gold-light": "#f5e6c8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      spacing: {
        section: "5rem",
        "section-sm": "3rem",
      },
      borderRadius: {
        card: "0.75rem",
        btn: "0.5rem",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "card-hover":
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        btn: "0 4px 14px 0 rgb(45 122 122 / 0.25)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
