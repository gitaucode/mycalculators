import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { CostOfLivingCalculator } from "../../src/components/calculators/CostOfLivingCalculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HomeIcon } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cost of Living Calculator - K Toolkit",
  description:
    "Compare living expenses across Kenyan cities. Calculate monthly costs for housing, food, transport, and utilities in different locations.",
  keywords: "cost of living, kenya cities, living expenses, nairobi cost, mombasa cost, city comparison",
}

export default function CostOfLivingPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/10">
        <div className="container mx-auto px-4 py-8">
          {/* Calculator Header */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-6 -ml-2">
                ← Back to Calculators
              </Button>
            </Link>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <HomeIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">Cost of Living</h1>
                  <Badge variant="secondary" className="mt-1">
                    Living Costs
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Compare living expenses across Kenyan cities
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <CostOfLivingCalculator />
        </div>
      </div>
      <Footer />
    </>
  )
}
