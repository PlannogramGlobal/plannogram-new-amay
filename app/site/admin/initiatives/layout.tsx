import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Initiatives admin",
  robots: { index: false, follow: false },
}

export default function InitiativesAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
