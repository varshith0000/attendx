export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      colors: {
        bg: '#F5F7FC',
        panel: '#FFFFFF',
        primary: '#007AFF',
        lightBlue: '#EAF2FF',
        deepBlue: '#1456C0',
        text: '#1D1D1F',
        secondary: '#86868B',
        success: '#34C759',
        warning: '#FF9F0A',
        error: '#FF453A',
      },
      boxShadow: {
        glass: '0 18px 50px rgba(20, 86, 192, 0.12)',
      },
      borderRadius: {
        xxl: '22px',
      },
    },
  },
  plugins: [],
};
