import type { Metadata } from "next"
import { Apple } from "lucide-react"

import { CalorieCalculator } from "../../src/components/calculators/CalorieCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Calorie Calculator - MyCalculators",
  description:
    "Estimate daily calorie needs based on BMR and activity level. Calculate calories for weight loss, maintenance, or gain.",
  keywords: "calorie calculator, bmr calculator, daily calories, weight loss calories, tdee calculator",
}

export default function CalorieCalculatorPage() {
  return (
    <CalculatorPageLayout
      title="Calorie Calculator"
      category="Health"
      description="Estimate daily calorie needs (BMR)"
      icon={Apple}
    >
      <CalorieCalculator />
    </CalculatorPageLayout>
  )
}
