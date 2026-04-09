import { DEFAULT_CTAS } from "@/lib/initiatives-bodies"
import type { InitiativeRecord } from "@/lib/initiative-types"

/** Blank record for the “add initiative” admin flow. */
export function emptyInitiativeTemplate(): InitiativeRecord {
  return {
    id: "",
    title: "",
    excerpt: "",
    date: "",
    image: "",
    gallery: [],
    category: "",
    readMinutes: 8,
    heroCaption: null,
    intro: "",
    sections: [{ heading: "", paragraphs: [""] }],
    ctas: DEFAULT_CTAS.map((c) => ({ ...c })),
  }
}
