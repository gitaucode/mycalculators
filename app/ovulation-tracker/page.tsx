import type { Metadata } from "next"
import { Calendar } from "lucide-react"

import { OvulationTracker } from "../../src/components/calculators/OvulationTracker"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Ovulation Tracker - MyCalculators",
  description:
    "Track your fertile window from menstrual cycle. Calculate ovulation dates and peak fertility periods for family planning.",
  keywords: "ovulation tracker, fertile window, ovulation calculator, menstrual cycle, fertility tracker",
}

export default function OvulationTrackerPage() {
  return (
    <CalculatorPageLayout
      title="Ovulation Tracker"
      category="Health"
      description="Show fertile window from menstrual cycle"
      icon={Calendar}
    >
      <OvulationTracker />
    </CalculatorPageLayout>
  )
}
