// tailwind.config.js
export default {
  content: [
    './index.html',
    './js/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7b1fa2',
        bgDark: '#121212',
        lightText: '#e0e0e0',
      }
    }
  },
  plugins: [],
}
