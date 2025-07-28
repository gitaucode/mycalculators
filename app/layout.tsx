import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster" // Keep this import
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Kenyan Financial Toolkit - Smart Money Decisions",
  description:
    "Essential financial calculators for Kenyan consumers - Mpesa charges, loans, budgets, electricity costs & more",
  authors: [{ name: "Lovable" }],
  openGraph: {
    title: "Kenyan Financial Toolkit",
    description: "Essential financial calculators for Kenyan consumers",
    type: "website",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lovable_dev",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
    generator: 'v0.dev'
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-inter`}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster /> {/* Use the Toaster from "@/components/ui/toaster" */}
            {children}
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
