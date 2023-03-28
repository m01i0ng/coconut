import cac from 'cac'
import { resolve } from 'path'
import { createDevServer } from './dev'
import build from './build'

const cli = cac('coconut').version('0.1.1').help()

cli.command('dev [root]', 'start dev server').action(async (root: string) => {
  root = root ? resolve(root) : process.cwd()
  const server = await createDevServer(root)
  await server.listen()
  server.printUrls()
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
