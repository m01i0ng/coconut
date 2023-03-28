import { createServer } from 'vite'
import { pluginIndexHtml } from './plugins/coconut/indexHtml'
import pluginReact from '@vitejs/plugin-react'

export function createDevServer(root = process.cwd()) {
  return createServer({
    root,
    plugins: [pluginIndexHtml(), pluginReact()],
  })
}
