import React, { useMemo } from 'react'
import 'uno.css'
import { usePageData } from '../../../../runtime'

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

  return <div>{content}</div>
}
