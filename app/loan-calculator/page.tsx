import type { Metadata } from "next"
import { CalculatorIcon } from "lucide-react"

import { LoanCalculator } from "../../src/components/calculators/LoanCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Loan Calculator - MyCalculators",
  description:
    "Calculate monthly loan payments, interest, and amortization schedules. Plan your personal, mortgage, auto, and business loans in Kenya.",
  keywords: "loan calculator, monthly payments, interest calculator, amortization schedule, kenya loans",
}

export default function LoanCalculatorPage() {
  return (
    <CalculatorPageLayout
      title="Loan Calculator"
      category="Loans"
      description="Calculate monthly payments, interest, and amortization schedules"
      icon={CalculatorIcon}
    >
      <LoanCalculator />
    </CalculatorPageLayout>
  )
}
