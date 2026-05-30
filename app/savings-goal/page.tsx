import type { Metadata } from "next"
import { Target } from "lucide-react"

import { SavingsGoalCalculator } from "../../src/components/calculators/SavingsGoalCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Savings Goal Calculator - MyCalculators",
  description:
    "Plan timeline to reach savings targets with regular contributions. Calculate how long it takes to achieve your financial goals.",
  keywords: "savings goal calculator, savings planner, financial goals, savings timeline, money saving calculator",
}

export default function SavingsGoalPage() {
  return (
    <CalculatorPageLayout
      title="Savings Goal"
      category="Savings"
      description="Plan timeline to reach savings targets with regular contributions"
      icon={Target}
    >
      <SavingsGoalCalculator />
    </CalculatorPageLayout>
  )
}
