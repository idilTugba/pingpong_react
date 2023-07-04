/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // darkMode: false,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          DEFAULT: "#000",
        },
        secondary: {
          DEFAULT: "#fff",
        },
      },
      spacing: {
        '10vw': '10vw',
        '5vw': '5vw',
        '50px': '50px'
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      listStyleImage: {
        checkmark: 'url("/oldprojects/star.png")'
      },
      transitionProperty: {
        'height': 'height',
        'width': 'width',
        'color': 'color',
        'font-size': 'font-size',
        'visibility': 'visibility',
        'border': 'border',
        'opacity': 'opacity',
        'outline': 'outline'
      },
      animation: {
        flash: 'flash .1s linear infinite',
        bounce2: 'bounce2 .1s linear infinite',
        rotateStar: 'rotateStar 3s linear infinite',
        locationStarts: 'locationStarts .1s linear infinite',
      },
      keyframes: {
        bounce2: {
          '0%, 100%': { bottom: 'translate(3px,1px)' },
          '50%': { transform: 'translate(0px,0px)' },
          '50%': { transform: 'translate(-3px,1px)' },
        },
        flash: {
          '0%, 100%': {opacity: 1},
          '50%': {opacity: 0},
        },
        rotateStar: {
          '0%': {transform: 'rotate(0deg)'},
          '50%': {transform: 'rotate(180deg)'},
          '100%': {transform: 'rotate(360deg)'},
        },
        locationStarts: {
          '0%, 100%': {transform: 'translate(0,0)'},
          '25%': {transform: 'translate(2px,1px)'},
          '50%': {transform: 'translate(1px,3px)'},
          '50%': {transform: 'translate(-2px,0)'},
        }
      }
    },
  },
  plugins: [],
}
