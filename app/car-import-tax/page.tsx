import { Car } from "lucide-react";

import { CarImportTaxCalculator } from "../../src/components/calculators/CarImportTaxCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Car Import Tax Calculator",
  title: "Car Import Tax Calculator Kenya - MyCalculators",
  description:
    "Estimate Kenya car import duty, excise duty, VAT, IDF and RDL costs before importing a vehicle.",
  path: "/car-import-tax",
  category: "Tax & Transport",
  keywords: [
    "car import tax calculator Kenya",
    "vehicle import duty Kenya",
    "KRA car import duty",
    "car customs duty Kenya",
    "IDF RDL calculator",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function CarImportTaxPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Car Import Tax"
        category="Tax"
        description="Calculate import duties and taxes for vehicles"
        icon={Car}
      >
        <CarImportTaxCalculator />
      </CalculatorPageLayout>
    </>
  );
}
