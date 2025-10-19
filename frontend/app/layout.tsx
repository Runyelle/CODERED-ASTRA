import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { DataInitializer } from "@/components/data-initializer"
import { ClientOnly } from "@/components/client-only"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WasteFlow - Turn Waste Into Revenue",
  description: "Connect your business waste with purchasing companies and transform disposal costs into profit streams",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ClientOnly>
          <DataInitializer />
        </ClientOnly>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
