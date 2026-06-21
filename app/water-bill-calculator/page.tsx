import { Droplets } from "lucide-react"

import { WaterBillCalculator } from "../../src/components/calculators/WaterBillCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo"

const seo = {
  name: "Water Bill Calculator",
  title: "Water Bill Calculator Kenya - My Calculators",
  description:
    "Estimate monthly water bills using consumption, tier rates, sewerage percentage and service charge.",
  path: "/water-bill-calculator",
  category: "Utilities",
  keywords: [
    "water bill calculator Kenya",
    "water tariff calculator",
    "Nairobi water bill calculator",
    "water units calculator",
  ],
} as const

export const metadata = createCalculatorMetadata(seo)

export default function WaterBillCalculatorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Water Bill Calculator"
        category="Utilities"
        description="Estimate water, sewerage and service charges"
        icon={Droplets}
      >
        <WaterBillCalculator />
      </CalculatorPageLayout>
    </>
  )
}
