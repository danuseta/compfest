import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/sections/HeroSection"
import AboutSection from "@/components/sections/AboutSection"
import FeaturesSection from "@/components/sections/FeaturesSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background transition-all duration-500">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}

