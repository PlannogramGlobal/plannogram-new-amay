import type { InitiativeCta, InitiativeSection } from "@/lib/initiative-types"

type Body = {
  category: string
  readMinutes: number
  heroCaption?: { title: string; subtitle: string }
  intro: string
  sections: InitiativeSection[]
}

export const DEFAULT_CTAS: InitiativeCta[] = [
  { label: "Browse all initiatives", href: "/initiatives" },
  { label: "Upcoming events", href: "/#upcoming-events" },
  { label: "From the blog", href: "/blogs" },
  { label: "About Plannogram", href: "/about" },
]

export const BODIES: Record<string, Body> = {
  "cities-climate": {
    category: "Climate & land use",
    readMinutes: 8,
    heroCaption: {
      title: "Plannogram · Cities & Climate cohort",
      subtitle: "ADAPTATION · FINANCE · COMMUNITY VOICE",
    },
    intro:
      "Cities & Climate is a leadership roundtable for people who translate global risk into local plans. We focus on flood and heat exposure, insurance and municipal finance, and the politics of where growth is allowed when the climate budget is tight.",
    sections: [
      {
        heading: "What you can expect",
        paragraphs: [
          "Sessions mix short provocations with structured dialogues. We compare instruments from different continents—green buffers, resilience bonds, overlay zones—without pretending one blueprint fits all.",
          "Participants leave with shared vocabulary, a clearer read of trade-offs, and practical framing they can reuse in their own jurisdictions.",
        ],
      },
      {
        heading: "Who it is for",
        paragraphs: [
          "Chief resilience officers, planning directors, housing leads, and researchers who work at the interface of land use and hazard data. Civil society partners join when the program is hybrid.",
        ],
      },
    ],
  },
  "regional-exchange": {
    category: "Regions & governance",
    readMinutes: 7,
    heroCaption: {
      title: "Regional Exchange · peer learning at every scale",
      subtitle: "METROS · PROVINCES · CROSS-BORDER",
    },
    intro:
      "Regional Exchange connects teams who rarely sit in the same room: metropolitan authorities, provincial ministries, and cross-border corridor managers. The goal is reuse of ideas—without copying blueprints blindly.",
    sections: [
      {
        heading: "How sessions run",
        paragraphs: [
          "We alternate case walks with facilitated swaps. Each host city or region shares one implementation story; others pressure-test assumptions and translate lessons to their own administrative scale.",
          "Formats include hybrid studios and short field visits when travel is possible.",
        ],
      },
      {
        heading: "Outcomes",
        paragraphs: [
          "Documented “translation notes” capture what would have to change for an idea to work elsewhere—legal hooks, revenue tools, and community process—not just glossy summaries.",
        ],
      },
    ],
  },
  "policy-labs": {
    category: "Housing & implementation",
    readMinutes: 9,
    heroCaption: {
      title: "Policy Labs · housing, equity, implementation",
      subtitle: "ZONING · FINANCE · AGREEMENTS",
    },
    intro:
      "Policy Labs are hands-on working sessions on housing, equity, and delivery. Small groups pressure-test proposals—from zoning reform to agreements with residents—and document what would need to change back home.",
    sections: [
      {
        heading: "Lab design",
        paragraphs: [
          "We work with real drafts and real constraints: legal language, financing stacks, and political windows. Facilitators keep the room honest about what is negotiable and what is not.",
        ],
      },
      {
        heading: "Collaborations with practice",
        paragraphs: [
          "Practitioners from multiple cities co-own the agenda. Outputs may include annotated code sections, term sheets for community benefits, or memoranda for elected leaders.",
        ],
      },
    ],
  },
  "urban-ideas-forum": {
    category: "Ideas & futures",
    readMinutes: 6,
    intro:
      "The Urban Ideas Forum brings international voices on technology, participation, and the politics of urban change. Short provocations and breakouts are designed for practitioners who want signal—not slide clutter.",
    sections: [
      {
        heading: "Program rhythm",
        paragraphs: [
          "Each forum stacks three tightly timed provocations, then breaks into facilitated dialogue. Interpretation and async notes widen access across time zones.",
        ],
      },
      {
        heading: "Looking ahead",
        paragraphs: [
          "Selected threads feed Plannogram’s written series and invite-back cohorts for deeper work on tools like digital twins, deliberative budgets, and public interest data governance.",
        ],
      },
    ],
  },
  "youth-planning": {
    category: "Next generation",
    readMinutes: 7,
    intro:
      "Youth in Planning links schools, universities, and early-career practitioners to long-range plans. We pair mentorship with workshop formats that make formal planning legible without diluting complexity.",
    sections: [
      {
        heading: "Workshop formats",
        paragraphs: [
          "Role-play hearings, mapathons, and “explain this clause” sessions build literacy in zoning, transport, and climate overlays. Senior staff join as sounding boards, not lecturers.",
        ],
      },
      {
        heading: "Partnerships",
        paragraphs: [
          "We work with faculties of architecture and planning, youth councils, and NGOs that run civic education programs. Outcomes include open curriculum snippets and student briefs for real consultations.",
        ],
      },
    ],
  },
  "streets-data": {
    category: "Data & mobility",
    readMinutes: 8,
    intro:
      "Data for Streets supports teams cleaning, sharing, and using mobility and public-space metrics responsibly. The aim is decision-ready insight without burying communities in dashboards.",
    sections: [
      {
        heading: "Technical and ethical guardrails",
        paragraphs: [
          "We review lineage, privacy, and representativeness before metrics shape funding or enforcement. Where open data is patchy, we document uncertainty plainly.",
        ],
      },
      {
        heading: "Collaborations with agencies",
        paragraphs: [
          "Quarterly online clinics pair city analysts with researchers on pedestrian counts, curb use, night-time economy patterns, and heat exposure along corridors.",
        ],
      },
    ],
  },
  "coastal-resilience": {
    category: "Coasts & risk",
    readMinutes: 9,
    intro:
      "The Coastal Resilience Cohort convenes small groups from delta and waterfront cities. Topics include adaptation finance, insurance availability, managed retreat, and honest conversation about who bears loss.",
    sections: [
      {
        heading: "Rotating host model",
        paragraphs: [
          "Each cohort cycle visits a different coastline context—when feasible—so abstract principles meet maintenance yards, tide gates, and neighbourhood memory.",
        ],
      },
      {
        heading: "Looking ahead",
        paragraphs: [
          "We produce comparative memos on instruments and governance—not prescriptive rankings—and help alumni cities find partners for joint funding proposals.",
        ],
      },
    ],
  },
  "night-economy": {
    category: "Public life",
    readMinutes: 7,
    intro:
      "Night Economy & Safety explores culture, night-time work, and security after dark. Sessions connect lighting designers, mobility operators, business improvement areas, and residents’ associations.",
    sections: [
      {
        heading: "Balancing priorities",
        paragraphs: [
          "We map trade-offs between vibrancy, noise, and mobility access. Case studies cover licensing, late transit, and reclaiming streets for safe passage without defaulting to heavy policing narratives alone.",
        ],
      },
      {
        heading: "Toolkit sharing",
        paragraphs: [
          "Participants share evaluation frameworks for pilots—what to measure, for whom, and on what timeline—so “success” is not only economic footfall.",
        ],
      },
    ],
  },
  "zoning-studio": {
    category: "Regulation & law",
    readMinutes: 10,
    intro:
      "The Zoning Reform Studio runs intensive sprints with planners and counsel to draft readable codes that advance housing supply and climate goals. Plain language and enforceability are non-negotiable.",
    sections: [
      {
        heading: "Sprint structure",
        paragraphs: [
          "Teams work from annotated prototypes, not blank pages. We time-box objections, test edge parcels, and check consistency with state or national frameworks.",
        ],
      },
      {
        heading: "Multi-city learning",
        paragraphs: [
          "Studios rotate hosts so participants see different political constraints. Outputs include red-lined drafts and a short “adoption brief” for elected bodies.",
        ],
      },
    ],
  },
  "tod-growth": {
    category: "Transit & intensity",
    readMinutes: 8,
    intro:
      "Transit-Oriented Growth examines station-area intensity with attention to value capture, displacement risk, and rider-first street design. We privilege riders and renters in the conversation—not only developers and consultants.",
    sections: [
      {
        heading: "Case-based modules",
        paragraphs: [
          "Modules compare inclusionary instruments, land assembly, and first/last mile treatments. Each ends with a risk register communities can stress-test locally.",
        ],
      },
      {
        heading: "Rolling enrollment",
        paragraphs: [
          "Because projects move at different speeds, the track accepts cohort upgrades quarterly with hybrid participation.",
        ],
      },
    ],
  },
  "indigenous-partnership": {
    category: "Partnership & protocol",
    readMinutes: 9,
    intro:
      "The Indigenous Partnership Forum supports nation-to-municipal dialogues on land, water, and consent within regional plans. Participation is by invitation and governed by host protocols.",
    sections: [
      {
        heading: "Governance",
        paragraphs: [
          "Chatham-style expectations, elder guidance, and closed documentation unless hosts choose otherwise. Plannogram provides facilitation capacity only where invited.",
        ],
      },
      {
        heading: "Outputs",
        paragraphs: [
          "Where appropriate, public read-outs summarise direction of travel—not negotiation detail—and link to formal government-to-government channels.",
        ],
      },
    ],
  },
  "circular-cities": {
    category: "Materials & systems",
    readMinutes: 8,
    intro:
      "The Circular Cities Lab pilots materials, waste, and energy loops at district scale with utilities, small manufacturers, and neighbourhood stewards. We favour measurable pilots over circular buzzwords.",
    sections: [
      {
        heading: "Lab cadence",
        paragraphs: [
          "Teams define system boundaries, baseline flows, and a single intervention window—then monitor for seasonality and behaviour change.",
        ],
      },
      {
        heading: "Open documentation",
        paragraphs: [
          "Methods and anonymised metrics are published so other districts can replicate without paying for proprietary “playbooks.”",
        ],
      },
    ],
  },
}
