"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export const FulizaCalculator = () => {
  const [amount, setAmount] = useState<string>("")
  const [days, setDays] = useState<string>("")
  const [result, setResult] = useState<{
    totalRepayment: number
    accessFee: number
    dailyFees: number
    totalFees: number
  } | null>(null)

  const calculateFuliza = () => {
    const numAmount = Number.parseFloat(amount) || 0
    const numDays = Number.parseInt(days) || 0

    if (numAmount <= 0 || numDays <= 0) {
      setResult(null)
      return
    }

    // Calculate access fee (1% of overdraft amount)
    const accessFee = numAmount * 0.01

    // Calculate daily maintenance fees
    let dailyRate = 0
    let freeDays = 0

    if (numAmount <= 100) {
      dailyRate = 0
      freeDays = 0
    } else if (numAmount <= 500) {
      dailyRate = 2.5
      freeDays = 3
    } else if (numAmount <= 1000) {
      dailyRate = 5
      freeDays = 3
    } else if (numAmount <= 1500) {
      dailyRate = 18
      freeDays = 0
    } else if (numAmount <= 2500) {
      dailyRate = 20
      freeDays = 0
    } else if (numAmount <= 70000) {
      dailyRate = 25
      freeDays = 0
    } else {
      dailyRate = 25
      freeDays = 0
    }

    // Calculate daily fees (no charges on Day 1, free days apply where applicable)
    let chargableDays = 0
    if (numDays > 1) {
      const daysAfterFirst = numDays - 1
      chargableDays = Math.max(0, daysAfterFirst - freeDays)
    }

    const dailyFees = chargableDays * dailyRate
    const totalFees = accessFee + dailyFees
    const totalRepayment = numAmount + totalFees

    setResult({
      totalRepayment: Number.parseFloat(totalRepayment.toFixed(2)),
      accessFee: Number.parseFloat(accessFee.toFixed(2)),
      dailyFees: Number.parseFloat(dailyFees.toFixed(2)),
      totalFees: Number.parseFloat(totalFees.toFixed(2)),
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fuliza Calculator</CardTitle>
          <CardDescription>
            Calculate the total repayment for your Fuliza overdraft including access fees and daily maintenance charges.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Overdraft Amount (KSH)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g., 1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="days">Number of Days Overdrawn</Label>
            <Input
              id="days"
              type="number"
              placeholder="e.g., 5"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>
          <Button onClick={calculateFuliza} className="w-full">
            Calculate Fuliza Repayment
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Fuliza Repayment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Overdraft Amount:</span>
                <span className="font-medium">KSH {Number.parseFloat(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Days Overdrawn:</span>
                <span className="font-medium">{Number.parseInt(days).toLocaleString()} days</span>
              </div>
              <div className="flex justify-between">
                <span>Access Fee (1%):</span>
                <span className="font-medium">KSH {result.accessFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Daily Maintenance Fees:</span>
                <span className="font-medium">KSH {result.dailyFees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Fees:</span>
                <span className="font-medium text-destructive">KSH {result.totalFees.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Repayment:</span>
                  <span className="text-green-600">KSH {result.totalRepayment.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footnotes */}
      <div className="text-sm text-muted-foreground space-y-1">
        <p>• You must repay both the overdraft and the fees in full.</p>
        <p>• No daily charges on Day 1.</p>
        <p>• Maximum overdraft depends on your Fuliza limit.</p>
      </div>
    </div>
  )
}
