"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

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
  {
    name: "Nairobi",
    housing: { min: 15000, max: 80000 },
    food: 12000,
    transport: 8000,
    utilities: 6000,
    entertainment: 5000,
    healthcare: 3000,
    schooling: 25000,
  },
  {
    name: "Mombasa",
    housing: { min: 12000, max: 50000 },
    food: 10000,
    transport: 6000,
    utilities: 5500,
    entertainment: 4000,
    healthcare: 2500,
    schooling: 20000,
  },
  {
    name: "Kisumu",
    housing: { min: 8000, max: 35000 },
    food: 8000,
    transport: 4000,
    utilities: 4000,
    entertainment: 3000,
    healthcare: 2000,
    schooling: 15000,
  },
  {
    name: "Nakuru",
    housing: { min: 7000, max: 30000 },
    food: 7500,
    transport: 3500,
    utilities: 3500,
    entertainment: 2500,
    healthcare: 1800,
    schooling: 12000,
  },
  {
    name: "Eldoret",
    housing: { min: 6000, max: 25000 },
    food: 7000,
    transport: 3000,
    utilities: 3000,
    entertainment: 2000,
    healthcare: 1500,
    schooling: 10000,
  },
  {
    name: "Thika",
    housing: { min: 8000, max: 35000 },
    food: 8500,
    transport: 4500,
    utilities: 4000,
    entertainment: 3000,
    healthcare: 2000,
    schooling: 15000,
  },
]

export const CostOfLivingCalculator = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Nairobi")
  const [familySize, setFamilySize] = useState<number[]>([2])
  const [housingLevel, setHousingLevel] = useState<number[]>([50]) // Percentage between min and max
  const [lifestyleLevel, setLifestyleLevel] = useState<number[]>([50]) // Basic to premium lifestyle

  const city = cityData.find((c) => c.name === selectedCity)

  if (!city) return null

  const calculateCosts = () => {
    const familyMultiplier = familySize[0]
    const lifestyleMultiplier = lifestyleLevel[0] / 50 // 0.2 to 2.0
    const housingCost = city.housing.min + (city.housing.max - city.housing.min) * (housingLevel[0] / 100)

    return {
      housing: housingCost,
      food: city.food * familyMultiplier * lifestyleMultiplier,
      transport: city.transport * Math.max(1, familyMultiplier * 0.7) * lifestyleMultiplier,
      utilities: city.utilities * Math.max(1, familyMultiplier * 0.8),
      entertainment: city.entertainment * familyMultiplier * lifestyleMultiplier,
      healthcare: city.healthcare * familyMultiplier,
      schooling: familySize[0] > 2 ? city.schooling * (familySize[0] - 2) : 0, // Assuming 2 adults + children
    }
  }

  const costs = calculateCosts()
  const totalMonthlyCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0)
  const annualCost = totalMonthlyCost * 12

  const getLifestyleLabel = (level: number) => {
    if (level < 30) return "Basic"
    if (level < 70) return "Moderate"
    return "Premium"
  }

  const getHousingLabel = (level: number) => {
    if (level < 30) return "Budget"
    if (level < 70) return "Mid-range"
    return "Upmarket"
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cost of Living Calculator</CardTitle>
          <CardDescription>Estimate monthly living costs across different Kenyan cities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city">Select City</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cityData.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Family Size: {familySize[0]} people</Label>
              <Slider value={familySize} onValueChange={setFamilySize} max={8} min={1} step={1} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label>Housing Level: {getHousingLabel(housingLevel[0])}</Label>
              <Slider
                value={housingLevel}
                onValueChange={setHousingLevel}
                max={100}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Budget</span>
                <span>Mid-range</span>
                <span>Upmarket</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Lifestyle Level: {getLifestyleLabel(lifestyleLevel[0])}</Label>
              <Slider
                value={lifestyleLevel}
                onValueChange={setLifestyleLevel}
                max={100}
                min={20}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Basic</span>
                <span>Moderate</span>
                <span>Premium</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estimated Monthly Costs in {selectedCity}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                  <span>🏠 Housing</span>
                  <span className="font-bold">
                    KSH {costs.housing.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                  <span>🍽️ Food & Groceries</span>
                  <span className="font-bold">
                    KSH {costs.food.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                  <span>🚗 Transportation</span>
                  <span className="font-bold">
                    KSH {costs.transport.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                  <span>💡 Utilities</span>
                  <span className="font-bold">
                    KSH {costs.utilities.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                  <span>🎬 Entertainment</span>
                  <span className="font-bold">
                    KSH {costs.entertainment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                  <span>🏥 Healthcare</span>
                  <span className="font-bold">
                    KSH {costs.healthcare.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                {costs.schooling > 0 && (
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                    <span>🎓 Education</span>
                    <span className="font-bold">
                      KSH {costs.schooling.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">Monthly Total</p>
                  <p className="text-2xl font-bold text-primary">
                    KSH {totalMonthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">Annual Total</p>
                  <p className="text-2xl font-bold">
                    KSH {annualCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>💡 Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(costs).map(([category, amount]) => {
              const percentage = (amount / totalMonthlyCost) * 100
              return (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{category}</span>
                    <span>{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📋 Important Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Estimates are based on average costs and may vary significantly</li>
            <li>• Housing costs depend on location within the city and type of accommodation</li>
            <li>• Personal spending habits greatly affect actual costs</li>
            <li>• Prices may vary based on current economic conditions</li>
            <li>• Consider additional costs like savings, insurance, and emergency funds</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
