import { defineConfig } from 'vitepress'
import mdPlugin from './plugins'

export default defineConfig({
  title: 'VitePress',
  description: 'Just playing around.',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide' },
      { text: '组件', link: '/components' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: 'Tulp UI', link: '/guide/introduction' },
          { text: '快速开始', link: '/guide/getting-started' },
        ]
      },
      {
        text: '组件',
        items: [
          { text: 'Button 按钮', link: '/components/button' },
        ]
      }
    ]
  },
  markdown: {
    config: (md) => mdPlugin(md),
  }
})
