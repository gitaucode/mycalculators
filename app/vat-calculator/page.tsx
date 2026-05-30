import { ReceiptText } from "lucide-react";

import { VatCalculator } from "../../src/components/calculators/VatCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "VAT Calculator",
  title: "VAT Calculator Kenya - MyCalculators",
  description:
    "Calculate 16% VAT in Kenya and convert between VAT-inclusive and VAT-exclusive prices for business transactions.",
  path: "/vat-calculator",
  category: "Salary & Tax",
  keywords: [
    "VAT calculator Kenya",
    "16% VAT calculator",
    "VAT inclusive calculator",
    "VAT exclusive calculator",
    "KRA VAT",
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
      >
        <VatCalculator />
      </CalculatorPageLayout>
    </>
  );
}
