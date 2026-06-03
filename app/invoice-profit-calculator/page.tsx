import { ReceiptText } from "lucide-react"

import { InvoiceProfitCalculator } from "../../src/components/calculators/InvoiceProfitCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo"

const seo = {
  name: "Invoice and Profit Calculator",
  title: "Invoice and Profit Calculator Kenya - MyCalculators",
  description:
    "Calculate invoice total, VAT, costs, profit margin and markup for a sale or small business quote in Kenya.",
  path: "/invoice-profit-calculator",
  category: "Business",
  keywords: [
    "invoice calculator Kenya",
    "profit calculator",
    "profit margin calculator",
    "VAT invoice calculator",
    "business calculator Kenya",
  ],
} as const

export const metadata = createCalculatorMetadata(seo)

export default function InvoiceProfitCalculatorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Invoice and Profit Calculator"
        category="Business"
        description="Calculate invoice totals, VAT, costs and profit margin"
        icon={ReceiptText}
      >
        <InvoiceProfitCalculator />
      </CalculatorPageLayout>
    </>
  )
}
