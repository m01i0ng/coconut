import { usePageData } from '../../../../../runtime'
import HomeFeature from '../../components/HomeFeature'
import HomeHero from '../../components/HomeHero'

export default function HomeLayout() {
  const { frontMatter } = usePageData()

  return (
    <div>
      <HomeHero hero={frontMatter.hero} />
      <HomeFeature features={frontMatter.features} />
    </div>
  )
}
