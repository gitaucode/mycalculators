import { ReceiptText } from "lucide-react";

import { VatCalculator } from "../../src/components/calculators/VatCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "VAT Calculator",
  title: "VAT Calculator Kenya 2026 - Add or Remove 16% KRA VAT",
  description:
    "Calculate 16% VAT in Kenya and convert between VAT-inclusive and VAT-exclusive prices for invoices, receipts and business transactions.",
  path: "/vat-calculator",
  category: "Salary & Tax",
  keywords: [
    "VAT calculator Kenya",
    "KRA VAT calculator",
    "16% VAT calculator",
    "VAT inclusive calculator",
    "VAT exclusive calculator",
    "KRA VAT",
    "VAT formula Kenya",
  ],
  faqs: [
    {
      question: "What is the standard VAT rate in Kenya?",
      answer:
        "The standard VAT rate commonly used for many taxable goods and services in Kenya is 16%, though some supplies may be exempt or zero-rated.",
    },
    {
      question: "How do I remove VAT from an inclusive price?",
      answer:
        "Divide the VAT-inclusive amount by 1.16 to get the price before VAT, then subtract that base amount from the inclusive price to get the VAT amount.",
    },
    {
      question: "How do I add VAT to a price?",
      answer:
        "Multiply the VAT-exclusive price by 16% to get the VAT amount, then add that VAT to the original price.",
    },
    {
      question: "Can this be used for eTIMS or tax filing?",
      answer:
        "Use it for quick estimates and invoice checks. Confirm filing, exemptions, zero-rated items and compliance details with KRA or a tax professional.",
    },
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function VatCalculatorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="VAT Calculator"
        category="Tax"
        description="Convert between VAT inclusive and exclusive prices"
        icon={ReceiptText}
        lastUpdated="Updated for 2026"
        sourceNote="VAT estimates use Kenya business context for invoices, receipts and price checks."
        sourceLinks={[
          {
            label: "KRA VAT calculator",
            href: "https://www.kra.go.ke/64-calculate-tax/199-vat-calculator",
          },
        ]}
        faqs={seo.faqs}
      >
        <VatCalculator />
      </CalculatorPageLayout>
    </>
  );
}
