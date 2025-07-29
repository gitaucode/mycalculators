import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { RoiEstimator } from "../../src/components/calculators/RoiEstimator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Percent } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "ROI Estimator - K Toolkit",
  description:
    "Calculate investment returns with compound interest. Estimate potential returns on your investments over time.",
  keywords: "roi calculator, investment returns, compound interest, investment calculator, return on investment",
}

export default function RoiEstimatorPage() {
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
                  <Percent className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">ROI Estimator</h1>
                  <Badge variant="secondary" className="mt-1">
                    Investment
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Calculate investment returns with compound interest
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <RoiEstimator />
        </div>
      </div>
      <Footer />
    </>
  )
}
