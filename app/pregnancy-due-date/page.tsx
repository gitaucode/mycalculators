import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { PregnancyDueDateCalculator } from "../../src/components/calculators/PregnancyDueDateCalculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Baby } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pregnancy Due Date Calculator - K Toolkit",
  description:
    "Estimate due date, trimester, and weeks left in pregnancy. Track your pregnancy journey with accurate calculations.",
  keywords: "pregnancy calculator, due date calculator, pregnancy tracker, trimester calculator, pregnancy weeks",
}

export default function PregnancyDueDatePage() {
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
                  <Baby className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">Pregnancy Due Date</h1>
                  <Badge variant="secondary" className="mt-1">
                    Health
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Estimate due date, trimester, weeks left
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <PregnancyDueDateCalculator />
        </div>
      </div>
      <Footer />
    </>
  )
}
