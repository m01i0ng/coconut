import cac from 'cac'
import { resolve } from 'path'

import packageJson from '../../package.json'
import build from './build'
import { resolveConfig } from './config'

const cli = cac('coconut').version(packageJson.version).help()

cli.command('dev [root]', 'start dev server').action(async (root: string) => {
  const createServer = async () => {
    const { createDevServer } = await import('./dev.js')
    const server = await createDevServer(root, async () => {
      await server.close()
      await createServer()
    })
    await server.listen()
    server.printUrls()
  }
  await createServer()
})

cli.command('build [root]', 'build for prod').action(async (root: string) => {
  try {
    root = resolve(root)
    const config = await resolveConfig(root, 'build', 'production')
    await build(root, config)
  } catch (e) {
    console.log(e)
  }
})

cli.parse()
