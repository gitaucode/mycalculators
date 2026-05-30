"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, CalculatorIcon } from "lucide-react"

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
    const r = Number.parseFloat(interestRate) / 100 / 12
    const n = Number.parseInt(loanTerm)

    if (!p || !r || !n || p <= 0 || r <= 0 || n <= 0) return

    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPayment = monthlyPayment * n
    const totalInterest = totalPayment - p

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
      case "mortgage": return "12–15%"
      case "personal": return "14–24%"
      case "auto": return "13–18%"
      case "business": return "16–25%"
      default: return "Varies"
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs + schedule */}
      <div className="space-y-4">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">
              Loan Calculator
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Calculate monthly payments, total interest, and view amortization schedule.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="principal" className="font-semibold text-[#0B1020]">Loan Amount (KSH)</Label>
                <Input
                  id="principal"
                  type="number"
                  placeholder="e.g., 500,000"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="h-12 rounded-xl border-[#E4E7EC] text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loan-type" className="font-semibold text-[#0B1020]">Loan Type</Label>
                <Select value={loanType} onValueChange={setLoanType}>
                  <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base">
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="mortgage">Mortgage</SelectItem>
                    <SelectItem value="auto">Auto Loan</SelectItem>
                    <SelectItem value="business">Business Loan</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-[#667085]">Typical rate: {getLoanTypeRate(loanType)}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interest-rate" className="font-semibold text-[#0B1020]">Annual Interest Rate (%)</Label>
                <Input
                  id="interest-rate"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 14.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="h-12 rounded-xl border-[#E4E7EC] text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loan-term" className="font-semibold text-[#0B1020]">Loan Term (Months)</Label>
                <Input
                  id="loan-term"
                  type="number"
                  placeholder="e.g., 60"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="h-12 rounded-xl border-[#E4E7EC] text-base"
                />
              </div>
            </div>
            <Button onClick={calculateLoan} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
              Calculate Loan
            </Button>
            <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
              <p className="font-semibold">Kenya loan rates</p>
              <p>Typical bank lending rates range from 12% to 25% p.a. depending on loan type and lender.</p>
            </div>
          </CardContent>
        </Card>

        {/* Amortization schedule – shown below inputs on left side */}
        {result && (
          <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
            <CardHeader>
              <CardTitle className="font-poppins text-lg font-bold text-[#0B1020]">Amortization Schedule <span className="text-sm font-normal text-[#667085]">(first 12 months)</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E4E7EC]">
                      <th className="py-2 text-left font-semibold text-[#0B1020]">Month</th>
                      <th className="py-2 text-right font-semibold text-[#0B1020]">Payment</th>
                      <th className="py-2 text-right font-semibold text-[#0B1020]">Principal</th>
                      <th className="py-2 text-right font-semibold text-[#0B1020]">Interest</th>
                      <th className="py-2 text-right font-semibold text-[#0B1020]">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.slice(0, 12).map((row) => (
                      <tr key={row.month} className="border-b border-[#E4E7EC] text-[#667085]">
                        <td className="py-2">{row.month}</td>
                        <td className="py-2 text-right">{row.payment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                        <td className="py-2 text-right">{row.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                        <td className="py-2 text-right text-[#DC2626]">{row.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                        <td className="py-2 text-right">{row.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
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
                <p className="text-sm font-semibold text-[#667085]">Monthly Payment</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">
                  KSH {result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Loan Amount</span>
                  <span className="font-semibold text-[#0B1020]">KSH {Number.parseFloat(principal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Interest Rate</span>
                  <span className="font-semibold text-[#0B1020]">{Number.parseFloat(interestRate).toLocaleString()}% p.a.</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Loan Term</span>
                  <span className="font-semibold text-[#0B1020]">{Number.parseInt(loanTerm)} months</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Total Interest</span>
                  <span className="font-semibold text-[#DC2626]">KSH {result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between pt-1 text-base font-bold">
                  <span>Total Payment</span>
                  <span className="text-[#0B5A2A]">KSH {result.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                <CalculatorIcon className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter your details in the calculator to see your loan payment breakdown.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Monthly payment</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Total interest</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Total payment</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Actual values may vary depending on lender terms and fees.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
