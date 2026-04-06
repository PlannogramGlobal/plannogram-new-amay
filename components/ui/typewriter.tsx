"use client"

import { useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface TypewriterProps {
  text: string | readonly string[]
  speed?: number
  initialDelay?: number
  waitTime?: number
  deleteSpeed?: number
  loop?: boolean
  className?: string
  showCursor?: boolean
  hideCursorOnType?: boolean
  cursorChar?: string | ReactNode
  cursorClassName?: string
}

export function Typewriter({
  text,
  speed = 50,
  initialDelay = 0,
  waitTime = 2000,
  deleteSpeed = 30,
  loop = true,
  className,
  showCursor = true,
  hideCursorOnType = false,
  cursorChar = "|",
  cursorClassName = "ml-1",
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const currentText = texts[currentTextIndex] ?? ""

    const startTyping = () => {
      if (isDeleting) {
        if (displayText === "") {
          setIsDeleting(false)
          if (currentTextIndex === texts.length - 1 && !loop) {
            return
          }
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          setCurrentIndex(0)
          timeout = setTimeout(() => {}, waitTime)
        } else {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev.slice(0, -1))
          }, deleteSpeed)
        }
      } else if (currentIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + currentText[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }, speed)
      } else if (texts.length > 1) {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, waitTime)
      }
    }

    if (currentIndex === 0 && !isDeleting && displayText === "") {
      timeout = setTimeout(startTyping, initialDelay)
    } else {
      startTyping()
    }

    return () => clearTimeout(timeout)
  }, [
    currentIndex,
    displayText,
    isDeleting,
    speed,
    deleteSpeed,
    waitTime,
    texts,
    currentTextIndex,
    loop,
    initialDelay,
  ])

  const activeText = texts[currentTextIndex] ?? ""

  return (
    <span className={cn("inline whitespace-pre-wrap tracking-tight", className)}>
      <span>{displayText}</span>
      {showCursor ? (
        <span
          className={cn(
            "typewriter-cursor inline-block",
            cursorClassName,
            hideCursorOnType &&
              (currentIndex < activeText.length || isDeleting) &&
              "hidden",
          )}
        >
          {cursorChar}
        </span>
      ) : null}
    </span>
  )
}
