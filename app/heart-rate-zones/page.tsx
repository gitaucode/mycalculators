import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { HeartRateZonesCalculator } from "../../src/components/calculators/HeartRateZonesCalculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Heart Rate Zones Calculator - K Toolkit",
  description:
    "Calculate training zones based on age and fitness level. Optimize your workouts with personalized heart rate targets.",
  keywords: "heart rate zones, training zones, target heart rate, fitness calculator, workout zones",
}

export default function HeartRateZonesPage() {
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
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">Heart Rate Zones</h1>
                  <Badge variant="secondary" className="mt-1">
                    Health
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Calculate training zones based on age and fitness level
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <HeartRateZonesCalculator />
        </div>
      </div>
      <Footer />
    </>
  )
}
