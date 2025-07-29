"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ElectricityTariff {
  min: number
  max: number
  rate: number
  category: string
}

// KPLC domestic tariffs (simplified for demonstration)
const domesticTariffs: ElectricityTariff[] = [
  { min: 0, max: 50, rate: 12.0, category: "Lifeline" },
  { min: 51, max: 1500, rate: 23.52, category: "Domestic" },
  { min: 1501, max: Number.POSITIVE_INFINITY, rate: 31.48, category: "Domestic High" },
]

export const ElectricityCalculator = () => {
  const [amount, setAmount] = useState<string>("")
  const [calculationType, setCalculationType] = useState<string>("amount-to-units")
  const [units, setUnits] = useState<string>("")
  const [result, setResult] = useState<{
    units?: number
    cost?: number
    appliedTariff?: number
    estimatedUnitsBeforeDeductions?: number
    deductions?: {
      fuelEnergyCharge: number
      forexAdjustment: number
      inflationAdjustment: number
      regulatoryLevies: number
      repLevy: number
      vat: number
      total: number
    }
    netAmountUsedForTokens?: number
    finalEstimatedUnits?: number
    breakdown?: Array<{ category: string; units: number; rate: number; cost: number }>
  } | null>(null)

  const getAppliedTariff = (estimatedUnits: number): number => {
    // Determine tariff based on estimated usage
    for (const tariff of domesticTariffs) {
      if (estimatedUnits >= tariff.min && estimatedUnits <= tariff.max) {
        return tariff.rate
      }
    }
    return domesticTariffs[domesticTariffs.length - 1].rate
  }

  const calculateUnitsFromAmount = (paidAmount: number) => {
    // Start with an initial tariff estimate (average domestic rate)
    let appliedTariff = 23.52
    let estimatedUnitsBeforeDeductions = paidAmount / appliedTariff

    // Refine tariff based on estimated usage
    appliedTariff = getAppliedTariff(estimatedUnitsBeforeDeductions)
    estimatedUnitsBeforeDeductions = paidAmount / appliedTariff

    // Calculate deductions based on estimated units
    const fuelEnergyCharge = estimatedUnitsBeforeDeductions * 3.72
    const forexAdjustment = estimatedUnitsBeforeDeductions * 1.17
    const inflationAdjustment = estimatedUnitsBeforeDeductions * 0.38
    const regulatoryLevies = estimatedUnitsBeforeDeductions * 0.02
    const repLevy = paidAmount * 0.05

    // Calculate subtotal after per-unit deductions (before VAT)
    const subtotalAfterPerUnitDeductions =
      paidAmount - fuelEnergyCharge - forexAdjustment - inflationAdjustment - regulatoryLevies - repLevy
    const vat = subtotalAfterPerUnitDeductions * 0.16

    const totalDeductions = fuelEnergyCharge + forexAdjustment + inflationAdjustment + regulatoryLevies + repLevy + vat
    const netAmountUsedForTokens = paidAmount - totalDeductions
    const finalEstimatedUnits = Math.max(0, netAmountUsedForTokens / appliedTariff)

    return {
      appliedTariff,
      estimatedUnitsBeforeDeductions,
      deductions: {
        fuelEnergyCharge,
        forexAdjustment,
        inflationAdjustment,
        regulatoryLevies,
        repLevy,
        vat,
        total: totalDeductions,
      },
      netAmountUsedForTokens,
      finalEstimatedUnits,
    }
  }

  const calculateCostFromUnits = (totalUnits: number) => {
    let remainingUnits = totalUnits
    let totalCost = 0
    const breakdown = []

    for (const tariff of domesticTariffs) {
      if (remainingUnits <= 0) break

      const unitsInBand = Math.min(
        remainingUnits,
        tariff.max === Number.POSITIVE_INFINITY ? remainingUnits : tariff.max - tariff.min + 1,
      )

      if (unitsInBand > 0) {
        const cost = unitsInBand * tariff.rate
        breakdown.push({
          category: tariff.category,
          units: unitsInBand,
          rate: tariff.rate,
          cost: cost,
        })
        totalCost += cost
        remainingUnits -= unitsInBand
      }
    }

    // Add all the deductions and fees
    const fuelEnergyCharge = totalUnits * 3.72
    const forexAdjustment = totalUnits * 1.17
    const inflationAdjustment = totalUnits * 0.38
    const regulatoryLevies = totalUnits * 0.02

    const subtotalBeforeRepAndVat =
      totalCost + fuelEnergyCharge + forexAdjustment + inflationAdjustment + regulatoryLevies
    const repLevy = subtotalBeforeRepAndVat * 0.05
    const vat = (subtotalBeforeRepAndVat + repLevy) * 0.16

    const totalWithAllFees = subtotalBeforeRepAndVat + repLevy + vat

    return {
      cost: totalWithAllFees,
      breakdown,
      deductions: {
        fuelEnergyCharge,
        forexAdjustment,
        inflationAdjustment,
        regulatoryLevies,
        repLevy,
        vat,
        total: fuelEnergyCharge + forexAdjustment + inflationAdjustment + regulatoryLevies + repLevy + vat,
      },
    }
  }

  const calculate = () => {
    if (calculationType === "amount-to-units") {
      const paidAmount = Number.parseFloat(amount)
      if (!paidAmount || paidAmount <= 0) return

      const calculation = calculateUnitsFromAmount(paidAmount)
      setResult({
        units: calculation.finalEstimatedUnits,
        appliedTariff: calculation.appliedTariff,
        estimatedUnitsBeforeDeductions: calculation.estimatedUnitsBeforeDeductions,
        deductions: calculation.deductions,
        netAmountUsedForTokens: calculation.netAmountUsedForTokens,
        finalEstimatedUnits: calculation.finalEstimatedUnits,
      })
    } else {
      const unitCount = Number.parseFloat(units)
      if (!unitCount || unitCount <= 0) return

      const calculation = calculateCostFromUnits(unitCount)
      setResult({
        cost: calculation.cost,
        breakdown: calculation.breakdown,
        deductions: calculation.deductions,
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Electricity Calculator</CardTitle>
          <CardDescription>Calculate electricity units from amount paid or cost from units consumed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="calculation-type">Calculation Type</Label>
            <Select value={calculationType} onValueChange={setCalculationType}>
              <SelectTrigger>
                <SelectValue placeholder="Select calculation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amount-to-units">Amount Paid → Units</SelectItem>
                <SelectItem value="units-to-amount">Units → Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {calculationType === "amount-to-units" ? (
            <div className="space-y-2">
              <Label htmlFor="amount">Amount Paid (KSH)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount paid"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="units">Units (kWh)</Label>
              <Input
                id="units"
                type="number"
                placeholder="Enter units consumed"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
              />
            </div>
          )}

          <Button onClick={calculate} className="w-full">
            Calculate
          </Button>
        </CardContent>
      </Card>

      {result && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Calculation Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calculationType === "amount-to-units" ? (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground">Final Estimated Units</p>
                      <p className="text-3xl font-bold text-primary">{result.finalEstimatedUnits?.toFixed(1)} kWh</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Amount Paid:</p>
                        <p>KSH {amount}</p>
                      </div>
                      <div>
                        <p className="font-medium">Tariff Applied:</p>
                        <p>KSH {result.appliedTariff?.toFixed(2)} per unit</p>
                      </div>
                      <div>
                        <p className="font-medium">Units Before Deductions:</p>
                        <p>{result.estimatedUnitsBeforeDeductions?.toFixed(1)} kWh</p>
                      </div>
                      <div>
                        <p className="font-medium">Net Used for Tokens:</p>
                        <p>KSH {result.netAmountUsedForTokens?.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="text-3xl font-bold text-primary">KSH {result.cost?.toFixed(2)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {result.deductions && (
            <Card>
              <CardHeader>
                <CardTitle>Deductions Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Fuel Energy Charge:</span>
                    <span>KSH {result.deductions.fuelEnergyCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Forex Adjustment:</span>
                    <span>KSH {result.deductions.forexAdjustment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Inflation Adjustment:</span>
                    <span>KSH {result.deductions.inflationAdjustment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Regulatory Levies:</span>
                    <span>KSH {result.deductions.regulatoryLevies.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>REP Levy (5%):</span>
                    <span>KSH {result.deductions.repLevy.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>VAT (16%):</span>
                    <span>KSH {result.deductions.vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm pt-2 border-t">
                    <span>Total Deductions:</span>
                    <span>KSH {result.deductions.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {result.breakdown && (
            <Card>
              <CardHeader>
                <CardTitle>Rate Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded">
                      <div>
                        <p className="font-medium">{item.category}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.units.toFixed(1)} kWh × KSH {item.rate}
                        </p>
                      </div>
                      <p className="font-bold">KSH {item.cost.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>📋 Important Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Actual tokens may vary slightly depending on KPLC system timing and rate adjustments</li>
                <li>• Rates include fuel energy charges, forex adjustments, and regulatory levies</li>
                <li>• VAT is calculated on the subtotal after per-unit deductions</li>
                <li>• REP levy is 5% of the amount before VAT</li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
