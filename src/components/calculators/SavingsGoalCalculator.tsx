"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const SavingsGoalCalculator = () => {
  const [goalAmount, setGoalAmount] = useState<string>("")
  const [initialSavings, setInitialSavings] = useState<string>("")
  const [monthlyContribution, setMonthlyContribution] = useState<string>("")
  const [annualInterestRate, setAnnualInterestRate] = useState<string>("")
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>("monthly")
  const [result, setResult] = useState<{ months: number; years: number; totalInterest: number } | null>(null)

  const calculateSavingsGoal = () => {
    const goal = Number.parseFloat(goalAmount) || 0
    let currentSavings = Number.parseFloat(initialSavings) || 0
    const monthlyAdd = Number.parseFloat(monthlyContribution) || 0
    const annualRate = (Number.parseFloat(annualInterestRate) || 0) / 100

    if (goal <= 0 || (currentSavings >= goal && monthlyAdd === 0)) {
      setResult(null)
      return
    }

    let months = 0
    let totalInterestEarned = 0

    const getCompoundingFactor = (rate: number, freq: string) => {
      switch (freq) {
        case "daily":
          return rate / 365
        case "weekly":
          return rate / 52
        case "monthly":
          return rate / 12
        case "quarterly":
          return rate / 4
        case "annually":
          return rate / 1
        default:
          return rate / 12 // Default to monthly
      }
    }

    const compoundingPeriodsPerYear =
      {
        daily: 365,
        weekly: 52,
        monthly: 12,
        quarterly: 4,
        annually: 1,
      }[compoundingFrequency] || 12

    const periodicRate = annualRate / compoundingPeriodsPerYear

    while (currentSavings < goal && months < 1200) {
      // Max 100 years to prevent infinite loop
      months++
      currentSavings += monthlyAdd

      // Apply interest based on compounding frequency
      if (months % (12 / compoundingPeriodsPerYear) === 0) {
        const interest = currentSavings * periodicRate
        currentSavings += interest
        totalInterestEarned += interest
      }
    }

    if (currentSavings < goal) {
      setResult(null) // Goal not reached within reasonable time
    } else {
      setResult({
        months: months,
        years: Number.parseFloat((months / 12).toFixed(1)),
        totalInterest: Number.parseFloat(totalInterestEarned.toFixed(2)),
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Savings Goal Calculator</CardTitle>
          <CardDescription>
            Determine how long it will take to reach your savings target with regular contributions and interest.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal-amount">Savings Goal Amount (KSH)</Label>
            <Input
              id="goal-amount"
              type="number"
              placeholder="e.g., 500000"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="initial-savings">Current Savings (KSH)</Label>
            <Input
              id="initial-savings"
              type="number"
              placeholder="e.g., 10000"
              value={initialSavings}
              onChange={(e) => setInitialSavings(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthly-contribution">Monthly Contribution (KSH)</Label>
            <Input
              id="monthly-contribution"
              type="number"
              placeholder="e.g., 5000"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annual-interest-rate">Annual Interest Rate (%)</Label>
            <Input
              id="annual-interest-rate"
              type="number"
              placeholder="e.g., 5"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="compounding-frequency">Compounding Frequency</Label>
            <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={calculateSavingsGoal} className="w-full">
            Calculate Time to Goal
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Savings Goal Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Goal Amount:</span>
                <span className="font-medium">KSH {Number.parseFloat(goalAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Initial Savings:</span>
                <span className="font-medium">KSH {Number.parseFloat(initialSavings).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Contribution:</span>
                <span className="font-medium">KSH {Number.parseFloat(monthlyContribution).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Annual Interest Rate:</span>
                <span className="font-medium">{Number.parseFloat(annualInterestRate).toLocaleString()}%</span>
              </div>
              <div className="flex justify-between">
                <span>Compounding:</span>
                <span className="font-medium capitalize">{compoundingFrequency}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Interest Earned:</span>
                <span className="font-medium text-success">KSH {result.totalInterest.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Time to Reach Goal:</span>
                  <span className="text-success">
                    {result.years} years ({result.months} months)
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
