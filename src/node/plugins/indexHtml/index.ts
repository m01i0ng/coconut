import { Plugin } from 'vite'
import { readFile } from 'fs/promises'
import { CSR_ENTRY_PATH, DEFAULT_TEMPLATE_PATH } from '../../constants'

export default function pluginIndexHtml(): Plugin {
  return {
    name: 'coconut:index-html',
    apply: 'serve',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@fs/${CSR_ENTRY_PATH}`,
            },
            injectTo: 'body',
          },
        ],
      }
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let content = await readFile(DEFAULT_TEMPLATE_PATH, 'utf-8')
          try {
            content = await server.transformIndexHtml(req.url, content, req.originalUrl)
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(content)
          } catch (e) {
            next(e)
          }
        })
      }
    },
  }
}
