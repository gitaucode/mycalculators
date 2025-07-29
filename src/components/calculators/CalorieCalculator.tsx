"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Apple, Activity, Target, TrendingUp } from "lucide-react"

export function CalorieCalculator() {
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [goal, setGoal] = useState("")
  const [unit, setUnit] = useState("metric")
  const [results, setResults] = useState<{
    bmr: number
    tdee: number
    goalCalories: number
    macros: {
      protein: number
      carbs: number
      fat: number
    }
  } | null>(null)

  const activityLevels = {
    sedentary: { label: "Sedentary (little/no exercise)", multiplier: 1.2 },
    light: { label: "Light activity (light exercise 1-3 days/week)", multiplier: 1.375 },
    moderate: { label: "Moderate activity (moderate exercise 3-5 days/week)", multiplier: 1.55 },
    active: { label: "Very active (hard exercise 6-7 days/week)", multiplier: 1.725 },
    extra: { label: "Extra active (very hard exercise, physical job)", multiplier: 1.9 },
  }

  const goals = {
    maintain: { label: "Maintain weight", adjustment: 0 },
    lose: { label: "Lose weight (0.5 kg/week)", adjustment: -500 },
    gain: { label: "Gain weight (0.5 kg/week)", adjustment: 500 },
  }

  const calculateCalories = () => {
    if (!age || !gender || !height || !weight || !activityLevel || !goal) return

    let heightInCm = Number.parseFloat(height)
    let weightInKg = Number.parseFloat(weight)

    // Convert to metric if needed
    if (unit === "imperial") {
      heightInCm = Number.parseFloat(height) * 2.54 // inches to cm
      weightInKg = Number.parseFloat(weight) * 0.453592 // pounds to kg
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0
    if (gender === "male") {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * Number.parseInt(age) + 5
    } else {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * Number.parseInt(age) - 161
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const multiplier = activityLevels[activityLevel as keyof typeof activityLevels].multiplier
    const tdee = bmr * multiplier

    // Calculate goal calories
    const adjustment = goals[goal as keyof typeof goals].adjustment
    const goalCalories = tdee + adjustment

    // Calculate macros (example ratios: 30% protein, 40% carbs, 30% fat)
    const macros = {
      protein: Math.round((goalCalories * 0.3) / 4), // 4 calories per gram
      carbs: Math.round((goalCalories * 0.4) / 4), // 4 calories per gram
      fat: Math.round((goalCalories * 0.3) / 9), // 9 calories per gram
    }

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      macros,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Apple className="h-5 w-5" />
            <span>Calorie Calculator</span>
          </CardTitle>
          <CardDescription>
            Calculate your daily calorie needs based on your Basal Metabolic Rate (BMR) and activity level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={unit} onValueChange={setUnit}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="metric">Metric (cm/kg)</TabsTrigger>
              <TabsTrigger value="imperial">Imperial (in/lbs)</TabsTrigger>
            </TabsList>

            <TabsContent value="metric" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="30"
                    min="15"
                    max="100"
                  />
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
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="170"
                    min="100"
                    max="250"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight-metric">Weight (kg)</Label>
                  <Input
                    id="weight-metric"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    min="30"
                    max="300"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="imperial" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="30"
                    min="15"
                    max="100"
                  />
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
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="67"
                    min="36"
                    max="96"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight-imperial">Weight (lbs)</Label>
                  <Input
                    id="weight-imperial"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="154"
                    min="66"
                    max="660"
                  />
                </div>
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
              <Label htmlFor="goal">Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(goals).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={calculateCalories}
            className="w-full"
            disabled={!age || !gender || !height || !weight || !activityLevel || !goal}
          >
            Calculate Daily Calories
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <span>BMR</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-2">{results.bmr}</div>
              <p className="text-sm text-muted-foreground">Calories at rest</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>TDEE</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-2">{results.tdee}</div>
              <p className="text-sm text-muted-foreground">Total daily expenditure</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-600" />
                <span>Goal Calories</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 mb-2">{results.goalCalories}</div>
              <p className="text-sm text-muted-foreground">Daily target intake</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Apple className="h-5 w-5 text-orange-600" />
                <span>Macros</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Protein:</span>
                <span className="font-semibold">{results.macros.protein}g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Carbs:</span>
                <span className="font-semibold">{results.macros.carbs}g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fat:</span>
                <span className="font-semibold">{results.macros.fat}g</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Understanding Your Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2">BMR (Basal Metabolic Rate)</h4>
                <p className="text-muted-foreground">
                  The number of calories your body needs to maintain basic physiological functions at rest.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">TDEE (Total Daily Energy Expenditure)</h4>
                <p className="text-muted-foreground">
                  Your BMR multiplied by your activity level - the total calories you burn in a day.
                </p>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Macro Distribution (30/40/30)</h4>
              <p className="text-sm text-muted-foreground">
                This is a balanced approach. Adjust based on your specific needs, training goals, or dietary
                preferences. Consider consulting a nutritionist for personalized recommendations.
              </p>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>
                <strong>Note:</strong> These calculations are estimates based on established formulas. Individual
                metabolic rates can vary. Monitor your progress and adjust as needed. Consult healthcare professionals
                for personalized nutrition advice.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
