import { createServer } from 'vite'
import { pluginIndexHtml } from './plugins/coconut/indexHtml'
import pluginReact from '@vitejs/plugin-react'
import { PACKAGE_ROOT } from './constants'
import { resolveConfig } from './config'

export async function createDevServer(root = process.cwd()) {
  const config = await resolveConfig(root, 'serve', 'development')
  return createServer({
    root,
    plugins: [pluginIndexHtml(), pluginReact()],
    server: {
      fs: {
        allow: [PACKAGE_ROOT],
      },
    },
  })
}
