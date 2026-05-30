"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, PiggyBank } from "lucide-react"

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
      months++
      currentSavings += monthlyAdd

      if (months % (12 / compoundingPeriodsPerYear) === 0) {
        const interest = currentSavings * periodicRate
        currentSavings += interest
        totalInterestEarned += interest
      }
    }

    if (currentSavings < goal) {
      setResult(null)
    } else {
      setResult({
        months: months,
        years: Number.parseFloat((months / 12).toFixed(1)),
        totalInterest: Number.parseFloat(totalInterestEarned.toFixed(2)),
      })
    }
  }

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs */}
      <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
        <CardHeader>
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">
            Savings Goal Calculator
          </CardTitle>
          <CardDescription className="text-base leading-6 text-[#667085]">
            Determine how long it will take to reach your savings target with regular contributions and interest.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="goal-amount" className="font-semibold text-[#0B1020]">Savings Goal Amount (KSH)</Label>
            <Input
              id="goal-amount"
              type="number"
              placeholder="e.g., 500,000"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="initial-savings" className="font-semibold text-[#0B1020]">Current Savings (KSH)</Label>
            <Input
              id="initial-savings"
              type="number"
              placeholder="e.g., 10,000"
              value={initialSavings}
              onChange={(e) => setInitialSavings(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthly-contribution" className="font-semibold text-[#0B1020]">Monthly Contribution (KSH)</Label>
            <Input
              id="monthly-contribution"
              type="number"
              placeholder="e.g., 5,000"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annual-interest-rate" className="font-semibold text-[#0B1020]">Annual Interest Rate (%)</Label>
            <Input
              id="annual-interest-rate"
              type="number"
              placeholder="e.g., 5"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="compounding-frequency" className="font-semibold text-[#0B1020]">Compounding Frequency</Label>
            <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
              <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base">
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
          <Button onClick={calculateSavingsGoal} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
            Calculate Time to Goal
          </Button>
          <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            <p className="font-semibold">Compound savings projection</p>
            <p>Includes compound interest to show the realistic time to reach your goal.</p>
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
                <p className="text-sm font-semibold text-[#667085]">Time to Reach Goal</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">
                  {result.years} years
                </p>
                <p className="mt-1 text-xs font-semibold text-[#667085]">({result.months} months)</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Goal Amount</span>
                  <span className="font-semibold text-[#0B1020]">KSH {Number.parseFloat(goalAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Current Savings</span>
                  <span className="font-semibold text-[#0B1020]">KSH {Number.parseFloat(initialSavings || "0").toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Monthly Contribution</span>
                  <span className="font-semibold text-[#0B1020]">KSH {Number.parseFloat(monthlyContribution || "0").toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Compounding</span>
                  <span className="font-semibold text-[#0B1020] capitalize">{compoundingFrequency}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Total Interest Earned</span>
                  <span className="font-semibold text-[#0B5A2A]">KSH {result.totalInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1 text-base font-bold">
                  <span>Time to Goal</span>
                  <span className="text-[#0B5A2A]">{result.years} yrs ({result.months} mo)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                <PiggyBank className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter your details in the calculator to see your savings timeline.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Goal amount</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Total interest</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Time to goal</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Actual savings growth depends on the product and provider terms.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
