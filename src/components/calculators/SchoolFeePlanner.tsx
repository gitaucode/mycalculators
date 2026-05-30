"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BarChart3, GraduationCap } from "lucide-react"

export const SchoolFeePlanner = () => {
  const [currentFee, setCurrentFee] = useState<string>("")
  const [annualIncrease, setAnnualIncrease] = useState<string>("")
  const [years, setYears] = useState<string>("")
  const [result, setResult] = useState<{ totalFee: number; feesPerYear: { year: number; fee: number }[] } | null>(null)

  const calculateFees = () => {
    let fee = Number.parseFloat(currentFee) || 0
    const increaseRate = (Number.parseFloat(annualIncrease) || 0) / 100
    const numYears = Number.parseInt(years) || 0

    if (fee <= 0 || numYears <= 0) {
      setResult(null)
      return
    }

    let totalFee = 0
    const feesPerYear = []

    for (let i = 0; i < numYears; i++) {
      if (i > 0) {
        fee *= 1 + increaseRate
      }
      feesPerYear.push({ year: i + 1, fee: Number.parseFloat(fee.toFixed(2)) })
      totalFee += fee
    }

    setResult({ totalFee: Number.parseFloat(totalFee.toFixed(2)), feesPerYear })
  }

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs */}
      <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
        <CardHeader>
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">
            School Fee Planner
          </CardTitle>
          <CardDescription className="text-base leading-6 text-[#667085]">
            Project future school fees and total costs over time with an annual increase rate.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="current-fee" className="font-semibold text-[#0B1020]">Current Annual Fee (KSH)</Label>
            <Input
              id="current-fee"
              type="number"
              placeholder="e.g., 150,000"
              value={currentFee}
              onChange={(e) => setCurrentFee(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annual-increase" className="font-semibold text-[#0B1020]">Expected Annual Increase (%)</Label>
            <Input
              id="annual-increase"
              type="number"
              placeholder="e.g., 5"
              value={annualIncrease}
              onChange={(e) => setAnnualIncrease(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="years" className="font-semibold text-[#0B1020]">Number of Years to Plan For</Label>
            <Input
              id="years"
              type="number"
              placeholder="e.g., 4"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <Button onClick={calculateFees} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
            Plan School Fees
          </Button>
          <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            <p className="font-semibold">Kenya education planning</p>
            <p>Plan ahead using the annual fee increase to estimate your total education spend.</p>
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
                <p className="text-sm font-semibold text-[#667085]">Total Fees Over {years} Years</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">
                  KSH {result.totalFee.toLocaleString()}
                </p>
              </div>
              <div className="space-y-3 text-sm">
                {result.feesPerYear.map((data, idx) => (
                  <div
                    key={data.year}
                    className={`flex justify-between ${idx < result.feesPerYear.length - 1 ? "border-b border-[#E4E7EC] pb-3" : "pt-1 text-base font-bold"}`}
                  >
                    <span className={idx < result.feesPerYear.length - 1 ? "text-[#667085]" : "text-[#0B1020]"}>
                      Year {data.year} Fee
                    </span>
                    <span className={`font-semibold ${idx < result.feesPerYear.length - 1 ? "text-[#0B1020]" : "text-[#0B5A2A]"}`}>
                      KSH {data.fee.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-[#E4E7EC] pt-3 text-base font-bold">
                  <span>Total</span>
                  <span className="text-[#0B5A2A]">KSH {result.totalFee.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                <GraduationCap className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter your details in the calculator to see your school fee projection.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Year 1 fee</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Projected fees</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Total</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Actual fees may vary depending on the school and annual review.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
