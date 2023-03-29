import { usePageData } from '../../../../../runtime'
import HomeHero from '../../components/HomeHero'
import HomeFeature from '../../components/HomeFeature'

export default function HomeLayout() {
  const { frontMatter } = usePageData()

  return (
    <div>
      <HomeHero hero={frontMatter.hero} />
      <HomeFeature features={frontMatter.features} />
    </div>
  )
}
