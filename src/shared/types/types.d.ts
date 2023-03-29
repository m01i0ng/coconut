declare module 'coconut:site-data' {
  import type { UserConfig } from 'shared/types'
  const siteData: UserConfig
  export default siteData
}

declare module 'coconut:routes' {
  import type { Route } from 'node/plugins/routes'
  export const routes: Route[]
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}
