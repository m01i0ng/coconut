import { routes } from 'coconut:routes'
import siteData from 'coconut:site-data'
import React from 'react'
import { matchRoutes } from 'react-router-dom'

import Layout from '../node/theme/default/Layout'
import type { PageData } from '../shared/types'

export async function initPageData(routePath: string): Promise<PageData> {
  const matched = matchRoutes(routes, routePath)

  if (matched) {
    const moduleInfo = await matched[0].route.preload()
    return {
      pageType: moduleInfo.frontmatter?.pageType ?? 'doc',
      siteData,
      frontMatter: moduleInfo.frontmatter,
      pagePath: routePath,
      toc: moduleInfo.toc,
    }
  }

  return {
    pageType: '404',
    siteData,
    pagePath: routePath,
    frontMatter: {},
  }
}

export default function App() {
  return (
    <div>
      <Layout />
    </div>
  )
}
