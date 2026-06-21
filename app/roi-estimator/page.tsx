import { Percent } from "lucide-react";

import { RoiEstimator } from "../../src/components/calculators/RoiEstimator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "ROI Estimator",
  title: "ROI Calculator Kenya - My Calculators",
  description:
    "Estimate investment returns, compound growth and return on investment over time for planning and comparison.",
  path: "/roi-estimator",
  category: "Loans & Planning",
  keywords: [
    "ROI calculator Kenya",
    "return on investment calculator",
    "investment returns calculator",
    "compound interest calculator",
    "investment planner",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function RoiEstimatorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="ROI Estimator"
        category="Investment"
        description="Calculate investment returns with compound interest"
        icon={Percent}
      >
        <RoiEstimator />
      </CalculatorPageLayout>
    </>
  );
}
