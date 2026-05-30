"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp } from "lucide-react"

export const RoiEstimator = () => {
  const [initialInvestment, setInitialInvestment] = useState<string>("")
  const [annualReturnRate, setAnnualReturnRate] = useState<string>("")
  const [years, setYears] = useState<string>("")
  const [result, setResult] = useState<{ finalValue: number; totalReturn: number } | null>(null)

  const calculateRoi = () => {
    const initial = Number.parseFloat(initialInvestment) || 0
    const rate = (Number.parseFloat(annualReturnRate) || 0) / 100
    const numYears = Number.parseInt(years) || 0

    if (initial <= 0 || rate < 0 || numYears <= 0) {
      setResult(null)
      return
    }

    const finalValue = initial * Math.pow(1 + rate, numYears)
    const totalReturn = finalValue - initial

    setResult({
      finalValue: Number.parseFloat(finalValue.toFixed(2)),
      totalReturn: Number.parseFloat(totalReturn.toFixed(2)),
    })
  }

  const roiPercent = result && initialInvestment
    ? ((result.totalReturn / Number.parseFloat(initialInvestment)) * 100).toFixed(1)
    : null

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs */}
      <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
        <CardHeader>
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">
            ROI Estimator
          </CardTitle>
          <CardDescription className="text-base leading-6 text-[#667085]">
            Estimate the potential return on your investment over time with compound growth.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="initial-investment" className="font-semibold text-[#0B1020]">Initial Investment (KSH)</Label>
            <Input
              id="initial-investment"
              type="number"
              placeholder="e.g., 100,000"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annual-return-rate" className="font-semibold text-[#0B1020]">Expected Annual Return Rate (%)</Label>
            <Input
              id="annual-return-rate"
              type="number"
              placeholder="e.g., 8"
              value={annualReturnRate}
              onChange={(e) => setAnnualReturnRate(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="years" className="font-semibold text-[#0B1020]">Investment Period (Years)</Label>
            <Input
              id="years"
              type="number"
              placeholder="e.g., 5"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <Button onClick={calculateRoi} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
            Estimate ROI
          </Button>
          <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            <p className="font-semibold">Compound growth calculation</p>
            <p>Uses compound interest formula: Final = Principal × (1 + Rate)^Years.</p>
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
                <p className="text-sm font-semibold text-[#667085]">Final Investment Value</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">
                  KSH {result.finalValue.toLocaleString()}
                </p>
                {roiPercent && (
                  <p className="mt-1 text-xs font-semibold text-[#0B5A2A]">+{roiPercent}% total growth</p>
                )}
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Initial Investment</span>
                  <span className="font-semibold text-[#0B1020]">KSH {Number.parseFloat(initialInvestment).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Annual Return Rate</span>
                  <span className="font-semibold text-[#0B1020]">{Number.parseFloat(annualReturnRate).toLocaleString()}%</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Investment Period</span>
                  <span className="font-semibold text-[#0B1020]">{Number.parseInt(years).toLocaleString()} years</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Total Return</span>
                  <span className="font-semibold text-[#0B5A2A]">KSH {result.totalReturn.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1 text-base font-bold">
                  <span>Final Value</span>
                  <span className="text-[#0B5A2A]">KSH {result.finalValue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                <TrendingUp className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter your details in the calculator to see your investment projection.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Total return</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Growth %</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Final value</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Actual returns vary depending on market conditions and investment type.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
