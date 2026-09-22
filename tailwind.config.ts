import type { Config } from "tailwindcss";

// Brand tokens from the Brocare AI brief. Values are fixed; do not add new ones.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: "#05081A",
        mid: "#0A0F2E",
        primary: "#1A3BDB",
        accent: "#2D6FFF",
        gradientblue: "#1565C0",
        ice: "#4FC3F7",
        textsec: "#B0C4DE",
        card: "#0D1440",
        cardborder: "#1E3A6E",
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(45,111,255,.35), 0 12px 48px -10px rgba(45,111,255,.55)",
        "glow-soft": "0 0 0 1px rgba(30,58,110,.9), 0 10px 40px -14px rgba(45,111,255,.45)",
        "glow-ice": "0 0 0 1px rgba(79,195,247,.4), 0 0 44px -6px rgba(79,195,247,.5)",
      },
      keyframes: {
        "drift-a": {
          "0%": { transform: "translate3d(0,0,0) scale(1)" },
          "100%": { transform: "translate3d(9vmax,7vmax,0) scale(1.12)" },
        },
        "drift-b": {
          "0%": { transform: "translate3d(0,0,0) scale(1.05)" },
          "100%": { transform: "translate3d(-8vmax,-6vmax,0) scale(0.92)" },
        },
      },
      animation: {
        "drift-a": "drift-a 34s ease-in-out infinite alternate",
        "drift-b": "drift-b 41s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
