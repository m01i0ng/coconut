import { RouteObject, useRoutes } from 'react-router-dom'
import Index from '../../docs/guide'
import B from '../../docs/B'
import A from '../../docs/guide/A'

const routes: RouteObject[] = [
  {
    path: '/guide',
    element: <Index />,
  },
  {
    path: '/guide/a',
    element: <A />,
  },
  {
    path: '/b',
    element: <B />,
  },
]

export default function Content() {
  return useRoutes(routes)
}
