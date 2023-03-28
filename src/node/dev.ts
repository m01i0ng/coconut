import { createServer } from 'vite'
import { pluginIndexHtml } from './plugins/coconut/indexHtml'
import pluginReact from '@vitejs/plugin-react'
import { PACKAGE_ROOT } from './constants'

export function createDevServer(root = process.cwd()) {
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
