"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

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

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ROI Estimator</CardTitle>
          <CardDescription>Estimate the potential return on your investment over time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="initial-investment">Initial Investment (KSH)</Label>
            <Input
              id="initial-investment"
              type="number"
              placeholder="e.g., 100000"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annual-return-rate">Expected Annual Return Rate (%)</Label>
            <Input
              id="annual-return-rate"
              type="number"
              placeholder="e.g., 8"
              value={annualReturnRate}
              onChange={(e) => setAnnualReturnRate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="years">Investment Period (Years)</Label>
            <Input
              id="years"
              type="number"
              placeholder="e.g., 5"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
          <Button onClick={calculateRoi} className="w-full">
            Estimate ROI
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Investment Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Initial Investment:</span>
                <span className="font-medium">KSH {Number.parseFloat(initialInvestment).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Annual Return Rate:</span>
                <span className="font-medium">{Number.parseFloat(annualReturnRate).toLocaleString()}%</span>
              </div>
              <div className="flex justify-between">
                <span>Investment Period:</span>
                <span className="font-medium">{Number.parseInt(years).toLocaleString()} years</span>
              </div>
              <div className="flex justify-between">
                <span>Total Return:</span>
                <span className="font-medium text-success">KSH {result.totalReturn.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Final Investment Value:</span>
                  <span className="text-success">KSH {result.finalValue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
