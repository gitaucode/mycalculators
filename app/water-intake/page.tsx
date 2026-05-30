import type { Metadata } from "next"
import { Droplets } from "lucide-react"

import { WaterIntakeCalculator } from "../../src/components/calculators/WaterIntakeCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Water Intake Calculator - MyCalculators",
  description:
    "Calculate daily recommended water intake based on weight and activity level. Stay properly hydrated with personalized recommendations.",
  keywords: "water intake calculator, daily water needs, hydration calculator, water consumption, daily hydration",
}

export default function WaterIntakePage() {
  return (
    <CalculatorPageLayout
      title="Water Intake"
      category="Health"
      description="Daily recommended water based on weight & activity"
      icon={Droplets}
    >
      <WaterIntakeCalculator />
    </CalculatorPageLayout>
  )
}
