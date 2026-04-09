import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { InitiativeArticleLayout } from "@/components/initiative-article-layout"
import { SubpageLayout } from "@/components/subpage-layout"
import { getAllInitiativeSlugs, getInitiativeArticle } from "@/lib/initiatives-detail"

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  const slugs = await getAllInitiativeSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getInitiativeArticle(slug)
  if (!article) {
    return { title: "Initiative" }
  }
  return {
    title: `${article.title} · Initiatives`,
    description:
      article.intro && article.intro.length > 0
        ? article.intro.slice(0, 160)
        : undefined,
  }
}

export default async function InitiativeDetailPage({ params }: Props) {
  const { slug } = await params
  const article = await getInitiativeArticle(slug)
  if (!article) notFound()

  return (
    <SubpageLayout surface="light">
      <nav className="w-full px-4 pt-2 md:px-6 md:pt-4">
        <Link
          href="/initiatives"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
        >
          ← All initiatives
        </Link>
      </nav>
      <InitiativeArticleLayout article={article} />
    </SubpageLayout>
  )
}
