import { Users } from "lucide-react"

import { ChamaSaccoCalculator } from "../../src/components/calculators/ChamaSaccoCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo"

const seo = {
  name: "Chama/SACCO Calculator",
  title: "Chama and SACCO Calculator Kenya - MyCalculators",
  description:
    "Project Chama or SACCO contributions, member share, dividend estimate and loan limit from deposits.",
  path: "/chama-sacco-calculator",
  category: "Money",
  keywords: [
    "Chama calculator Kenya",
    "SACCO calculator",
    "SACCO loan limit calculator",
    "group savings calculator",
    "Chama contributions calculator",
  ],
} as const

export const metadata = createCalculatorMetadata(seo)

export default function ChamaSaccoCalculatorPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="Chama/SACCO Calculator"
        category="Money"
        description="Project group savings, shares and loan limits"
        icon={Users}
      >
        <ChamaSaccoCalculator />
      </CalculatorPageLayout>
    </>
  )
}
