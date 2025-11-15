/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for weather conditions
        sunny: {
          light: '#FDB813',
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        rainy: {
          light: '#60A5FA',
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        cloudy: {
          light: '#9CA3AF',
          DEFAULT: '#6B7280',
          dark: '#4B5563',
        },
      },
      backgroundImage: {
        'gradient-sunny': 'linear-gradient(135deg, #FDB813 0%, #F59E0B 100%)',
        'gradient-rainy': 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)',
        'gradient-cloudy': 'linear-gradient(135deg, #9CA3AF 0%, #4B5563 100%)',
        'gradient-clear-night': 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}