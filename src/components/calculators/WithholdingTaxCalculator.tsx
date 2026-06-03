"use client"

import { useState } from "react"
import { BarChart3, Percent } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const taxTypes = {
  professional: { label: "Professional / Management Fees", rate: 5 },
  rent: { label: "Rental Income", rate: 7.5 },
  dividendResident: { label: "Dividend - Resident", rate: 5 },
  dividendNonResident: { label: "Dividend - Non-resident", rate: 15 },
  interest: { label: "Interest", rate: 15 },
  royaltyResident: { label: "Royalty - Resident", rate: 5 },
  royaltyNonResident: { label: "Royalty - Non-resident", rate: 20 },
  custom: { label: "Custom Rate", rate: 0 },
}

type TaxType = keyof typeof taxTypes

type WithholdingTaxResult = {
  grossAmount: number
  taxAmount: number
  netPayable: number
  grossedUpAmount: number
  rate: number
}

const money = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 0 })

export const WithholdingTaxCalculator = () => {
  const [amount, setAmount] = useState("")
  const [taxType, setTaxType] = useState<TaxType>("professional")
  const [customRate, setCustomRate] = useState("")
  const [result, setResult] = useState<WithholdingTaxResult | null>(null)

  const calculate = () => {
    const grossAmount = Number.parseFloat(amount)
    const selectedRate = taxType === "custom" ? Number.parseFloat(customRate) : taxTypes[taxType].rate

    if (!grossAmount || Number.isNaN(selectedRate) || grossAmount <= 0 || selectedRate < 0 || selectedRate >= 100) {
      setResult(null)
      return
    }

    const rate = selectedRate / 100
    const taxAmount = grossAmount * rate
    const netPayable = grossAmount - taxAmount
    const grossedUpAmount = rate < 1 ? netPayable / (1 - rate) : grossAmount

    setResult({ grossAmount, taxAmount, netPayable, grossedUpAmount, rate: selectedRate })
  }

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
        <CardHeader>
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Withholding Tax Calculator</CardTitle>
          <CardDescription className="text-base leading-6 text-[#667085]">
            Estimate withholding tax, net payable amount, and gross-up value.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="withholding-amount" className="font-semibold text-[#0B1020]">Gross Payment Amount (KSH)</Label>
            <Input id="withholding-amount" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="e.g., 100000" className="h-12 rounded-xl border-[#E4E7EC] text-base" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax-type" className="font-semibold text-[#0B1020]">Payment Type</Label>
            <Select value={taxType} onValueChange={(value) => setTaxType(value as TaxType)}>
              <SelectTrigger id="tax-type" className="h-12 rounded-xl border-[#E4E7EC] text-base">
                <SelectValue placeholder="Select payment type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(taxTypes).map(([value, option]) => (
                  <SelectItem key={value} value={value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {taxType === "custom" && (
            <div className="space-y-2">
              <Label htmlFor="custom-rate" className="font-semibold text-[#0B1020]">Custom Rate (%)</Label>
              <Input id="custom-rate" type="number" step="0.1" value={customRate} onChange={(event) => setCustomRate(event.target.value)} placeholder="e.g., 10" className="h-12 rounded-xl border-[#E4E7EC] text-base" />
            </div>
          )}
          <Button onClick={calculate} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
            Calculate Tax
          </Button>
          <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            <p className="font-semibold">Check the applicable rate</p>
            <p>Withholding tax depends on payment type, residency, treaty position and current KRA guidance.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[20px] border-[#CFEBDD] bg-[radial-gradient(circle_at_50%_18%,rgba(11,90,42,0.06),transparent_42%),#F7FAF8] shadow-[0_14px_36px_rgba(11,90,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Your Estimate</CardTitle>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]"><BarChart3 className="h-5 w-5" /></span>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-semibold text-[#667085]">Tax to Withhold</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#DC2626]">KSH {money(result.taxAmount)}</p>
              </div>
              <div className="space-y-3 text-sm">
                <ResultRow label="Gross amount" value={`KSH ${money(result.grossAmount)}`} />
                <ResultRow label="Rate" value={`${result.rate.toFixed(1)}%`} />
                <ResultRow label="Net payable" value={`KSH ${money(result.netPayable)}`} strong />
                <ResultRow label="Gross-up equivalent" value={`KSH ${money(result.grossedUpAmount)}`} />
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            This is a planning estimate, not tax advice. Confirm final treatment with KRA guidance or a tax professional.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ResultRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between border-b border-[#E4E7EC] pb-3 ${strong ? "text-base font-bold" : ""}`}>
      <span className={strong ? "text-[#0B1020]" : "text-[#667085]"}>{label}</span>
      <span className={strong ? "text-[#0B5A2A]" : "font-semibold text-[#0B1020]"}>{value}</span>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="space-y-5">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]"><Percent className="h-8 w-8" /></div>
      <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">Enter payment amount and tax type to see the withholding tax breakdown.</p>
    </div>
  )
}
