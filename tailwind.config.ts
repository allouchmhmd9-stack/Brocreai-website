import type { Config } from "tailwindcss";

// Brand tokens from the Brocare AI brief. Colour values are fixed; do not add new ones.
// The visual world is an insurance placing slip: navy form stock, ruled lines, typed
// entries and rubber stamps. Corners stay square (forms are rectilinear); only stamps are round.
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
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
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
