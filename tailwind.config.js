/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '890px',
        lg: '1200px',
      },
      colors: {
        white100: 'hsla(0, 0%, 100%, 1)',
        white99: 'hsla(0, 0%, 99%, 1)',
        blue20: 'hsla(208, 76%, 20%, 1)',
        blue96: 'hsla(220, 100%, 96%, 1)',
        blue44: 'hsla(220, 56%, 44%, 1)',
        blue98: 'hsla(216, 100%, 98%, 1)',
        blue100: 'hsla(0, 0%, 96%, 1)',
        blue56: 'hsla(193, 98%, 56%, 1)',
        blue50: 'hsla(203, 100%, 50%, 0.1)',
        grey8: 'hsla(0, 0%, 0%, 0.08)',
        grey12: 'hsla(0, 0%, 0%, 0.12)',
        grey13: 'hsla(0, 0%, 13%, 1)',
        grey67: 'hsla(0, 0%, 67%, 1)',
        grey90: 'hsla(0, 0%, 90%, 1)',
        grey206: 'hsla(206, 81%, 15%, 0.12)',
        green41: 'hsla(149, 99%, 41%, 1)',
        red63: 'hsla(335, 86%, 63%, 0.1)',
        green42: 'hsla(171, 100%, 42%, 0.1)',
        green96: 'hsla(147, 100%, 96%, 1)',
        black: 'hsla(0, 0%, 13%, 1)',
        black94: 'hsla(0, 0%, 94%, 1)',
      },
      boxShadow: {
        cardLight8: 'hsla(0, 0%, 0%, 0.08) 0px 2px 12px',
        cardLight4: 'hsla(0, 0%, 0%, 0.04) 0px 0px 8px',
        bottomNav: 'hsla(0, 0%, 0%, 0.08) 0px -3px 6px',
      },
      fontSize: {
        sm: ['0.875rem', '1.125rem'],
        xsm: ['0.813rem', '1.125rem'],
      },
      keyframes: {
        slideEnter: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        slideEnter: 'slideEnter 0.3s ease',
      },
    },
  },
  plugins: [],
};
