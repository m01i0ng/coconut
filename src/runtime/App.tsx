import React from 'react'
import Layout from '../node/theme/default/Layout'
import { PageData } from '../shared/types'
import { matchRoutes } from 'react-router-dom'
import { routes } from 'coconut:routes'
import siteData from 'coconut:site-data'

export async function initPageData(routePath: string): Promise<PageData> {
  const matched = matchRoutes(routes, routePath)

  if (matched) {
    const moduleInfo = await matched[0].route.preload()
    return {
      pageType: 'doc',
      siteData,
      frontMatter: moduleInfo.frontMatter,
      pagePath: routePath,
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
