import { useLocation } from 'react-router-dom'

import { usePageData } from '../../../../runtime'
import type { SidebarItem } from '../../../../shared/types'

export default function usePrevNextPage() {
  const { pathname } = useLocation()
  const { siteData } = usePageData()
  const sidebar = siteData.themeConfig?.sidebar || {}
  const flatTitles: SidebarItem[] = []

  Object.keys(sidebar).forEach((key) => {
    const groups = sidebar[key] || []
    groups.length && groups.forEach((group) => flatTitles.push(...group.items))
  })

  const pageIndex = flatTitles.findIndex((item) => item.link === pathname)

  const prevPage = flatTitles[pageIndex - 1] || null
  const nextPage = flatTitles[pageIndex + 1] || null

  return {
    prevPage,
    nextPage,
  }
}
