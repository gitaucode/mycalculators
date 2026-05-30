import { Baby } from "lucide-react";

import { PregnancyDueDateCalculator } from "../../src/components/calculators/PregnancyDueDateCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Pregnancy Due Date Calculator",
  title: "Pregnancy Due Date Calculator - MyCalculators",
  description:
    "Estimate pregnancy due date, trimester, weeks remaining and key milestones from the last menstrual period.",
  path: "/pregnancy-due-date",
  category: "Health",
  keywords: [
    "pregnancy due date calculator",
    "pregnancy calculator",
    "trimester calculator",
    "pregnancy weeks calculator",
    "estimated due date",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function PregnancyDueDatePage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Pregnancy Due Date"
        category="Health"
        description="Estimate due date, trimester, weeks left"
        icon={Baby}
      >
        <PregnancyDueDateCalculator />
      </CalculatorPageLayout>
    </>
  );
}
