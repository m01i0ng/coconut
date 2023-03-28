import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

function renderInBrowser() {
  const containerEl = document.getElementById('root')
  if (!containerEl) {
    throw new Error('no #root element found')
  }
  createRoot(containerEl).render(<App />)
}

renderInBrowser()
