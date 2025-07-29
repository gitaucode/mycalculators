import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { MpesaCalculator } from "../../src/components/calculators/MpesaCalculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "M-Pesa Charges Calculator - K Toolkit",
  description:
    "Calculate M-Pesa transaction fees for send money, withdrawals, and payments. Get accurate charges for all M-Pesa services in Kenya.",
  keywords: "mpesa charges, mpesa fees, send money charges, mpesa calculator, kenya mobile money",
}

export default function MpesaChargesPage() {
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
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">M-Pesa Charges</h1>
                  <Badge variant="secondary" className="mt-1">
                    Mobile Money
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Calculate transaction fees for send money, withdrawals, and payments
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <MpesaCalculator />
        </div>
      </div>
      <Footer />
    </>
  )
}
