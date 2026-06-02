"use client"

import { useState } from "react"
import { AlertTriangle, BarChart3, CheckCircle2, Smartphone, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PaymentFrequency = "daily" | "weekly" | "monthly"

type Result = {
  cashPrice: number
  deposit: number
  paymentAmount: number
  termMonths: number
  frequency: PaymentFrequency
  totalRepayment: number
  markup: number
  markupPercent: number
  financedAmount: number
  paymentCount: number
  dailyEquivalent: number
  dailyIncome: number
  burdenPercent: number | null
  annualizedCostPercent: number | null
  score: {
    label: string
    tone: "good" | "fair" | "expensive" | "bad"
    meter: number
    summary: string
  }
}

const frequencyLabels: Record<PaymentFrequency, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
}

const daysPerPayment: Record<PaymentFrequency, number> = {
  daily: 1,
  weekly: 7,
  monthly: 30,
}

const paymentsPerMonth: Record<PaymentFrequency, number> = {
  daily: 30,
  weekly: 365 / 12 / 7,
  monthly: 1,
}

function money(value: number) {
  return `KSH ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}

function percent(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "-"
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}%`
}

function clampTermMonths(value: string) {
  const months = Number.parseInt(value)
  if (!months) return ""
  return String(Math.min(12, Math.max(1, months)))
}

function getScore(markupPercent: number, burdenPercent: number | null) {
  const burden = burdenPercent ?? 0

  if (markupPercent <= 15 && (burdenPercent === null || burden <= 8)) {
    return {
      label: "Worth it",
      tone: "good" as const,
      meter: 18,
      summary: "The markup and payment burden look reasonable for a pay-as-you-go phone deal.",
    }
  }

  if (markupPercent <= 35 && (burdenPercent === null || burden <= 12)) {
    return {
      label: "Fair",
      tone: "fair" as const,
      meter: 45,
      summary: "The deal is acceptable, but compare it with the cash price before committing.",
    }
  }

  if (markupPercent <= 60 && (burdenPercent === null || burden <= 18)) {
    return {
      label: "Expensive",
      tone: "expensive" as const,
      meter: 70,
      summary: "The phone may still be useful, but you are paying a meaningful premium.",
    }
  }

  return {
    label: "Not worth it",
    tone: "bad" as const,
    meter: 92,
    summary: "The markup or repayment burden looks high. Consider saving, buying cash, or a cheaper model.",
  }
}

function scoreStyles(tone: Result["score"]["tone"]) {
  switch (tone) {
    case "good":
      return {
        badge: "bg-[#ECFDF3] text-[#0B5A2A]",
        bar: "bg-[#16A34A]",
        icon: CheckCircle2,
      }
    case "fair":
      return {
        badge: "bg-[#FEF9C3] text-[#A16207]",
        bar: "bg-[#EAB308]",
        icon: BarChart3,
      }
    case "expensive":
      return {
        badge: "bg-[#FFF4E5] text-[#B54708]",
        bar: "bg-[#F97316]",
        icon: AlertTriangle,
      }
    default:
      return {
        badge: "bg-[#FEF2F2] text-[#DC2626]",
        bar: "bg-[#DC2626]",
        icon: XCircle,
      }
  }
}

export function MkopaPhoneLoanCalculator() {
  const [cashPrice, setCashPrice] = useState("18000")
  const [deposit, setDeposit] = useState("3500")
  const [paymentAmount, setPaymentAmount] = useState("100")
  const [frequency, setFrequency] = useState<PaymentFrequency>("daily")
  const [termMonths, setTermMonths] = useState("12")
  const [dailyIncome, setDailyIncome] = useState("")
  const [result, setResult] = useState<Result | null>(null)

  const calculate = () => {
    const cash = Number.parseFloat(cashPrice)
    const upfront = Number.parseFloat(deposit) || 0
    const payment = Number.parseFloat(paymentAmount)
    const months = Math.min(12, Math.max(1, Number.parseInt(termMonths) || 0))
    const income = Number.parseFloat(dailyIncome) || 0

    if (!cash || !payment || !months || cash <= 0 || payment <= 0 || months <= 0 || upfront < 0) {
      setResult(null)
      return
    }

    const paymentCount = Math.round(months * paymentsPerMonth[frequency])
    const totalRepayment = upfront + payment * paymentCount
    const markup = totalRepayment - cash
    const markupPercent = (markup / cash) * 100
    const financedAmount = Math.max(cash - upfront, 0)
    const totalDays = months * 30
    const dailyEquivalent = payment / daysPerPayment[frequency]
    const burdenPercent = income > 0 ? (dailyEquivalent / income) * 100 : null
    const annualizedCostPercent =
      financedAmount > 0 && totalDays > 0 ? (markup / financedAmount) * (365 / totalDays) * 100 : null
    const score = getScore(markupPercent, burdenPercent)

    setResult({
      cashPrice: cash,
      deposit: upfront,
      paymentAmount: payment,
      termMonths: months,
      frequency,
      totalRepayment,
      markup,
      markupPercent,
      financedAmount,
      paymentCount,
      dailyEquivalent,
      dailyIncome: income,
      burdenPercent,
      annualizedCostPercent,
      score,
    })
  }

  const activeScore = result?.score ?? {
    label: "Enter terms",
    tone: "fair" as const,
    meter: 0,
    summary: "Add the phone cash price, deposit, repayment amount and term to score the deal.",
  }
  const styles = scoreStyles(activeScore.tone)
  const ScoreIcon = styles.icon

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
        <CardHeader>
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">
            M-KOPA Phone Loan Calculator
          </CardTitle>
          <CardDescription className="text-base leading-6 text-[#667085]">
            Compare a pay-as-you-go phone deal against the cash price and see whether the repayment looks worth it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cash-price" className="font-semibold text-[#0B1020]">Cash Phone Price (KSH)</Label>
              <Input
                id="cash-price"
                type="number"
                inputMode="decimal"
                value={cashPrice}
                onChange={(event) => setCashPrice(event.target.value)}
                className="h-12 rounded-xl border-[#E4E7EC] text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit" className="font-semibold text-[#0B1020]">Deposit / Upfront (KSH)</Label>
              <Input
                id="deposit"
                type="number"
                inputMode="decimal"
                value={deposit}
                onChange={(event) => setDeposit(event.target.value)}
                className="h-12 rounded-xl border-[#E4E7EC] text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-amount" className="font-semibold text-[#0B1020]">Repayment Amount (KSH)</Label>
              <Input
                id="payment-amount"
                type="number"
                inputMode="decimal"
                value={paymentAmount}
                onChange={(event) => setPaymentAmount(event.target.value)}
                className="h-12 rounded-xl border-[#E4E7EC] text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency" className="font-semibold text-[#0B1020]">Repayment Frequency</Label>
              <Select value={frequency} onValueChange={(value) => setFrequency(value as PaymentFrequency)}>
                <SelectTrigger id="frequency" className="h-12 rounded-xl border-[#E4E7EC] text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="term-months" className="font-semibold text-[#0B1020]">
                Term Length (months)
              </Label>
              <Input
                id="term-months"
                type="number"
                inputMode="numeric"
                min={1}
                max={12}
                value={termMonths}
                onChange={(event) => setTermMonths(event.target.value)}
                onBlur={(event) => setTermMonths(clampTermMonths(event.target.value) || "1")}
                className="h-12 rounded-xl border-[#E4E7EC] text-base"
              />
              <p className="text-xs text-[#667085]">Use 1 to 12 months. Payment count is estimated from the selected frequency.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="daily-income" className="font-semibold text-[#0B1020]">Daily Income (optional)</Label>
              <Input
                id="daily-income"
                type="number"
                inputMode="decimal"
                value={dailyIncome}
                onChange={(event) => setDailyIncome(event.target.value)}
                placeholder="e.g., 800"
                className="h-12 rounded-xl border-[#E4E7EC] text-base"
              />
            </div>
          </div>

          <Button onClick={calculate} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
            Score This Phone Deal
          </Button>

          <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            <p className="font-semibold">Use the actual offer terms</p>
            <p>M-KOPA prices, deposits and repayment plans vary by phone model and time. This tool works best when you enter the real figures from the offer you are considering.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[20px] border-[#CFEBDD] bg-[radial-gradient(circle_at_50%_18%,rgba(11,90,42,0.06),transparent_42%),#F7FAF8] shadow-[0_14px_36px_rgba(11,90,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Deal Meter</CardTitle>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]">
            <Smartphone className="h-5 w-5" />
          </span>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-extrabold ${styles.badge}`}>
                  <ScoreIcon className="h-4 w-4" />
                  {activeScore.label}
                </span>
                <span className="text-sm font-bold text-[#667085]">{activeScore.meter}/100</span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#E4E7EC]">
                <div className={`h-full rounded-full ${styles.bar}`} style={{ width: `${activeScore.meter}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-[11px] font-bold uppercase text-[#667085]">
                <span>Worth it</span>
                <span>Fair</span>
                <span>Not worth it</span>
              </div>
              <p className="mt-4 text-sm font-semibold leading-6 text-[#344054]">{activeScore.summary}</p>
            </div>

            {result ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Total repayment</span>
                  <span className="font-semibold text-[#0B1020]">{money(result.totalRepayment)}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Extra above cash price</span>
                  <span className={`font-semibold ${result.markup > 0 ? "text-[#DC2626]" : "text-[#0B5A2A]"}`}>
                    {money(result.markup)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Markup over cash</span>
                  <span className="font-semibold text-[#0B1020]">{percent(result.markupPercent)}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Term</span>
                  <span className="font-semibold text-[#0B1020]">{result.termMonths} months</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Estimated payments</span>
                  <span className="font-semibold text-[#0B1020]">{result.paymentCount.toLocaleString()} {frequencyLabels[result.frequency].toLowerCase()} payments</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Daily equivalent</span>
                  <span className="font-semibold text-[#0B1020]">{money(result.dailyEquivalent)}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Income burden</span>
                  <span className="font-semibold text-[#0B1020]">{percent(result.burdenPercent)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-bold text-[#0B1020]">Annualized cost estimate</span>
                  <span className="font-bold text-[#0B5A2A]">{percent(result.annualizedCostPercent)}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Total repayment</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Markup over cash</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Score</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            )}

            <div className="rounded-2xl bg-[#FFF4E5] p-4 text-sm leading-6 text-[#92400E]">
              This is not financial advice and is not affiliated with M-KOPA. It is a comparison tool to help you understand repayment cost.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
