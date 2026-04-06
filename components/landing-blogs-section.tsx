"use client"

import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const POSTS = [
  {
    title: "Inclusive streets, safer neighbourhoods",
    excerpt:
      "How small design shifts reshape mobility and trust in dense urban cores.",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=900&q=80",
    href: "/blogs",
  },
  {
    title: "Green corridors as city infrastructure",
    excerpt:
      "Linking ecology, heat resilience, and long-term planning decisions.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80",
    href: "/blogs",
  },
  {
    title: "Participatory budgeting at scale",
    excerpt:
      "Lessons from cities that put residents in the room where priorities are set.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
    href: "/blogs",
  },
] as const

export function LandingBlogsSection() {
  return (
    <section
      id="latest-blogs"
      className={cn(
        "relative isolate min-h-dvh shrink-0 snap-start snap-always bg-black px-4 pb-20 pt-16 md:px-8 md:pb-24 md:pt-24",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center gap-4 text-center md:mb-14">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            From the blog
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-white/60 md:text-base">
            Ideas, case studies, and conversations on planning and urban policy.
          </p>
          <Link
            href="/blogs"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full bg-white px-8 text-base font-semibold text-black hover:bg-white/90",
            )}
          >
            All articles
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {POSTS.map((post) => (
            <li key={post.title}>
              <Link
                href={post.href}
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.12]",
                  "bg-gradient-to-b from-white/[0.07] to-white/[0.02]",
                  "shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]",
                  "backdrop-blur-xl transition hover:border-white/20",
                )}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-semibold leading-snug text-white md:text-lg">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 text-sm font-medium text-white/85 underline-offset-4 group-hover:underline">
                    Read more
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
