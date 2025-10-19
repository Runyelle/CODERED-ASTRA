import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutMissionSection } from "@/components/about-mission-section"
import { ImpactMetrics } from "@/components/impact-metrics"
import { BuyerCompanies } from "@/components/buyer-companies"
import { SponsorBar } from "@/components/sponsor-bar"
import { Footer } from "@/components/footer"
import { ChatboxButton } from "@/components/chatbox-button"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutMissionSection />
      <ImpactMetrics />
      <BuyerCompanies />
      <SponsorBar />
      <Footer />
      <ChatboxButton />
    </main>
  )
}
