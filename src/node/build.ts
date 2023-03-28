import { build as viteBuild, InlineConfig, Rollup } from 'vite'
import { CSR_ENTRY_PATH, SSR_ENTRY_PATH } from './constants'
import pluginReact from '@vitejs/plugin-react'
import { join } from 'path'
import fs from 'fs-extra'

async function renderPage(render: () => string, root: string, csrBundle) {
  const csrChunk = csrBundle.output.find((c) => c.type === 'chunk' && c.isEntry)
  console.log(`Rendering page is server...`)
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
  await fs.ensureDir(join(root, 'build'))
  await fs.writeFile(join(root, 'build/index.html'), html)
  await fs.remove(join(root, '.temp'))
}

export default async function build(root = process.cwd()) {
  const [csrBundle, ssrBundle] = await bundle(root)
  const ssrChunk = ssrBundle.output.find((c) => c.type === 'chunk' && c.isEntry)
  const serverEntryPath = join(root, '.temp', ssrChunk?.fileName)
  const { render } = await import(serverEntryPath)
  await renderPage(render as () => string, root, csrBundle)
}

export async function bundle(root: string) {
  const resolveViteConfig = (isServer = false): InlineConfig => ({
    mode: 'production',
    root,
    plugins: [pluginReact()],
    build: {
      ssr: isServer,
      outDir: isServer ? '.temp' : 'build',
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
