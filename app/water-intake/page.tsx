import { Droplets } from "lucide-react";

import { WaterIntakeCalculator } from "../../src/components/calculators/WaterIntakeCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Water Intake Calculator",
  title: "Water Intake Calculator - My Calculators",
  description:
    "Estimate daily water intake needs from weight, activity and climate to support healthy hydration habits.",
  path: "/water-intake",
  category: "Health",
  keywords: [
    "water intake calculator",
    "daily water needs",
    "hydration calculator",
    "water consumption calculator",
    "daily hydration",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function WaterIntakePage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Water Intake"
        category="Health"
        description="Daily recommended water based on weight & activity"
        icon={Droplets}
      >
        <WaterIntakeCalculator />
      </CalculatorPageLayout>
    </>
  );
}
