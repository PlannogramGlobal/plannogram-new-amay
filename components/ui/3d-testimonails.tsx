"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Marquee } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"

export { Marquee } from "@/components/ui/marquee"

export type TestimonialItem = {
  name: string
  username: string
  body: string
  img: string
  country: string
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Ava Chen",
    username: "@ava_plans",
    body: "A rare place where planners actually listen to each other across continents.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop",
    country: "🇦🇺 Australia",
  },
  {
    name: "Jonas Weber",
    username: "@jonas_urban",
    body: "The sessions on housing policy alone were worth the membership.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop",
    country: "🇩🇪 Germany",
  },
  {
    name: "Marco Benedetti",
    username: "@marcob",
    body: "Smooth format, sharp questions — feels like a real professional exchange.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop",
    country: "🇮🇹 Italy",
  },
  {
    name: "Priya Nair",
    username: "@priya_cities",
    body: "We connected with NGOs we would never have met at a typical conference.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop",
    country: "🇮🇳 India",
  },
  {
    name: "Noah Brooks",
    username: "@noah_public",
    body: "Finally, a platform that treats civic planning as a shared language.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop",
    country: "🇺🇸 USA",
  },
  {
    name: "Léa Fontaine",
    username: "@leafontaine",
    body: "Documentation and follow-ups are unusually clear for this space.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop",
    country: "🇫🇷 France",
  },
  {
    name: "Kenji Morita",
    username: "@kenji_m",
    body: "Great balance of academics, practitioners, and city officials.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&auto=format&fit=crop",
    country: "🇯🇵 Japan",
  },
  {
    name: "Emma Stewart",
    username: "@emmastewart",
    body: "I pause the marquee to read every quote — the community is that good.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop",
    country: "🇨🇦 Canada",
  },
  {
    name: "Carlos Vela",
    username: "@carlosvela",
    body: "Ideal for comparing how different regions tackle the same urban problems.",
    img: "https://images.unsplash.com/photo-1504257432389-3cb1d7eba5d7?w=200&q=80&auto=format&fit=crop",
    country: "🇪🇸 Spain",
  },
]

function TestimonialCard({
  img,
  name,
  username,
  body,
  country,
}: TestimonialItem) {
  return (
    <Card
      className={cn(
        "w-[13.5rem] shrink-0 border-white/10 bg-white/[0.06] shadow-lg backdrop-blur-sm sm:w-56",
        "md:w-64 lg:w-[17.5rem] xl:w-[19rem]",
      )}
    >
      <CardContent className="p-4 pt-4 md:p-5 md:pt-5 lg:p-6 lg:pt-6">
        <div className="flex items-center gap-2.5 md:gap-3">
          <Avatar className="size-9 border border-white/10 md:size-11 lg:size-12">
            <AvatarImage src={img} alt="" />
            <AvatarFallback className="bg-white/10 text-sm text-white md:text-base">
              {name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col text-left">
            <figcaption className="flex flex-wrap items-center gap-x-1 text-sm font-medium text-foreground md:text-base">
              <span className="truncate">{name}</span>{" "}
              <span className="shrink-0 text-xs opacity-80 md:text-sm">
                {country}
              </span>
            </figcaption>
            <p className="truncate text-xs font-medium text-muted-foreground md:text-sm">
              {username}
            </p>
          </div>
        </div>
        <blockquote className="mt-3 text-left text-sm leading-snug text-muted-foreground md:mt-4 md:text-base md:leading-relaxed lg:text-[1.05rem]">
          {body}
        </blockquote>
      </CardContent>
    </Card>
  )
}

export function Testimonials3DMarquee({
  testimonials = DEFAULT_TESTIMONIALS,
  className,
}: {
  testimonials?: TestimonialItem[]
  className?: string
}) {
  const column = (extraKey: string) =>
    testimonials.map((review) => (
      <TestimonialCard key={`${extraKey}-${review.username}`} {...review} />
    ))

  return (
    <div
      className={cn(
        "relative mx-auto flex h-[min(22rem,52dvh)] w-full max-w-[800px] flex-row items-center justify-center gap-1.5 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 [perspective:320px] sm:h-80 md:h-[min(28rem,62dvh)] md:max-w-[min(96vw,980px)] md:[perspective:480px] lg:h-[min(34rem,72dvh)] lg:max-w-[min(96vw,1200px)] lg:[perspective:560px] xl:h-[min(38rem,78dvh)] xl:[perspective:620px]",
        className,
      )}
    >
      <div className="flex origin-center scale-[0.58] flex-row items-center gap-2 sm:scale-[0.72] sm:gap-3 md:scale-95 md:gap-4 lg:scale-[1.12] lg:gap-5 xl:scale-[1.28] 2xl:scale-[1.38]">
        <div
          className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5"
          style={{
            transform:
              "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
          }}
        >
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
          {column("a")}
        </Marquee>
        <Marquee
          vertical
          pauseOnHover
          reverse
          repeat={3}
          className="[--duration:40s]"
        >
          {column("b")}
        </Marquee>
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
          {column("c")}
        </Marquee>
        <Marquee
          vertical
          pauseOnHover
          reverse
          repeat={3}
          className="[--duration:40s]"
        >
          {column("d")}
        </Marquee>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-1/4 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/4 bg-gradient-to-t from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-1/4 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-1/4 bg-gradient-to-l from-black to-transparent" />
    </div>
  )
}
