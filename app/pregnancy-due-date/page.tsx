import type { Metadata } from "next"
import { Baby } from "lucide-react"

import { PregnancyDueDateCalculator } from "../../src/components/calculators/PregnancyDueDateCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Pregnancy Due Date Calculator - MyCalculators",
  description:
    "Estimate due date, trimester, and weeks left in pregnancy. Track your pregnancy journey with accurate calculations.",
  keywords: "pregnancy calculator, due date calculator, pregnancy tracker, trimester calculator, pregnancy weeks",
}

export default function PregnancyDueDatePage() {
  return (
    <CalculatorPageLayout
      title="Pregnancy Due Date"
      category="Health"
      description="Estimate due date, trimester, weeks left"
      icon={Baby}
    >
      <PregnancyDueDateCalculator />
    </CalculatorPageLayout>
  )
}
