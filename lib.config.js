import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/tulip/',
  build: {
    cssCodeSplit: true, // 使用 js 模块化 css 代码
    lib: {
      entry: path.resolve(__dirname, 'src/lib/main.ts'),
      name: 'MyLib',
      fileName: (format) => `lib/my-lib.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-router', 'sass', 'typescript'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
