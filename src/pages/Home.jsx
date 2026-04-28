import React from 'react'
import HeroSection from './home/HeroSection'
import ServicesSection from './home/ServicesSection'
import NewsSection from './home/NewsSection'

export default function Home() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <HeroSection />
      <ServicesSection />
      <NewsSection />
    </div>
  )
}