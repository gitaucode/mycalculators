import { Zap } from "lucide-react";

import { ElectricityCalculator } from "../../src/components/calculators/ElectricityCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Electricity Calculator",
  title: "KPLC Token Calculator Kenya - MyCalculators",
  description:
    "Estimate Kenya Power prepaid token units and electricity costs using practical KPLC tariff assumptions.",
  path: "/electricity-calculator",
  category: "Utilities",
  keywords: [
    "KPLC token calculator",
    "electricity calculator Kenya",
    "Kenya Power prepaid tokens",
    "electricity units calculator",
    "KPLC units",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function ElectricityCalculatorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Electricity Calculator"
        category="Utilities"
        description="Calculate KPLC token units and costs"
        icon={Zap}
      >
        <ElectricityCalculator />
      </CalculatorPageLayout>
    </>
  );
}
