import type { Metadata } from "next"
import { Scale } from "lucide-react"

import { BmiCalculator } from "../../src/components/calculators/BmiCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "BMI Calculator - MyCalculators",
  description:
    "Calculate your Body Mass Index from height and weight. Get health recommendations based on your BMI category.",
  keywords: "bmi calculator, body mass index, health calculator, weight calculator, bmi chart",
}

export default function BmiCalculatorPage() {
  return (
    <CalculatorPageLayout
      title="BMI Calculator"
      category="Health"
      description="Body Mass Index from height & weight"
      icon={Scale}
    >
      <BmiCalculator />
    </CalculatorPageLayout>
  )
}
