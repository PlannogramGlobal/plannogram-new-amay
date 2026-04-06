"use client"

import Image from "next/image"
import Link from "next/link"
import type { FC } from "react"

export type CardItem = {
  title: string
  description: string
  tag: string
  src: string
  link: string
  color: string
  textColor: string
}

export type iCardItem = CardItem

type CardProps = Omit<CardItem, "tag">

/** Fixed card frame — identical box on every slide (photo uses cover + center). */
const CARD_FRAME =
  "relative mx-auto box-border flex h-[400px] min-h-[400px] max-h-[400px] w-full max-w-[800px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl px-6 py-8 shadow-lg md:px-10 md:py-10"

const Card: FC<CardProps> = ({
  title,
  description,
  color,
  textColor,
  src,
  link,
}) => {
  const inner = (
    <div className={CARD_FRAME} style={{ backgroundColor: color }}>
      <div className="absolute inset-0 z-0">
        <Image
          src={src}
          alt=""
          fill
          className="object-cover object-center"
          sizes="800px"
        />
      </div>
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/45 to-black/50"
        aria-hidden
      />

      <span className="relative z-10 mt-2 font-sans text-4xl font-black tracking-tight sm:text-5xl md:mt-5 md:text-7xl">
        <span className="relative z-10 drop-shadow-md" style={{ color: textColor }}>
          {title}
        </span>
      </span>
      <div
        className="relative z-10 mt-2 max-w-xl px-2 text-center font-sans text-base font-medium lowercase tracking-wide sm:text-lg md:mt-3 md:text-2xl"
        style={{ lineHeight: 1.4, color: textColor }}
      >
        {description}
      </div>
    </div>
  )

  const isExternal = link.startsWith("http")
  const wrapped =
    link === "#" ? (
      inner
    ) : isExternal ? (
      <a href={link} className="block" target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    ) : (
      <Link href={link} className="block">
        {inner}
      </Link>
    )

  return (
    <div className="sticky top-0 z-20 flex h-dvh min-h-0 items-start justify-center px-3 pb-10 pt-[calc(var(--events-header-h,7.125rem)+0.125rem)] sm:px-4 md:px-6 md:pb-12">
      {wrapped}
    </div>
  )
}

type CardsParallaxProps = {
  items: CardItem[]
}

/**
 * Vertical stack of sticky, full-viewport “slides” for parallax-style scrolling.
 */
const CardsParallax: FC<CardsParallaxProps> = ({ items }) => {
  return (
    <div className="relative bg-black">
      {items.map((project, i) => (
        <Card
          key={`${project.title}-${i}`}
          title={project.title}
          description={project.description}
          src={project.src}
          link={project.link}
          color={project.color}
          textColor={project.textColor}
        />
      ))}
    </div>
  )
}

export { CardsParallax }
