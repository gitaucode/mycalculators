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
    "reducing balance loan calculator Kenya",
    "SACCO loan calculator Kenya",
    "bank loan calculator Kenya",
    "car loan calculator Kenya",
    "business loan calculator Kenya",
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
    {
      question: "What is a reducing balance loan calculator?",
      answer:
        "A reducing balance loan calculator estimates interest on the remaining principal as the loan is repaid, which can make it easier to compare bank, SACCO, car and business loan offers.",
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
        seoIntro="This loan calculator Kenya page estimates monthly repayment, total interest and total loan cost for personal, bank, SACCO, car and business loans. It supports common searches such as loan repayment calculator Kenya, reducing balance loan calculator Kenya and monthly loan payment calculator."
        searchTerms={[
          "loan repayment calculator Kenya",
          "reducing balance loan calculator Kenya",
          "SACCO loan calculator Kenya",
          "bank loan calculator Kenya",
          "monthly loan payment calculator",
        ]}
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
