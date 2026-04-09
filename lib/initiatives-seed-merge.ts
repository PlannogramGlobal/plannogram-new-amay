import { BODIES, DEFAULT_CTAS } from "@/lib/initiatives-bodies"
import type { InitiativeRecord } from "@/lib/initiative-types"
import { INITIATIVE_CARDS } from "@/lib/initiatives-list"

export function getDefaultInitiatives(): InitiativeRecord[] {
  return INITIATIVE_CARDS.map((card) => {
    const b = BODIES[card.id]
    if (!b) {
      throw new Error(`Missing body for initiative: ${card.id}`)
    }
    return {
      id: card.id,
      title: card.title,
      excerpt: card.excerpt,
      date: card.date,
      image: card.image,
      gallery: [] as string[],
      category: b.category,
      readMinutes: b.readMinutes,
      heroCaption: b.heroCaption
        ? { title: b.heroCaption.title, subtitle: b.heroCaption.subtitle }
        : null,
      intro: b.intro,
      sections: b.sections.map((s) => ({
        heading: s.heading,
        paragraphs: [...s.paragraphs],
      })),
      ctas: DEFAULT_CTAS.map((c) => ({ ...c })),
    }
  })
}
