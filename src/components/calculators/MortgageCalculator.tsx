"use client"

import { useState } from "react"
import { BarChart3, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type MortgageResult = {
  loanAmount: number
  monthlyPayment: number
  totalInterest: number
  totalRepayment: number
  upfrontCash: number
  loanToValue: number
}

const money = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 0 })

export const MortgageCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState("")
  const [deposit, setDeposit] = useState("10")
  const [interestRate, setInterestRate] = useState("13")
  const [termYears, setTermYears] = useState("20")
  const [closingCosts, setClosingCosts] = useState("4")
  const [result, setResult] = useState<MortgageResult | null>(null)

  const calculate = () => {
    const price = Number.parseFloat(propertyPrice)
    const depositRate = (Number.parseFloat(deposit) || 0) / 100
    const annualRate = Number.parseFloat(interestRate)
    const years = Number.parseFloat(termYears)
    const closingRate = (Number.parseFloat(closingCosts) || 0) / 100

    if (!price || !annualRate || !years || price <= 0 || annualRate <= 0 || years <= 0) {
      setResult(null)
      return
    }

    const depositAmount = price * depositRate
    const loanAmount = Math.max(0, price - depositAmount)
    const months = years * 12
    const monthlyRate = annualRate / 100 / 12
    const monthlyPayment =
      monthlyRate === 0
        ? loanAmount / months
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1)
    const totalRepayment = monthlyPayment * months
    const totalInterest = totalRepayment - loanAmount
    const upfrontCash = depositAmount + price * closingRate
    const loanToValue = price > 0 ? (loanAmount / price) * 100 : 0

    setResult({ loanAmount, monthlyPayment, totalInterest, totalRepayment, upfrontCash, loanToValue })
  }

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
        <CardHeader>
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Mortgage Calculator</CardTitle>
          <CardDescription className="text-base leading-6 text-[#667085]">
            Estimate home loan repayments, upfront cash, and total interest.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="property-price" label="Property Price (KSH)" value={propertyPrice} setValue={setPropertyPrice} placeholder="e.g., 8500000" />
            <Field id="deposit" label="Deposit (%)" value={deposit} setValue={setDeposit} placeholder="e.g., 10" />
            <Field id="mortgage-rate" label="Interest Rate (% p.a.)" value={interestRate} setValue={setInterestRate} placeholder="e.g., 13" step="0.1" />
            <Field id="term-years" label="Term (Years)" value={termYears} setValue={setTermYears} placeholder="e.g., 20" />
            <div className="space-y-2 sm:col-span-2">
              <Field id="closing-costs" label="Estimated Upfront Costs (%)" value={closingCosts} setValue={setClosingCosts} placeholder="e.g., 4" step="0.1" />
            </div>
          </div>
          <Button onClick={calculate} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
            Calculate Mortgage
          </Button>
          <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            <p className="font-semibold">Home loan estimate</p>
            <p>Adjust the rate, deposit and upfront cost assumptions to match your lender quote.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[20px] border-[#CFEBDD] bg-[radial-gradient(circle_at_50%_18%,rgba(11,90,42,0.06),transparent_42%),#F7FAF8] shadow-[0_14px_36px_rgba(11,90,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Your Estimate</CardTitle>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]"><BarChart3 className="h-5 w-5" /></span>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-semibold text-[#667085]">Monthly Repayment</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">KSH {money(result.monthlyPayment)}</p>
              </div>
              <div className="space-y-3 text-sm">
                <ResultRow label="Loan amount" value={`KSH ${money(result.loanAmount)}`} />
                <ResultRow label="Upfront cash estimate" value={`KSH ${money(result.upfrontCash)}`} />
                <ResultRow label="Loan-to-value" value={`${result.loanToValue.toFixed(1)}%`} />
                <ResultRow label="Total interest" value={`KSH ${money(result.totalInterest)}`} />
                <ResultRow label="Total repayment" value={`KSH ${money(result.totalRepayment)}`} strong />
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            Lender fees, insurance, valuation, legal fees and rate changes can affect the final cost.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Field({ id, label, value, setValue, placeholder, step }: { id: string; label: string; value: string; setValue: (value: string) => void; placeholder: string; step?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-semibold text-[#0B1020]">{label}</Label>
      <Input id={id} type="number" step={step} value={value} onChange={(event) => setValue(event.target.value)} placeholder={placeholder} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
    </div>
  )
}

function ResultRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between border-b border-[#E4E7EC] pb-3 ${strong ? "text-base font-bold" : ""}`}>
      <span className={strong ? "text-[#0B1020]" : "text-[#667085]"}>{label}</span>
      <span className={strong ? "text-[#0B5A2A]" : "font-semibold text-[#0B1020]"}>{value}</span>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="space-y-5">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]"><Home className="h-8 w-8" /></div>
      <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
        Enter the property price and loan assumptions to see your mortgage estimate.
      </p>
    </div>
  )
}
