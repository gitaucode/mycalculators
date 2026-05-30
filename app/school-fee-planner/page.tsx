import type { Metadata } from "next"
import { GraduationCap } from "lucide-react"

import { SchoolFeePlanner } from "../../src/components/calculators/SchoolFeePlanner"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "School Fee Planner - MyCalculators",
  description:
    "Project future education costs with annual increments. Plan and budget for school fees over multiple years.",
  keywords: "school fee planner, education costs, school fees calculator, education planning, kenya school fees",
}

export default function SchoolFeePlannerPage() {
  return (
    <CalculatorPageLayout
      title="School Fee Planner"
      category="Education"
      description="Project future education costs with annual increments"
      icon={GraduationCap}
    >
      <SchoolFeePlanner />
    </CalculatorPageLayout>
  )
}
