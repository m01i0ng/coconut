import chalk from 'chalk'
import fse from 'fs-extra'
import { dirname, join } from 'path'
import type { InlineConfig, Rollup } from 'vite'
import { build as viteBuild } from 'vite'

import type { SiteConfig } from '../shared/types'
import { CSR_ENTRY_PATH, SSR_ENTRY_PATH } from './constants'
import type { Route } from './plugins/routes'
import { createVitePlugins } from './vitePlugins'

type RenderFunc = (routePath: string) => string

async function renderPage(render: RenderFunc, routes: Route[], root: string, csrBundle) {
  console.log(chalk.green('Rendering pages...'))
  const csrChunk = csrBundle.output.find((c) => c.type === 'chunk' && c.isEntry)
  // 顶层路由遍历，生成多入口并行打包任务
  return Promise.all(
    routes.map(async (route) => {
      const routePath = route.path
      const appHtml = render(routePath)
      const html = `
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width,initial-scale=1'>
    <meta name='description' content='coconut'>
    <title>Coconut</title>
  </head>
  <body>
    <div id='root'>${appHtml}</div>
    <script src='/${csrChunk?.fileName}' type='module'></script>
  </body>
</html>
  `.trim()
      const filename = routePath.endsWith('/') ? `${routePath}index.html` : `${routePath}.html`

      await fse.ensureDir(join(root, 'build', dirname(filename)))
      await fse.writeFile(join(root, 'build', filename), html)
    }),
  )
}

async function bundle(root: string, config: SiteConfig) {
  const resolveViteConfig = (isServer = false): InlineConfig => ({
    mode: 'production',
    root,
    plugins: createVitePlugins(config, undefined, isServer),
    ssr: {
      noExternal: ['react-router-dom'],
    },
    build: {
      minify: false,
      ssr: isServer,
      outDir: isServer ? join(root, '.temp') : join(root, 'build'),
      rollupOptions: {
        input: isServer ? SSR_ENTRY_PATH : CSR_ENTRY_PATH,
        output: {
          format: isServer ? 'cjs' : 'esm',
        },
      },
    },
  })

  try {
    const [csrBundle, ssrBundle] = await Promise.all([
      viteBuild(resolveViteConfig(false)),
      viteBuild(resolveViteConfig(true)),
    ])
    return [csrBundle, ssrBundle] as [Rollup.RollupOutput, Rollup.RollupOutput]
  } catch (e) {
    console.log(e)
  }
}

export default async function build(root = process.cwd(), config: SiteConfig) {
  const [csrBundle, ssrBundle] = await bundle(root, config)

  const ssrChunk = ssrBundle.output.find((c) => c.type === 'chunk' && c.isEntry)

  const serverEntryPath = join(root, '.temp', ssrChunk.fileName)
  // ssr-entry.ts 文件中导出了所有的路由路径
  const { render, routes } = await import(serverEntryPath)
  try {
    await renderPage(render as RenderFunc, routes as Route[], root, csrBundle)
  } catch (e) {
    console.log(chalk.bold.red('Render error'))
  }
}
