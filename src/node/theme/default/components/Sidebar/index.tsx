import type { FC } from 'react'

import type { SidebarGroup, SidebarItem } from '../../../../../shared/types'
import Link from '../Link'
import styles from './index.module.scss'

interface SidebarProps {
  sidebarData: SidebarGroup[]
  pathname: string
}

const renderGroupItem = (item: SidebarItem, p: string) => {
  const active = item.link === p
  return (
    <div ml="5">
      <div p="1" block="~" text="sm" font-medium="~" className={`${active ? 'text-brand' : 'text-text-2'}`}>
        <Link href={item.link}>{item.text}</Link>
      </div>
    </div>
  )
}

const renderGroup = (item: SidebarGroup, p: string) => (
  <section key={item.text} block="~" not-first="divider-top mt-4">
    <div flex="~" justify="between" items="center">
      <h2 m="t-3 b-2" text="1rem text-1" font="bold">
        {item.text}
      </h2>
    </div>
    <div mb="1">
      {item.items?.map((item) => (
        <div key={item.link}>{renderGroupItem(item, p)}</div>
      ))}
    </div>
  </section>
)

const Sidebar: FC<SidebarProps> = ({ sidebarData, pathname }) => (
  <aside className={styles.sidebar}>
    <nav>{sidebarData.map((s) => renderGroup(s, pathname))}</nav>
  </aside>
)

export default Sidebar
