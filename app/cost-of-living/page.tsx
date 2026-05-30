import { HomeIcon } from "lucide-react";

import { CostOfLivingCalculator } from "../../src/components/calculators/CostOfLivingCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Cost of Living Calculator",
  title: "Cost of Living Calculator Kenya - MyCalculators",
  description:
    "Compare estimated monthly living expenses across Kenyan cities including housing, food, transport and utilities.",
  path: "/cost-of-living",
  category: "Home & Utilities",
  keywords: [
    "cost of living calculator Kenya",
    "Nairobi cost of living",
    "Mombasa cost of living",
    "Kenya city expenses",
    "living expenses calculator",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function CostOfLivingPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Cost of Living"
        category="Living Costs"
        description="Compare living expenses across Kenyan cities"
        icon={HomeIcon}
      >
        <CostOfLivingCalculator />
      </CalculatorPageLayout>
    </>
  );
}
