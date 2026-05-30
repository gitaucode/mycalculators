import { Wallet } from "lucide-react";

import { NetSalaryCalculator } from "../../src/components/calculators/NetSalaryCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Net Salary Calculator",
  title: "Net Salary Calculator Kenya - MyCalculators",
  description:
    "Calculate Kenya take-home pay after PAYE, SHIF, NSSF and Affordable Housing Levy deductions.",
  path: "/net-salary",
  category: "Salary & Tax",
  keywords: [
    "net salary calculator Kenya",
    "PAYE calculator Kenya",
    "SHIF calculator",
    "NSSF calculator Kenya",
    "take home pay Kenya",
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
      >
        <NetSalaryCalculator />
      </CalculatorPageLayout>
    </>
  );
}
