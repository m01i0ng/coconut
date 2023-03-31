import { useLocation } from 'react-router-dom'

import { Content, usePageData } from '../../../../../runtime'
import Sidebar from '../../components/Sidebar'
import DocFooter from '../DocFooter'
import styles from './index.module.scss'

export default function DocLayout() {
  const { siteData } = usePageData()
  const sidebarData = siteData.themeConfig?.sidebar || {}
  const { pathname } = useLocation()

  const matchedKey = Object.keys(sidebarData).find((key) => pathname.startsWith(key))

  const matchedSidebar = sidebarData[matchedKey] || []

  return (
    <div>
      <Sidebar sidebarData={matchedSidebar} pathname={pathname} />
      <div className={styles.content}>
        <div>
          <div className="coconut-doc">
            <Content />
          </div>
          <DocFooter />
        </div>
      </div>
    </div>
  )
}
