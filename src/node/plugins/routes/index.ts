import type { ReactElement } from 'react'
import type { Plugin } from 'vite'

import type { PageModule } from '../../../shared/types'
import { RouteService } from './RouteService'

export interface Route {
  path: string
  element: ReactElement
  filePath: string
  preload: () => Promise<PageModule>
}

interface PluginOptions {
  root: string
  isSSR: boolean
}

export const ROUTE_ID = 'coconut:routes'

export default function pluginRoutes(options: PluginOptions): Plugin {
  const routeService = new RouteService(options.root)
  return {
    name: 'coconut:routes',
    resolveId(id: string) {
      if (id === ROUTE_ID) {
        return '\0' + id
      }
    },
    load(id: string) {
      if (id === '\0' + ROUTE_ID) {
        return routeService.generateRouteCode(options.isSSR)
      }
    },
    async configResolved() {
      await routeService.init()
    },
  }
}
