import { CreditCard } from "lucide-react";

import { MpesaCalculator } from "../../src/components/calculators/MpesaCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "M-Pesa Charges Calculator",
  title: "M-Pesa Charges Calculator Kenya - MyCalculators",
  description:
    "Calculate M-Pesa send money, withdrawal and payment charges in Kenya using updated Safaricom tariff estimates.",
  path: "/mpesa-charges",
  category: "Mobile Money",
  keywords: [
    "M-Pesa charges calculator",
    "M-Pesa fees Kenya",
    "Safaricom M-Pesa charges",
    "send money charges",
    "M-Pesa withdrawal fees",
  ],
} as const;

export const metadata = createCalculatorMetadata(seo);

export default function MpesaChargesPage() {
  return (
    <>
      <CalculatorStructuredData seo={seo} />
      <CalculatorPageLayout
        title="M-Pesa Charges"
        category="Mobile Money"
        description="Calculate transaction fees for send money, withdrawals, and payments"
        icon={CreditCard}
      >
        <MpesaCalculator />
      </CalculatorPageLayout>
    </>
  );
}
