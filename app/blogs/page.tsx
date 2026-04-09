import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { SubpageLayout } from "@/components/subpage-layout"
import { getBlogCards } from "@/lib/blogs-store"
import { cn, shouldUnoptimizeImageSrc } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideas, case studies, and conversations on urban planning, policy, and inclusive cities from Plannogram.",
}

export const dynamic = "force-dynamic"

export default async function BlogsPage() {
  const posts = await getBlogCards()

  return (
    <SubpageLayout>
      <main className="mx-auto max-w-6xl px-4 pb-16 md:px-8 md:pb-24">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            From the blog
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">
            Ideas, case studies, and conversations on planning and urban policy.
            New pieces are added as our community publishes.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mt-12 text-center text-sm text-white/55">
            No posts yet. Check back soon.
          </p>
        ) : (
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
            {posts.map((post) => (
              <li key={post.id} id={post.id} className="scroll-mt-28">
                <Link
                  href={`/blogs/${post.id}`}
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.12] no-underline",
                    "bg-gradient-to-b from-white/[0.07] to-white/[0.02]",
                    "shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]",
                    "transition hover:border-white/22",
                  )}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      unoptimized={shouldUnoptimizeImageSrc(post.image)}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <p className="text-xs font-medium text-white/45">
                      {post.date}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold tracking-tight text-white md:text-xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex text-sm font-medium text-white/90">
                      Read article
                      <span
                        className="ml-1 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </SubpageLayout>
  )
}
