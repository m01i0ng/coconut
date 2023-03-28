import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import siteData from 'coconut:site-data'
import { BrowserRouter } from 'react-router-dom'

console.log(siteData)

function renderInBrowser() {
  const containerEl = document.getElementById('root')
  if (!containerEl) {
    throw new Error('no #root element found')
  }
  createRoot(containerEl).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
}

renderInBrowser()
