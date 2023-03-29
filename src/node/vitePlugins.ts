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
