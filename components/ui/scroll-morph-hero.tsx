"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useMemo, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"

import { cn, shouldUnoptimizeImageSrc } from "@/lib/utils"

export type AnimationPhase = "scatter" | "line" | "circle"

export type ScrollMorphHeroItem = {
  id: string
  title: string
  image: string
  href: string
}

interface FlipCardProps {
  src: string
  title: string
  href: string
  imgWidth: number
  imgHeight: number
  target: {
    x: number
    y: number
    rotation: number
    scale: number
    opacity: number
  }
}

function FlipCard({
  src,
  title,
  href,
  imgWidth,
  imgHeight,
  target,
}: FlipCardProps) {
  const router = useRouter()

  const go = () => {
    router.push(href)
  }

  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: "absolute",
        left: -imgWidth / 2,
        top: -imgHeight / 2,
        width: imgWidth,
        height: imgHeight,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="group cursor-pointer"
      role="link"
      tabIndex={0}
      aria-label={`Open ${title}`}
      onClick={go}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          go()
        }
      }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        whileHover={{ rotateY: 180 }}
      >
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-zinc-800 shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes={`${imgWidth}px`}
            className="object-cover"
            unoptimized={shouldUnoptimizeImageSrc(src)}
          />
          <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-transparent" />
        </div>

        <div
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-zinc-900 p-1.5 shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="mb-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-sky-400 md:text-[0.68rem]">
            View
          </p>
          <p className="line-clamp-3 px-1 text-center text-[0.7rem] font-medium leading-snug text-white md:text-[0.8rem]">
            {title}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

const INITIAL_BATCH = 12
/** Scroll distance after start threshold to unlock each additional batch of 12. */
const BATCH_SCROLL_STEP = 480
/** Scroll position where extra batches begin counting (after intro morph). */
const BATCH_SCROLL_START = 720
/** Rotation segment: full 360° maps to this scroll span (unchanged feel). */
const ROTATION_SCROLL_END = 4200
/** When scrolling up, drop spawned cards if more than this many were visible, or always snap back to the initial batch when scroll says so. */
const COLLAPSE_VISIBLE_THRESHOLD = 16

const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t

function stableScatterForId(
  id: string,
  totalForScale: number,
): Pick<FlipCardProps["target"], "x" | "y" | "rotation" | "scale" | "opacity"> {
  let h = 2166136261
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  const r1 = ((h >>> 0) % 10001) / 10000
  const r2 = (((h >>> 8) % 65536) / 65536 + (h % 7) * 0.0001) % 1
  const r3 = (((h >>> 16) % 65536) / 65536 + (h % 11) * 0.0001) % 1
  const scaleBase = totalForScale > 8 ? 0.45 : 0.52
  return {
    x: (r1 - 0.5) * 1100,
    y: (r2 - 0.5) * 720,
    rotation: (r3 - 0.5) * 130,
    scale: scaleBase,
    opacity: 0,
  }
}

export type ScrollMorphHeroProps = {
  items: ScrollMorphHeroItem[]
  className?: string
}

function cardDimensions(total: number, isNarrow: boolean) {
  if (total > 8)
    return isNarrow ? { w: 108, h: 150 } : { w: 96, h: 134 }
  if (total > 5)
    return isNarrow ? { w: 118, h: 164 } : { w: 106, h: 148 }
  return isNarrow ? { w: 128, h: 178 } : { w: 116, h: 162 }
}

export function ScrollMorphHero({ items, className }: ScrollMorphHeroProps) {
  const itemsKey = useMemo(() => items.map((i) => i.id).join("|"), [items])

  const maxScroll = useMemo(() => {
    const extra = Math.max(0, items.length - INITIAL_BATCH)
    const batches = Math.ceil(extra / INITIAL_BATCH)
    return ROTATION_SCROLL_END + batches * BATCH_SCROLL_STEP
  }, [items.length])

  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(INITIAL_BATCH, items.length),
  )

  useEffect(() => {
    setVisibleCount(Math.min(INITIAL_BATCH, items.length))
  }, [itemsKey, items.length])

  const display = useMemo(
    () => items.slice(0, Math.min(visibleCount, items.length)),
    [items, visibleCount],
  )
  const total = display.length

  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter")
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const isNarrow =
    containerSize.width === 0 || containerSize.width < 768
  const { w: IMG_WIDTH, h: IMG_HEIGHT } = useMemo(
    () => cardDimensions(total, isNarrow),
    [total, isNarrow],
  )

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    }

    const observer = new ResizeObserver(handleResize)
    observer.observe(el)
    setContainerSize({
      width: el.offsetWidth,
      height: el.offsetHeight,
    })

    return () => observer.disconnect()
  }, [])

  const virtualScroll = useMotionValue(0)
  const scrollRef = useRef(0)

  useEffect(() => {
    const v = scrollRef.current
    if (v > maxScroll) {
      scrollRef.current = maxScroll
      virtualScroll.set(maxScroll)
    }
  }, [maxScroll, virtualScroll])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const cap = maxScroll
      const next = Math.min(Math.max(scrollRef.current + e.deltaY, 0), cap)
      scrollRef.current = next
      virtualScroll.set(next)
    }

    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY
      touchStartY = touchY
      const cap = maxScroll
      const next = Math.min(Math.max(scrollRef.current + deltaY, 0), cap)
      scrollRef.current = next
      virtualScroll.set(next)
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    })
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    })

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
    }
  }, [virtualScroll, maxScroll])

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1])
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 })

  const scrollRotate = useTransform(
    virtualScroll,
    [600, ROTATION_SCROLL_END],
    [0, 360],
  )
  const smoothScrollRotate = useSpring(scrollRotate, {
    stiffness: 40,
    damping: 20,
  })

  const mouseX = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const relativeX = e.clientX - rect.left
      const normalizedX = (relativeX / rect.width) * 2 - 1
      mouseX.set(normalizedX * (total > 8 ? 88 : 80))
    }
    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, total])

  const itemsLengthRef = useRef(items.length)
  itemsLengthRef.current = items.length

  useEffect(() => {
    const computeVisible = (v: number, len: number) => {
      if (len <= INITIAL_BATCH) return len
      const u = Math.max(0, v - BATCH_SCROLL_START)
      const extraUnits = Math.floor(u / BATCH_SCROLL_STEP)
      return Math.min(len, INITIAL_BATCH + extraUnits * INITIAL_BATCH)
    }

    const applyVisibleFromScroll = (v: number) => {
      const len = itemsLengthRef.current
      if (len <= INITIAL_BATCH) {
        setVisibleCount(len)
        return
      }
      const next = computeVisible(v, len)
      setVisibleCount((c) => {
        if (next >= c) return next
        if (c > COLLAPSE_VISIBLE_THRESHOLD) return next
        if (next <= INITIAL_BATCH) return next
        return c
      })
    }
    const unsub = virtualScroll.on("change", applyVisibleFromScroll)
    applyVisibleFromScroll(virtualScroll.get())
    return () => {
      unsub()
    }
  }, [virtualScroll, itemsKey])

  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("line"), 500)
    const t2 = setTimeout(() => setIntroPhase("circle"), 2500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const [morphValue, setMorphValue] = useState(0)
  const [rotateValue, setRotateValue] = useState(0)
  const [parallaxValue, setParallaxValue] = useState(0)

  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorphValue)
    const u2 = smoothScrollRotate.on("change", setRotateValue)
    const u3 = smoothMouseX.on("change", setParallaxValue)
    return () => {
      u1()
      u2()
      u3()
    }
  }, [smoothMorph, smoothScrollRotate, smoothMouseX])

  if (total < 1) return null

  const lineGutter = total > 8 ? (isNarrow ? 40 : 52) : 14
  const lineSpacing = IMG_WIDTH + lineGutter

  const spreadAngle = total > 8
    ? isNarrow
      ? 142
      : 178
    : isNarrow
      ? 108
      : 136

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-black",
        "min-h-[440px] touch-none sm:min-h-[500px] md:min-h-[580px]",
        className,
      )}
      aria-label="Initiatives preview — scroll to explore; additional initiatives appear as you scroll when there are more than twelve"
    >
      <div className="perspective-1000 flex h-full min-h-[inherit] w-full flex-col items-center justify-center">
        <div className="pointer-events-auto relative flex h-full min-h-[inherit] w-full items-center justify-center">
          <div className="relative h-0 w-0 shrink-0">
          {display.map((item, i) => {
            let target = {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
            }

            if (introPhase === "scatter") {
              target = stableScatterForId(item.id, total)
            } else if (introPhase === "line") {
              const lineX =
                i * lineSpacing - ((total - 1) * lineSpacing) / 2
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 }
            } else {
              const minDimension = Math.min(
                containerSize.width || 400,
                containerSize.height || 500,
              )

              const circleRadius = Math.min(
                minDimension * (total > 8 ? 0.44 : 0.42),
                total > 8 ? (isNarrow ? 318 : 400) : isNarrow ? 260 : 330,
              )
              const circleAngle = (i / total) * 360
              const circleRad = (circleAngle * Math.PI) / 180
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              }

              const arcRadius = Math.min(
                minDimension * (isNarrow ? 0.6 : 0.56),
                isNarrow ? 302 : 440,
              )
              const arcYScale = isNarrow ? 0.82 : 0.88

              const startAngle = -90 - spreadAngle / 2
              const step = spreadAngle / Math.max(total - 1, 1)

              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1)
              const maxRotation = spreadAngle * 0.78
              const boundedRotation = -scrollProgress * maxRotation

              const currentArcAngle = startAngle + i * step + boundedRotation
              const arcRad = (currentArcAngle * Math.PI) / 180

              const arcScale = isNarrow
                ? total > 8
                  ? 1.02
                  : 1.18
                : total > 8
                  ? 1.06
                  : 1.45

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius * arcYScale,
                rotation: currentArcAngle + 90,
                scale: arcScale,
              }

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              }
            }

            return (
              <FlipCard
                key={item.id}
                src={item.image}
                title={item.title}
                href={item.href}
                imgWidth={IMG_WIDTH}
                imgHeight={IMG_HEIGHT}
                target={target}
              />
            )
          })}
          </div>
        </div>
      </div>
    </div>
  )
}
