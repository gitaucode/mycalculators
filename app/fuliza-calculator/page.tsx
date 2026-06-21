import { Landmark } from "lucide-react";

import { FulizaCalculator } from "../../src/components/calculators/FulizaCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Fuliza Calculator",
  title: "Fuliza Calculator Kenya - My Calculators",
  description:
    "Estimate Fuliza M-Pesa overdraft access, maintenance fees and total repayment amount for Kenyan mobile money users.",
  path: "/fuliza-calculator",
  category: "Money & Banking",
  keywords: [
    "Fuliza calculator",
    "Fuliza charges Kenya",
    "M-Pesa overdraft fees",
    "Fuliza fees calculator",
    "Safaricom Fuliza",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function FulizaCalculatorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Fuliza Calculator"
        category="Mobile Money"
        description="Calculate overdraft fees and total repayment amounts"
        icon={Landmark}
      >
        <FulizaCalculator />
      </CalculatorPageLayout>
    </>
  );
}
