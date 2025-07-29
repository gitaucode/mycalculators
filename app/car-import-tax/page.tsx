import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { CarImportTaxCalculator } from "../../src/components/calculators/CarImportTaxCalculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Car Import Tax Calculator - K Toolkit",
  description:
    "Calculate import duties and taxes for vehicles imported to Kenya. Get accurate estimates for car import costs including VAT, excise duty, and IDF fees.",
  keywords: "car import tax, vehicle import duty, kenya car import, import tax calculator, car customs duty",
}

export default function CarImportTaxPage() {
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
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">Car Import Tax</h1>
                  <Badge variant="secondary" className="mt-1">
                    Tax
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Calculate import duties and taxes for vehicles
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <CarImportTaxCalculator />
        </div>
      </div>
      <Footer />
    </>
  )
}
