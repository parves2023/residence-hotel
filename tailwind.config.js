/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        border: "rgba(var(--border))",
        card: "rgba(var(--card))",
        "copy-primary": "rgba(var(--copy-primary))",
        "copy-secondary": "rgba(var(--copy-secondary))",
        cta: "rgba(var(--cta))",
        "cta-active": "rgba(var(--cta-active))",
        "cta-text": "rgba(var(--cta-text))",
        backgroundnav: "rgba(var(--backgroundnav))",
        cardback: "rgba(var(--cardback))",
        footerbackground: "rgba(var(--footerbackground))",
      },
    },
  },
  darkMode: "class", // Enable class-based dark mode
  plugins: [
    require('daisyui'),
  ],
}