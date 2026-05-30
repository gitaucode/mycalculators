"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Percent } from "lucide-react"

export const VatCalculator = () => {
  const [amount, setAmount] = useState<string>("")
  const [vatRate, setVatRate] = useState<string>("16")
  const [calculationType, setCalculationType] = useState<string>("add")
  const [result, setResult] = useState<{
    vatAmount: number
    totalAmount: number
    netAmount: number
  } | null>(null)

  const calculateVat = () => {
    const numAmount = Number.parseFloat(amount) || 0
    const rate = Number.parseFloat(vatRate) / 100

    if (numAmount <= 0 || rate <= 0) {
      setResult(null)
      return
    }

    let vatAmount = 0
    let totalAmount = 0
    let netAmount = 0

    if (calculationType === "add") {
      vatAmount = numAmount * rate
      totalAmount = numAmount + vatAmount
      netAmount = numAmount
    } else {
      totalAmount = numAmount
      netAmount = numAmount / (1 + rate)
      vatAmount = numAmount - netAmount
    }

    setResult({
      vatAmount: Number.parseFloat(vatAmount.toFixed(2)),
      totalAmount: Number.parseFloat(totalAmount.toFixed(2)),
      netAmount: Number.parseFloat(netAmount.toFixed(2)),
    })
  }

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs */}
      <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
        <CardHeader>
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">
            Calculate VAT
          </CardTitle>
          <CardDescription className="text-base leading-6 text-[#667085]">
            Add or remove VAT from any price using Kenya's standard rate.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="amount" className="font-semibold text-[#0B1020]">Amount (KSH)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g., 1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vat-rate" className="font-semibold text-[#0B1020]">VAT Rate (%)</Label>
            <Input
              id="vat-rate"
              type="number"
              placeholder="e.g., 16"
              value={vatRate}
              onChange={(e) => setVatRate(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="calculation-type" className="font-semibold text-[#0B1020]">Calculation Type</Label>
            <Select value={calculationType} onValueChange={setCalculationType}>
              <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add VAT (Amount is Net)</SelectItem>
                <SelectItem value="remove">Remove VAT (Amount is Gross)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={calculateVat} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
            Calculate VAT
          </Button>
          <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            <p className="font-semibold">Standard Kenya VAT</p>
            <p>The standard VAT rate in Kenya is 16%. Some goods and services may be zero-rated or exempt.</p>
          </div>
        </CardContent>
      </Card>

      {/* Right – Results */}
      <Card className="rounded-[20px] border-[#CFEBDD] bg-[radial-gradient(circle_at_50%_18%,rgba(11,90,42,0.06),transparent_42%),#F7FAF8] shadow-[0_14px_36px_rgba(11,90,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Your Estimate</CardTitle>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]">
            <BarChart3 className="h-5 w-5" />
          </span>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-semibold text-[#667085]">
                  {calculationType === "add" ? "Gross Amount (incl. VAT)" : "Net Amount (excl. VAT)"}
                </p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">
                  KSH {(calculationType === "add" ? result.totalAmount : result.netAmount).toLocaleString()}
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">VAT Rate</span>
                  <span className="font-semibold text-[#0B1020]">{Number.parseFloat(vatRate).toLocaleString()}%</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Net Amount</span>
                  <span className="font-semibold text-[#0B1020]">KSH {result.netAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">VAT Amount</span>
                  <span className="font-semibold text-[#DC2626]">KSH {result.vatAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1 text-base font-bold">
                  <span>Gross Total</span>
                  <span className="text-[#0B5A2A]">KSH {result.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                <Percent className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter an amount and select your calculation type to see the VAT breakdown.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Net amount</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">VAT amount</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Gross total</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Actual values may vary depending on applicable exemptions and KRA guidelines.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
