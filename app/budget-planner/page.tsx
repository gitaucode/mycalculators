import type { Metadata } from "next"
import { PiggyBank } from "lucide-react"

import { BudgetCalculator } from "../../src/components/calculators/BudgetCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Budget Planner - MyCalculators",
  description:
    "Track your income and expenses across categories. Create a comprehensive budget plan to manage your finances effectively.",
  keywords: "budget planner, expense tracker, income tracker, financial planning, money management",
}

export default function BudgetPlannerPage() {
  return (
    <CalculatorPageLayout
      title="Budget Planner"
      category="Budgeting"
      description="Track income and expenses across categories"
      icon={PiggyBank}
    >
      <BudgetCalculator />
    </CalculatorPageLayout>
  )
}
