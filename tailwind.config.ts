import type { Config } from "tailwindcss";

// Brand tokens from the Brocare AI brief. Colour values are fixed; do not add new ones.
// The visual world: soft navy panels with rounded corners, typed entries and rubber stamps,
// an interactive robot in the hero, and liquid-metal buttons.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
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
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "12px",
        md: "14px",
        lg: "18px",
        xl: "22px",
        "2xl": "28px",
        "3xl": "36px",
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
      maxWidth: {
        sheet: "84rem",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        press: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
