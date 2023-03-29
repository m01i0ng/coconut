import '../style/base.css'
import '../style/vars.css'
import 'uno.css'

import React from 'react'

import { usePageData } from '../../../../runtime'
import type { PageType } from '../../../../shared/types'
import Nav from '../components/Nav'
import HomeLayout from './HomeLayout'

const getContent = (pageType: PageType) => {
  switch (pageType) {
    case 'home':
      return <HomeLayout />
    case 'doc':
      return <div>Doc</div>
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
      {getContent(pageType)}
    </div>
  )
}
