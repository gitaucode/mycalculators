"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BarChart3, Wallet } from "lucide-react"

export const NetSalaryCalculator = () => {
  const [grossSalary, setGrossSalary] = useState<string>("")
  const [benefits, setBenefits] = useState<string>("")
  const [pensionContribution, setPensionContribution] = useState<string>("")
  const [housingRelief, setHousingRelief] = useState<string>("")
  const [insuranceRelief, setInsuranceRelief] = useState<string>("")
  const [result, setResult] = useState<{
    paye: number
    shif: number
    nssf: number
    ahl: number
    taxableIncome: number
    grossPay: number
    netSalary: number
  } | null>(null)

  const calculateNssf = (gross: number) => {
    const lowerEarningLimit = 9000
    const upperEarningLimit = 108000
    const tierOne = Math.min(gross, lowerEarningLimit) * 0.06
    const tierTwo = Math.max(0, Math.min(gross, upperEarningLimit) - lowerEarningLimit) * 0.06

    return tierOne + tierTwo
  }

  const calculatePayeBeforeRelief = (taxableIncome: number) => {
    const bands = [
      { limit: 24000, rate: 0.1 },
      { limit: 8333, rate: 0.25 },
      { limit: 467667, rate: 0.3 },
      { limit: 300000, rate: 0.325 },
      { limit: Number.POSITIVE_INFINITY, rate: 0.35 },
    ]

    let remaining = Math.max(0, taxableIncome)
    let tax = 0

    for (const band of bands) {
      if (remaining <= 0) break
      const taxableAtBand = Math.min(remaining, band.limit)
      tax += taxableAtBand * band.rate
      remaining -= taxableAtBand
    }

    return tax
  }

  const calculateNetSalary = () => {
    const gross = Number.parseFloat(grossSalary) || 0
    const benefit = Number.parseFloat(benefits) || 0
    const pension = Number.parseFloat(pensionContribution) || 0
    const housing = Number.parseFloat(housingRelief) || 0
    const insurance = Number.parseFloat(insuranceRelief) || 0

    if (gross <= 0) {
      setResult(null)
      return
    }

    const grossPay = gross + benefit
    const nssfContribution = calculateNssf(gross)
    const shifContribution = Math.max(300, gross * 0.0275)
    const affordableHousingLevy = gross * 0.015
    const taxableIncome = Math.max(0, grossPay - nssfContribution - shifContribution - affordableHousingLevy - pension)

    const personalRelief = 2400
    const payeBeforeRelief = calculatePayeBeforeRelief(taxableIncome)
    const paye = Math.max(0, payeBeforeRelief - personalRelief - housing - insurance)

    const totalDeductions = paye + shifContribution + nssfContribution + affordableHousingLevy + pension
    const netSalary = grossPay - totalDeductions

    setResult({
      paye: Number.parseFloat(paye.toFixed(2)),
      shif: Number.parseFloat(shifContribution.toFixed(2)),
      nssf: Number.parseFloat(nssfContribution.toFixed(2)),
      ahl: Number.parseFloat(affordableHousingLevy.toFixed(2)),
      taxableIncome: Number.parseFloat(taxableIncome.toFixed(2)),
      grossPay: Number.parseFloat(grossPay.toFixed(2)),
      netSalary: Number.parseFloat(netSalary.toFixed(2)),
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs */}
      <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
        <CardHeader>
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">
            Net Salary Calculator
          </CardTitle>
          <CardDescription className="text-base leading-6 text-[#667085]">
            Estimate your take-home pay after all statutory deductions (PAYE, SHIF, NSSF, AHL).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="gross-salary" className="font-semibold text-[#0B1020]">Gross Salary (KSH)</Label>
            <Input
              id="gross-salary"
              type="number"
              placeholder="e.g., 50,000"
              value={grossSalary}
              onChange={(e) => setGrossSalary(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="benefits" className="font-semibold text-[#0B1020]">Taxable Benefits (KSH)</Label>
            <Input
              id="benefits"
              type="number"
              placeholder="e.g., 5,000 (allowances)"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pension-contribution" className="font-semibold text-[#0B1020]">Approved Pension Contribution (KSH)</Label>
            <Input
              id="pension-contribution"
              type="number"
              placeholder="e.g., 1,000"
              value={pensionContribution}
              onChange={(e) => setPensionContribution(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="housing-relief" className="font-semibold text-[#0B1020]">Additional Tax Relief (KSH)</Label>
            <Input
              id="housing-relief"
              type="number"
              placeholder="e.g., 0"
              value={housingRelief}
              onChange={(e) => setHousingRelief(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurance-relief" className="font-semibold text-[#0B1020]">Insurance Relief (KSH)</Label>
            <Input
              id="insurance-relief"
              type="number"
              placeholder="e.g., 210"
              value={insuranceRelief}
              onChange={(e) => setInsuranceRelief(e.target.value)}
              className="h-12 rounded-xl border-[#E4E7EC] text-base"
            />
          </div>
          <Button onClick={calculateNetSalary} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
            Calculate Net Salary
          </Button>
          <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            <p className="font-semibold">Kenya statutory deductions applied</p>
            <p>Includes PAYE tax bands, SHIF (2.75%), NSSF tiers, and Affordable Housing Levy (1.5%).</p>
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
                <p className="text-sm font-semibold text-[#667085]">Take-Home Pay</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">
                  KSH {result.netSalary.toLocaleString()}
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Gross Pay</span>
                  <span className="font-semibold text-[#0B1020]">KSH {result.grossPay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Taxable Income</span>
                  <span className="font-semibold text-[#0B1020]">KSH {result.taxableIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">PAYE</span>
                  <span className="font-semibold text-[#DC2626]">KSH {result.paye.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">SHIF</span>
                  <span className="font-semibold text-[#DC2626]">KSH {result.shif.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">NSSF</span>
                  <span className="font-semibold text-[#DC2626]">KSH {result.nssf.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Affordable Housing Levy</span>
                  <span className="font-semibold text-[#DC2626]">KSH {result.ahl.toLocaleString()}</span>
                </div>
                {Number.parseFloat(pensionContribution) > 0 && (
                  <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                    <span className="text-[#667085]">Pension Contribution</span>
                    <span className="font-semibold text-[#DC2626]">
                      KSH {Number.parseFloat(pensionContribution).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-1 text-base font-bold">
                  <span>Net Salary</span>
                  <span className="text-[#0B5A2A]">KSH {result.netSalary.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                <Wallet className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter your details in the calculator to see your net salary breakdown.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Gross pay</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Total deductions</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Net salary</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Actual values may vary depending on employer arrangements and KRA updates.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
