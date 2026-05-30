import type { Metadata } from "next"
import { Heart } from "lucide-react"

import { HeartRateZonesCalculator } from "../../src/components/calculators/HeartRateZonesCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Heart Rate Zones Calculator - MyCalculators",
  description:
    "Calculate training zones based on age and fitness level. Optimize your workouts with personalized heart rate targets.",
  keywords: "heart rate zones, training zones, target heart rate, fitness calculator, workout zones",
}

export default function HeartRateZonesPage() {
  return (
    <CalculatorPageLayout
      title="Heart Rate Zones"
      category="Health"
      description="Calculate training zones based on age and fitness level"
      icon={Heart}
    >
      <HeartRateZonesCalculator />
    </CalculatorPageLayout>
  )
}
