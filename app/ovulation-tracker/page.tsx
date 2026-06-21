import { Calendar } from "lucide-react";

import { OvulationTracker } from "../../src/components/calculators/OvulationTracker";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Ovulation Tracker",
  title: "Ovulation Tracker - My Calculators",
  description:
    "Estimate ovulation dates, fertile window and peak fertility days from menstrual cycle details for family planning.",
  path: "/ovulation-tracker",
  category: "Health",
  keywords: [
    "ovulation tracker",
    "ovulation calculator",
    "fertile window calculator",
    "menstrual cycle calculator",
    "fertility tracker",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function OvulationTrackerPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Ovulation Tracker"
        category="Health"
        description="Show fertile window from menstrual cycle"
        icon={Calendar}
      >
        <OvulationTracker />
      </CalculatorPageLayout>
    </>
  );
}
