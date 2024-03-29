import fg from 'fast-glob'
import { relative } from 'path'
import { normalizePath } from 'vite'

interface RouteMeta {
  routePath: string
  absolutePath: string
}

export class RouteService {
  private readonly scanDir: string
  private routeData: RouteMeta[] = []

  public constructor(scanDir: string) {
    this.scanDir = scanDir
  }

  public getRouteMeta() {
    return this.routeData
  }

  public generateRouteCode(isSSR = false) {
    return `
import React from 'react'
${isSSR ? '' : "import loadable from '@loadable/component'"}
${this.routeData
  .map((route, index) => {
    return isSSR
      ? `import Route${index} from '${route.absolutePath}'`
      : `const Route${index} = loadable(() => import('${route.absolutePath}'))`
  })
  .join('\n')}
export const routes = [
${this.routeData
  .map((route, index) => {
    return `{ path: '${route.routePath}', element: React.createElement(Route${index}), preload: () => import('${route.absolutePath}') }`
  })
  .join(',\n')}
]
`
  }

  public async init() {
    const files = fg
      .sync(['**/*.{js,jsx,ts,tsx,md,mdx}'], {
        cwd: this.scanDir,
        absolute: true,
        ignore: ['**/node_modules/**', '**/build/**', 'config.ts'],
      })
      .sort()
    files.forEach((file) => {
      // 文件相对路径
      const fileRelativePath = normalizePath(relative(this.scanDir, file))
      // 路由路径
      const routePath = this.normalizeRoutePath(fileRelativePath)
      this.routeData.push({
        routePath,
        absolutePath: file,
      })
    })
  }

  private normalizeRoutePath(rawPath: string) {
    const routePath = rawPath.replace(/\.(.*)?$/, '').replace(/index$/, '')
    return routePath.startsWith('/') ? routePath : `/${routePath}`
  }
}
