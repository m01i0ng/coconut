import type { ViteDevServer } from 'vite'
import { createServer } from 'vite'

import { resolveConfig } from './config'
import { PACKAGE_ROOT } from './constants'
import { createVitePlugins } from './vitePlugins'

export async function createDevServer(
  root = process.cwd(),
  restartServer: () => Promise<void>,
): Promise<ViteDevServer> {
  const config = await resolveConfig(root, 'serve', 'development')
  return createServer({
    plugins: createVitePlugins(config, restartServer),
    server: {
      fs: {
        allow: [PACKAGE_ROOT],
      },
    },
  })
}
