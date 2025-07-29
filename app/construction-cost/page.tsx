import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { ConstructionCostCalculator } from "../../src/components/calculators/ConstructionCostCalculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Construction Cost Calculator - K Toolkit",
  description:
    "Estimate building costs based on area and quality. Calculate construction expenses for residential and commercial projects in Kenya.",
  keywords: "construction cost, building cost calculator, construction estimate, kenya building costs",
}

export default function ConstructionCostPage() {
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
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">Construction Cost</h1>
                  <Badge variant="secondary" className="mt-1">
                    Construction
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Estimate building costs based on area and quality
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <ConstructionCostCalculator />
        </div>
      </div>
      <Footer />
    </>
  )
}
