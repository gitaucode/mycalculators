import { PiggyBank } from "lucide-react";

import { BudgetCalculator } from "../../src/components/calculators/BudgetCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Budget Planner",
  title: "Budget Planner Kenya - My Calculators",
  description:
    "Plan monthly income, expenses and savings with a practical Kenya-focused budget planner for everyday money decisions.",
  path: "/budget-planner",
  category: "Money & Banking",
  keywords: [
    "budget planner Kenya",
    "monthly budget calculator",
    "expense tracker Kenya",
    "income tracker",
    "money management Kenya",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function BudgetPlannerPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Budget Planner"
        category="Budgeting"
        description="Track income and expenses across categories"
        icon={PiggyBank}
      >
        <BudgetCalculator />
      </CalculatorPageLayout>
    </>
  );
}
