"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplets, Activity, Thermometer, AlertTriangle } from "lucide-react"

interface WaterResult {
  baseIntake: number
  adjustedIntake: number
  glassesPerDay: number
  hourlyIntake: number
  recommendations: string[]
  factors: {
    activity: number
    climate: number
    health: number
  }
}

export function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [climate, setClimate] = useState("")
  const [healthConditions, setHealthConditions] = useState("")
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [result, setResult] = useState<WaterResult | null>(null)

  const activityLevels = {
    sedentary: { label: "Sedentary (little/no exercise)", multiplier: 1.0 },
    light: { label: "Light activity (1-3 days/week)", multiplier: 1.1 },
    moderate: { label: "Moderate activity (3-5 days/week)", multiplier: 1.2 },
    active: { label: "Very active (6-7 days/week)", multiplier: 1.3 },
    intense: { label: "Intense activity (2x/day, intense workouts)", multiplier: 1.5 },
  }

  const climateFactors = {
    temperate: { label: "Temperate (15-25°C / 59-77°F)", multiplier: 1.0 },
    warm: { label: "Warm (25-30°C / 77-86°F)", multiplier: 1.1 },
    hot: { label: "Hot (30°C+ / 86°F+)", multiplier: 1.2 },
    humid: { label: "Hot & Humid", multiplier: 1.3 },
    cold: { label: "Cold (below 15°C / 59°F)", multiplier: 0.95 },
  }

  const healthFactors = {
    normal: { label: "No specific conditions", multiplier: 1.0 },
    fever: { label: "Fever/illness", multiplier: 1.3 },
    pregnancy: { label: "Pregnancy", multiplier: 1.2 },
    breastfeeding: { label: "Breastfeeding", multiplier: 1.4 },
    kidney: { label: "Kidney stones history", multiplier: 1.2 },
    diabetes: { label: "Diabetes", multiplier: 1.1 },
  }

  const calculateWaterIntake = () => {
    if (!weight || !activityLevel || !climate || !healthConditions) return

    let weightInKg: number
    if (unit === "metric") {
      weightInKg = Number.parseFloat(weight)
    } else {
      weightInKg = Number.parseFloat(weight) * 0.453592 // pounds to kg
    }

    // Base calculation: 35ml per kg of body weight
    const baseIntake = weightInKg * 35 // ml per day

    // Apply multipliers
    const activityMultiplier = activityLevels[activityLevel as keyof typeof activityLevels].multiplier
    const climateMultiplier = climateFactors[climate as keyof typeof climateFactors].multiplier
    const healthMultiplier = healthFactors[healthConditions as keyof typeof healthFactors].multiplier

    const adjustedIntake = baseIntake * activityMultiplier * climateMultiplier * healthMultiplier

    // Convert to liters and calculate glasses (250ml per glass)
    const intakeInLiters = adjustedIntake / 1000
    const glassesPerDay = Math.round(adjustedIntake / 250)
    const hourlyIntake = Math.round(adjustedIntake / 16) // Assuming 16 waking hours

    // Generate recommendations
    const recommendations = generateRecommendations(activityLevel, climate, healthConditions)

    setResult({
      baseIntake: Math.round(baseIntake),
      adjustedIntake: Math.round(adjustedIntake),
      glassesPerDay,
      hourlyIntake,
      recommendations,
      factors: {
        activity: activityMultiplier,
        climate: climateMultiplier,
        health: healthMultiplier,
      },
    })
  }

  const generateRecommendations = (activity: string, climate: string, health: string): string[] => {
    const recommendations = [
      "Start your day with a glass of water",
      "Drink water before, during, and after exercise",
      "Keep a water bottle with you throughout the day",
    ]

    if (activity === "active" || activity === "intense") {
      recommendations.push("Increase intake during and after intense workouts")
      recommendations.push("Consider electrolyte replacement for long sessions")
    }

    if (climate === "hot" || climate === "humid") {
      recommendations.push("Drink extra water in hot weather")
      recommendations.push("Monitor urine color as a hydration indicator")
    }

    if (health === "fever") {
      recommendations.push("Increase intake when sick or feverish")
    }

    if (health === "pregnancy" || health === "breastfeeding") {
      recommendations.push("Consult healthcare provider for specific needs")
    }

    return recommendations.slice(0, 5) // Return top 5 recommendations
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
            Calculate your daily water needs based on weight, activity, and environmental factors
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="climate">Climate/Temperature</Label>
              <Select value={climate} onValueChange={setClimate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select climate" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(climateFactors).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="health">Health Conditions</Label>
            <Select value={healthConditions} onValueChange={setHealthConditions}>
              <SelectTrigger>
                <SelectValue placeholder="Select health condition" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(healthFactors).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={calculateWaterIntake}
            className="w-full"
            disabled={!weight || !activityLevel || !climate || !healthConditions}
          >
            <Activity className="mr-2 h-4 w-4" />
            Calculate Water Intake
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Main Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Water Intake</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-3xl font-bold text-blue-800 mb-1">
                    {(result.adjustedIntake / 1000).toFixed(1)}L
                  </div>
                  <div className="text-sm text-blue-600">{result.adjustedIntake}ml per day</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Glasses Per Day</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-800 mb-1">{result.glassesPerDay}</div>
                  <div className="text-sm text-green-600">250ml glasses</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hourly Intake</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-3xl font-bold text-purple-800 mb-1">{result.hourlyIntake}ml</div>
                  <div className="text-sm text-purple-600">per waking hour</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Adjustment Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Adjustment Factors Applied</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Activity className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="font-semibold text-orange-800">Activity</span>
                  </div>
                  <Badge variant="outline" className="text-orange-700 border-orange-300">
                    {result.factors.activity}x
                  </Badge>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Thermometer className="h-5 w-5 text-red-600 mr-2" />
                    <span className="font-semibold text-red-800">Climate</span>
                  </div>
                  <Badge variant="outline" className="text-red-700 border-red-300">
                    {result.factors.climate}x
                  </Badge>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <span className="font-semibold text-blue-800">Health</span>
                  </div>
                  <Badge variant="outline" className="text-blue-700 border-blue-300">
                    {result.factors.health}x
                  </Badge>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border text-center">
                <span className="text-sm text-gray-600">
                  Base intake: {(result.baseIntake / 1000).toFixed(1)}L → Adjusted:{" "}
                  {(result.adjustedIntake / 1000).toFixed(1)}L
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hydration Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.recommendations.map((tip, index) => (
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

          {/* Hydration Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Daily Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
                  <div className="font-semibold text-yellow-800">Morning</div>
                  <div className="text-sm text-yellow-600">2-3 glasses</div>
                  <div className="text-xs text-yellow-500 mt-1">Upon waking</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center">
                  <div className="font-semibold text-green-800">Afternoon</div>
                  <div className="text-sm text-green-600">{Math.ceil(result.glassesPerDay * 0.4)} glasses</div>
                  <div className="text-xs text-green-500 mt-1">With meals</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                  <div className="font-semibold text-blue-800">Evening</div>
                  <div className="text-sm text-blue-600">{Math.ceil(result.glassesPerDay * 0.3)} glasses</div>
                  <div className="text-xs text-blue-500 mt-1">Before dinner</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-center">
                  <div className="font-semibold text-purple-800">Exercise</div>
                  <div className="text-sm text-purple-600">Extra 1-2 glasses</div>
                  <div className="text-xs text-purple-500 mt-1">During activity</div>
                </div>
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
          <p>• These calculations are general guidelines based on standard recommendations</p>
          <p>• Individual needs may vary based on metabolism, medications, and health conditions</p>
          <p>• Monitor urine color: pale yellow indicates good hydration</p>
          <p>• Consult healthcare providers if you have kidney, heart, or other medical conditions</p>
          <p>• Include water from food sources (fruits, vegetables, soups) in your total intake</p>
        </CardContent>
      </Card>
    </div>
  )
}
