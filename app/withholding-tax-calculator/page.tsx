import { Percent } from "lucide-react"

import { WithholdingTaxCalculator } from "../../src/components/calculators/WithholdingTaxCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo"

const seo = {
  name: "Withholding Tax Calculator",
  title: "Withholding Tax Calculator Kenya - My Calculators",
  description:
    "Estimate withholding tax, net payable amount and gross-up value for common payment types in Kenya.",
  path: "/withholding-tax-calculator",
  category: "Tax",
  keywords: [
    "withholding tax calculator Kenya",
    "KRA withholding tax",
    "WHT calculator",
    "gross up tax calculator",
  ],
} as const

export const metadata = createCalculatorMetadata(seo)

export default function WithholdingTaxCalculatorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Withholding Tax Calculator"
        category="Tax"
        description="Estimate withholding tax and net payable amounts"
        icon={Percent}
      >
        <WithholdingTaxCalculator />
      </CalculatorPageLayout>
    </>
  )
}
