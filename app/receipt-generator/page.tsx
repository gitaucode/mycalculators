import { Receipt } from "lucide-react"

import { ReceiptGenerator } from "../../src/components/tools/ReceiptGenerator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo"

const seo = {
  name: "Receipt Generator",
  title: "Receipt Generator Kenya - MyCalculators",
  description:
    "Create a printable Kenya-ready receipt with payment method, reference number, line items, VAT and amount received.",
  path: "/receipt-generator",
  category: "Business",
  keywords: [
    "receipt generator Kenya",
    "free receipt template Kenya",
    "M-Pesa receipt",
    "payment receipt generator",
    "small business receipt",
  ],
} as const

export const metadata = createCalculatorMetadata(seo)

export default function ReceiptGeneratorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Receipt Generator"
        category="Business"
        description="Create a printable receipt for cash, bank and M-Pesa payments"
        icon={Receipt}
      >
        <ReceiptGenerator />
      </CalculatorPageLayout>
    </>
  )
}
