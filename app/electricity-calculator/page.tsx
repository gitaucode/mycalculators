import type { Metadata } from "next"
import { Zap } from "lucide-react"

import { ElectricityCalculator } from "../../src/components/calculators/ElectricityCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Electricity Calculator - MyCalculators",
  description:
    "Calculate KPLC token units and costs. Convert between amount paid and electricity units for Kenya Power prepaid meters.",
  keywords: "electricity calculator, kplc tokens, electricity units, kenya power, prepaid electricity",
}

export default function ElectricityCalculatorPage() {
  return (
    <CalculatorPageLayout
      title="Electricity Calculator"
      category="Utilities"
      description="Calculate KPLC token units and costs"
      icon={Zap}
    >
      <ElectricityCalculator />
    </CalculatorPageLayout>
  )
}
