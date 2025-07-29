import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { VatCalculator } from "../../src/components/calculators/VatCalculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ReceiptText } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "VAT Calculator - K Toolkit",
  description:
    "Convert between VAT inclusive and exclusive prices. Calculate VAT amounts for business transactions in Kenya.",
  keywords: "vat calculator, vat inclusive, vat exclusive, kenya vat, tax calculator, 16% vat",
}

export default function VatCalculatorPage() {
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
                  <ReceiptText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">VAT Calculator</h1>
                  <Badge variant="secondary" className="mt-1">
                    Tax
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Convert between VAT inclusive and exclusive prices
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <VatCalculator />
        </div>
      </div>
      <Footer />
    </>
  )
}
