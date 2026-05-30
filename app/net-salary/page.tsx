import type { Metadata } from "next"
import { Wallet } from "lucide-react"

import { NetSalaryCalculator } from "../../src/components/calculators/NetSalaryCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Net Salary Calculator - MyCalculators",
  description:
    "Calculate your take-home pay after PAYE, SHIF, NSSF and Affordable Housing Levy deductions. Get accurate net salary calculations for Kenya.",
  keywords: "net salary calculator, paye calculator, nhif deductions, nssf contributions, kenya salary",
}

export default function NetSalaryPage() {
  return (
    <CalculatorPageLayout
      title="Net Salary"
      category="Salary"
      description="Calculate take-home pay after PAYE, SHIF, NSSF and Affordable Housing Levy deductions"
      icon={Wallet}
    >
      <NetSalaryCalculator />
    </CalculatorPageLayout>
  )
}
