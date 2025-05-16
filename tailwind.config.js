import { themeColors } from './src/theme/colors.ts'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...themeColors.light,
        ...Object.fromEntries(
          Object.entries(themeColors.dark).map(([key, value]) => [`dark-${key}`, value])
        ),
      },
    },
  },
  plugins: [],
}
