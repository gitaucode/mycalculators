"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Apple, Activity, Target, AlertTriangle } from "lucide-react"

interface CalorieResult {
  bmr: number
  tdee: number
  weightLoss: {
    mild: number
    moderate: number
    aggressive: number
  }
  weightGain: {
    mild: number
    moderate: number
  }
  macros: {
    protein: { grams: number; calories: number }
    carbs: { grams: number; calories: number }
    fats: { grams: number; calories: number }
  }
}

export function CalorieCalculator() {
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [result, setResult] = useState<CalorieResult | null>(null)

  const activityLevels = {
    sedentary: { label: "Sedentary (little/no exercise)", multiplier: 1.2 },
    light: { label: "Light activity (light exercise 1-3 days/week)", multiplier: 1.375 },
    moderate: { label: "Moderate activity (moderate exercise 3-5 days/week)", multiplier: 1.55 },
    active: { label: "Very active (hard exercise 6-7 days/week)", multiplier: 1.725 },
    extra: { label: "Extra active (very hard exercise, physical job)", multiplier: 1.9 },
  }

  const calculateCalories = () => {
    if (!age || !gender || !height || !weight || !activityLevel) return

    let heightInCm: number
    let weightInKg: number

    if (unit === "metric") {
      heightInCm = Number.parseFloat(height)
      weightInKg = Number.parseFloat(weight)
    } else {
      heightInCm = Number.parseFloat(height) * 2.54 // inches to cm
      weightInKg = Number.parseFloat(weight) * 0.453592 // pounds to kg
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number
    if (gender === "male") {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * Number.parseFloat(age) + 5
    } else {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * Number.parseFloat(age) - 161
    }

    // Calculate TDEE
    const multiplier = activityLevels[activityLevel as keyof typeof activityLevels].multiplier
    const tdee = bmr * multiplier

    // Calculate weight goals
    const weightLoss = {
      mild: tdee - 250, // 0.5 lbs per week
      moderate: tdee - 500, // 1 lb per week
      aggressive: tdee - 750, // 1.5 lbs per week
    }

    const weightGain = {
      mild: tdee + 250, // 0.5 lbs per week
      moderate: tdee + 500, // 1 lb per week
    }

    // Calculate macros (40% carbs, 30% protein, 30% fat)
    const macros = {
      protein: {
        calories: Math.round(tdee * 0.3),
        grams: Math.round((tdee * 0.3) / 4),
      },
      carbs: {
        calories: Math.round(tdee * 0.4),
        grams: Math.round((tdee * 0.4) / 4),
      },
      fats: {
        calories: Math.round(tdee * 0.3),
        grams: Math.round((tdee * 0.3) / 9),
      },
    }

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLoss,
      weightGain,
      macros,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Apple className="h-5 w-5 text-green-600" />
            <span>Calorie Calculator</span>
          </CardTitle>
          <CardDescription>Calculate your daily calorie needs based on BMR and activity level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={unit} onValueChange={(value) => setUnit(value as "metric" | "imperial")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="metric">Metric (cm/kg)</TabsTrigger>
              <TabsTrigger value="imperial">Imperial (in/lbs)</TabsTrigger>
            </TabsList>

            <TabsContent value="metric" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input id="age" type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height-metric">Height (cm)</Label>
                  <Input
                    id="height-metric"
                    type="number"
                    placeholder="170"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight-metric">Weight (kg)</Label>
                  <Input
                    id="weight-metric"
                    type="number"
                    placeholder="70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="imperial" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input id="age" type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height-imperial">Height (inches)</Label>
                  <Input
                    id="height-imperial"
                    type="number"
                    placeholder="67"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight-imperial">Weight (lbs)</Label>
                  <Input
                    id="weight-imperial"
                    type="number"
                    placeholder="154"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

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

          <Button
            onClick={calculateCalories}
            className="w-full"
            disabled={!age || !gender || !height || !weight || !activityLevel}
          >
            <Activity className="mr-2 h-4 w-4" />
            Calculate Calories
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* BMR and TDEE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basal Metabolic Rate (BMR)</CardTitle>
                <CardDescription>Calories burned at rest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-3xl font-bold text-blue-800 mb-1">{result.bmr.toLocaleString()}</div>
                  <div className="text-sm text-blue-600">calories/day</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Daily Energy Expenditure</CardTitle>
                <CardDescription>Calories needed to maintain weight</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-800 mb-1">{result.tdee.toLocaleString()}</div>
                  <div className="text-sm text-green-600">calories/day</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weight Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Calorie Goals by Objective</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weight Loss */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-700">Weight Loss</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <span className="text-sm font-medium">Mild (0.5 lbs/week)</span>
                      <Badge variant="outline" className="text-red-700 border-red-300">
                        {Math.round(result.weightLoss.mild)} cal
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <span className="text-sm font-medium">Moderate (1 lb/week)</span>
                      <Badge variant="outline" className="text-red-700 border-red-300">
                        {Math.round(result.weightLoss.moderate)} cal
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <span className="text-sm font-medium">Aggressive (1.5 lbs/week)</span>
                      <Badge variant="outline" className="text-red-700 border-red-300">
                        {Math.round(result.weightLoss.aggressive)} cal
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Weight Gain */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-700">Weight Gain</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-sm font-medium">Mild (0.5 lbs/week)</span>
                      <Badge variant="outline" className="text-blue-700 border-blue-300">
                        {Math.round(result.weightGain.mild)} cal
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-sm font-medium">Moderate (1 lb/week)</span>
                      <Badge variant="outline" className="text-blue-700 border-blue-300">
                        {Math.round(result.weightGain.moderate)} cal
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Macronutrient Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Macronutrient Breakdown</CardTitle>
              <CardDescription>Based on maintenance calories ({result.tdee} cal/day)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 text-center">
                  <div className="text-2xl font-bold text-orange-800 mb-1">{result.macros.protein.grams}g</div>
                  <div className="text-sm text-orange-600 mb-2">Protein (30%)</div>
                  <div className="text-xs text-orange-500">{result.macros.protein.calories} calories</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                  <div className="text-2xl font-bold text-green-800 mb-1">{result.macros.carbs.grams}g</div>
                  <div className="text-sm text-green-600 mb-2">Carbs (40%)</div>
                  <div className="text-xs text-green-500">{result.macros.carbs.calories} calories</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
                  <div className="text-2xl font-bold text-purple-800 mb-1">{result.macros.fats.grams}g</div>
                  <div className="text-sm text-purple-600 mb-2">Fats (30%)</div>
                  <div className="text-xs text-purple-500">{result.macros.fats.calories} calories</div>
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
          <p>• These calculations are estimates based on the Mifflin-St Jeor equation</p>
          <p>• Individual metabolic rates can vary by ±10-15%</p>
          <p>• Consult a healthcare provider or registered dietitian for personalized advice</p>
          <p>• Extreme calorie restriction (below 1200 cal/day) should be medically supervised</p>
          <p>• Focus on nutrient-dense foods and regular physical activity</p>
        </CardContent>
      </Card>
    </div>
  )
}
