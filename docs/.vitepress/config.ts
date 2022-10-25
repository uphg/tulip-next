import { defineConfig } from 'vitepress'
import mdPlugin from './plugins'
import { sidebar } from './sidebar'

export default defineConfig({
  title: 'VitePress',
  description: 'Just playing around.',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/docs/introduction', activeMatch: '/docs/' }
    ],
    sidebar
  },
  markdown: {
    config: (md) => mdPlugin(md),
  }
})

