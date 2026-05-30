import { Split } from "lucide-react";

import { BillSplittingCalculator } from "../../src/components/calculators/BillSplittingCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Bill Splitting Calculator",
  title: "Bill Splitting Calculator Kenya - MyCalculators",
  description:
    "Split shared bills fairly among friends, roommates or groups in Kenya and calculate each person's contribution quickly.",
  path: "/bill-splitting",
  category: "Money & Banking",
  keywords: [
    "bill splitting calculator",
    "split bill calculator Kenya",
    "shared expenses calculator",
    "group bill divider",
    "roommate expenses Kenya",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function BillSplittingPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Bill Splitting"
        category="Utilities"
        description="Split bills fairly among friends or roommates"
        icon={Split}
      >
        <BillSplittingCalculator />
      </CalculatorPageLayout>
    </>
  );
}
