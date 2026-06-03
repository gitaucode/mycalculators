import { Fuel } from "lucide-react"

import { FuelCostCalculator } from "../../src/components/calculators/FuelCostCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo"

const seo = {
  name: "Fuel Cost Calculator",
  title: "Fuel Cost Calculator Kenya - MyCalculators",
  description:
    "Estimate petrol or diesel cost for trips, commutes and shared rides using distance, fuel economy and pump price.",
  path: "/fuel-cost-calculator",
  category: "Transport",
  keywords: [
    "fuel cost calculator Kenya",
    "petrol cost calculator",
    "diesel cost calculator",
    "trip fuel calculator",
  ],
} as const

export const metadata = createCalculatorMetadata(seo)

export default function FuelCostCalculatorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Fuel Cost Calculator"
        category="Transport"
        description="Estimate fuel needed and trip cost"
        icon={Fuel}
      >
        <FuelCostCalculator />
      </CalculatorPageLayout>
    </>
  )
}
