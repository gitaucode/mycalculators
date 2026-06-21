import { Home } from "lucide-react"

import { MortgageCalculator } from "../../src/components/calculators/MortgageCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo"

const seo = {
  name: "Mortgage Calculator",
  title: "Mortgage Calculator Kenya - My Calculators",
  description:
    "Estimate monthly home loan repayments, total interest, loan amount and upfront cash for a mortgage in Kenya.",
  path: "/mortgage-calculator",
  category: "Loans",
  keywords: [
    "mortgage calculator Kenya",
    "home loan calculator",
    "monthly mortgage payment",
    "house loan calculator Kenya",
  ],
} as const

export const metadata = createCalculatorMetadata(seo)

export default function MortgageCalculatorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Mortgage Calculator"
        category="Loans"
        description="Estimate home loan repayments and upfront costs"
        icon={Home}
      >
        <MortgageCalculator />
      </CalculatorPageLayout>
    </>
  )
}
