import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          500: "#0f1c35",
        },
        gold: {
          300: "#d4a86a",
          400: "#c9924a",
          500: "#b8813b",
        },
        cream: {
          50:  "#fdfaf5",
          200: "#f5ede0",
          300: "#eddcca",
        },
        charcoal: "#1a1a1a",
        ivory: "#fdfaf5",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        serif:  ["Cormorant Garamond", "Georgia", "serif"],
        sans:   ["Jost", "system-ui", "sans-serif"],
        script: ["Great Vibes", "cursive"],
      },
      animation: {
        "fade-up":    "fadeUp 0.8s ease-out forwards",
        "fade-in":    "fadeIn 1s ease-out forwards",
        "float":      "float 6s ease-in-out infinite",
        "shimmer":    "shimmer 2s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gold-shimmer": "linear-gradient(90deg, #c9a96e 25%, #f4dcaa 50%, #c9a96e 75%)",
      },
      screens: {
        xs: "390px",
      },
    },
  },
  plugins: [],
};
export default config;
