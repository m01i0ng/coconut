import React, { useMemo } from 'react'
import { usePageData } from '../../../../runtime'
import Nav from '../components/Nav'
import '../style/base.css'
import '../style/vars.css'
import 'uno.css'

export default function Layout() {
  const { pageType } = usePageData()

  const content = useMemo(() => {
    if (pageType === 'home') {
      return <div>Home</div>
    } else if (pageType === 'doc') {
      return <div>Doc</div>
    } else {
      return <div>404</div>
    }
  }, [pageType])

  return (
    <div>
      <Nav />
    </div>
  )
}
