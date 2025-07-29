import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { CalorieCalculator } from "../../src/components/calculators/CalorieCalculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Apple } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Calorie Calculator - K Toolkit",
  description:
    "Estimate daily calorie needs based on BMR and activity level. Calculate calories for weight loss, maintenance, or gain.",
  keywords: "calorie calculator, bmr calculator, daily calories, weight loss calories, tdee calculator",
}

export default function CalorieCalculatorPage() {
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
                  <Apple className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">Calorie Calculator</h1>
                  <Badge variant="secondary" className="mt-1">
                    Health
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">Estimate daily calorie needs (BMR)</p>
            </div>
          </div>

          {/* Calculator Component */}
          <CalorieCalculator />
        </div>
      </div>
      <Footer />
    </>
  )
}
