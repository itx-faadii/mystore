import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        brand: {
          50: "#fdf8f8",
          100: "#fbe8e7",
          200: "#f7d5d4",
          300: "#eeb4b3",
          400: "#e08b8a",
          500: "#cf6766",
          600: "#b84a49",
          700: "#983a3a",
          800: "#7f3333",
          900: "#6b2f2f",
          950: "#3b1414",
        },
        gold: {
          50: "#faf7ee",
          100: "#f3ebd6",
          200: "#e8d6ad",
          300: "#dfb87c",
          400: "#d39c50",
          500: "#c58133",
          600: "#a96627",
          700: "#864c22",
        },
        lavender: {
          50: "#fbf9fe",
          100: "#f4effc",
          200: "#ebdff8",
          300: "#dcc6f2",
          400: "#c4a3e8",
          500: "#a97edd",
          700: "#7c58b4",
        },
        cream: "#faf8f5",
        obsidian: "#120f13",
      },
      fontFamily: {
        serif: ["Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["Outfit", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(207, 103, 102, 0.08)",
        "glass-lg": "0 16px 48px 0 rgba(207, 103, 102, 0.14)",
        "glass-glow": "0 0 25px rgba(223, 184, 124, 0.35)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "floating": "0 20px 40px -15px rgba(0,0,0,0.07), 0 0 20px rgba(207,103,102,0.12)",
      },
      backdropBlur: {
        xs: "2px",
        glass: "20px",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      scale: {
        "108": "1.08",
      },
    },
  },
  plugins: [],
};

export default config;
