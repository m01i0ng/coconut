import { build as viteBuild, InlineConfig, Rollup } from 'vite'
import { CSR_ENTRY_PATH, SSR_ENTRY_PATH } from './constants'
import { dirname, join } from 'path'
import fse from 'fs-extra'
import { SiteConfig } from '../shared/types'
import { createVitePlugins } from './vitePlugins'
import { Route } from './plugins/routes'

type RenderFunc = (routePath: string) => string

async function renderPage(render: RenderFunc, routes: Route[], root: string, csrBundle) {
  console.log(`Rendering page in server...`)
  const csrChunk = csrBundle.output.find((c) => c.type === 'chunk' && c.isEntry)
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
  const [csrBundle] = await bundle(root, config)
  const serverEntryPath = join(root, '.temp', 'ssr-entry.js')
  const { render, routes } = await import(serverEntryPath)
  try {
    await renderPage(render as RenderFunc, routes as Route[], root, csrBundle)
  } catch (e) {
    console.log(`Render page error.\n`, e)
  }
}
