import type { Metadata } from "next"
import { Building } from "lucide-react"

import { ConstructionCostCalculator } from "../../src/components/calculators/ConstructionCostCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Construction Cost Calculator - MyCalculators",
  description:
    "Estimate building costs based on area and quality. Calculate construction expenses for residential and commercial projects in Kenya.",
  keywords: "construction cost, building cost calculator, construction estimate, kenya building costs",
}

export default function ConstructionCostPage() {
  return (
    <CalculatorPageLayout
      title="Construction Cost"
      category="Construction"
      description="Estimate building costs based on area and quality"
      icon={Building}
    >
      <ConstructionCostCalculator />
    </CalculatorPageLayout>
  )
}
