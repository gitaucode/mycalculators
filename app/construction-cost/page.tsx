import { Building } from "lucide-react";

import { ConstructionCostCalculator } from "../../src/components/calculators/ConstructionCostCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Construction Cost Calculator",
  title: "Construction Cost Calculator Kenya - My Calculators",
  description:
    "Estimate building and construction costs in Kenya based on project area, quality level and common cost assumptions.",
  path: "/construction-cost",
  category: "Home & Utilities",
  keywords: [
    "construction cost calculator Kenya",
    "building cost calculator",
    "house construction estimate Kenya",
    "construction estimate",
    "building costs Kenya",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function ConstructionCostPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Construction Cost"
        category="Construction"
        description="Estimate building costs based on area and quality"
        icon={Building}
      >
        <ConstructionCostCalculator />
      </CalculatorPageLayout>
    </>
  );
}
