"use client"

import { LandingBlogsSection } from "@/components/landing-blogs-section"
import { LandingEvents } from "@/components/landing-events"
import { LandingHero } from "@/components/landing-hero"
import { LandingTestimonialsSection } from "@/components/landing-testimonials"
import { LandingTypewriterSection } from "@/components/landing-typewriter-section"
import FooterGlow from "@/components/ui/footer-glow"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <main
      className={cn(
        "h-dvh min-h-0 snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth bg-black overscroll-y-contain",
        "[-webkit-overflow-scrolling:touch] touch-pan-y",
      )}
    >
      <LandingHero />
      <LandingTypewriterSection />
      <LandingEvents />
      <LandingBlogsSection />
      <LandingTestimonialsSection />
      <FooterGlow />
    </main>
  )
}
