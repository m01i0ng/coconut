import { SiteConfig } from '../shared/types'
import pluginIndexHtml from './plugins/index-html'
import pluginReact from '@vitejs/plugin-react'
import pluginSiteData from './plugins/site-data'
import pluginRoutes from './plugins/routes'
import pluginMdx from './plugins/mdx'
import pluginUnocss, { VitePluginConfig } from 'unocss/vite'
import { presetAttributify, presetIcons, presetWind } from 'unocss'

const unocssOptions: VitePluginConfig = {
  presets: [presetAttributify(), presetWind(), presetIcons()],
  rules: [
    [
      /^divider-(\w+)$/,
      ([, w]) => ({
        [`border-${w}`]: '1px solid var(--coconut-c-divider-light)',
      }),
    ],
    [
      'menu-item-before',
      {
        'margin-right': '12px',
        'margin-left': '12px',
        width: '1px',
        height: '24px',
        'background-color': 'var(--coconut-c-divider-light)',
        content: '" "',
      },
    ],
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
  },
  theme: {
    colors: {
      brandLight: 'var(--coconut-c-brand-light)',
      brandDark: 'var(--coconut-c-brand-dark)',
      brand: 'var(--coconut-c-brand)',
      text: {
        1: 'var(--coconut-c-text-1)',
        2: 'var(--coconut-c-text-2)',
        3: 'var(--coconut-c-text-3)',
        4: 'var(--coconut-c-text-4)',
      },
      divider: {
        default: 'var(--coconut-c-divider)',
        light: 'var(--coconut-c-divider-light)',
        dark: 'var(--coconut-c-divider-dark)',
      },
      gray: {
        light: {
          1: 'var(--coconut-c-gray-light-1)',
          2: 'var(--coconut-c-gray-light-2)',
          3: 'var(--coconut-c-gray-light-3)',
          4: 'var(--coconut-c-gray-light-4)',
        },
      },
      bg: {
        default: 'var(--coconut-c-bg)',
        soft: 'var(--coconut-c-bg-soft)',
        mute: 'var(--coconut-c-bg-mute)',
      },
    },
  },
}

export function createVitePlugins(config: SiteConfig, restartServer?: () => Promise<void>, isSSR = false) {
  return [
    pluginUnocss(unocssOptions),
    pluginIndexHtml(),
    pluginReact({
      jsxRuntime: 'automatic',
    }),
    pluginSiteData(config, restartServer),
    pluginRoutes({
      root: config.root,
      isSSR,
    }),
    pluginMdx(),
  ]
}
