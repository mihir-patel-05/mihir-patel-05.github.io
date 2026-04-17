import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans:   ["Inter", "system-ui", "sans-serif"],
        serif:  ["Fraunces", "Iowan Old Style", "Georgia", "serif"],
        mono:   ["JetBrains Mono", "ui-monospace", "Menlo", "monospace"],
      },
      colors: {
        // Palette (as hsl vars)
        tea:         "hsl(var(--tea))",
        beige:       "hsl(var(--beige))",
        cornsilk:    "hsl(var(--cornsilk))",
        papaya:      "hsl(var(--papaya))",
        bronze:      "hsl(var(--bronze))",
        "bronze-deep": "hsl(var(--bronze-deep))",
        ink:         "hsl(var(--ink))",
        "ink-soft":  "hsl(var(--ink-soft))",
        "ink-faint": "hsl(var(--ink-faint))",
        rule:        "hsl(var(--rule))",

        // shadcn surface roles
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "rise-up": {
          "0%":   { transform: "translateY(110%)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "underline-sweep": {
          "0%":   { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "soft-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsla(85, 45%, 42%, 0.6)" },
          "70%":      { boxShadow: "0 0 0 10px hsla(85, 45%, 42%, 0)" },
        },
      },
      animation: {
        "rise-up":         "rise-up 1s cubic-bezier(.2,.7,.2,1) both",
        "fade-in":         "fade-in .9s ease both",
        "underline-sweep": "underline-sweep 1s ease .9s both",
        "soft-pulse":      "soft-pulse 2.2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
