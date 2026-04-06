import type { Metadata } from "next"
import { Poppins } from "next/font/google"

import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Plannogram",
  description:
    "An international idea exchange platform on urban planning, development and policies.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`min-h-dvh bg-black ${poppins.variable}`}>
      <body
        className={`${poppins.className} min-h-dvh bg-black text-white antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
