const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: false,
  purge: [
    './pages/**/*.jsx',
    './pages/**/*.md'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'IBM Plex Sans',
          ...defaultTheme.fontFamily.sans
        ],
        serif: [
          'IBM Plex Serif',
          ...defaultTheme.fontFamily.serif
        ]
      }
    }
  }
}
