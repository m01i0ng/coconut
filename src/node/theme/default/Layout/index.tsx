import 'uno.css'
import '../style/base.css'
import '../style/doc.css'
import '../style/vars.css'

import { usePageData } from '../../../../runtime'
import type { PageType } from '../../../../shared/types'
import Nav from '../components/Nav'
import DocLayout from './DocLayout'
import HomeLayout from './HomeLayout'

const getContent = (pageType: PageType) => {
  switch (pageType) {
    case 'home':
      return <HomeLayout />
    case 'doc':
      return <DocLayout />
    case '404':
      return <div>404</div>
    case 'custom':
    default:
      return <div />
  }
}

export default function Layout() {
  const { pageType } = usePageData()

  return (
    <div>
      <Nav />
      <section
        style={{
          paddingTop: 'var(--coconut-nav-height)',
        }}
      >
        {getContent(pageType)}
      </section>
    </div>
  )
}
