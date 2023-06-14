/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            // font families for tailwind font families
          'inder': ['Inder', 'sans-serif'],
          'roboto': ['Roboto', 'sans-serif'],
          'signika-negative': ['Signika Negative', 'sans-serif'],
        },
        fontWeight: {
            // font weights for tailwind font weights
        'light': 300,
        'normal': 400,
        'medium': 500,
        'bold': 700,
        'black': 900,
      },
        screens: {
            // screen sizes for tailwind breakpoints for responsive design
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px' },
        colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'palette-light': {
            // colors in the same order as in the java legend docx for light mode
            "color-1": '#e9f2f6',
            "color-2": '#97A7E8',
            "color-3": '#7AA8E1',
            "color-4": '#5DD4DB',
            "color-5": '#71DFC9',
        },

        'palette-dark': {
            // colors in the same order as in the java legend docx for dark mode
            "color-1": '#9FA8CB',
            "color-2": '#9B8BC0',
            "color-3": '#5D5AA5',
            "color-4": '#B0C0D4',
            "color-5": '#81AABB',
        },
        'brand-blue': {
            // Primary blue color
            '90-shades': '#040c10',
            '60-shades': '#0e3140',
            '30-shades': '#195670',
            '0-shades': '#247BA0',
            '30-light': '#66a3bd',
            '60-light': '#a7cad9',
            '90-light': '#e9f2f6',
        },
        'success': {
            // Color to display success related information
          '90-shades': 'hsl(123, 75%, 5%)',
          '60-shades': 'hsl(123, 72%, 19%)',
          '30-shades': 'hsl(123, 72%, 34%)',
          '0-shades': 'hsl(123, 72%, 48%)',
          '30-light': 'hsl(123, 68%, 64%)',
          '60-light': 'hsl(123, 68%, 79%)',
          '90-light': 'hsl(123, 69%, 95%)',
        },
        'warning': {
            // color to display warning related information
          '90-shades': '#191004',
          '60-shades': '#66400e',
          '30-shades': '#b36f19',
          '0-shades': '#ff9f24',
          '30-light': '#ffbc66',
          '60-light': '#ffd9a7',
          '90-light': '#fff5e9',
        },
        'danger': {
            // color to display danger related information
          '90-shades': 'hsl(0, 75%, 5%)',
          '60-shades': 'hsl(0, 72%, 19%)',
          '30-shades': 'hsl(0, 72%, 34%)',
          '0-shades': 'hsl(0, 72%, 48%)',
          '30-light': 'hsl(0, 68%, 64%)',
          '60-light': 'hsl(0, 68%, 79%)',
          '90-light': 'hsl(0, 69%, 95%)',
        },
        'neutral': {
            // color to display neutral related information like background and text
          '90-shades': 'hsl(0, 0%, 5%)',
          '60-shades': 'hsl(0, 0%, 19%)',
          '30-shades': 'hsl(0, 0%, 34%)',
          '0-shades': 'hsl(0, 0%, 48%)',
          '30-light': 'hsl(0, 0%, 64%)',
          '60-light': 'hsl(0, 0%, 79%)',
          '90-light': 'hsl(0, 0%, 95%)',
        },
            zIndex: {
                '-1': '-1',
            },
            scale: {
                '1': '1',
            },
      }
    },
  },
  plugins: [],
}