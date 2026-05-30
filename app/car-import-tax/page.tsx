import type { Metadata } from "next"
import { Car } from "lucide-react"

import { CarImportTaxCalculator } from "../../src/components/calculators/CarImportTaxCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "Car Import Tax Calculator - MyCalculators",
  description:
    "Calculate import duties and taxes for vehicles imported to Kenya. Get accurate estimates for car import costs including VAT, excise duty, and IDF fees.",
  keywords: "car import tax, vehicle import duty, kenya car import, import tax calculator, car customs duty",
}

export default function CarImportTaxPage() {
  return (
    <CalculatorPageLayout
      title="Car Import Tax"
      category="Tax"
      description="Calculate import duties and taxes for vehicles"
      icon={Car}
    >
      <CarImportTaxCalculator />
    </CalculatorPageLayout>
  )
}
