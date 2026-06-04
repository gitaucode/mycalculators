import { Car } from "lucide-react";

import { CarImportTaxCalculator } from "../../src/components/calculators/CarImportTaxCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "Car Import Tax Calculator",
  title: "Car Import Duty Calculator Kenya 2026 - KRA Taxes, IDF & RDL",
  description:
    "Estimate Kenya car import duty, excise duty, VAT, IDF and Railway Development Levy before importing a vehicle.",
  path: "/car-import-tax",
  category: "Tax & Transport",
  keywords: [
    "car import tax calculator Kenya",
    "car import duty calculator Kenya",
    "vehicle import duty Kenya",
    "KRA car import duty",
    "car customs duty Kenya",
    "IDF RDL calculator",
    "CRSP calculator Kenya",
  ],
  faqs: [
    {
      question: "What taxes are charged when importing a car to Kenya?",
      answer:
        "A typical estimate can include import duty, excise duty, VAT, Import Declaration Fee and Railway Development Levy, plus clearing and port-related costs outside the tax estimate.",
    },
    {
      question: "What is CRSP in Kenya car import duty?",
      answer:
        "CRSP means Current Retail Selling Price. KRA can use CRSP and depreciation rules to determine the customs value used in duty calculations.",
    },
    {
      question: "Does this calculator include clearing agent fees?",
      answer:
        "No. It focuses on import tax estimates. You should separately budget for shipping, port charges, inspection, insurance and clearing agent fees.",
    },
    {
      question: "Why can the final KRA assessment differ?",
      answer:
        "The final duty can differ because of vehicle specification, year, CRSP value, exchange rate, condition, classification and KRA's assessment at the time of import.",
    },
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
        lastUpdated="Updated for 2026"
        sourceNote="Vehicle import estimates are designed around Kenya duty components such as CRSP, import duty, excise, VAT, IDF and RDL."
        sourceLinks={[
          {
            label: "KRA customs information",
            href: "https://www.kra.go.ke/individual/importing/importing-goods/customs-duty",
          },
        ]}
        faqs={seo.faqs}
      >
        <CarImportTaxCalculator />
      </CalculatorPageLayout>
    </>
  );
}
