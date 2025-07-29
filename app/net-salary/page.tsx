import type { Metadata } from "next"
import { Header, Footer } from "../../src/components/layout/HeaderFooter"
import { NetSalaryCalculator } from "../../src/components/calculators/NetSalaryCalculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Net Salary Calculator - K Toolkit",
  description:
    "Calculate your take-home pay after PAYE, NHIF, and NSSF deductions. Get accurate net salary calculations for Kenya.",
  keywords: "net salary calculator, paye calculator, nhif deductions, nssf contributions, kenya salary",
}

export default function NetSalaryPage() {
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
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-heading-1">Net Salary</h1>
                  <Badge variant="secondary" className="mt-1">
                    Salary
                  </Badge>
                </div>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                Calculate take-home pay after PAYE, NHIF, and NSSF deductions
              </p>
            </div>
          </div>

          {/* Calculator Component */}
          <NetSalaryCalculator />
        </div>
      </div>
      <Footer />
    </>
  )
}
