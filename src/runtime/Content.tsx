import { useRoutes } from 'react-router-dom'
import { routes } from 'coconut:routes'

export default function Content() {
  return useRoutes(routes)
}
