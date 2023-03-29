import React from 'react'
import 'uno.css'
import { Content } from '../../../../runtime'

export default function Layout() {
  return (
    <div>
      <h1 p="2" m="4">
        Content
      </h1>
      <h1>Doc</h1>
      <Content />
    </div>
  )
}
