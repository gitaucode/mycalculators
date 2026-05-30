import { Target } from "lucide-react";

import { SavingsGoalCalculator } from "../../src/components/calculators/SavingsGoalCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Savings Goal Calculator",
  title: "Savings Goal Calculator Kenya - MyCalculators",
  description:
    "Plan monthly savings needed to reach a target amount and estimate the timeline for your financial goals.",
  path: "/savings-goal",
  category: "Money & Banking",
  keywords: [
    "savings goal calculator",
    "savings planner Kenya",
    "monthly savings calculator",
    "financial goals calculator",
    "money saving calculator",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function SavingsGoalPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Savings Goal"
        category="Savings"
        description="Plan timeline to reach savings targets with regular contributions"
        icon={Target}
      >
        <SavingsGoalCalculator />
      </CalculatorPageLayout>
    </>
  );
}
