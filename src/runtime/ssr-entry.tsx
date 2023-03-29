import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import App from './App'

export function render(routePath: string) {
  return renderToString(
    <StaticRouter location={routePath}>
      <App />
    </StaticRouter>,
  )
}

export { routes } from 'coconut:routes'
