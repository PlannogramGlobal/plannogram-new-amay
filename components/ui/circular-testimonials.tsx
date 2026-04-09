"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react"

import { cn } from "@/lib/utils"

export interface CircularTestimonial {
  quote: string
  name: string
  designation: string
  src: string
}

export interface CircularTestimonialColors {
  name?: string
  designation?: string
  testimony?: string
  arrowBackground?: string
  arrowForeground?: string
  arrowHoverBackground?: string
}

export interface CircularTestimonialFontSizes {
  name?: string
  designation?: string
  quote?: string
}

export interface CircularTestimonialsProps {
  testimonials: CircularTestimonial[]
  autoplay?: boolean
  colors?: CircularTestimonialColors
  fontSizes?: CircularTestimonialFontSizes
  className?: string
}

function calculateGap(width: number) {
  const desktopMin = 1024
  const desktopMax = 1456
  const gapAtDesktopMin = 68
  const gapAtDesktopMax = 98

  if (width < desktopMin) {
    const w = Math.max(260, width)
    return Math.round(16 + (w / desktopMin) * (gapAtDesktopMin - 20))
  }
  if (width >= desktopMax) {
    return Math.max(
      gapAtDesktopMin,
      gapAtDesktopMax + 0.06018 * (width - desktopMax),
    )
  }
  return (
    gapAtDesktopMin +
    (gapAtDesktopMax - gapAtDesktopMin) *
      ((width - desktopMin) / (desktopMax - desktopMin))
  )
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
  className,
}: CircularTestimonialsProps) {
  const colorName = colors.name ?? "#fafafa"
  const colorDesignation = colors.designation ?? "#a3a3a3"
  const colorTestimony = colors.testimony ?? "#e5e5e5"
  const colorArrowBg = colors.arrowBackground ?? "#1a1a1a"
  const colorArrowFg = colors.arrowForeground ?? "#f4f4f5"
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb"

  const fontSizeName = fontSizes.name ?? "1.5rem"
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem"
  const fontSizeQuote = fontSizes.quote ?? "1.125rem"

  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverPrev, setHoverPrev] = useState(false)
  const [hoverNext, setHoverNext] = useState(false)
  const [containerWidth, setContainerWidth] = useState(1200)

  const imageContainerRef = useRef<HTMLDivElement>(null)
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  )

  const testimonialsLength = useMemo(
    () => testimonials.length,
    [testimonials],
  )
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials],
  )

  const clearAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current)
      autoplayIntervalRef.current = null
    }
  }, [])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength)
    clearAutoplay()
  }, [testimonialsLength, clearAutoplay])

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonialsLength) % testimonialsLength,
    )
    clearAutoplay()
  }, [testimonialsLength, clearAutoplay])

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!autoplay || testimonialsLength < 1) return
    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsLength)
    }, 5000)
    return clearAutoplay
  }, [autoplay, testimonialsLength, clearAutoplay])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [handlePrev, handleNext])

  function getImageStyle(index: number): CSSProperties {
    const gap = calculateGap(containerWidth)
    const maxStickUp = gap * 0.75
    const sideScale =
      containerWidth < 480 ? 0.74 : containerWidth < 768 ? 0.8 : 0.85
    const isActive = index === activeIndex
    const isLeft =
      (activeIndex - 1 + testimonialsLength) % testimonialsLength === index
    const isRight = (activeIndex + 1) % testimonialsLength === index
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform:
          "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      }
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(${sideScale}) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      }
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(${sideScale}) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      }
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    }
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  if (testimonialsLength === 0) return null

  return (
    <div
      className={cn(
        "w-full max-w-4xl overflow-x-hidden px-3 py-4 sm:px-4 md:max-w-[56rem] md:px-8 md:py-6",
        className,
      )}
    >
      <div className="grid gap-8 md:grid-cols-2 md:items-stretch md:gap-x-20 md:gap-y-0 lg:gap-x-28 xl:gap-x-32">
        <div
          ref={imageContainerRef}
          className="relative mx-auto w-full max-w-[min(100%,20rem)] [perspective:1000px] sm:max-w-none sm:mx-0 h-56 sm:h-64 md:h-[26rem] md:max-w-none lg:h-[30rem] xl:h-[32rem]"
        >
          {testimonials.map((testimonial, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${testimonial.name}-${index}`}
              src={testimonial.src}
              alt={testimonial.name}
              className="absolute left-0 top-0 h-full w-full rounded-3xl object-cover shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              style={getImageStyle(index)}
            />
          ))}
        </div>

        <div
          className={cn(
            "flex min-h-0 flex-col sm:min-h-[16rem] md:min-h-[26rem] lg:min-h-[30rem] xl:min-h-[32rem]",
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3
                className="mb-1 font-bold"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.name}
              </h3>
              <p
                className="mb-5 md:mb-6"
                style={{
                  color: colorDesignation,
                  fontSize: fontSizeDesignation,
                }}
              >
                {activeTestimonial.designation}
              </p>
              <motion.p
                className="max-w-xl leading-[1.75] md:leading-[1.8]"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={`${activeIndex}-${i}-${word}`}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.025 * i,
                    }}
                    className="inline-block"
                  >
                    {word}
                    &nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="min-h-4 flex-1 sm:min-h-10 md:min-h-12" aria-hidden />

          <div className="flex gap-4 pt-6 md:gap-6 md:pt-14 lg:pt-16">
            <button
              type="button"
              className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 transition-colors duration-300 md:size-12"
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
              }}
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous"
            >
              <ChevronLeft className="size-6 md:size-7" style={{ color: colorArrowFg }} strokeWidth={2} />
            </button>
            <button
              type="button"
              className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 transition-colors duration-300 md:size-12"
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next"
            >
              <ChevronRight className="size-6 md:size-7" style={{ color: colorArrowFg }} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircularTestimonials
