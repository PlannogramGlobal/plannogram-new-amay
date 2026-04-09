import type { Metadata } from "next"

import { InitiativesPageClient } from "@/components/initiatives-page-client"
import { SubpageLayout } from "@/components/subpage-layout"
import { getInitiativeCards } from "@/lib/initiatives-store"

export const metadata: Metadata = {
  title: "Initiatives",
  description:
    "Plannogram initiatives: dialogues, exchanges, and programs on urban planning, climate, housing, and regional collaboration.",
}

export const dynamic = "force-dynamic"

export default async function InitiativesPage() {
  const cards = await getInitiativeCards()
  const scrollHeroItems = cards.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    href: `/initiatives/${item.id}`,
  }))

  return (
    <SubpageLayout>
      <main className="pb-8 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <header className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Initiatives
            </h1>
          </header>
        </div>

        <InitiativesPageClient
          scrollHeroItems={scrollHeroItems}
          cards={cards}
        />
      </main>
    </SubpageLayout>
  )
}
