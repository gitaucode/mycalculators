import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import { PwaRegister } from "@/components/pwa-register"
import "./globals.css"

const siteUrl = new URL("https://mycalculators.co.ke")

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
  metadataBase: siteUrl,
  title: "MyCalculators - Smart Money Decisions for Kenya",
  description:
    "Essential financial and health calculators for Kenyan consumers. Calculate M-Pesa charges, loans, salaries, BMI, calories and more with accurate, up-to-date rates.",
  applicationName: "MyCalculators",
  manifest: "/manifest.webmanifest",
  keywords: [
    "Kenya calculator",
    "M-Pesa charges calculator",
    "Kenya loan calculator",
    "net salary calculator Kenya",
    "PAYE calculator Kenya",
    "budget planner Kenya",
    "health calculator Kenya",
  ],
  authors: [{ name: "MyCalculators", url: siteUrl.toString() }],
  creator: "MyCalculators",
  publisher: "MyCalculators",
  category: "finance",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MyCalculators",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl.toString(),
    siteName: "MyCalculators",
    title: "MyCalculators - Smart Money Decisions for Kenya",
    description:
      "Fast, practical calculators for Kenyan money, taxes, utilities, planning and health estimates.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "MyCalculators Kenyan calculator toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyCalculators - Smart Money Decisions for Kenya",
    description:
      "Fast, practical calculators for Kenyan money, taxes, utilities, planning and health estimates.",
    images: ["/opengraph-image.png"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B5A2A",
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-[#F7FAF8] font-inter antialiased">
        {children}
        <PwaRegister />
      </body>
    </html>
  )
}
