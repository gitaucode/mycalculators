"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LoanResult {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  schedule: Array<{
    month: number
    payment: number
    principal: number
    interest: number
    balance: number
  }>
}

export const LoanCalculator = () => {
  const [principal, setPrincipal] = useState<string>("")
  const [interestRate, setInterestRate] = useState<string>("")
  const [loanTerm, setLoanTerm] = useState<string>("")
  const [loanType, setLoanType] = useState<string>("personal")
  const [result, setResult] = useState<LoanResult | null>(null)

  const calculateLoan = () => {
    const p = Number.parseFloat(principal)
    const r = Number.parseFloat(interestRate) / 100 / 12 // Monthly interest rate
    const n = Number.parseInt(loanTerm)

    if (!p || !r || !n || p <= 0 || r <= 0 || n <= 0) return

    // Calculate monthly payment using PMT formula
    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPayment = monthlyPayment * n
    const totalInterest = totalPayment - p

    // Generate amortization schedule
    const schedule = []
    let balance = p

    for (let month = 1; month <= n; month++) {
      const interestPayment = balance * r
      const principalPayment = monthlyPayment - interestPayment
      balance -= principalPayment

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      })
    }

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      schedule,
    })
  }

  const getLoanTypeRate = (type: string) => {
    switch (type) {
      case "mortgage":
        return "12-15%"
      case "personal":
        return "14-24%"
      case "auto":
        return "13-18%"
      case "business":
        return "16-25%"
      default:
        return "Varies"
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Loan Calculator</CardTitle>
          <CardDescription>Calculate monthly payments, total interest, and view amortization schedule</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Loan Amount (KSH)</Label>
              <Input
                id="principal"
                type="number"
                placeholder="e.g., 500,000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loan-type">Loan Type</Label>
              <Select value={loanType} onValueChange={setLoanType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal Loan</SelectItem>
                  <SelectItem value="mortgage">Mortgage</SelectItem>
                  <SelectItem value="auto">Auto Loan</SelectItem>
                  <SelectItem value="business">Business Loan</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">Typical rate: {getLoanTypeRate(loanType)}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest-rate">Annual Interest Rate (%)</Label>
              <Input
                id="interest-rate"
                type="number"
                step="0.1"
                placeholder="e.g., 14.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loan-term">Loan Term (Months)</Label>
              <Input
                id="loan-term"
                type="number"
                placeholder="e.g., 60"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={calculateLoan} className="w-full">
            Calculate Loan
          </Button>
        </CardContent>
      </Card>

      {result && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Loan Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  <p className="text-2xl font-bold text-primary">
                    KSH {result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="text-center p-4 bg-warning/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                  <p className="text-2xl font-bold text-warning">
                    KSH {result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Payment</p>
                  <p className="text-2xl font-bold">
                    KSH {result.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amortization Schedule (First 12 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Month</th>
                      <th className="text-right p-2">Payment</th>
                      <th className="text-right p-2">Principal</th>
                      <th className="text-right p-2">Interest</th>
                      <th className="text-right p-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.slice(0, 12).map((row) => (
                      <tr key={row.month} className="border-b">
                        <td className="p-2">{row.month}</td>
                        <td className="text-right p-2">
                          {row.payment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right p-2">
                          {row.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right p-2">
                          {row.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right p-2">
                          {row.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
