"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export const NetSalaryCalculator = () => {
  const [grossSalary, setGrossSalary] = useState<string>("")
  const [benefits, setBenefits] = useState<string>("")
  const [pensionContribution, setPensionContribution] = useState<string>("")
  const [housingRelief, setHousingRelief] = useState<string>("")
  const [insuranceRelief, setInsuranceRelief] = useState<string>("")
  const [result, setResult] = useState<{
    paye: number
    nhif: number
    nssf: number
    netSalary: number
  } | null>(null)

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

    // NSSF (Tier I & II - assuming new rates for simplicity, max KES 2160)
    const nssfContribution = Math.min(gross * 0.06, 2160) // Example: 6% of gross, capped

    // Taxable Income
    const taxableIncome = gross + benefit - nssfContribution - pension

    // PAYE (Simplified tiers for example)
    let paye = 0
    if (taxableIncome <= 24000) {
      paye = taxableIncome * 0.1
    } else if (taxableIncome <= 32333) {
      paye = 2400 + (taxableIncome - 24000) * 0.25
    } else {
      paye = 2400 + 2083.25 + (taxableIncome - 32333) * 0.3
    }

    // Personal Relief (Example: KES 2400)
    const personalRelief = 2400
    paye = Math.max(0, paye - personalRelief - housing - insurance)

    // NHIF (Simplified tiers for example)
    let nhif = 0
    if (gross <= 5999) nhif = 150
    else if (gross <= 7999) nhif = 300
    else if (gross <= 11999) nhif = 400
    else if (gross <= 14999) nhif = 500
    else if (gross <= 19999) nhif = 600
    else if (gross <= 24999) nhif = 750
    else if (gross <= 29999) nhif = 850
    else if (gross <= 34999) nhif = 900
    else if (gross <= 39999) nhif = 950
    else if (gross <= 44999) nhif = 1000
    else if (gross <= 49999) nhif = 1100
    else if (gross <= 59999) nhif = 1200
    else if (gross <= 69999) nhif = 1300
    else if (gross <= 79999) nhif = 1400
    else if (gross <= 89999) nhif = 1500
    else if (gross <= 99999) nhif = 1600
    else nhif = 1700 // For gross > 100,000

    const totalDeductions = paye + nhif + nssfContribution + pension
    const netSalary = gross - totalDeductions

    setResult({
      paye: Number.parseFloat(paye.toFixed(2)),
      nhif: Number.parseFloat(nhif.toFixed(2)),
      nssf: Number.parseFloat(nssfContribution.toFixed(2)),
      netSalary: Number.parseFloat(netSalary.toFixed(2)),
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Net Salary Calculator</CardTitle>
          <CardDescription>Estimate your take-home pay after all deductions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gross-salary">Gross Salary (KSH)</Label>
            <Input
              id="gross-salary"
              type="number"
              placeholder="e.g., 50000"
              value={grossSalary}
              onChange={(e) => setGrossSalary(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="benefits">Taxable Benefits (KSH, e.g., allowances)</Label>
            <Input
              id="benefits"
              type="number"
              placeholder="e.g., 5000"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pension-contribution">Approved Pension Contribution (KSH)</Label>
            <Input
              id="pension-contribution"
              type="number"
              placeholder="e.g., 1000"
              value={pensionContribution}
              onChange={(e) => setPensionContribution(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="housing-relief">Housing Relief (KSH)</Label>
            <Input
              id="housing-relief"
              type="number"
              placeholder="e.g., 1700"
              value={housingRelief}
              onChange={(e) => setHousingRelief(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurance-relief">Insurance Relief (KSH)</Label>
            <Input
              id="insurance-relief"
              type="number"
              placeholder="e.g., 210"
              value={insuranceRelief}
              onChange={(e) => setInsuranceRelief(e.target.value)}
            />
          </div>
          <Button onClick={calculateNetSalary} className="w-full">
            Calculate Net Salary
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Net Salary Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Gross Salary:</span>
                <span className="font-medium">KSH {Number.parseFloat(grossSalary).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>PAYE:</span>
                <span className="font-medium text-destructive">KSH {result.paye.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>NHIF:</span>
                <span className="font-medium text-destructive">KSH {result.nhif.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>NSSF:</span>
                <span className="font-medium text-destructive">KSH {result.nssf.toLocaleString()}</span>
              </div>
              {Number.parseFloat(pensionContribution) > 0 && (
                <div className="flex justify-between">
                  <span>Pension Contribution:</span>
                  <span className="font-medium text-destructive">
                    KSH {Number.parseFloat(pensionContribution).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Net Salary:</span>
                  <span className="text-success">KSH {result.netSalary.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
