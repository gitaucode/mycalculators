import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { SavingsGoalCalculator } from "../../src/components/calculators/SavingsGoalCalculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Savings Goal Calculator - K Toolkit",
  description:
    "Plan timeline to reach savings targets with regular contributions. Calculate how long it takes to achieve your financial goals.",
  keywords: "savings goal calculator, savings planner, financial goals, savings timeline, money saving calculator",
}

export default function SavingsGoalPage() {
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
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">Savings Goal</h1>
                  <Badge variant="secondary" className="mt-1">
                    Savings
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Plan timeline to reach savings targets with regular contributions
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <SavingsGoalCalculator />
        </div>
      </div>
      <Footer />
    </>
  )
}
