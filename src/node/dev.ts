import { createServer } from 'vite'
import pluginReact from '@vitejs/plugin-react'
import { PACKAGE_ROOT } from './constants'
import { resolveConfig } from './config'
import pluginIndexHtml from './plugins/indexHtml'
import pluginConfig from './plugins/config'

export async function createDevServer(root = process.cwd(), restartServer: () => Promise<void>) {
  const config = await resolveConfig(root, 'serve', 'development')
  return createServer({
    root: PACKAGE_ROOT,
    plugins: [pluginReact(), pluginIndexHtml(), pluginConfig(config, restartServer)],
    server: {
      fs: {
        allow: [PACKAGE_ROOT],
      },
    },
  })
}
