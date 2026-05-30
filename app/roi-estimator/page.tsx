import type { Metadata } from "next"
import { Percent } from "lucide-react"

import { RoiEstimator } from "../../src/components/calculators/RoiEstimator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "ROI Estimator - MyCalculators",
  description:
    "Calculate investment returns with compound interest. Estimate potential returns on your investments over time.",
  keywords: "roi calculator, investment returns, compound interest, investment calculator, return on investment",
}

export default function RoiEstimatorPage() {
  return (
    <CalculatorPageLayout
      title="ROI Estimator"
      category="Investment"
      description="Calculate investment returns with compound interest"
      icon={Percent}
    >
      <RoiEstimator />
    </CalculatorPageLayout>
  )
}
