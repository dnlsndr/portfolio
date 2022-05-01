const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.{js,vue,ts}",
    "./pages/**/*.{js,vue,ts}",
    "./plugins/**/*.{js,vue,ts}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.neutral,
          "1000": "#121212"
        }
      },
      fontFamily: {
        "courier": ['Courier Prime', 'monospace'],
        outfit: ["Outfit", "Inter", "ui-sans-serif", "system-ui"]
      },
      // typography: (theme) => ({

      // })
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],

}
