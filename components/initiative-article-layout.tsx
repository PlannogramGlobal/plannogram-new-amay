import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { InitiativeArticle } from "@/lib/initiative-types"
import { shouldUnoptimizeImageSrc } from "@/lib/utils"

type Props = {
  article: InitiativeArticle
}

const textCol =
  "mx-auto w-full max-w-[52rem] px-4 md:px-6 lg:max-w-[56rem]"

export function InitiativeArticleLayout({ article }: Props) {
  const gallery = article.gallery?.filter(Boolean) ?? []

  return (
    <article className="pb-20 text-zinc-900 md:pb-28">
      <header className={`${textCol} pt-2 md:pt-4`}>
        <p className="text-sm font-medium text-zinc-500">{article.category}</p>
        <h1 className="mt-3 text-[1.65rem] font-semibold leading-[1.12] tracking-tight text-zinc-900 md:text-4xl md:leading-[1.1] lg:text-[2.5rem]">
          {article.title}
        </h1>
        <p className="mt-4 text-sm text-zinc-500">
          {article.dateLabel} · {article.readMinutes} minute read
        </p>
      </header>

      <div className="mt-8 md:mt-10">
        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 px-0 sm:px-4 md:px-10 lg:px-14">
          <div className="relative mx-auto w-full max-w-[72rem] overflow-hidden bg-zinc-200 sm:rounded-xl sm:shadow-sm md:rounded-2xl">
            <Image
              src={article.heroImage}
              alt=""
              width={1920}
              height={1080}
              className="h-auto max-h-[min(52vh,720px)] w-full object-cover md:max-h-[min(58vh,800px)]"
              sizes="(max-width: 640px) 100vw, min(1152px, 95vw)"
              priority
              unoptimized={shouldUnoptimizeImageSrc(article.heroImage)}
            />
            {article.heroCaption ? (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/88 via-black/35 to-transparent px-5 pb-6 pt-24 sm:px-8 sm:pb-8 sm:pt-28 md:px-10 md:pb-10 md:pt-36">
                <p className="max-w-4xl text-base font-semibold leading-snug text-white md:text-lg lg:text-xl">
                  {article.heroCaption.title}
                </p>
                {article.heroCaption.subtitle?.trim() ? (
                  <p className="mt-2 max-w-4xl text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/80 md:text-xs">
                    {article.heroCaption.subtitle}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {gallery.length > 0 ? (
        <div className={`${textCol} mt-10 space-y-4 md:mt-12`}>
          <p className="text-sm font-semibold text-zinc-800">Gallery</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {gallery.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 56rem"
                  unoptimized={shouldUnoptimizeImageSrc(src)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div
        className={`${textCol} mt-10 space-y-6 text-base leading-[1.75] text-zinc-700 md:mt-12 md:text-[1.0625rem] md:leading-[1.7]`}
      >
        <p>{article.intro}</p>
        {article.sections.map((section) => (
          <section key={section.heading} className="space-y-4 pt-2">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 md:text-[1.35rem]">
              {section.heading}
            </h2>
            {section.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
      </div>

      <div className={`${textCol} mt-12 flex flex-col gap-3 md:mt-16`}>
        {article.ctas.map((cta) => {
          const inner = (
            <>
              <span>{cta.label}</span>
              <ArrowUpRight className="size-4 shrink-0 opacity-90" aria-hidden />
            </>
          )
          const className =
            "flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-zinc-800 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-900"

          if (cta.external) {
            return (
              <a
                key={`${cta.label}-${cta.href}`}
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {inner}
              </a>
            )
          }
          return (
            <Link
              key={`${cta.label}-${cta.href}`}
              href={cta.href}
              className={className}
            >
              {inner}
            </Link>
          )
        })}
      </div>
    </article>
  )
}
