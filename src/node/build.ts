import { build as viteBuild, InlineConfig, Rollup } from 'vite'
import { CSR_ENTRY_PATH, SSR_ENTRY_PATH } from './constants'
import pluginReact from '@vitejs/plugin-react'
import { join } from 'path'
import fse from 'fs-extra'
import { SiteConfig } from '../shared/types'
import pluginConfig from './plugins/config'

async function renderPage(render: () => string, root: string, csrBundle) {
  const csrChunk = csrBundle.output.find((c) => c.type === 'chunk' && c.isEntry)
  console.log(`Rendering page in server...`)
  const appHtml = render()
  const html = `
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width,initial-scale=1'>
    <meta name='description' content='coconut'>
    <title>title</title>
  </head>
  <body>
    <div id='root'>${appHtml}</div>
    <script src='/${csrChunk?.fileName}' type='module'></script>
  </body>
</html>
  `.trim()
  await fse.ensureDir(join(root, 'build'))
  await fse.writeFile(join(root, 'build/index.html'), html)
  await fse.remove(join(root, '.temp'))
}

async function bundle(root: string, config: SiteConfig) {
  const resolveViteConfig = (isServer = false): InlineConfig => ({
    mode: 'production',
    root,
    plugins: [pluginReact(), pluginConfig(config)],
    ssr: {
      noExternal: ['react-router-dom'],
    },
    build: {
      minify: false,
      ssr: isServer,
      outDir: isServer ? join(root, '.temp') : 'build',
      rollupOptions: {
        input: isServer ? SSR_ENTRY_PATH : CSR_ENTRY_PATH,
        output: {
          format: isServer ? 'cjs' : 'esm',
        },
      },
    },
  })

  console.log('Building csr + ssr bundles')

  try {
    const [csrBundle, ssrBundle] = await Promise.all([
      viteBuild(resolveViteConfig()),
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
  const { render } = await import(serverEntryPath)
  try {
    await renderPage(render as () => string, root, csrBundle)
  } catch (e) {
    console.log(`Render page error.\n`, e)
  }
}
