"use client"

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useMemo,
} from "react"

import { cn } from "@/lib/utils"

export interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: ReactNode
  vertical?: boolean
  repeat?: number
  ariaLabel?: string
  ariaLive?: "off" | "polite" | "assertive"
  ariaRole?: string
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ariaLabel,
  ariaLive = "off",
  ariaRole = "marquee",
  ...props
}: MarqueeProps) {
  const tracks = useMemo(
    () =>
      Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around",
            !vertical
              ? "flex-row [gap:var(--gap)] animate-marquee"
              : "flex-col [gap:var(--gap)] animate-marquee-vertical",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      )),
    [repeat, children, vertical, pauseOnHover, reverse],
  )

  return (
    <div
      {...props}
      data-slot="marquee"
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        !vertical ? "flex-row" : "flex-col",
        className,
      )}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      role={ariaRole}
      tabIndex={0}
    >
      {tracks}
    </div>
  )
}
