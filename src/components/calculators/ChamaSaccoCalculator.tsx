"use client"

import { useState } from "react"
import { BarChart3, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ChamaSaccoResult = {
  totalContributions: number
  memberContributions: number
  projectedInterest: number
  finalPool: number
  memberShare: number
  loanLimit: number
}

const money = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 0 })

export const ChamaSaccoCalculator = () => {
  const [members, setMembers] = useState("10")
  const [monthlyContribution, setMonthlyContribution] = useState("")
  const [months, setMonths] = useState("12")
  const [annualReturn, setAnnualReturn] = useState("8")
  const [loanMultiplier, setLoanMultiplier] = useState("3")
  const [result, setResult] = useState<ChamaSaccoResult | null>(null)

  const calculate = () => {
    const memberCount = Number.parseInt(members)
    const contribution = Number.parseFloat(monthlyContribution)
    const period = Number.parseInt(months)
    const annualRate = (Number.parseFloat(annualReturn) || 0) / 100
    const multiplier = Number.parseFloat(loanMultiplier) || 0

    if (!memberCount || !contribution || !period || memberCount <= 0 || contribution <= 0 || period <= 0) {
      setResult(null)
      return
    }

    const monthlyRate = annualRate / 12
    let finalPool = 0

    for (let month = 0; month < period; month++) {
      finalPool = (finalPool + contribution * memberCount) * (1 + monthlyRate)
    }

    const totalContributions = contribution * memberCount * period
    const memberContributions = contribution * period
    const projectedInterest = finalPool - totalContributions
    const memberShare = finalPool / memberCount
    const loanLimit = memberContributions * multiplier

    setResult({ totalContributions, memberContributions, projectedInterest, finalPool, memberShare, loanLimit })
  }

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
        <CardHeader>
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Chama/SACCO Calculator</CardTitle>
          <CardDescription className="text-base leading-6 text-[#667085]">
            Project group contributions, member share, return estimate and possible loan limit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="members" label="Number of Members" value={members} setValue={setMembers} placeholder="e.g., 10" />
            <Field id="monthly-contribution" label="Monthly Contribution (KSH)" value={monthlyContribution} setValue={setMonthlyContribution} placeholder="e.g., 5000" />
            <Field id="months" label="Saving Period (Months)" value={months} setValue={setMonths} placeholder="e.g., 12" />
            <Field id="annual-return" label="Annual Return / Dividend (%)" value={annualReturn} setValue={setAnnualReturn} placeholder="e.g., 8" step="0.1" />
            <div className="space-y-2 sm:col-span-2">
              <Field id="loan-multiplier" label="Loan Multiplier on Deposits" value={loanMultiplier} setValue={setLoanMultiplier} placeholder="e.g., 3" step="0.1" />
            </div>
          </div>
          <Button onClick={calculate} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
            Calculate Chama/SACCO Plan
          </Button>
          <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            <p className="font-semibold">Group savings planning</p>
            <p>Use this for Chama goals, SACCO deposits, dividend assumptions and loan-limit planning.</p>
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
                <p className="text-sm font-semibold text-[#667085]">Projected Group Pool</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">KSH {money(result.finalPool)}</p>
              </div>
              <div className="space-y-3 text-sm">
                <ResultRow label="Total contributions" value={`KSH ${money(result.totalContributions)}`} />
                <ResultRow label="Projected return" value={`KSH ${money(result.projectedInterest)}`} />
                <ResultRow label="Each member contributes" value={`KSH ${money(result.memberContributions)}`} />
                <ResultRow label="Estimated share per member" value={`KSH ${money(result.memberShare)}`} strong />
                <ResultRow label="Possible loan limit" value={`KSH ${money(result.loanLimit)}`} />
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            Actual dividends, loan limits and fees depend on your Chama rules or SACCO by-laws.
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
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]"><Users className="h-8 w-8" /></div>
      <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">Enter members, contributions and return assumptions to see the group projection.</p>
    </div>
  )
}
