module.exports = {
  future: {},
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Obsidian & Violet palette
        'obs-base':    '#0a0a0f',
        'obs-surface': '#13101e',
        'obs-raised':  '#1a1530',
        'obs-border':  '#2d2550',
        'violet-bright': '#a855f7',
        'violet-mid':    '#7c3aed',
        'violet-dim':    '#4c1d95',
        'violet-glow':   '#e0d9ff',
        'obs-text':      '#f0ecff',
        'obs-muted':     '#9b91c1',
        // Legacy dark vars kept for any stray references
        'dark-bg':           '#0a0a0f',
        'dark-surface':      '#13101e',
        'dark-text':         '#f0ecff',
        'dark-text-secondary': '#9b91c1',
      },
      maxWidth: {
        'site': '1920px',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
