/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Use class-based dark mode instead of media query
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          dark: 'var(--color-accent-dark)',
          light: 'var(--color-accent-light)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          dark: 'var(--color-secondary-dark)',
          light: 'var(--color-secondary-light)',
        },
        background: {
          DEFAULT: 'var(--color-background)',
          dark: 'var(--color-background-dark)',
          light: 'var(--color-background-light)',
        },
      },
    },
  },
  plugins: [],
}
