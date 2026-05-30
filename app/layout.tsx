import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MyCalculators - Smart Money Decisions for Kenya",
  description:
    "Essential financial and health calculators for Kenyan consumers. Calculate M-Pesa charges, loans, salaries, BMI, calories and more with accurate, up-to-date rates.",
  keywords:
    "Kenya, financial calculator, M-Pesa charges, loan calculator, salary calculator, budget planner, health calculator",
  authors: [{ name: "MyCalculators" }],
  robots: "index, follow",
  generator: "v0.dev",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-[#F7FAF8] font-inter antialiased">{children}</body>
    </html>
  )
}
