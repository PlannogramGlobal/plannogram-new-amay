export type InitiativeSection = {
  heading: string
  paragraphs: string[]
}

export type InitiativeCta = {
  label: string
  href: string
  external?: boolean
}

/** Full persisted record (JSON file + editor). */
export type InitiativeRecord = {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  gallery: string[]
  category: string
  readMinutes: number
  /** null = no overlay on hero */
  heroCaption: { title: string; subtitle: string } | null
  intro: string
  sections: InitiativeSection[]
  ctas: InitiativeCta[]
}

/** Shape used by article layout (normalized). */
export type InitiativeArticle = {
  slug: string
  title: string
  dateLabel: string
  heroImage: string
  gallery: string[]
  category: string
  readMinutes: number
  heroCaption?: { title: string; subtitle: string }
  intro: string
  sections: InitiativeSection[]
  ctas: InitiativeCta[]
}

export type InitiativeCard = Pick<
  InitiativeRecord,
  "id" | "title" | "excerpt" | "date" | "image"
>

export type InitiativeStoreFile = {
  version: 1
  initiatives: InitiativeRecord[]
}
