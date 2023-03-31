import { useLocation } from 'react-router-dom'

import { usePageData } from '../../../../../runtime'
import Sidebar from '../../components/Sidebar'

export default function DocLayout() {
  const { siteData } = usePageData()
  const sidebarData = siteData.themeConfig?.sidebar || {}
  const { pathname } = useLocation()

  const matchedKey = Object.keys(sidebarData).find((key) => pathname.startsWith(key))

  const matchedSidebar = sidebarData[matchedKey] || []

  return (
    <div>
      <Sidebar sidebarData={matchedSidebar} pathname={pathname} />
    </div>
  )
}
