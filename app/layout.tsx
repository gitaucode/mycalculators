import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import { PwaRegister } from "@/components/pwa-register"
import { NativeAppShell } from "@/components/native-app-shell"
import "./globals.css"

const siteUrl = new URL("https://mycalculators.co.ke")
const socialImageUrl = new URL("/opengraph-image.png", siteUrl).toString()

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
  title: "My Calculators - Smart Money Decisions for Kenya",
  description:
    "Essential financial and health calculators for Kenyan consumers. Calculate M-Pesa charges, loans, salaries, BMI, calories and more with accurate, up-to-date rates.",
  applicationName: "My Calculators",
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
  authors: [{ name: "My Calculators", url: siteUrl.toString() }],
  creator: "My Calculators",
  publisher: "My Calculators",
  category: "finance",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "My Calculators",
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
    siteName: "My Calculators",
    title: "My Calculators - Smart Money Decisions for Kenya",
    description:
      "Fast, practical calculators for Kenyan money, taxes, utilities, planning and health estimates.",
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: "My Calculators Kenyan calculator toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Calculators - Smart Money Decisions for Kenya",
    description:
      "Fast, practical calculators for Kenyan money, taxes, utilities, planning and health estimates.",
    images: [socialImageUrl],
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
  const nativePreview = process.env.NODE_ENV === "development"
    ? "||new URLSearchParams(location.search).has('native-preview')"
    : ""

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              `(()=>{const n=window.Capacitor?.isNativePlatform?.()||(location.protocol==='https:'&&location.hostname==='localhost')${nativePreview};if(n)document.documentElement.classList.add('native-app','native-loading')})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F7FAF8] font-inter antialiased">
        <NativeAppShell />
        {children}
        <PwaRegister />
      </body>
    </html>
  )
}
