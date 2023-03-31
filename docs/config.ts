import { defineConfig } from '../dist'

export default defineConfig({
  title: 'Coconut',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            {
              text: 'Quickstart',
              link: '/guide/quickstart',
            },
            {
              text: 'How to',
              link: '/guide/how-to',
            },
            {
              text: 'Faq',
              link: '/guide/faq',
            },
          ],
        },
      ],
    },
  },
})
