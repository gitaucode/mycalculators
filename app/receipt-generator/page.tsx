import { Receipt } from "lucide-react"

import { ReceiptGenerator } from "../../src/components/tools/ReceiptGenerator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo"

const seo = {
  name: "Receipt Generator",
  title: "Receipt Generator Kenya - Free Printable Payment Receipt",
  description:
    "Create a free printable Kenya receipt with payment method, reference number, line items, VAT, amount received and PDF export.",
  path: "/receipt-generator",
  category: "Business",
  keywords: [
    "receipt generator Kenya",
    "free receipt generator Kenya",
    "free receipt template Kenya",
    "M-Pesa receipt",
    "payment receipt generator",
    "small business receipt",
    "printable receipt Kenya",
  ],
  faqs: [
    {
      question: "Is this receipt generator free?",
      answer:
        "Yes. You can create a printable receipt for completed payments without an account.",
    },
    {
      question: "Can I record M-Pesa payments?",
      answer:
        "Yes. You can enter M-Pesa, cash, bank transfer or card payment details and include a reference number.",
    },
    {
      question: "What is the difference between an invoice and a receipt?",
      answer:
        "An invoice requests payment for goods or services. A receipt confirms that payment has already been received.",
    },
    {
      question: "Can I include VAT on a receipt?",
      answer:
        "Yes. The receipt generator supports VAT and line items so the payment summary is clearer for the customer.",
    },
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
        lastUpdated="Kenya-ready template"
        sourceNote="Receipt templates are designed for Kenyan businesses that need a clear payment record for customers."
        faqs={seo.faqs}
      >
        <ReceiptGenerator />
      </CalculatorPageLayout>
    </>
  )
}
