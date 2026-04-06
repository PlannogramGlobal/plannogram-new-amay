"use client"

import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

function InstagramIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-[1.125rem]", props.className)}
      fill="currentColor"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059 1.28.073 1.689.073 4.948 0 3.259-.014 3.668-.072 4.948-.196 4.354-2.617 6.78-6.979 6.98C15.668 23.986 15.259 24 12 24c-3.259 0-3.668-.014-4.948-.072-4.354-.199-6.78-2.619-6.98-6.98C.014 15.668 0 15.259 0 12c0-3.259.014-3.668.072-4.948.2-4.358 2.618-6.78 6.98-6.98C8.333.014 8.741 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function TwitterIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-[1.125rem]", props.className)}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-[1.125rem]", props.className)}
      fill="currentColor"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

const social = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    Icon: InstagramIcon,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/",
    Icon: TwitterIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    Icon: FacebookIcon,
  },
] as const

const navLinkClass =
  "rounded-full px-3 py-1.5 text-[0.8125rem] font-medium tracking-tight text-white/82 transition-colors duration-200 hover:bg-white/[0.12] hover:text-white sm:px-3.5 sm:text-sm"

export type SiteHeaderProps = {
  className?: string
}

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-3 pt-3 md:px-5 md:pt-5",
        className,
      )}
    >
      <header
        className={cn(
          "pointer-events-auto relative flex w-full max-w-5xl items-center gap-2 overflow-hidden",
          "rounded-[1.75rem] sm:rounded-[2rem]",
          "border border-white/[0.14]",
          "bg-gradient-to-b from-white/[0.16] via-white/[0.07] to-white/[0.03]",
          "shadow-[0_18px_50px_-12px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.07)_inset,0_1px_0_0_rgba(255,255,255,0.18)_inset]",
          "backdrop-blur-2xl backdrop-saturate-150",
          "py-1.5 pl-5 pr-2 sm:gap-3 sm:py-2 sm:pl-6 sm:pr-3 md:gap-4 md:py-2 md:pl-10 md:pr-4 lg:pl-12",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(120% 80% at 50% -20%, rgba(255,255,255,0.22), transparent 55%)",
          }}
          aria-hidden
        />

        <Link
          href="/"
          className="relative z-[1] shrink-0 opacity-95 transition-opacity duration-200 hover:opacity-100"
        >
          <Image
            src="/plannogram-logo.png"
            alt="Plannogram"
            width={320}
            height={70}
            className="h-7 w-auto max-w-[min(42vw,168px)] object-contain object-left sm:h-8 sm:max-w-[200px] md:h-9 md:max-w-[240px]"
            priority
          />
        </Link>

        <nav
          className="relative z-[1] ml-auto flex min-w-0 items-center justify-end gap-1 sm:gap-1.5 md:gap-2"
          aria-label="Main"
        >
          <Link href="/blogs" className={navLinkClass}>
            Blogs
          </Link>
          <Link href="/initiatives" className={navLinkClass}>
            Initiatives
          </Link>
          <Link href="/about" className={navLinkClass}>
            About Us
          </Link>

          <div
            className={cn(
              "ml-1 flex shrink-0 items-center gap-0.5 rounded-full border border-white/[0.12]",
              "bg-black/25 p-0.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:ml-2 sm:gap-0.5 sm:p-1",
            )}
          >
            {social.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-white/78",
                  "transition-colors duration-200 hover:bg-white/[0.14] hover:text-white",
                  "sm:size-8",
                )}
                aria-label={name}
              >
                <Icon />
              </a>
            ))}
          </div>
        </nav>
      </header>
    </div>
  )
}
