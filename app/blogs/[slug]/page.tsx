import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { InitiativeArticleLayout } from "@/components/initiative-article-layout"
import { SubpageLayout } from "@/components/subpage-layout"
import {
  getAllBlogSlugs,
  getBlogArticleBySlug,
} from "@/lib/blogs-store"

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getBlogArticleBySlug(slug)
  if (!article) {
    return { title: "Blog post" }
  }
  return {
    title: `${article.title} · Blog`,
    description:
      article.intro && article.intro.length > 0
        ? article.intro.slice(0, 160)
        : undefined,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const article = await getBlogArticleBySlug(slug)
  if (!article) notFound()

  return (
    <SubpageLayout surface="light">
      <nav className="w-full px-4 pt-2 md:px-6 md:pt-4">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
        >
          ← All posts
        </Link>
      </nav>
      <InitiativeArticleLayout article={article} />
    </SubpageLayout>
  )
}
