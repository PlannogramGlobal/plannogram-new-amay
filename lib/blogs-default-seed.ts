import type { InitiativeCta, InitiativeRecord } from "@/lib/initiative-types"
import { emptyInitiativeTemplate } from "@/lib/initiatives-empty-template"

const DEFAULT_BLOG_CTAS: InitiativeCta[] = [
  { label: "All posts", href: "/blogs" },
  { label: "Initiatives", href: "/initiatives" },
  { label: "From the home page", href: "/" },
  { label: "About Plannogram", href: "/about" },
]

/** Legacy card list — expanded into full records when no data/blogs.json exists. */
const LEGACY_POSTS = [
  {
    slug: "inclusive-streets",
    title: "Inclusive streets, safer neighbourhoods",
    excerpt:
      "How small design shifts reshape mobility and trust in dense urban cores.",
    date: "Mar 12, 2026",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "green-corridors",
    title: "Green corridors as city infrastructure",
    excerpt:
      "Linking ecology, heat resilience, and long-term planning decisions.",
    date: "Feb 28, 2026",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "participatory-budgeting",
    title: "Participatory budgeting at scale",
    excerpt:
      "Lessons from cities that put residents in the room where priorities are set.",
    date: "Feb 2, 2026",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "housing-and-equity",
    title: "Housing policy as equity policy",
    excerpt:
      "Why supply, tenure, and neighbourhood amenities have to move together.",
    date: "Jan 18, 2026",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80&auto=format&fit=crop",
  },
] as const

function legacyToRecord(p: (typeof LEGACY_POSTS)[number]): InitiativeRecord {
  return {
    id: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    image: p.image,
    gallery: [],
    category: "Blog",
    readMinutes: 6,
    heroCaption: null,
    intro: p.excerpt,
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          `${p.excerpt} This piece expands on themes we’re tracking across cities and regions.`,
        ],
      },
    ],
    ctas: DEFAULT_BLOG_CTAS.map((c) => ({ ...c })),
  }
}

export function getDefaultBlogs(): InitiativeRecord[] {
  return LEGACY_POSTS.map(legacyToRecord)
}

/** Blank record for “add post” in blog admin. */
export function emptyBlogTemplate(): InitiativeRecord {
  return {
    ...emptyInitiativeTemplate(),
    category: "Blog",
    ctas: DEFAULT_BLOG_CTAS.map((c) => ({ ...c })),
  }
}
