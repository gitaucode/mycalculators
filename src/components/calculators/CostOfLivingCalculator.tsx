"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { BarChart3, MapPin } from "lucide-react"

interface CityData {
  name: string
  housing: { min: number; max: number }
  food: number
  transport: number
  utilities: number
  entertainment: number
  healthcare: number
  schooling: number
}

const cityData: CityData[] = [
  { name: "Nairobi", housing: { min: 15000, max: 80000 }, food: 12000, transport: 8000, utilities: 6000, entertainment: 5000, healthcare: 3000, schooling: 25000 },
  { name: "Mombasa", housing: { min: 12000, max: 50000 }, food: 10000, transport: 6000, utilities: 5500, entertainment: 4000, healthcare: 2500, schooling: 20000 },
  { name: "Kisumu", housing: { min: 8000, max: 35000 }, food: 8000, transport: 4000, utilities: 4000, entertainment: 3000, healthcare: 2000, schooling: 15000 },
  { name: "Nakuru", housing: { min: 7000, max: 30000 }, food: 7500, transport: 3500, utilities: 3500, entertainment: 2500, healthcare: 1800, schooling: 12000 },
  { name: "Eldoret", housing: { min: 6000, max: 25000 }, food: 7000, transport: 3000, utilities: 3000, entertainment: 2000, healthcare: 1500, schooling: 10000 },
  { name: "Thika", housing: { min: 8000, max: 35000 }, food: 8500, transport: 4500, utilities: 4000, entertainment: 3000, healthcare: 2000, schooling: 15000 },
]

const costItems = [
  { key: "housing", label: "🏠 Housing" },
  { key: "food", label: "🍽️ Food & Groceries" },
  { key: "transport", label: "🚗 Transportation" },
  { key: "utilities", label: "💡 Utilities" },
  { key: "entertainment", label: "🎬 Entertainment" },
  { key: "healthcare", label: "🏥 Healthcare" },
  { key: "schooling", label: "🎓 Education" },
]

export const CostOfLivingCalculator = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Nairobi")
  const [familySize, setFamilySize] = useState<number[]>([2])
  const [housingLevel, setHousingLevel] = useState<number[]>([50])
  const [lifestyleLevel, setLifestyleLevel] = useState<number[]>([50])

  const city = cityData.find((c) => c.name === selectedCity)
  if (!city) return null

  const calculateCosts = () => {
    const familyMultiplier = familySize[0]
    const lifestyleMultiplier = lifestyleLevel[0] / 50
    const housingCost = city.housing.min + (city.housing.max - city.housing.min) * (housingLevel[0] / 100)
    return {
      housing: housingCost,
      food: city.food * familyMultiplier * lifestyleMultiplier,
      transport: city.transport * Math.max(1, familyMultiplier * 0.7) * lifestyleMultiplier,
      utilities: city.utilities * Math.max(1, familyMultiplier * 0.8),
      entertainment: city.entertainment * familyMultiplier * lifestyleMultiplier,
      healthcare: city.healthcare * familyMultiplier,
      schooling: familySize[0] > 2 ? city.schooling * (familySize[0] - 2) : 0,
    }
  }

  const costs = calculateCosts()
  const totalMonthlyCost = Object.values(costs).reduce((s, c) => s + c, 0)
  const annualCost = totalMonthlyCost * 12

  const getHousingLabel = (l: number) => l < 30 ? "Budget" : l < 70 ? "Mid-range" : "Upmarket"
  const getLifestyleLabel = (l: number) => l < 30 ? "Basic" : l < 70 ? "Moderate" : "Premium"

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Controls + breakdown bars */}
      <div className="space-y-4">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020] flex items-center gap-2">
              <MapPin className="h-6 w-6 text-[#0B5A2A]" />
              Cost of Living Calculator
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Estimate monthly living costs across different Kenyan cities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="font-semibold text-[#0B1020]">Select City</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base"><SelectValue /></SelectTrigger>
                <SelectContent>{cityData.map((c) => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="font-semibold text-[#0B1020]">Family Size</Label>
                <span className="text-sm font-bold text-[#0B5A2A]">{familySize[0]} {familySize[0] === 1 ? "person" : "people"}</span>
              </div>
              <Slider value={familySize} onValueChange={setFamilySize} max={8} min={1} step={1} className="w-full" />
              <div className="flex justify-between text-xs text-[#667085]"><span>1 person</span><span>8 people</span></div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="font-semibold text-[#0B1020]">Housing Level</Label>
                <span className="text-sm font-bold text-[#0B5A2A]">{getHousingLabel(housingLevel[0])}</span>
              </div>
              <Slider value={housingLevel} onValueChange={setHousingLevel} max={100} min={0} step={10} className="w-full" />
              <div className="flex justify-between text-xs text-[#667085]"><span>Budget</span><span>Mid-range</span><span>Upmarket</span></div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="font-semibold text-[#0B1020]">Lifestyle Level</Label>
                <span className="text-sm font-bold text-[#0B5A2A]">{getLifestyleLabel(lifestyleLevel[0])}</span>
              </div>
              <Slider value={lifestyleLevel} onValueChange={setLifestyleLevel} max={100} min={20} step={10} className="w-full" />
              <div className="flex justify-between text-xs text-[#667085]"><span>Basic</span><span>Moderate</span><span>Premium</span></div>
            </div>

            <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
              <p className="font-semibold">Live estimates</p>
              <p>Results update instantly as you adjust the sliders above.</p>
            </div>
          </CardContent>
        </Card>

        {/* Category breakdown bars */}
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-lg font-bold text-[#0B1020]">Spending Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {costItems.filter((item) => (costs as Record<string, number>)[item.key] > 0).map((item) => {
                const amount = (costs as Record<string, number>)[item.key]
                const pct = (amount / totalMonthlyCost) * 100
                return (
                  <div key={item.key} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#0B1020]">{item.label}</span>
                      <span className="font-semibold text-[#0B5A2A]">{pct.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#E4E7EC] overflow-hidden">
                      <div className="h-full rounded-full bg-[#0B5A2A] transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <div className="rounded-2xl border border-[#E4E7EC] bg-white p-5 text-sm leading-6 text-[#667085] shadow-[0_10px_30px_rgba(16,24,40,0.04)] space-y-1">
          <p>• Estimates are based on average costs and may vary significantly.</p>
          <p>• Housing costs depend on location within the city and accommodation type.</p>
          <p>• Personal spending habits greatly affect actual costs.</p>
          <p>• Consider additional costs like savings, insurance, and emergency funds.</p>
        </div>
      </div>

      {/* Right – Summary totals */}
      <Card className="rounded-[20px] border-[#CFEBDD] bg-[radial-gradient(circle_at_50%_18%,rgba(11,90,42,0.06),transparent_42%),#F7FAF8] shadow-[0_14px_36px_rgba(11,90,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">{selectedCity}</CardTitle>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]">
            <BarChart3 className="h-5 w-5" />
          </span>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <p className="text-xs font-semibold text-[#667085]">Monthly Total</p>
                <p className="mt-1 font-poppins text-xl font-bold text-[#0B5A2A]">
                  KSH {totalMonthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <p className="text-xs font-semibold text-[#667085]">Annual Total</p>
                <p className="mt-1 font-poppins text-xl font-bold text-[#0B5A2A]">
                  KSH {annualCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {costItems.filter((item) => (costs as Record<string, number>)[item.key] > 0).map((item, idx, arr) => (
                <div key={item.key} className={`flex justify-between text-sm ${idx < arr.length - 1 ? "border-b border-[#E4E7EC] pb-2" : "pt-1 text-base font-bold"}`}>
                  <span className={idx < arr.length - 1 ? "text-[#667085]" : "text-[#0B1020]"}>{item.label}</span>
                  <span className={idx < arr.length - 1 ? "font-semibold text-[#0B1020]" : "text-[#0B5A2A]"}>
                    KSH {(costs as Record<string, number>)[item.key].toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              ))}
              <div className="flex justify-between border-t border-[#E4E7EC] pt-3 text-base font-bold">
                <span>Monthly Total</span>
                <span className="text-[#0B5A2A]">KSH {totalMonthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Actual costs vary based on lifestyle and location within the city.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
