import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { BudgetCalculator } from "../../src/components/calculators/BudgetCalculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PiggyBank } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Budget Planner - K Toolkit",
  description:
    "Track your income and expenses across categories. Create a comprehensive budget plan to manage your finances effectively.",
  keywords: "budget planner, expense tracker, income tracker, financial planning, money management",
}

export default function BudgetPlannerPage() {
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
                  <PiggyBank className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">Budget Planner</h1>
                  <Badge variant="secondary" className="mt-1">
                    Budgeting
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Track income and expenses across categories
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <BudgetCalculator />
        </div>
      </div>
      <Footer />
    </>
  )
}
