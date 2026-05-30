import { Heart } from "lucide-react";

import { HeartRateZonesCalculator } from "../../src/components/calculators/HeartRateZonesCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Heart Rate Zones Calculator",
  title: "Heart Rate Zones Calculator - MyCalculators",
  description:
    "Calculate training heart rate zones from age and fitness level to guide cardio, endurance and workout intensity.",
  path: "/heart-rate-zones",
  category: "Health",
  keywords: [
    "heart rate zones calculator",
    "target heart rate calculator",
    "training zones",
    "fitness calculator",
    "cardio zones",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function HeartRateZonesPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Heart Rate Zones"
        category="Health"
        description="Calculate training zones based on age and fitness level"
        icon={Heart}
      >
        <HeartRateZonesCalculator />
      </CalculatorPageLayout>
    </>
  );
}
