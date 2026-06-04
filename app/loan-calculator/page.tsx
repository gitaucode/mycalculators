import { CalculatorIcon } from "lucide-react";

import { LoanCalculator } from "../../src/components/calculators/LoanCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Loan Calculator",
  title: "Loan Calculator Kenya 2026 - Monthly Payments & Interest",
  description:
    "Calculate monthly loan payments, total interest and repayment cost for personal, business, car and mortgage loans in Kenya.",
  path: "/loan-calculator",
  category: "Loans & Planning",
  keywords: [
    "loan calculator Kenya",
    "loan repayment calculator Kenya",
    "monthly loan payment calculator",
    "interest calculator Kenya",
    "amortization calculator",
    "mortgage calculator Kenya",
    "personal loan calculator Kenya",
  ],
  faqs: [
    {
      question: "How is the monthly loan payment calculated?",
      answer:
        "The calculator uses the loan amount, interest rate and repayment period to estimate a monthly instalment and total interest over the loan term.",
    },
    {
      question: "Can I use this for bank loans in Kenya?",
      answer:
        "Yes. It can estimate personal, business, car and home loan repayments, but the final bank offer may include fees, insurance or changing interest rates.",
    },
    {
      question: "What is total interest?",
      answer:
        "Total interest is the extra amount paid above the original principal across the full repayment period.",
    },
    {
      question: "Should I compare loans by monthly payment only?",
      answer:
        "No. Compare the total repayment, fees, interest rate, repayment term and flexibility before choosing a loan.",
    },
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
        lastUpdated="Updated for 2026"
        sourceNote="Loan estimates help compare Kenyan repayment scenarios before speaking to a bank, SACCO or lender."
        sourceLinks={[
          {
            label: "Central Bank of Kenya",
            href: "https://www.centralbank.go.ke/",
          },
        ]}
        faqs={seo.faqs}
      >
        <LoanCalculator />
      </CalculatorPageLayout>
    </>
  );
}
