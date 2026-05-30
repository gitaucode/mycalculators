import type { Metadata } from "next"
import { Landmark } from "lucide-react"

import { FulizaCalculator } from "../../src/components/calculators/FulizaCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Fuliza Calculator - MyCalculators",
  description:
    "Calculate Fuliza overdraft fees and total repayment amounts. Get accurate Fuliza charges for M-Pesa overdrafts in Kenya.",
  keywords: "fuliza calculator, fuliza charges, mpesa overdraft, fuliza fees, kenya mobile money",
}

export default function FulizaCalculatorPage() {
  return (
    <CalculatorPageLayout
      title="Fuliza Calculator"
      category="Mobile Money"
      description="Calculate overdraft fees and total repayment amounts"
      icon={Landmark}
    >
      <FulizaCalculator />
    </CalculatorPageLayout>
  )
}
