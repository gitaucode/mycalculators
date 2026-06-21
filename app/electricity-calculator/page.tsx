import { Zap } from "lucide-react";

import { ElectricityCalculator } from "../../src/components/calculators/ElectricityCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Electricity Calculator",
  title: "KPLC Token Calculator Kenya - My Calculators",
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
    "KPLC units calculator",
    "KPLC token calculator Kenya",
    "electricity bill calculator Kenya",
    "how many tokens for 1000 bob",
    "Kenya Power token units calculator",
  ],
  faqs: [
    {
      question: "How many KPLC tokens do I get for 1000 bob?",
      answer:
        "The exact units depend on current tariffs, fuel cost adjustments, taxes, levies and customer category. Enter KES 1,000 in the calculator to estimate the token units for your case.",
    },
    {
      question: "Why do KPLC token units change?",
      answer:
        "Kenya Power prepaid units can change because tariff bands, fuel energy charges, forex adjustments, levies and taxes may vary over time.",
    },
    {
      question: "Can this estimate a monthly electricity bill?",
      answer:
        "Yes. You can use it to estimate prepaid token costs or compare how much electricity different budgets may buy.",
    },
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
        lastUpdated="Updated for 2026"
        sourceNote="KPLC token estimates focus on Kenya Power prepaid electricity planning, including practical token budgets and unit comparisons."
        seoIntro="This KPLC token calculator estimates how many prepaid electricity units you may get for a Kenyan shilling amount. It is useful for searches like how many tokens for 1000 bob, KPLC units calculator, Kenya Power token calculator and electricity bill calculator Kenya."
        searchTerms={[
          "KPLC token calculator Kenya",
          "how many tokens for 1000 bob",
          "KPLC units calculator",
          "electricity bill calculator Kenya",
          "Kenya Power token units calculator",
        ]}
        guideLinks={[
          {
            label: "How KPLC token units are estimated",
            href: "/guides/kplc-token-calculator-kenya",
          },
        ]}
      >
        <ElectricityCalculator />
      </CalculatorPageLayout>
    </>
  );
}
