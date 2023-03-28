import { createServer } from 'vite'
import pluginReact from '@vitejs/plugin-react'
import { PACKAGE_ROOT } from './constants'
import { resolveConfig } from './config'
import pluginIndexHtml from './plugins/indexHtml'
import pluginConfig from './plugins/config'

export async function createDevServer(root = process.cwd()) {
  const config = await resolveConfig(root, 'serve', 'development')
  return createServer({
    root,
    plugins: [pluginReact(), pluginIndexHtml(), pluginConfig(config)],
    server: {
      fs: {
        allow: [PACKAGE_ROOT],
      },
    },
  })
}
