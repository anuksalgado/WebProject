/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./public/**/*.js", 
    "./src/**/*.css",
  ],
  theme: {
    extend: {
      fontFamily:{
        playfair: ['PlayFair Display', 'serif'],
        playfairExtraBold: ['PlayFair Display', 'serif', 'ExtraBold']
      },
      colors: {
        'custom-yellow':'#BAA333',
        'cream-white' :'#FFF8E1',
        cyan: {
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4',
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
        },
        blue: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
        },
      },
    },
  },
  plugins: [],
}

