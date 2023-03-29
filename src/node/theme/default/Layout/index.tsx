import React from 'react'
import { usePageData } from '../../../../runtime'
import Nav from '../components/Nav'
import '../style/base.css'
import '../style/vars.css'
import 'uno.css'
import HomeLayout from './HomeLayout'

export default function Layout() {
  const { pageType } = usePageData()

  const getContent = () => {
    if (pageType === 'home') {
      return <HomeLayout />
    } else if (pageType === 'doc') {
      return <div>Doc</div>
    } else {
      return <div>404</div>
    }
  }

  return (
    <div>
      <Nav />
      {getContent()}
    </div>
  )
}
