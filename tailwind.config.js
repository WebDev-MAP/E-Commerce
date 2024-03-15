/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        integral_cf: 'Integral CF Bold',
        satoshi_regular: 'Satoshi Regular',
        satoshi_medium: 'Satoshi Medium',
        satoshi_bold: 'Satoshi Bold',
      },
    },
  },

  plugins: [],
}
