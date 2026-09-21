/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'none' }
        }
      },
      animation: {
        fadeUp: 'fadeUp .8s cubic-bezier(0,0,.2,1) both',
        fadeUpFast: 'fadeUp .4s ease both'
      }
    }
  },
  plugins: []
};
