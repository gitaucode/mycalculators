import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { LoanCalculator } from "../../src/components/calculators/LoanCalculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalculatorIcon } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Loan Calculator - K Toolkit",
  description:
    "Calculate monthly loan payments, interest, and amortization schedules. Plan your personal, mortgage, auto, and business loans in Kenya.",
  keywords: "loan calculator, monthly payments, interest calculator, amortization schedule, kenya loans",
}

export default function LoanCalculatorPage() {
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
                  <CalculatorIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">Loan Calculator</h1>
                  <Badge variant="secondary" className="mt-1">
                    Loans
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Calculate monthly payments, interest, and amortization schedules
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <LoanCalculator />
        </div>
      </div>
      <Footer />
    </>
  )
}
