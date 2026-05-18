import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft:      "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        card:      "0 2px 8px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.05)",
        elevated:  "0 8px 32px rgba(0,0,0,0.10)",
        "gold-ring":  "0 0 0 2px rgba(200,150,10,0.30)",
        "green-ring": "0 0 0 2px rgba(45,122,45,0.25)",
      },

      colors: {
        brand: {
          // ── Forest Green (primary) ───────────────────────────────
          // Sampled from logo circle arc, bar chart icons, "Womanhood" serif text
          "green-50":  "#f1f8f1",
          "green-100": "#d6ecd6",
          "green-200": "#aed5ae",
          "green-300": "#7ab87a",
          "green-400": "#4e9a4e",
          "green-500": "#2d7a2d",   // ← hero brand green (sampled)
          "green-600": "#246024",
          "green-700": "#1b481b",
          "green-800": "#123012",
          "green-900": "#091809",

          // ── Gold / Amber (co-primary) ────────────────────────────
          // Sampled from the "W" letterform and "SAFARI" wordmark
          "gold-50":  "#fdf8e7",
          "gold-100": "#faeec4",
          "gold-200": "#f4d97a",
          "gold-300": "#e8be38",
          "gold-400": "#d4a017",   // ← "SAFARI" text tone
          "gold-500": "#c8960a",   // ← hero brand gold (sampled)
          "gold-600": "#a07508",
          "gold-700": "#785706",
          "gold-800": "#503a04",
          "gold-900": "#281d02",

          // ── Black / White neutrals ───────────────────────────────
          black:      "#0d0d0d",
          "gray-900": "#161616",
          "gray-800": "#222222",
          "gray-700": "#383838",
          "gray-600": "#545454",
          "gray-500": "#737373",
          "gray-400": "#9e9e9e",
          "gray-300": "#c4c4c4",
          "gray-200": "#e0e0e0",
          "gray-100": "#f2f2f2",
          "gray-50":  "#fafafa",
          white:      "#ffffff",
        },
      },

      fontFamily: {
        // Tall, heavy editorial display — brand name, hero headings
        display: ["'Bebas Neue'",       "sans-serif"],
        // Condensed grotesque — nav labels, body, UI
        sans:    ["'Barlow Condensed'", "system-ui", "sans-serif"],
        // Precision mono — badges, metadata, captions
        mono:    ["'Roboto Mono'",      "monospace"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem",    letterSpacing: "0.12em"  }],
        xs:    ["0.72rem",  { lineHeight: "1.1rem",  letterSpacing: "0.08em"  }],
        sm:    ["0.85rem",  { lineHeight: "1.3rem",  letterSpacing: "0.04em"  }],
        base:  ["1rem",     { lineHeight: "1.5rem",  letterSpacing: "0.01em"  }],
        lg:    ["1.15rem",  { lineHeight: "1.55rem", letterSpacing: "0.01em"  }],
        xl:    ["1.35rem",  { lineHeight: "1.4rem",  letterSpacing: "0em"     }],
        "2xl": ["1.65rem",  { lineHeight: "1.25rem", letterSpacing: "-0.01em" }],
        "3xl": ["2.1rem",   { lineHeight: "1.1rem",  letterSpacing: "-0.02em" }],
        "4xl": ["2.7rem",   { lineHeight: "1rem",    letterSpacing: "-0.02em" }],
        "5xl": ["3.5rem",   { lineHeight: "0.95rem", letterSpacing: "-0.02em" }],
        "6xl": ["4.5rem",   { lineHeight: "0.92rem", letterSpacing: "-0.03em" }],
        "7xl": ["5.75rem",  { lineHeight: "0.9rem",  letterSpacing: "-0.03em" }],
        "8xl": ["7.5rem",   { lineHeight: "0.88rem", letterSpacing: "-0.04em" }],
        "9xl": ["9.5rem",   { lineHeight: "0.86rem", letterSpacing: "-0.04em" }],
      },

      letterSpacing: {
        tightest: "-0.05em",
        tighter:  "-0.025em",
        tight:    "-0.01em",
        normal:   "0em",
        wide:     "0.06em",
        wider:    "0.12em",
        widest:   "0.22em",
        ultra:    "0.35em",
      },

      lineHeight: {
        tightest: "0.86",
        tighter:  "0.92",
        tight:    "1.05",
        snug:     "1.2",
        normal:   "1.5",
        relaxed:  "1.65",
      },

      borderRadius: {
        none:    "0",
        sm:      "2px",
        DEFAULT: "4px",
        md:      "6px",
        lg:      "10px",
        xl:      "16px",
        full:    "9999px",
      },

      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-down": {
          "0%":   { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
      },
      animation: {
        "fade-up":    "fade-up 0.35s ease-out both",
        "fade-in":    "fade-in 0.25s ease-out both",
        "slide-down": "slide-down 0.22s ease-out both",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("daisyui"),
  ],
};

export default config;