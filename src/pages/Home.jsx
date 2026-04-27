import HeroSection from './home/HeroSection'
import ServicesSection from './home/ServicesSection'
import NewsSection from './home/NewsSection'
import LowerSections from './home/LowerSections'
import MegaFooter from './home/MegaFooter'

// Override Layout padding for this page via negative margin trick
export default function Home() {
  return (
    <div style={{
      margin: '-16px -24px',          // bust out of Layout's padding
      fontFamily: 'system-ui, sans-serif',
    }}>
      <HeroSection />
      <ServicesSection />
      <NewsSection />
      <LowerSections />
      <MegaFooter />
    </div>
  )
}