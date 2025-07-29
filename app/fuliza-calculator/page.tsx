import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { FulizaCalculator } from "../../src/components/calculators/FulizaCalculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Landmark } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Fuliza Calculator - K Toolkit",
  description:
    "Calculate Fuliza overdraft fees and total repayment amounts. Get accurate Fuliza charges for M-Pesa overdrafts in Kenya.",
  keywords: "fuliza calculator, fuliza charges, mpesa overdraft, fuliza fees, kenya mobile money",
}

export default function FulizaCalculatorPage() {
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
                  <Landmark className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">Fuliza Calculator</h1>
                  <Badge variant="secondary" className="mt-1">
                    Mobile Money
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Calculate overdraft fees and total repayment amounts
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <FulizaCalculator />
        </div>
      </div>
      <Footer />
    </>
  )
}
