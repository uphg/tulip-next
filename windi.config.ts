import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  extract: {
    include: ['docs/**/*.{vue,html,jsx,tsx}', 'preview/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git', 'excluded', 'dist', 'windi.config.{ts,js}', 'tailwind.config.{ts,js}'],
  },
  darkMode: 'class',
  safelist: 'select-none',
  // shortcuts: {
  //   btn: 'rounded border border-gray-300 text-gray-600 px-4 py-2 m-2 inline-block hover:shadow',
  // },
  theme: {
    extend: {
      colors: {
        teal: {
          100: '#096',
        },
      },
    },
  },
})