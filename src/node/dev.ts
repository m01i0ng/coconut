import { createServer, ViteDevServer } from 'vite'
import { PACKAGE_ROOT } from './constants'
import { resolveConfig } from './config'
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
