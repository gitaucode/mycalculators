import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { SchoolFeePlanner } from "../../src/components/calculators/SchoolFeePlanner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "School Fee Planner - K Toolkit",
  description:
    "Project future education costs with annual increments. Plan and budget for school fees over multiple years.",
  keywords: "school fee planner, education costs, school fees calculator, education planning, kenya school fees",
}

export default function SchoolFeePlannerPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/10">
        <div className="container mx-auto px-4 py-8">
          {/* Calculator Header */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-6 -ml-2">
                ← Back to Calculators
              </Button>
            </Link>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">School Fee Planner</h1>
                  <Badge variant="secondary" className="mt-1">
                    Education
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Project future education costs with annual increments
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <SchoolFeePlanner />
        </div>
      </div>
      <Footer />
    </>
  )
}
