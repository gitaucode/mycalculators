import { Wallet } from "lucide-react";

import { NetSalaryCalculator } from "../../src/components/calculators/NetSalaryCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Net Salary Calculator",
  title: "Net Salary Calculator Kenya 2026 - PAYE, SHIF, NSSF & Housing Levy",
  description:
    "Calculate Kenya take-home pay after PAYE, SHIF, NSSF and Affordable Housing Levy deductions using current 2026 payroll assumptions.",
  path: "/net-salary",
  category: "Salary & Tax",
  keywords: [
    "net salary calculator Kenya",
    "salary calculator Kenya 2026",
    "PAYE calculator Kenya",
    "SHIF calculator",
    "NSSF calculator Kenya",
    "take home pay Kenya",
    "housing levy calculator Kenya",
  ],
  faqs: [
    {
      question: "What deductions are included in Kenya net salary?",
      answer:
        "The calculator estimates PAYE income tax, SHIF, NSSF and Affordable Housing Levy to show the expected take-home pay from a gross monthly salary.",
    },
    {
      question: "Is SHIF different from NHIF?",
      answer:
        "Yes. SHIF replaced NHIF for current Kenyan payroll deductions. This calculator uses SHIF terminology and current contribution logic.",
    },
    {
      question: "Does PAYE apply to gross salary?",
      answer:
        "PAYE is calculated after allowable deductions and reliefs, not simply as one flat percentage of gross salary.",
    },
    {
      question: "Can I use this for payroll advice?",
      answer:
        "Use it as an estimate for planning. Employers, accountants and HR teams should confirm statutory payroll figures against official KRA, SHIF and NSSF guidance.",
    },
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function NetSalaryPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Net Salary"
        category="Salary"
        description="Calculate take-home pay after PAYE, SHIF, NSSF and Affordable Housing Levy deductions"
        icon={Wallet}
        lastUpdated="Updated for 2026"
        sourceNote="Salary estimates focus on Kenya payroll deductions, including PAYE, SHIF, NSSF and Affordable Housing Levy."
        sourceLinks={[
          {
            label: "KRA PAYE information",
            href: "https://www.kra.go.ke/individual/calculate-tax/calculating-tax/paye",
          },
          {
            label: "NSSF Kenya",
            href: "https://www.nssf.or.ke/",
          },
        ]}
        faqs={seo.faqs}
      >
        <NetSalaryCalculator />
      </CalculatorPageLayout>
    </>
  );
}
