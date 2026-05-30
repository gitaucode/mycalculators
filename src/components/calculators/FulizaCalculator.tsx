"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BarChart3, Smartphone } from "lucide-react"

export const FulizaCalculator = () => {
  const [amount, setAmount] = useState<string>("")
  const [days, setDays] = useState<string>("")
  const [result, setResult] = useState<{
    totalRepayment: number
    accessFee: number
    dailyFees: number
    exciseDuty: number
    chargeableDays: number
    totalFees: number
  } | null>(null)

  const calculateFuliza = () => {
    const numAmount = Number.parseFloat(amount) || 0
    const numDays = Number.parseInt(days) || 0

    if (numAmount <= 0 || numDays <= 0) {
      setResult(null)
      return
    }

    const accessFee = numAmount * 0.01

    // Safaricom Fuliza daily maintenance fees, checked May 2026.
    let dailyRate = 0
    let freeDays = 1

    if (numAmount <= 100) {
      dailyRate = 0
      freeDays = 3
    } else if (numAmount <= 500) {
      dailyRate = 2.5
      freeDays = 3
    } else if (numAmount <= 1000) {
      dailyRate = 5
      freeDays = 3
    } else if (numAmount <= 2500) {
      dailyRate = 20
      freeDays = 1
    } else if (numAmount <= 5000) {
      dailyRate = 25
      freeDays = 1
    } else if (numAmount <= 10000) {
      dailyRate = 40
      freeDays = 1
    } else if (numAmount <= 20000) {
      dailyRate = 60
      freeDays = 1
    } else if (numAmount <= 50000) {
      dailyRate = 80
      freeDays = 1
    } else {
      dailyRate = 100
      freeDays = 1
    }

    const chargeableDays = Math.max(0, numDays - freeDays)
    const dailyFees = chargeableDays * dailyRate
    const exciseDuty = dailyFees * 0.2
    const totalFees = accessFee + dailyFees + exciseDuty
    const totalRepayment = numAmount + totalFees

    setResult({
      totalRepayment: Number.parseFloat(totalRepayment.toFixed(2)),
      accessFee: Number.parseFloat(accessFee.toFixed(2)),
      dailyFees: Number.parseFloat(dailyFees.toFixed(2)),
      exciseDuty: Number.parseFloat(exciseDuty.toFixed(2)),
      chargeableDays,
      totalFees: Number.parseFloat(totalFees.toFixed(2)),
    })
  }

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs */}
      <div className="space-y-4">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">
              Calculate Fuliza Repayment
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Enter overdraft amount and days to calculate total repayment including fees.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="amount" className="font-semibold text-[#0B1020]">Overdraft Amount (KSH)</Label>
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
              <Label htmlFor="days" className="font-semibold text-[#0B1020]">Number of Days Overdrawn</Label>
              <Input
                id="days"
                type="number"
                placeholder="e.g., 5"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="h-12 rounded-xl border-[#E4E7EC] text-base"
              />
            </div>
            <Button onClick={calculateFuliza} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
              Calculate Fuliza Repayment
            </Button>
            <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
              <p className="font-semibold">Checked May 2026 tariffs</p>
              <p>Daily maintenance fees attract 20% excise duty. Balances up to KSH 1,000 have three free days.</p>
            </div>
          </CardContent>
        </Card>

        {/* Footnotes – visible on left panel below inputs */}
        <div className="rounded-2xl border border-[#E4E7EC] bg-white p-5 text-sm leading-6 text-[#667085] shadow-[0_10px_30px_rgba(16,24,40,0.04)] space-y-1">
          <p>• You must repay both the overdraft and the fees in full.</p>
          <p>• No daily charges on Day 1. Balances up to KSH 1,000 have the first three days free.</p>
          <p>• Daily maintenance fees attract 20% excise duty.</p>
          <p>• Maximum overdraft depends on your Fuliza limit.</p>
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
                <p className="text-sm font-semibold text-[#667085]">Total Repayment</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">
                  KSH {result.totalRepayment.toLocaleString()}
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Overdraft Amount</span>
                  <span className="font-semibold text-[#0B1020]">KSH {Number.parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Access Fee (1%)</span>
                  <span className="font-semibold text-[#DC2626]">KSH {result.accessFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Chargeable Days</span>
                  <span className="font-semibold text-[#0B1020]">{result.chargeableDays} days</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Daily Maintenance Fees</span>
                  <span className="font-semibold text-[#DC2626]">KSH {result.dailyFees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Excise Duty (20%)</span>
                  <span className="font-semibold text-[#DC2626]">KSH {result.exciseDuty.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Total Fees</span>
                  <span className="font-semibold text-[#DC2626]">KSH {result.totalFees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1 text-base font-bold">
                  <span>Total Repayment</span>
                  <span className="text-[#0B5A2A]">KSH {result.totalRepayment.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                <Smartphone className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter your details in the calculator to see your estimate and breakdown.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Overdraft amount</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Total fees</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Total repayment</span><span className="font-bold text-[#0B1020]">-</span></div>
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
