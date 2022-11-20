import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import VueJSX from "@vitejs/plugin-vue-jsx";

const path1 = fileURLToPath(new URL('../src', import.meta.url))
console.log('path1')
console.log(path1)

export default defineConfig({
  plugins: [VueJSX()],
  resolve: {
    alias: {
      'tulp': fileURLToPath(new URL('../src', import.meta.url))
    }
  }
})