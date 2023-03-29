import { SiteConfig } from '../shared/types'
import pluginIndexHtml from './plugins/index-html'
import pluginReact from '@vitejs/plugin-react'
import pluginSiteData from './plugins/site-data'
import pluginRoutes from './plugins/routes'
import pluginMdx from './plugins/mdx'

export function createVitePlugins(config: SiteConfig, restartServer?: () => Promise<void>, isSSR = false) {
  return [
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
