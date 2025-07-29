import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { BillSplittingCalculator } from "../../src/components/calculators/BillSplittingCalculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Split } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Bill Splitting Calculator - K Toolkit",
  description:
    "Split bills fairly among friends or roommates. Calculate individual shares for shared expenses and group purchases.",
  keywords: "bill splitting, split bill calculator, shared expenses, group expenses, bill divider",
}

export default function BillSplittingPage() {
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
                  <Split className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">Bill Splitting</h1>
                  <Badge variant="secondary" className="mt-1">
                    Utilities
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Split bills fairly among friends or roommates
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <BillSplittingCalculator />
        </div>
      </div>
      <Footer />
    </>
  )
}
