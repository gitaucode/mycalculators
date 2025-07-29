"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplets, Activity, AlertTriangle, Thermometer } from "lucide-react"

interface WaterIntakeResult {
  baseIntake: number
  activityAdjustment: number
  climateAdjustment: number
  totalIntake: number
  glassesPerDay: number
  bottlesPerDay: number
  tips: string[]
}

export function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [climate, setClimate] = useState("")
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [result, setResult] = useState<WaterIntakeResult | null>(null)

  const activityLevels = {
    sedentary: { label: "Sedentary (little/no exercise)", multiplier: 0 },
    light: { label: "Light activity (1-3 days/week)", multiplier: 350 },
    moderate: { label: "Moderate activity (3-5 days/week)", multiplier: 500 },
    active: { label: "Very active (6-7 days/week)", multiplier: 750 },
    intense: { label: "Intense activity (2x/day, training)", multiplier: 1000 },
  }

  const climateTypes = {
    temperate: { label: "Temperate (normal conditions)", adjustment: 0 },
    hot: { label: "Hot/Humid climate", adjustment: 500 },
    cold: { label: "Cold climate", adjustment: -200 },
    dry: { label: "Dry/Arid climate", adjustment: 300 },
  }

  const calculateWaterIntake = () => {
    if (!weight || !activityLevel || !climate) return

    let weightInKg = Number.parseFloat(weight)
    if (unit === "imperial") {
      weightInKg = weightInKg * 0.453592 // pounds to kg
    }

    // Base water intake: 35ml per kg of body weight
    const baseIntake = weightInKg * 35

    // Activity adjustment
    const activityAdjustment = activityLevels[activityLevel as keyof typeof activityLevels].multiplier

    // Climate adjustment
    const climateAdjustment = climateTypes[climate as keyof typeof climateTypes].adjustment

    // Total daily intake in ml
    const totalIntake = baseIntake + activityAdjustment + climateAdjustment

    // Convert to glasses (250ml) and bottles (500ml)
    const glassesPerDay = Math.round(totalIntake / 250)
    const bottlesPerDay = Math.round(totalIntake / 500)

    // Generate personalized tips
    const tips = generateTips(activityLevel, climate, totalIntake)

    setResult({
      baseIntake: Math.round(baseIntake),
      activityAdjustment,
      climateAdjustment,
      totalIntake: Math.round(totalIntake),
      glassesPerDay,
      bottlesPerDay,
      tips,
    })
  }

  const generateTips = (activity: string, climateType: string, intake: number): string[] => {
    const tips = []

    // Base tips
    tips.push("Drink water consistently throughout the day, not all at once")
    tips.push("Start your day with a glass of water to kickstart hydration")

    // Activity-based tips
    if (activity === "active" || activity === "intense") {
      tips.push("Drink 150-250ml of water 15-20 minutes before exercise")
      tips.push("During exercise, drink 200-300ml every 15-20 minutes")
      tips.push("Rehydrate after exercise with 150% of fluid lost through sweat")
    }

    // Climate-based tips
    if (climateType === "hot") {
      tips.push("Increase intake during hot weather to replace sweat losses")
      tips.push("Choose cool water over room temperature in hot climates")
    } else if (climateType === "cold") {
      tips.push("Don't forget to hydrate in cold weather - you still lose fluids")
    } else if (climateType === "dry") {
      tips.push("Dry climates increase water loss through breathing and skin")
    }

    // Intake-based tips
    if (intake > 3000) {
      tips.push("With high water needs, consider electrolyte replacement")
      tips.push("Spread intake evenly to avoid overwhelming your kidneys")
    }

    return tips.slice(0, 5) // Return top 5 tips
  }

  const getIntakeColor = (intake: number) => {
    if (intake < 2000) return "text-red-600"
    if (intake < 2500) return "text-yellow-600"
    if (intake < 3500) return "text-green-600"
    return "text-blue-600"
  }

  const getIntakeStatus = (intake: number) => {
    if (intake < 2000) return { status: "Low", color: "bg-red-100 text-red-800 border-red-200" }
    if (intake < 2500) return { status: "Moderate", color: "bg-yellow-100 text-yellow-800 border-yellow-200" }
    if (intake < 3500) return { status: "Good", color: "bg-green-100 text-green-800 border-green-200" }
    return { status: "High", color: "bg-blue-100 text-blue-800 border-blue-200" }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-blue-600" />
            <span>Water Intake Calculator</span>
          </CardTitle>
          <CardDescription>
            Calculate your daily water needs based on weight, activity level, and climate conditions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={unit} onValueChange={(value) => setUnit(value as "metric" | "imperial")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="metric">Metric (kg)</TabsTrigger>
              <TabsTrigger value="imperial">Imperial (lbs)</TabsTrigger>
            </TabsList>

            <TabsContent value="metric" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weight-metric">Body Weight (kg)</Label>
                <Input
                  id="weight-metric"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="imperial" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weight-imperial">Body Weight (lbs)</Label>
                <Input
                  id="weight-imperial"
                  type="number"
                  placeholder="154"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="activity">Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(activityLevels).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="climate">Climate Conditions</Label>
              <Select value={climate} onValueChange={setClimate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select climate" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(climateTypes).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateWaterIntake} className="w-full" disabled={!weight || !activityLevel || !climate}>
            <Droplets className="mr-2 h-4 w-4" />
            Calculate Water Intake
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Main Result */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Daily Water Intake</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className={`text-4xl font-bold mb-2 ${getIntakeColor(result.totalIntake)}`}>
                  {result.totalIntake.toLocaleString()} ml
                </div>
                <Badge className={`${getIntakeStatus(result.totalIntake).color} px-3 py-1`}>
                  {getIntakeStatus(result.totalIntake).status} Intake Level
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200 text-center">
                  <div className="text-2xl font-bold text-cyan-800 mb-1">{result.glassesPerDay}</div>
                  <div className="text-sm text-cyan-600">Glasses per day (250ml each)</div>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200 text-center">
                  <div className="text-2xl font-bold text-teal-800 mb-1">{result.bottlesPerDay}</div>
                  <div className="text-sm text-teal-600">Bottles per day (500ml each)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Calculation Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="font-medium">Base intake (35ml/kg body weight)</span>
                  <span className="font-bold text-blue-800">{result.baseIntake} ml</span>
                </div>

                {result.activityAdjustment > 0 && (
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="font-medium flex items-center">
                      <Activity className="h-4 w-4 mr-2" />
                      Activity adjustment
                    </span>
                    <span className="font-bold text-green-800">+{result.activityAdjustment} ml</span>
                  </div>
                )}

                {result.climateAdjustment !== 0 && (
                  <div
                    className={`flex justify-between items-center p-3 rounded-lg border ${
                      result.climateAdjustment > 0 ? "bg-orange-50 border-orange-200" : "bg-purple-50 border-purple-200"
                    }`}
                  >
                    <span className="font-medium flex items-center">
                      <Thermometer className="h-4 w-4 mr-2" />
                      Climate adjustment
                    </span>
                    <span
                      className={`font-bold ${result.climateAdjustment > 0 ? "text-orange-800" : "text-purple-800"}`}
                    >
                      {result.climateAdjustment > 0 ? "+" : ""}
                      {result.climateAdjustment} ml
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hydration Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.tips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-blue-800">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Important Information */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-amber-800">
            <AlertTriangle className="h-5 w-5" />
            <span>Important Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-amber-700 space-y-2">
          <p>• These are general recommendations - individual needs may vary</p>
          <p>• Increase intake during illness, fever, or when consuming caffeine/alcohol</p>
          <p>• Monitor urine color: pale yellow indicates good hydration</p>
          <p>• Consult healthcare providers for specific medical conditions</p>
          <p>• Listen to your body - thirst is an early indicator of dehydration</p>
        </CardContent>
      </Card>
    </div>
  )
}
