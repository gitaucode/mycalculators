"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, BarChart3 } from "lucide-react"

interface Extra {
  id: string
  name: string
  cost: number
}

const extras: Extra[] = [
  { id: "perimeter-wall", name: "Perimeter wall", cost: 250000 },
  { id: "septic-tank", name: "Septic tank", cost: 100000 },
  { id: "water-tank", name: "Water tank", cost: 80000 },
  { id: "electrical-wiring", name: "Electrical wiring", cost: 150000 },
  { id: "plumbing", name: "Plumbing & sanitation", cost: 120000 },
]

const costPerSqm = {
  basic: { urban: 28000, rural: 24000 },
  standard: { urban: 40000, rural: 34000 },
  "high-end": { urban: 60000, rural: 51000 },
}

export const ConstructionCostCalculator = () => {
  const [area, setArea] = useState<string>("")
  const [finishType, setFinishType] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [result, setResult] = useState<{
    baseCost: number; extrasCost: number; professionalFees: number; totalCost: number
    costPerSqm: number; selectedExtrasDetails: Array<{ name: string; cost: number }>
  } | null>(null)

  const handleExtraChange = (id: string, checked: boolean) => {
    setSelectedExtras(checked ? [...selectedExtras, id] : selectedExtras.filter((e) => e !== id))
  }

  const calculate = () => {
    const areaNum = Number.parseFloat(area)
    if (!areaNum || areaNum <= 0 || !finishType || !location) return

    const costRate = costPerSqm[finishType as keyof typeof costPerSqm][location as keyof typeof costPerSqm.basic]
    const baseCost = areaNum * costRate
    const selectedExtrasDetails = extras.filter((e) => selectedExtras.includes(e.id))
    const extrasCost = selectedExtrasDetails.reduce((s, e) => s + e.cost, 0)
    const professionalFees = baseCost * 0.1
    const totalCost = baseCost + extrasCost + professionalFees

    setResult({ baseCost, extrasCost, professionalFees, totalCost, costPerSqm: costRate, selectedExtrasDetails })
  }

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs + rates reference */}
      <div className="space-y-4">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020] flex items-center gap-2">
              <Building2 className="h-6 w-6 text-[#0B5A2A]" />
              Construction Cost Calculator
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Estimate construction costs based on area, finish type, location, and optional extras.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="area" className="font-semibold text-[#0B1020]">Built-up Area (Square Meters)</Label>
              <Input id="area" type="number" placeholder="e.g., 120" value={area} onChange={(e) => setArea(e.target.value)} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-semibold text-[#0B1020]">Finish Type</Label>
                <Select value={finishType} onValueChange={setFinishType}>
                  <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base"><SelectValue placeholder="Select finish type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="high-end">High-End</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-[#0B1020]">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base"><SelectValue placeholder="Select location" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urban">Urban</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-semibold text-[#0B1020]">Optional Extras</Label>
              <div className="space-y-2">
                {extras.map((extra) => (
                  <div key={extra.id} className="flex items-center justify-between rounded-xl border border-[#E4E7EC] p-3">
                    <div className="flex items-center gap-3">
                      <Checkbox id={extra.id} checked={selectedExtras.includes(extra.id)} onCheckedChange={(checked) => handleExtraChange(extra.id, checked as boolean)} />
                      <Label htmlFor={extra.id} className="cursor-pointer text-sm font-medium text-[#0B1020]">{extra.name}</Label>
                    </div>
                    <span className="text-sm font-semibold text-[#667085]">KSH {extra.cost.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={calculate} disabled={!area || !finishType || !location} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
              Calculate Construction Cost
            </Button>
            <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
              <p className="font-semibold">Professional fees included</p>
              <p>10% professional and statutory fees are automatically added to the base construction cost.</p>
            </div>
          </CardContent>
        </Card>

        {/* Rate reference table */}
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-lg font-bold text-[#0B1020]">Cost Per Square Meter Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-[#0B1020] mb-2">Urban Rates</p>
                <div className="space-y-1.5">
                  {[["Basic", "28,000"], ["Standard", "40,000"], ["High-End", "60,000"]].map(([label, rate]) => (
                    <div key={label} className="flex justify-between rounded-lg bg-[#F7FAF8] px-3 py-2">
                      <span className="text-[#667085]">{label}</span>
                      <span className="font-semibold text-[#0B1020]">KSH {rate}/sqm</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-[#0B1020] mb-2">Rural Rates</p>
                <div className="space-y-1.5">
                  {[["Basic", "24,000"], ["Standard", "34,000"], ["High-End", "51,000"]].map(([label, rate]) => (
                    <div key={label} className="flex justify-between rounded-lg bg-[#F7FAF8] px-3 py-2">
                      <span className="text-[#667085]">{label}</span>
                      <span className="font-semibold text-[#0B1020]">KSH {rate}/sqm</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
                <p className="text-sm font-semibold text-[#667085]">Total Construction Cost</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">
                  KSH {result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <div>
                    <span className="text-[#667085]">Base Cost</span>
                    <p className="text-xs text-[#667085]">{area} sqm × KSH {result.costPerSqm.toLocaleString()}/sqm</p>
                  </div>
                  <span className="font-semibold text-[#0B1020]">KSH {result.baseCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>

                {result.selectedExtrasDetails.length > 0 && (
                  <>
                    {result.selectedExtrasDetails.map((extra, i) => (
                      <div key={i} className="flex justify-between border-b border-[#E4E7EC] pb-3 text-xs">
                        <span className="text-[#667085]">{extra.name}</span>
                        <span className="font-semibold text-[#0B1020]">KSH {extra.cost.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                      <span className="text-[#667085]">Total Extras</span>
                      <span className="font-semibold text-[#0B1020]">KSH {result.extrasCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                  </>
                )}

                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <div>
                    <span className="text-[#667085]">Professional & Statutory Fees</span>
                    <p className="text-xs text-[#667085]">10% of base cost</p>
                  </div>
                  <span className="font-semibold text-[#0B1020]">KSH {result.professionalFees.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between pt-1 text-base font-bold">
                  <span>Total Cost</span>
                  <span className="text-[#0B5A2A]">KSH {result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                <Building2 className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter your building area, finish type, and location to get a cost estimate.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Base construction cost</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Professional fees</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Total cost</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Actual costs depend on materials, contractors, and site conditions.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
