import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bb: {
          bg: {
            primary: "#060608",
            secondary: "#0A0A0F",
            tertiary: "#111118",
          },
          surface: {
            DEFAULT: "#13131A",
            elevated: "#1A1A24",
            hover: "#222230",
            active: "#2A2A3B",
          },
          border: {
            DEFAULT: "rgba(255, 255, 255, 0.08)",
            subtle: "rgba(255, 255, 255, 0.04)",
            strong: "rgba(255, 255, 255, 0.16)",
            glow: "rgba(254, 229, 0, 0.35)",
          },
          yellow: {
            DEFAULT: "#FEE500",
            bright: "#FFF033",
            glow: "rgba(254, 229, 0, 0.25)",
            dark: "#C7B300",
          },
          amber: {
            DEFAULT: "#F59E0B",
            bright: "#FBBF24",
            dark: "#D97706",
          },
          emerald: {
            DEFAULT: "#10B981",
            bright: "#34D399",
            glow: "rgba(16, 185, 129, 0.25)",
            dark: "#059669",
          },
          crimson: {
            DEFAULT: "#EF4444",
            bright: "#F87171",
            glow: "rgba(239, 68, 68, 0.25)",
            dark: "#DC2626",
          },
          silver: {
            DEFAULT: "#E2E8F0",
            muted: "#94A3B8",
            dark: "#64748B",
          },
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        "neon-yellow": "0 0 25px -4px rgba(254, 229, 0, 0.35)",
        "neon-green": "0 0 25px -4px rgba(16, 185, 129, 0.35)",
        "neon-red": "0 0 25px -4px rgba(239, 68, 68, 0.35)",
        "glass-card": "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "live-ping": "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "odds-up": "oddsUp 1.2s ease-out forwards",
        "odds-down": "oddsDown 1.2s ease-out forwards",
        "marquee": "marquee 35s linear infinite",
      },
      keyframes: {
        oddsUp: {
          "0%": { backgroundColor: "rgba(16, 185, 129, 0.4)", color: "#10B981" },
          "100%": { backgroundColor: "transparent" },
        },
        oddsDown: {
          "0%": { backgroundColor: "rgba(239, 68, 68, 0.4)", color: "#EF4444" },
          "100%": { backgroundColor: "transparent" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      screens: {
        xs: "360px",
        sm: "390px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;
