import { Smartphone } from "lucide-react";

import { MkopaPhoneLoanCalculator } from "../../src/components/calculators/MkopaPhoneLoanCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "M-KOPA Phone Loan Calculator",
  title: "M-KOPA Phone Loan Calculator Kenya - My Calculators",
  description:
    "Estimate total repayment, markup over cash price and whether an M-KOPA-style phone loan deal is worth it for Kenyan buyers.",
  path: "/mkopa-phone-loan",
  category: "Money & Banking",
  keywords: [
    "M-KOPA phone loan calculator",
    "M-KOPA calculator Kenya",
    "phone loan calculator Kenya",
    "pay as you go phone calculator",
    "M-KOPA repayment calculator",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function MkopaPhoneLoanPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="M-KOPA Phone Loan Calculator"
        category="Phone Loans"
        description="Compare deposit, repayments, cash price and affordability before taking a pay-as-you-go phone deal."
        icon={Smartphone}
      >
        <MkopaPhoneLoanCalculator />
      </CalculatorPageLayout>
    </>
  );
}
