import { useRoutes } from 'react-router-dom'
import { routes } from 'coconut:routes'

export default function Content() {
  console.log(routes)
  return useRoutes(routes)
}
