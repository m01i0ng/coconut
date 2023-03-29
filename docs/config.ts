import { defineConfig } from '../dist'

export default defineConfig({
  title: 'Coconut',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],
  },
})
