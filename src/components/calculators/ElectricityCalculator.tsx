"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Zap } from "lucide-react"

interface ElectricityTariff {
  min: number
  max: number
  rate: number
  category: string
}

// EPRA domestic retail tariffs published for Dec 2025. These retail rates
// already include pass-through costs, levies and taxes, so we do not layer
// extra fixed FCC/FOREX/VAT assumptions on top.
const domesticTariffs: ElectricityTariff[] = [
  { min: 0, max: 30, rate: 19.87, category: "Domestic Lifeline" },
  { min: 30, max: 100, rate: 25.15, category: "Domestic 30–100 kWh" },
  { min: 100, max: 15000, rate: 27.65, category: "Domestic 100+ kWh" },
]

export const ElectricityCalculator = () => {
  const [amount, setAmount] = useState<string>("")
  const [calculationType, setCalculationType] = useState<string>("amount-to-units")
  const [units, setUnits] = useState<string>("")
  const [result, setResult] = useState<{
    units?: number
    cost?: number
    appliedTariff?: number
    netAmountUsedForTokens?: number
    finalEstimatedUnits?: number
    breakdown?: Array<{ category: string; units: number; rate: number; cost: number }>
  } | null>(null)

  const calculateCostFromUnits = (totalUnits: number) => {
    let totalCost = 0
    const breakdown = []

    for (const tariff of domesticTariffs) {
      if (totalUnits <= tariff.min) continue

      const bandEnd = Math.min(totalUnits, tariff.max)
      const unitsInBand = Math.max(0, bandEnd - tariff.min)

      if (unitsInBand > 0) {
        const cost = unitsInBand * tariff.rate
        breakdown.push({ category: tariff.category, units: unitsInBand, rate: tariff.rate, cost })
        totalCost += cost
      }

      if (totalUnits <= tariff.max) break
    }

    return { cost: totalCost, breakdown }
  }

  const calculateUnitsFromAmount = (paidAmount: number) => {
    let remainingAmount = paidAmount
    let finalEstimatedUnits = 0
    const breakdown = []

    for (const tariff of domesticTariffs) {
      if (remainingAmount <= 0) break

      const bandSize = tariff.max - tariff.min
      const fullBandCost = bandSize * tariff.rate
      const unitsInBand = remainingAmount >= fullBandCost ? bandSize : remainingAmount / tariff.rate
      const cost = unitsInBand * tariff.rate

      if (unitsInBand > 0) {
        breakdown.push({ category: tariff.category, units: unitsInBand, rate: tariff.rate, cost })
      }

      finalEstimatedUnits += unitsInBand
      remainingAmount -= cost
    }

    return {
      appliedTariff: breakdown[breakdown.length - 1]?.rate ?? domesticTariffs[0].rate,
      netAmountUsedForTokens: paidAmount - Math.max(0, remainingAmount),
      finalEstimatedUnits,
      breakdown,
    }
  }

  const calculate = () => {
    if (calculationType === "amount-to-units") {
      const paidAmount = Number.parseFloat(amount)
      if (!paidAmount || paidAmount <= 0) return

      const calculation = calculateUnitsFromAmount(paidAmount)
      setResult({
        units: calculation.finalEstimatedUnits,
        appliedTariff: calculation.appliedTariff,
        netAmountUsedForTokens: calculation.netAmountUsedForTokens,
        finalEstimatedUnits: calculation.finalEstimatedUnits,
        breakdown: calculation.breakdown,
      })
    } else {
      const unitCount = Number.parseFloat(units)
      if (!unitCount || unitCount <= 0) return

      const calculation = calculateCostFromUnits(unitCount)
      setResult({ cost: calculation.cost, breakdown: calculation.breakdown })
    }
  }

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs + breakdown */}
      <div className="space-y-4">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">
              Electricity Calculator
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Calculate electricity units from amount paid, or cost from units consumed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="calculation-type" className="font-semibold text-[#0B1020]">Calculation Type</Label>
              <Select value={calculationType} onValueChange={(v) => { setCalculationType(v); setResult(null) }}>
                <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base">
                  <SelectValue placeholder="Select calculation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount-to-units">Amount Paid → Units</SelectItem>
                  <SelectItem value="units-to-amount">Units → Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {calculationType === "amount-to-units" ? (
              <div className="space-y-2">
                <Label htmlFor="amount" className="font-semibold text-[#0B1020]">Amount Paid (KSH)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount paid"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 rounded-xl border-[#E4E7EC] text-base"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="units" className="font-semibold text-[#0B1020]">Units (kWh)</Label>
                <Input
                  id="units"
                  type="number"
                  placeholder="Enter units consumed"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className="h-12 rounded-xl border-[#E4E7EC] text-base"
                />
              </div>
            )}

            <Button onClick={calculate} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
              Calculate
            </Button>
            <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
              <p className="font-semibold">EPRA tariffs (Dec 2025)</p>
              <p>Retail rates already include all pass-through costs, levies, and taxes.</p>
            </div>
          </CardContent>
        </Card>

        {/* Tariff breakdown – below inputs on left */}
        {result?.breakdown && result.breakdown.length > 0 && (
          <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
            <CardHeader>
              <CardTitle className="font-poppins text-lg font-bold text-[#0B1020]">Tariff Band Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.breakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-xl bg-[#F7FAF8] p-3">
                    <div>
                      <p className="font-semibold text-[#0B1020] text-sm">{item.category}</p>
                      <p className="text-xs text-[#667085]">{item.units.toFixed(1)} kWh × KSH {item.rate}</p>
                    </div>
                    <p className="font-bold text-[#0B5A2A] text-sm">KSH {item.cost.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Important notes */}
        <div className="rounded-2xl border border-[#E4E7EC] bg-white p-5 text-sm leading-6 text-[#667085] shadow-[0_10px_30px_rgba(16,24,40,0.04)] space-y-1">
          <p>• Actual tokens may vary slightly depending on KPLC system timing and monthly EPRA adjustments.</p>
          <p>• These estimates use EPRA's published domestic retail tariff bands checked in 2026.</p>
          <p>• Retail tariffs already include applicable pass-through costs, levies, and taxes.</p>
        </div>
      </div>

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
                {calculationType === "amount-to-units" ? (
                  <>
                    <p className="text-sm font-semibold text-[#667085]">Estimated Units</p>
                    <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">
                      {result.finalEstimatedUnits?.toFixed(1)} kWh
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-[#667085]">Total Cost</p>
                    <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">
                      KSH {result.cost?.toFixed(2)}
                    </p>
                  </>
                )}
              </div>
              <div className="space-y-3 text-sm">
                {calculationType === "amount-to-units" ? (
                  <>
                    <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                      <span className="text-[#667085]">Amount Paid</span>
                      <span className="font-semibold text-[#0B1020]">KSH {amount}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                      <span className="text-[#667085]">Amount Applied</span>
                      <span className="font-semibold text-[#0B1020]">KSH {result.netAmountUsedForTokens?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                      <span className="text-[#667085]">Last Tariff Applied</span>
                      <span className="font-semibold text-[#0B1020]">KSH {result.appliedTariff?.toFixed(2)}/kWh</span>
                    </div>
                    <div className="flex justify-between pt-1 text-base font-bold">
                      <span>Estimated Units</span>
                      <span className="text-[#0B5A2A]">{result.finalEstimatedUnits?.toFixed(1)} kWh</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                      <span className="text-[#667085]">Units Consumed</span>
                      <span className="font-semibold text-[#0B1020]">{units} kWh</span>
                    </div>
                    <div className="flex justify-between pt-1 text-base font-bold">
                      <span>Total Cost</span>
                      <span className="text-[#0B5A2A]">KSH {result.cost?.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                <Zap className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter your details in the calculator to see your electricity estimate.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Input details</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Estimated result</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Total</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Actual values may vary depending on provider updates and service terms.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
