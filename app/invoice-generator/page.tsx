import { FileText } from "lucide-react"

import { InvoiceGenerator } from "../../src/components/tools/InvoiceGenerator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo"

const seo = {
  name: "Invoice Generator",
  title: "Invoice Generator Kenya - Free VAT Invoice Template & PDF",
  description:
    "Create a free printable Kenya invoice with line items, 16% VAT, discount, payment details, M-Pesa notes, balance due and PDF export.",
  path: "/invoice-generator",
  category: "Business",
  keywords: [
    "invoice generator Kenya",
    "free invoice generator Kenya",
    "free invoice template Kenya",
    "VAT invoice generator",
    "M-Pesa invoice",
    "small business invoice",
    "invoice PDF Kenya",
  ],
  faqs: [
    {
      question: "Is this invoice generator free?",
      answer:
        "Yes. You can create, print and save a simple invoice without signing up or adding payment details.",
    },
    {
      question: "Can I add VAT to the invoice?",
      answer:
        "Yes. The invoice generator supports VAT, discounts, line items, payment details and balance due.",
    },
    {
      question: "Can I use M-Pesa payment details?",
      answer:
        "Yes. You can add M-Pesa Paybill, Till, account number or other payment instructions in the invoice details.",
    },
    {
      question: "Is this a replacement for eTIMS?",
      answer:
        "No. It is a printable invoice tool for convenience. Businesses should follow KRA eTIMS and tax compliance rules where applicable.",
    },
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
        lastUpdated="Kenya-ready template"
        sourceNote="Invoice templates are built for Kenyan small businesses, freelancers and service providers who need clear VAT and payment details."
        sourceLinks={[
          {
            label: "KRA eTIMS information",
            href: "https://www.kra.go.ke/individual/filing-paying/types-of-taxes/value-added-tax/electronic-tax-invoice-management-system-etims",
          },
        ]}
        faqs={seo.faqs}
      >
        <InvoiceGenerator />
      </CalculatorPageLayout>
    </>
  )
}
