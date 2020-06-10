const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: false,
  purge: [
    './pages/**/*.jsx',
    './pages/**/*.md'
  ],
  theme: {
    extend: {
      colors: {
        red: {
          100: '#FDE6E7',
          200: '#FAC0C3',
          300: '#F6999E',
          400: '#F04D56',
          500: '#E9010D',
          600: '#D2010C',
          700: '#8C0108',
          800: '#690006',
          900: '#460004'
        },
        green: {
          100: '#ECF8ED',
          200: '#D0EDD2',
          300: '#B4E2B6',
          400: '#7BCC80',
          500: '#43B649',
          600: '#3CA442',
          700: '#286D2C',
          800: '#1E5221',
          900: '#143716'
        },
        blue: {
          100: '#E6F3FE',
          200: '#C1E0FE',
          300: '#9CCDFD',
          400: '#51A8FB',
          500: '#0782F9',
          600: '#0675E0',
          700: '#044E95',
          800: '#033B70',
          900: '#02274B'
        },
        orange: {
          100: '#FEF5E6',
          200: '#FCE5C0',
          300: '#FBD59A',
          400: '#F7B64E',
          500: '#F49702',
          600: '#DC8802',
          700: '#925B01',
          800: '#6E4401',
          900: '#492D01'
        }
      },
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
