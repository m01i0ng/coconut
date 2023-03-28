import cac from 'cac'
import { resolve } from 'path'
import build from './build'

const cli = cac('coconut').version('0.1.1').help()

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
    await build(root)
  } catch (e) {
    console.log(e)
  }
})

cli.parse()
