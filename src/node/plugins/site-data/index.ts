import chalk from 'chalk'
import fse from 'fs-extra'
import { join, relative } from 'path'
import sirv from 'sirv'
import type { Plugin } from 'vite'

import type { SiteConfig } from '../../../shared/types'
import { PACKAGE_ROOT } from '../../constants'

const SITE_DATA_ID = 'coconut:site-data'

export default function pluginSiteData(config: SiteConfig, restartServer?: () => Promise<void>): Plugin {
  return {
    name: 'coconut:site-data',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return '\0' + SITE_DATA_ID
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`
      }
    },
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath]
      const include = (id: string) => customWatchedFiles.some((f) => id.includes(f))
      if (include(ctx.file)) {
        console.log(chalk.green(`\n${relative(config.root, ctx.file)} changed, restarting server...`))
        await restartServer!()
      }
    },
    config() {
      return {
        root: PACKAGE_ROOT,
        resolve: {
          alias: {
            '@runtime': join(PACKAGE_ROOT, 'src', 'runtime', 'index.ts'),
          },
        },
        css: {
          modules: {
            localsConvention: 'camelCaseOnly',
          },
        },
      }
    },
    configureServer(server) {
      const publicDir = join(config.root, 'public')
      if (fse.pathExistsSync(publicDir)) {
        server.middlewares.use(
          sirv(publicDir, {
            maxAge: 31536000,
            immutable: true,
          }),
        )
      }
    },
  }
}
