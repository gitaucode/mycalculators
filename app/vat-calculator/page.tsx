import type { Metadata } from "next"
import { ReceiptText } from "lucide-react"

import { VatCalculator } from "../../src/components/calculators/VatCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "VAT Calculator - MyCalculators",
  description:
    "Convert between VAT inclusive and exclusive prices. Calculate VAT amounts for business transactions in Kenya.",
  keywords: "vat calculator, vat inclusive, vat exclusive, kenya vat, tax calculator, 16% vat",
}

export default function VatCalculatorPage() {
  return (
    <CalculatorPageLayout
      title="VAT Calculator"
      category="Tax"
      description="Convert between VAT inclusive and exclusive prices"
      icon={ReceiptText}
    >
      <VatCalculator />
    </CalculatorPageLayout>
  )
}
