import type { Metadata } from "next"
import { Split } from "lucide-react"

import { BillSplittingCalculator } from "../../src/components/calculators/BillSplittingCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Bill Splitting Calculator - MyCalculators",
  description:
    "Split bills fairly among friends or roommates. Calculate individual shares for shared expenses and group purchases.",
  keywords: "bill splitting, split bill calculator, shared expenses, group expenses, bill divider",
}

export default function BillSplittingPage() {
  return (
    <CalculatorPageLayout
      title="Bill Splitting"
      category="Utilities"
      description="Split bills fairly among friends or roommates"
      icon={Split}
    >
      <BillSplittingCalculator />
    </CalculatorPageLayout>
  )
}
