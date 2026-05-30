import { Scale } from "lucide-react";

import { BmiCalculator } from "../../src/components/calculators/BmiCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "BMI Calculator",
  title: "BMI Calculator - MyCalculators",
  description:
    "Calculate your body mass index from height and weight and understand your BMI category with a simple health estimate.",
  path: "/bmi-calculator",
  category: "Health",
  keywords: [
    "BMI calculator",
    "body mass index calculator",
    "BMI chart",
    "health calculator",
    "weight calculator",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function BmiCalculatorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="BMI Calculator"
        category="Health"
        description="Body Mass Index from height & weight"
        icon={Scale}
      >
        <BmiCalculator />
      </CalculatorPageLayout>
    </>
  );
}
