import type { Metadata } from "next"
import { CreditCard } from "lucide-react"

import { MpesaCalculator } from "../../src/components/calculators/MpesaCalculator"
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout"

export const metadata: Metadata = {
  title: "M-Pesa Charges Calculator - MyCalculators",
  description:
    "Calculate M-Pesa transaction fees for send money, withdrawals, and payments. Get accurate charges for all M-Pesa services in Kenya.",
  keywords: "mpesa charges, mpesa fees, send money charges, mpesa calculator, kenya mobile money",
}

export default function MpesaChargesPage() {
  return (
    <CalculatorPageLayout
      title="M-Pesa Charges"
      category="Mobile Money"
      description="Calculate transaction fees for send money, withdrawals, and payments"
      icon={CreditCard}
    >
      <MpesaCalculator />
    </CalculatorPageLayout>
  )
}
