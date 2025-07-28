"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

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
    baseCost: number
    extrasCost: number
    professionalFees: number
    totalCost: number
    costPerSqm: number
    selectedExtrasDetails: Array<{ name: string; cost: number }>
  } | null>(null)

  const handleExtraChange = (extraId: string, checked: boolean) => {
    if (checked) {
      setSelectedExtras([...selectedExtras, extraId])
    } else {
      setSelectedExtras(selectedExtras.filter((id) => id !== extraId))
    }
  }

  const calculate = () => {
    const areaNum = Number.parseFloat(area)
    if (!areaNum || areaNum <= 0 || !finishType || !location) return

    // Get cost per square meter
    const costRate = costPerSqm[finishType as keyof typeof costPerSqm][location as keyof typeof costPerSqm.basic]

    // Calculate base cost
    const baseCost = areaNum * costRate

    // Calculate extras cost
    const selectedExtrasDetails = extras.filter((extra) => selectedExtras.includes(extra.id))
    const extrasCost = selectedExtrasDetails.reduce((sum, extra) => sum + extra.cost, 0)

    // Calculate professional & statutory fees (10% of base cost)
    const professionalFees = baseCost * 0.1

    // Calculate total cost
    const totalCost = baseCost + extrasCost + professionalFees

    setResult({
      baseCost,
      extrasCost,
      professionalFees,
      totalCost,
      costPerSqm: costRate,
      selectedExtrasDetails,
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Construction Cost Calculator</CardTitle>
          <CardDescription>
            Calculate construction costs based on area, finish type, location, and optional extras
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="area">Built-up Area (Square Meters)</Label>
            <Input
              id="area"
              type="number"
              placeholder="e.g., 120"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="finish-type">Finish Type</Label>
            <Select value={finishType} onValueChange={setFinishType}>
              <SelectTrigger>
                <SelectValue placeholder="Select finish type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="high-end">High-End</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urban">Urban</SelectItem>
                <SelectItem value="rural">Rural</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Optional Extras</Label>
            <div className="space-y-3">
              {extras.map((extra) => (
                <div key={extra.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={extra.id}
                    checked={selectedExtras.includes(extra.id)}
                    onCheckedChange={(checked) => handleExtraChange(extra.id, checked as boolean)}
                  />
                  <Label htmlFor={extra.id} className="flex-1 cursor-pointer">
                    {extra.name}
                  </Label>
                  <span className="text-sm text-muted-foreground">KSH {extra.cost.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Construction Cost
          </Button>
        </CardContent>
      </Card>

      {result && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Construction Cost</p>
                  <p className="text-3xl font-bold text-primary">KSH {result.totalCost.toLocaleString()}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                    <div>
                      <p className="font-medium">Base Construction Cost</p>
                      <p className="text-sm text-muted-foreground">
                        {area} sqm × KSH {result.costPerSqm.toLocaleString()}/sqm
                      </p>
                    </div>
                    <p className="font-bold">KSH {result.baseCost.toLocaleString()}</p>
                  </div>

                  {result.selectedExtrasDetails.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-medium">Selected Extras:</p>
                      {result.selectedExtrasDetails.map((extra, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-muted/20 rounded text-sm">
                          <span>{extra.name}</span>
                          <span>KSH {extra.cost.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                        <p className="font-medium">Total Extras</p>
                        <p className="font-bold">KSH {result.extrasCost.toLocaleString()}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                    <div>
                      <p className="font-medium">Professional & Statutory Fees</p>
                      <p className="text-sm text-muted-foreground">10% of base construction cost</p>
                    </div>
                    <p className="font-bold">KSH {result.professionalFees.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📋 Cost Per Square Meter Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">Urban Rates:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>Basic: KSH 28,000/sqm</li>
                    <li>Standard: KSH 40,000/sqm</li>
                    <li>High-End: KSH 60,000/sqm</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Rural Rates:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>Basic: KSH 24,000/sqm</li>
                    <li>Standard: KSH 34,000/sqm</li>
                    <li>High-End: KSH 51,000/sqm</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
