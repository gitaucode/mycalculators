"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

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
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>School Fee Planner</CardTitle>
          <CardDescription>Project future school fees and total costs over time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-fee">Current Annual Fee (KSH)</Label>
            <Input
              id="current-fee"
              type="number"
              placeholder="e.g., 150000"
              value={currentFee}
              onChange={(e) => setCurrentFee(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annual-increase">Expected Annual Increase (%)</Label>
            <Input
              id="annual-increase"
              type="number"
              placeholder="e.g., 5"
              value={annualIncrease}
              onChange={(e) => setAnnualIncrease(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="years">Number of Years to Plan For</Label>
            <Input
              id="years"
              type="number"
              placeholder="e.g., 4"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
          <Button onClick={calculateFees} className="w-full">
            Plan School Fees
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>School Fee Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.feesPerYear.map((data) => (
                <div key={data.year} className="flex justify-between">
                  <span>Year {data.year} Fee:</span>
                  <span className="font-medium">KSH {data.fee.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Fees Over {years} Years:</span>
                  <span className="text-success">KSH {result.totalFee.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
