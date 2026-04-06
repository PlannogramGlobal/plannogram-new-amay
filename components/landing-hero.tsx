"use client"

import Link from "next/link"

import GlowHero from "@/components/ui/hero-1"
import { GlbOrbitViewer } from "@/components/ui/glb-orbit-viewer"
import { SiteHeader } from "@/components/site-header"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LandingHero() {
  return (
    <div className="relative h-dvh min-h-dvh w-full shrink-0 snap-start snap-always overflow-hidden bg-black">
      <SiteHeader />

      <GlbOrbitViewer
        modelSrc="/casa_city_logo.glb"
        className="absolute inset-0 z-0"
        cameraPosition={[0, 2.2, 11]}
        lookAt={[5, 0, 0]}
        areaLightY={4}
        areaLightWidth={4}
        areaLightDepth={1.6}
        areaLightIntensity={50}
        areaLightColor="#9e5ecf"
        areaLightXRange={6}
        areaLightZRange={5}
        toneMappingExposure={0.44}
        ambientIntensity={0.045}
        ambientColor="#141a26"
        hemisphereIntensity={0.09}
        hemisphereSkyColor="#222a3a"
        hemisphereGroundColor="#05060a"
        vignetteBandPercent={26}
        vignetteBlurPx={22}
        vignetteEdgeDarken={0.65}
        modelYawSpeed={0.1}
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10",
          "flex items-center justify-center px-4 py-12 md:px-8 md:py-16",
        )}
      >
        <div
          className={cn(
            "flex w-full max-w-3xl flex-col items-center text-center text-white",
          )}
        >
          <GlowHero
            glowText="Plannogram"
            glowTextSize="xl"
            className="mb-5 w-full md:mb-7"
          />
          <p
            className={cn(
              "mx-auto max-w-[min(100%,36rem)] px-2 text-center font-normal leading-snug tracking-wide text-white/70",
              "text-pretty hyphens-none",
              "text-[clamp(0.8125rem,3.1vw,0.9375rem)] sm:text-sm sm:leading-normal md:max-w-[34rem]",
            )}
          >
            An international idea exchange platform on urban planning,
            development and policies
          </p>

          <div
            className={cn(
              "pointer-events-auto mt-2 flex w-full max-w-2xl flex-wrap items-center justify-center gap-4 md:mt-3 md:gap-5",
            )}
          >
            <Link
              href="/about"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 min-h-11 rounded-full bg-white px-8 text-base font-semibold text-black no-underline hover:bg-white/90 md:h-12 md:min-h-12 md:px-10 md:text-lg",
              )}
            >
              More about us
            </Link>
            <Link
              href="/initiatives"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 min-h-11 rounded-full border-2 border-white/50 bg-white/5 px-8 text-base font-semibold text-white no-underline hover:bg-white/12 hover:text-white md:h-12 md:min-h-12 md:px-10 md:text-lg",
              )}
            >
              Our Initiatives
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
