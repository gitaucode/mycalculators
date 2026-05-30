import { GraduationCap } from "lucide-react";

import { SchoolFeePlanner } from "../../src/components/calculators/SchoolFeePlanner";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "School Fee Planner",
  title: "School Fee Planner Kenya - MyCalculators",
  description:
    "Project future school fee costs with annual increases and plan education savings for Kenyan families.",
  path: "/school-fee-planner",
  category: "Education",
  keywords: [
    "school fee planner Kenya",
    "education cost calculator",
    "school fees calculator",
    "education savings planner",
    "Kenya school fees",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function SchoolFeePlannerPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="School Fee Planner"
        category="Education"
        description="Project future education costs with annual increments"
        icon={GraduationCap}
      >
        <SchoolFeePlanner />
      </CalculatorPageLayout>
    </>
  );
}
