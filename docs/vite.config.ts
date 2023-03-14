import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import VueJSX from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [VueJSX()],
  resolve: {
    alias: {
      'tulip': fileURLToPath(new URL('../src', import.meta.url))
    }
  }
})