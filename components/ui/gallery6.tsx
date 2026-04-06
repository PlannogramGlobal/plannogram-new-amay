"use client"

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

export interface Gallery6Item {
  id: string
  title: string
  summary: string
  url: string
  image: string
}

export interface Gallery6Props {
  id?: string
  heading?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  items?: Gallery6Item[]
  className?: string
}

function SlideLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  const internal = href.startsWith("/") && !href.startsWith("//")
  if (internal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

function CtaLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  const internal = href.startsWith("/") && !href.startsWith("//")
  if (internal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

export function Gallery6({
  id,
  heading = "Gallery",
  description,
  ctaLabel = "View all",
  ctaHref = "/initiatives",
  items = [
    {
      id: "item-1",
      title: "Build Modern UIs",
      summary:
        "Create stunning user interfaces with our comprehensive design system.",
      url: "#",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80&auto=format&fit=crop",
    },
    {
      id: "item-2",
      title: "Computer Vision Technology",
      summary:
        "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
      url: "#",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80&auto=format&fit=crop",
    },
    {
      id: "item-3",
      title: "Machine Learning Automation",
      summary:
        "Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions with minimal human intervention.",
      url: "#",
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80&auto=format&fit=crop",
    },
    {
      id: "item-4",
      title: "Predictive Analytics",
      summary:
        "Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes, helping businesses make data-driven decisions.",
      url: "#",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80&auto=format&fit=crop",
    },
    {
      id: "item-5",
      title: "Neural Network Architecture",
      summary:
        "Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning and pattern recognition.",
      url: "#",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80&auto=format&fit=crop",
    },
  ],
  className,
}: Gallery6Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!carouselApi) return
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }
    updateSelection()
    carouselApi.on("select", updateSelection)
    carouselApi.on("reInit", updateSelection)
    return () => {
      carouselApi.off("select", updateSelection)
      carouselApi.off("reInit", updateSelection)
    }
  }, [carouselApi])

  return (
    <section
      id={id}
      className={cn(
        "relative isolate flex flex-col bg-black text-white",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container mx-auto w-full max-w-7xl shrink-0 px-4 pt-1 md:px-6 md:pt-2">
        <div className="mb-6 flex flex-col gap-5 md:mb-8 md:items-center lg:mb-10">
          <div className="flex w-full max-w-2xl flex-col items-start text-left md:mx-auto md:items-center md:text-center md:text-balance">
            <h2 className="mb-3 w-full text-3xl font-semibold tracking-tight md:mb-4 md:text-4xl lg:mb-5 lg:text-5xl">
              {heading}
            </h2>
            {description ? (
              <p className="mb-4 w-full text-sm leading-relaxed text-white/60 md:text-base">
                {description}
              </p>
            ) : null}
            <CtaLink
              href={ctaHref}
              className="group inline-flex items-center gap-1 text-sm font-medium text-white/90 md:text-base lg:text-lg"
            >
              {ctaLabel}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-[1.125rem]" />
            </CtaLink>
          </div>
          <div className="flex w-full shrink-0 items-center justify-start gap-2 md:justify-center">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="border-white/25 bg-white/5 text-white hover:bg-white/10 disabled:pointer-events-auto disabled:opacity-40"
              aria-label="Previous slide"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="border-white/25 bg-white/5 text-white hover:bg-white/10 disabled:pointer-events-auto disabled:opacity-40"
              aria-label="Next slide"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 w-full flex-1 flex-col justify-center pb-6 md:pb-10">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            loop: false,
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative left-[-0.5rem] md:left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-4 md:ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-4 md:max-w-[452px]">
                <SlideLink
                  href={item.url}
                  className="group flex flex-col justify-between text-left outline-none"
                >
                  <div>
                    <div className="flex aspect-[3/2] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          {/* eslint-disable-next-line @next/next/no-img-element -- remote Unsplash URLs; already used across site */}
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium text-white md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                    {item.title}
                  </div>
                  <div className="mb-6 line-clamp-2 text-sm text-white/55 md:mb-10 md:text-base lg:mb-8">
                    {item.summary}
                  </div>
                  <div className="flex items-center text-sm text-white/85">
                    Read more{" "}
                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </SlideLink>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
