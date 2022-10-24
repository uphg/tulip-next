import { defineConfig } from 'vitepress'
import mdPlugin from './plugins'

export default defineConfig({
  title: 'VitePress',
  description: 'Just playing around.',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: '组件', link: '/components/button', activeMatch: '/components/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          collapsible: true,
          items: [
            { text: 'Tulp UI', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/getting-started' },
          ]
        }
      ],
      '/components/': [
        {
          text: 'Form 组件',
          collapsible: true,
          items: [
            { text: 'Button 按钮', link: '/components/button' }
          ]
        }
      ]
    },
  },
  markdown: {
    config: (md) => mdPlugin(md),
  }
})

