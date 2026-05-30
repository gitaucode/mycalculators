import type { Metadata } from "next"
import { HomeIcon } from "lucide-react"

import { CostOfLivingCalculator } from "../../src/components/calculators/CostOfLivingCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Cost of Living Calculator - MyCalculators",
  description:
    "Compare living expenses across Kenyan cities. Calculate monthly costs for housing, food, transport, and utilities in different locations.",
  keywords: "cost of living, kenya cities, living expenses, nairobi cost, mombasa cost, city comparison",
}

export default function CostOfLivingPage() {
  return (
    <CalculatorPageLayout
      title="Cost of Living"
      category="Living Costs"
      description="Compare living expenses across Kenyan cities"
      icon={HomeIcon}
    >
      <CostOfLivingCalculator />
    </CalculatorPageLayout>
  )
}
