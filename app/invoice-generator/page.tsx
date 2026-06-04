import { FileText } from "lucide-react"

import { InvoiceGenerator } from "../../src/components/tools/InvoiceGenerator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo"

const seo = {
  name: "Invoice Generator",
  title: "Invoice Generator Kenya - MyCalculators",
  description:
    "Create a printable Kenya-ready invoice with line items, VAT, discount, payment details, M-Pesa notes and balance due.",
  path: "/invoice-generator",
  category: "Business",
  keywords: [
    "invoice generator Kenya",
    "free invoice template Kenya",
    "VAT invoice generator",
    "M-Pesa invoice",
    "small business invoice",
  ],
} as const

export const metadata = createCalculatorMetadata(seo)

export default function InvoiceGeneratorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Invoice Generator"
        category="Business"
        description="Create a printable invoice with VAT, line items and payment details"
        icon={FileText}
      >
        <InvoiceGenerator />
      </CalculatorPageLayout>
    </>
  )
}
