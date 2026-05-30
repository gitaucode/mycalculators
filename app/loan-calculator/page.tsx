import { CalculatorIcon } from "lucide-react";

import { LoanCalculator } from "../../src/components/calculators/LoanCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Loan Calculator",
  title: "Loan Calculator Kenya - MyCalculators",
  description:
    "Calculate monthly loan payments, total interest and repayment cost for personal, business, car or mortgage loans in Kenya.",
  path: "/loan-calculator",
  category: "Loans & Planning",
  keywords: [
    "loan calculator Kenya",
    "monthly loan payment calculator",
    "interest calculator Kenya",
    "amortization calculator",
    "mortgage calculator Kenya",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function LoanCalculatorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Loan Calculator"
        category="Loans"
        description="Calculate monthly payments, interest, and amortization schedules"
        icon={CalculatorIcon}
      >
        <LoanCalculator />
      </CalculatorPageLayout>
    </>
  );
}
