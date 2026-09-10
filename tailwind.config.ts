import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16241d",
        jungle: {
          50: "#f0f7f2",
          100: "#dcece0",
          200: "#bad9c3",
          300: "#8dbf9e",
          400: "#5b9d74",
          500: "#3a7f57",
          600: "#2b6444",
          700: "#245038",
          800: "#1f402e",
          900: "#183024",
        },
        sand: {
          50: "#fbf8f2",
          100: "#f5efe2",
          200: "#e9dfc9",
          300: "#dccbaa",
        },
        sunset: {
          400: "#efab5e",
          500: "#e07a2f",
          600: "#c2611e",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      maxWidth: {
        prose: "68ch",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
