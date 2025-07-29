"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scale, TrendingUp, AlertCircle } from "lucide-react"

export function BmiCalculator() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [unit, setUnit] = useState("metric")
  const [results, setResults] = useState<{
    bmi: number
    category: string
    healthyWeightRange: string
    weightToLose: number
    weightToGain: number
  } | null>(null)

  const calculateBMI = () => {
    if (!height || !weight) return

    let heightInM = Number.parseFloat(height)
    let weightInKg = Number.parseFloat(weight)

    // Convert to metric if needed
    if (unit === "imperial") {
      heightInM = heightInM * 0.0254 // inches to meters
      weightInKg = weightInKg * 0.453592 // pounds to kg
    } else {
      heightInM = heightInM / 100 // cm to meters
    }

    const bmi = weightInKg / (heightInM * heightInM)

    let category = ""
    let categoryColor = ""

    if (bmi < 18.5) {
      category = "Underweight"
      categoryColor = "bg-blue-100 text-blue-800"
    } else if (bmi < 25) {
      category = "Normal weight"
      categoryColor = "bg-green-100 text-green-800"
    } else if (bmi < 30) {
      category = "Overweight"
      categoryColor = "bg-yellow-100 text-yellow-800"
    } else {
      category = "Obese"
      categoryColor = "bg-red-100 text-red-800"
    }

    // Calculate healthy weight range (BMI 18.5-24.9)
    const minHealthyWeight = 18.5 * (heightInM * heightInM)
    const maxHealthyWeight = 24.9 * (heightInM * heightInM)

    let healthyWeightRange = ""
    if (unit === "imperial") {
      healthyWeightRange = `${Math.round(minHealthyWeight * 2.20462)} - ${Math.round(maxHealthyWeight * 2.20462)} lbs`
    } else {
      healthyWeightRange = `${Math.round(minHealthyWeight)} - ${Math.round(maxHealthyWeight)} kg`
    }

    // Calculate weight to lose/gain to reach healthy range
    const weightToLose = Math.max(0, weightInKg - maxHealthyWeight)
    const weightToGain = Math.max(0, minHealthyWeight - weightInKg)

    setResults({
      bmi: Math.round(bmi * 10) / 10,
      category: `${category}|${categoryColor}`,
      healthyWeightRange,
      weightToLose: unit === "imperial" ? Math.round(weightToLose * 2.20462) : Math.round(weightToLose),
      weightToGain: unit === "imperial" ? Math.round(weightToGain * 2.20462) : Math.round(weightToGain),
    })
  }

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return "text-blue-600"
    if (bmi < 25) return "text-green-600"
    if (bmi < 30) return "text-yellow-600"
    return "text-red-600"
  }

  const getBMIAdvice = (bmi: number) => {
    if (bmi < 18.5) {
      return "Consider consulting a healthcare provider about healthy weight gain strategies."
    } else if (bmi < 25) {
      return "Great! You're in the healthy weight range. Maintain your current lifestyle."
    } else if (bmi < 30) {
      return "Consider adopting healthier eating habits and increasing physical activity."
    } else {
      return "Consult with a healthcare provider about a safe weight management plan."
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scale className="h-5 w-5" />
            <span>BMI Calculator</span>
          </CardTitle>
          <CardDescription>
            Calculate your Body Mass Index (BMI) to assess if you're in a healthy weight range
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={unit} onValueChange={setUnit}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="metric">Metric (cm/kg)</TabsTrigger>
              <TabsTrigger value="imperial">Imperial (in/lbs)</TabsTrigger>
            </TabsList>

            <TabsContent value="metric" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <Button onClick={calculateBMI} className="w-full" disabled={!height || !weight}>
            Calculate BMI
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Scale className="h-5 w-5 text-blue-600" />
                <span>Your BMI</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold mb-2 ${getBMIColor(results.bmi)}`}>{results.bmi}</div>
              <Badge className={results.category.split("|")[1]}>{results.category.split("|")[0]}</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Healthy Range</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold mb-2">{results.healthyWeightRange}</div>
              <p className="text-sm text-muted-foreground">BMI 18.5 - 24.9</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <span>To Healthy Range</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.weightToLose > 0 && (
                <div>
                  <div className="text-lg font-semibold text-red-600 mb-1">
                    -{results.weightToLose} {unit === "imperial" ? "lbs" : "kg"}
                  </div>
                  <p className="text-sm text-muted-foreground">to reach healthy range</p>
                </div>
              )}
              {results.weightToGain > 0 && (
                <div>
                  <div className="text-lg font-semibold text-blue-600 mb-1">
                    +{results.weightToGain} {unit === "imperial" ? "lbs" : "kg"}
                  </div>
                  <p className="text-sm text-muted-foreground">to reach healthy range</p>
                </div>
              )}
              {results.weightToLose === 0 && results.weightToGain === 0 && (
                <div>
                  <div className="text-lg font-semibold text-green-600 mb-1">✓ Healthy</div>
                  <p className="text-sm text-muted-foreground">You're in the healthy range</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>BMI Categories & Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Your Recommendation:</h4>
              <p className="text-sm">{getBMIAdvice(results.bmi)}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Underweight:</span>
                  <span className="text-blue-600">Below 18.5</span>
                </div>
                <div className="flex justify-between">
                  <span>Normal weight:</span>
                  <span className="text-green-600">18.5 - 24.9</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Overweight:</span>
                  <span className="text-yellow-600">25.0 - 29.9</span>
                </div>
                <div className="flex justify-between">
                  <span>Obese:</span>
                  <span className="text-red-600">30.0 and above</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground mt-4">
              <p>
                <strong>Note:</strong> BMI is a screening tool and doesn't directly measure body fat or health. It may
                not be accurate for athletes, pregnant women, or elderly individuals. Always consult healthcare
                professionals for personalized advice.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
