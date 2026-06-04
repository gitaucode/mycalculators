import { CreditCard } from "lucide-react";

import { MpesaCalculator } from "../../src/components/calculators/MpesaCalculator";
import { CalculatorPageLayout } from "../../src/components/layout/CalculatorPageLayout";
import {
  CalculatorStructuredData,
  createCalculatorMetadata,
} from "@/lib/calculator-seo";

const seo = {
  name: "M-Pesa Charges Calculator",
  title: "M-Pesa Charges Calculator Kenya 2026 - Send, Withdraw & Paybill Fees",
  description:
    "Calculate M-Pesa charges in Kenya for sending money, withdrawals, Paybill, Buy Goods and Till payments using updated Safaricom tariff estimates.",
  path: "/mpesa-charges",
  category: "Mobile Money",
  keywords: [
    "M-Pesa charges calculator",
    "M-Pesa charges 2026",
    "M-Pesa fees Kenya",
    "Safaricom M-Pesa charges",
    "send money charges",
    "M-Pesa withdrawal fees",
    "M-Pesa Paybill charges",
  ],
  faqs: [
    {
      question: "How do I calculate M-Pesa charges in Kenya?",
      answer:
        "Enter the transaction amount and choose the type of M-Pesa transaction. The calculator estimates the Safaricom charge and total amount to budget for.",
    },
    {
      question: "Are M-Pesa deposits free?",
      answer:
        "M-Pesa deposits are generally free for customers. Charges usually apply to sending money, withdrawing cash, some payment transactions and other chargeable services.",
    },
    {
      question: "Why can M-Pesa charges change?",
      answer:
        "Safaricom can update transaction bands, limits and tariffs. Always confirm large or business-critical payments against the latest official Safaricom tariff.",
    },
    {
      question: "Does this calculator include withdrawal charges?",
      answer:
        "Yes. It is designed to estimate common M-Pesa costs including send money charges and agent withdrawal fees where tariff data is available.",
    },
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
        lastUpdated="Updated for 2026"
        sourceNote="M-Pesa estimates are built around Kenyan mobile money decisions and should be checked against Safaricom's latest tariff for high-value transactions."
        sourceLinks={[
          {
            label: "Safaricom M-Pesa rates",
            href: "https://www.safaricom.co.ke/personal/m-pesa/getting-started/m-pesa-rates",
          },
        ]}
        faqs={seo.faqs}
      >
        <MpesaCalculator />
      </CalculatorPageLayout>
    </>
  );
}
