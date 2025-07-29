import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { OvulationTracker } from "../../src/components/calculators/OvulationTracker"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Ovulation Tracker - K Toolkit",
  description:
    "Track your fertile window from menstrual cycle. Calculate ovulation dates and peak fertility periods for family planning.",
  keywords: "ovulation tracker, fertile window, ovulation calculator, menstrual cycle, fertility tracker",
}

export default function OvulationTrackerPage() {
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
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">Ovulation Tracker</h1>
                  <Badge variant="secondary" className="mt-1">
                    Health
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Show fertile window from menstrual cycle
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <OvulationTracker />
        </div>
      </div>
      <Footer />
    </>
  )
}
