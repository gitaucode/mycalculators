import { Apple } from "lucide-react";

import { CalorieCalculator } from "../../src/components/calculators/CalorieCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Calorie Calculator",
  title: "Calorie Calculator - My Calculators",
  description:
    "Estimate daily calorie needs from your body profile, activity level and goal for weight loss, maintenance or gain.",
  path: "/calorie-calculator",
  category: "Health",
  keywords: [
    "calorie calculator",
    "BMR calculator",
    "TDEE calculator",
    "daily calorie needs",
    "weight loss calories",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function CalorieCalculatorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Calorie Calculator"
        category="Health"
        description="Estimate daily calorie needs (BMR)"
        icon={Apple}
      >
        <CalorieCalculator />
      </CalculatorPageLayout>
    </>
  );
}
