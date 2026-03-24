import type { Metadata } from "next"
import CapabilitiesHero from "@/components/capabilities-hero"
import EditorialProof from "@/components/editorial-proof"
import ProfileSection from "@/components/profile-section"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: `About | ${siteConfig.shortName}`,
  description: "About The Margin, its founder, and the editorial point of view behind the publication.",
}

export default function AboutPage() {
  return (
    <div className="bg-[#0A0A0A] text-[#E8E5E0]">
      <div className="container py-10 md:py-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <h1 className="font-display text-4xl leading-none text-[#C45A3C] md:text-5xl">About</h1>
          </div>
          <ProfileSection />
          <EditorialProof />
        </div>
      </div>
      <CapabilitiesHero />
    </div>
  )
}
