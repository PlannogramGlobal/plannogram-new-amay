import type { ComponentType, ReactNode } from "react"
import { Mail, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

function SocialIconBase(
  props: { className?: string; children: ReactNode; viewBox?: string },
) {
  return (
    <svg
      viewBox={props.viewBox ?? "0 0 24 24"}
      fill="currentColor"
      aria-hidden
      className={props.className}
    >
      {props.children}
    </svg>
  )
}

const FacebookIcon: ComponentType<{ className?: string }> = ({ className }) => (
  <SocialIconBase className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </SocialIconBase>
)

const InstagramIcon: ComponentType<{ className?: string }> = ({ className }) => (
  <SocialIconBase className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059 1.28.073 1.689.073 4.948 0 3.259-.014 3.668-.072 4.948-.196 4.354-2.617 6.78-6.979 6.98C15.668 23.986 15.259 24 12 24c-3.259 0-3.668-.014-4.948-.072-4.354-.199-6.78-2.619-6.98-6.98C.014 15.668 0 15.259 0 12c0-3.259.014-3.668.072-4.948.2-4.358 2.618-6.78 6.98-6.98C8.333.014 8.741 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </SocialIconBase>
)

const TwitterIcon: ComponentType<{ className?: string }> = ({ className }) => (
  <SocialIconBase className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </SocialIconBase>
)

const GithubIcon: ComponentType<{ className?: string }> = ({ className }) => (
  <SocialIconBase className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </SocialIconBase>
)

const DribbbleIcon: ComponentType<{ className?: string }> = ({ className }) => (
  <SocialIconBase className={className}>
    <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 15.18 2.39 15.237 1.833 15.253c-.003.088-.003.175-.003.261-.003 2.62 1.004 5.015 2.65 6.826zM12 1.667c-2.555 0-4.91.854-6.804 2.286.3 4.854 4.576 7.29 5.706 7.89C13.51 8.15 14.658 5.03 14.87 4.36c-1.045-1.104-2.52-1.79-4.17-1.79zm7.563 3.537c-.832.58-3.978 2.56-7.94 3.658 1.196 2.17 2.475 3.93 3.72 5.25 1.867-1.02 3.95-2.69 4.48-4.93.26-.83.24-1.71-.06-2.48-.35-.93-1.04-1.68-1.98-2.11z" />
  </SocialIconBase>
)

const data = {
  facebookLink: "https://www.facebook.com/",
  instaLink: "https://www.instagram.com/",
  twitterLink: "https://twitter.com/",
  githubLink: "https://github.com/",
  dribbbleLink: "https://dribbble.com/",
  platform: {
    initiatives: "/initiatives",
    blogs: "/blogs",
    about: "/about",
    events: "/#upcoming-events",
  },
  about: {
    about: "/about",
    initiatives: "/initiatives",
    blogs: "/blogs",
    events: "/#upcoming-events",
  },
  help: {
    blogs: "/blogs",
    initiatives: "/initiatives",
    contact: "mailto:hello@plannogram.org",
  },
  contact: {
    email: "hello@plannogram.org",
    address: "India",
  },
  company: {
    name: "Plannogram",
    description:
      "An international idea exchange platform on urban planning, development and policies.",
    logo: "/plannogram-logo.png",
  },
} as const

const socialLinks = [
  { Icon: FacebookIcon, label: "Facebook", href: data.facebookLink },
  { Icon: InstagramIcon, label: "Instagram", href: data.instaLink },
  { Icon: TwitterIcon, label: "Twitter", href: data.twitterLink },
  { Icon: GithubIcon, label: "GitHub", href: data.githubLink },
  { Icon: DribbbleIcon, label: "Dribbble", href: data.dribbbleLink },
] as const

const aboutLinks = [
  { text: "About Us", href: data.about.about },
  { text: "Initiatives", href: data.about.initiatives },
  { text: "Upcoming Events", href: data.about.events },
  { text: "Blogs", href: data.about.blogs },
] as const

const platformLinks = [
  { text: "Our Initiatives", href: data.platform.initiatives },
  { text: "Blog & Insights", href: data.platform.blogs },
  { text: "About the Platform", href: data.platform.about },
  { text: "Event Calendar", href: data.platform.events },
] as const

type HelpfulLink =
  | { text: string; href: string }
  | { text: string; href: string; hasIndicator: true }

const helpfulLinks: readonly HelpfulLink[] = [
  { text: "Latest articles", href: data.help.blogs },
  { text: "Programs", href: data.help.initiatives },
  { text: "Contact us", href: data.help.contact, hasIndicator: true },
]

type ContactRow =
  | {
      icon: typeof Mail
      text: string
      href: string
      isAddress?: false
    }
  | {
      icon: typeof MapPin
      text: string
      href: string
      isAddress: true
    }

const contactInfo: readonly ContactRow[] = [
  { icon: Mail, text: data.contact.email, href: `mailto:${data.contact.email}` },
  {
    icon: MapPin,
    text: data.contact.address,
    href: "#",
    isAddress: true,
  },
]

export function FooterColumnGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-8 lg:grid-cols-3", className)}>
      <div>
        <div className="flex justify-center gap-3 sm:justify-start">
          <Image
            src={data.company.logo}
            alt="Plannogram"
            width={200}
            height={48}
            className="h-9 w-auto max-w-[160px] object-contain object-left"
          />
        </div>

        <p className="mt-6 max-w-md text-center text-sm leading-relaxed text-white/55 sm:max-w-xs sm:text-left">
          {data.company.description}
        </p>

        <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
          {socialLinks.map(({ Icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition hover:text-white"
              >
                <span className="sr-only">{label}</span>
                <Icon className="size-6" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
        <div className="text-center sm:text-left">
          <p className="text-lg font-medium text-white">About</p>
          <ul className="mt-8 space-y-4 text-sm">
            {aboutLinks.map(({ text, href }) => (
              <li key={text}>
                <FooterLink href={href}>{text}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-lg font-medium text-white">Platform</p>
          <ul className="mt-8 space-y-4 text-sm">
            {platformLinks.map(({ text, href }) => (
              <li key={text}>
                <FooterLink href={href}>{text}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-lg font-medium text-white">Helpful</p>
          <ul className="mt-8 space-y-4 text-sm">
            {helpfulLinks.map((entry) => {
              const hasIndicator =
                "hasIndicator" in entry && entry.hasIndicator === true
              return (
                <li key={entry.text}>
                  <FooterLink
                    href={entry.href}
                    className={
                      hasIndicator
                        ? "group flex justify-center gap-1.5 sm:justify-start"
                        : undefined
                    }
                  >
                    <span className="text-white/65 transition group-hover:text-white/85">
                      {entry.text}
                    </span>
                    {hasIndicator ? (
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/60 opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-white/85" />
                      </span>
                    ) : null}
                  </FooterLink>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-lg font-medium text-white">Contact</p>
          <ul className="mt-8 space-y-4 text-sm">
            {contactInfo.map((row) => {
              const Icon = row.icon
              return (
                <li key={row.text}>
                  <a
                    className="flex items-center justify-center gap-1.5 sm:justify-start"
                    href={row.href}
                  >
                    <Icon className="size-5 shrink-0 text-white/70 shadow-sm" />
                    {row.isAddress ? (
                      <address className="-mt-0.5 flex-1 not-italic text-white/65 transition hover:text-white/85">
                        {row.text}
                      </address>
                    ) : (
                      <span className="flex-1 text-white/65 transition hover:text-white/85">
                        {row.text}
                      </span>
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function FooterLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  const isHash = href.startsWith("/#") || href.startsWith("#")
  const isMail = href.startsWith("mailto:")
  const isTel = href.startsWith("tel:")

  if (isMail || isTel || href === "#") {
    return (
      <a
        href={href}
        className={cn("text-white/65 transition hover:text-white/85", className)}
      >
        {children}
      </a>
    )
  }

  if (isHash) {
    return (
      <Link
        href={href}
        className={cn("text-white/65 transition hover:text-white/85", className)}
      >
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={cn("text-white/65 transition hover:text-white/85", className)}
    >
      {children}
    </Link>
  )
}

export function FooterLegalRow({ year }: { year: number }) {
  return (
    <div className="mt-12 border-t border-white/10 pt-6">
      <div className="text-center sm:flex sm:justify-between sm:text-left">
        <p className="text-sm text-white/55">
          <span className="block sm:inline">All rights reserved.</span>
        </p>

        <p className="mt-4 text-sm text-white/55 sm:order-first sm:mt-0">
          &copy; {year} {data.company.name}
        </p>
      </div>
    </div>
  )
}

/** Standalone variant (neutral surface) — not used on the home glass footer */
export default function Footer4Col() {
  return (
    <footer className="mt-16 w-full place-self-end rounded-t-xl bg-zinc-900/80">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <FooterColumnGrid />
        <FooterLegalRow year={2026} />
      </div>
    </footer>
  )
}
