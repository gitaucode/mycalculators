"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scale, TrendingUp, AlertTriangle } from "lucide-react"

interface BMIResult {
  bmi: number
  category: string
  healthyRange: string
  recommendation: string
  color: string
  risks: string[]
}

export function BmiCalculator() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [result, setResult] = useState<BMIResult | null>(null)

  const calculateBMI = () => {
    if (!height || !weight) return

    let heightInMeters: number
    let weightInKg: number

    if (unit === "metric") {
      heightInMeters = Number.parseFloat(height) / 100 // cm to meters
      weightInKg = Number.parseFloat(weight)
    } else {
      heightInMeters = Number.parseFloat(height) * 0.0254 // inches to meters
      weightInKg = Number.parseFloat(weight) * 0.453592 // pounds to kg
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters)
    const bmiResult = getBMICategory(bmi)

    setResult(bmiResult)
  }

  const getBMICategory = (bmi: number): BMIResult => {
    if (bmi < 18.5) {
      return {
        bmi,
        category: "Underweight",
        healthyRange: "18.5 - 24.9",
        recommendation: "Consider gaining weight through healthy diet and exercise",
        color: "text-blue-600 bg-blue-50 border-blue-200",
        risks: ["Malnutrition", "Osteoporosis", "Decreased immunity", "Fertility issues"],
      }
    } else if (bmi >= 18.5 && bmi < 25) {
      return {
        bmi,
        category: "Normal Weight",
        healthyRange: "18.5 - 24.9",
        recommendation: "Maintain your current weight through balanced diet and regular exercise",
        color: "text-green-600 bg-green-50 border-green-200",
        risks: ["Lowest health risk category", "Continue healthy lifestyle habits"],
      }
    } else if (bmi >= 25 && bmi < 30) {
      return {
        bmi,
        category: "Overweight",
        healthyRange: "18.5 - 24.9",
        recommendation: "Consider losing weight through diet and increased physical activity",
        color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        risks: ["High blood pressure", "Type 2 diabetes", "Heart disease", "Sleep apnea"],
      }
    } else {
      return {
        bmi,
        category: "Obese",
        healthyRange: "18.5 - 24.9",
        recommendation: "Consult healthcare provider for weight management plan",
        color: "text-red-600 bg-red-50 border-red-200",
        risks: ["Heart disease", "Stroke", "Type 2 diabetes", "Certain cancers", "Sleep apnea"],
      }
    }
  }

  const getHealthyWeightRange = () => {
    if (!height) return null

    let heightInMeters: number
    if (unit === "metric") {
      heightInMeters = Number.parseFloat(height) / 100
    } else {
      heightInMeters = Number.parseFloat(height) * 0.0254
    }

    const minWeight = 18.5 * (heightInMeters * heightInMeters)
    const maxWeight = 24.9 * (heightInMeters * heightInMeters)

    if (unit === "metric") {
      return `${minWeight.toFixed(1)} - ${maxWeight.toFixed(1)} kg`
    } else {
      return `${(minWeight * 2.20462).toFixed(1)} - ${(maxWeight * 2.20462).toFixed(1)} lbs`
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scale className="h-5 w-5 text-blue-600" />
            <span>BMI Calculator</span>
          </CardTitle>
          <CardDescription>Calculate your Body Mass Index and get health recommendations</CardDescription>
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

          <Button onClick={calculateBMI} className="w-full" disabled={!height || !weight}>
            <TrendingUp className="mr-2 h-4 w-4" />
            Calculate BMI
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BMI Result */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your BMI Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-4xl font-bold text-blue-800 mb-2">{result.bmi.toFixed(1)}</div>
                <Badge className={`${result.color} px-3 py-1`}>{result.category}</Badge>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <div className="text-sm font-medium text-gray-700">Healthy BMI Range</div>
                  <div className="text-lg font-semibold text-gray-900">{result.healthyRange}</div>
                </div>

                {height && (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <div className="text-sm font-medium text-gray-700">Healthy Weight Range</div>
                    <div className="text-lg font-semibold text-gray-900">{getHealthyWeightRange()}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations & Risks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Health Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Recommendation</h4>
                <p className="text-sm text-blue-700">{result.recommendation}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Associated Health Considerations</h4>
                <ul className="space-y-1">
                  {result.risks.map((risk, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* BMI Categories Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">BMI Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <div className="font-semibold text-blue-800">Underweight</div>
              <div className="text-sm text-blue-600">Below 18.5</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center">
              <div className="font-semibold text-green-800">Normal</div>
              <div className="text-sm text-green-600">18.5 - 24.9</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
              <div className="font-semibold text-yellow-800">Overweight</div>
              <div className="text-sm text-yellow-600">25.0 - 29.9</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-center">
              <div className="font-semibold text-red-800">Obese</div>
              <div className="text-sm text-red-600">30.0 and above</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-amber-800">
            <AlertTriangle className="h-5 w-5" />
            <span>Important Disclaimer</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-amber-700 space-y-2">
          <p>• BMI is a screening tool and not a diagnostic measure</p>
          <p>• It may not accurately reflect health for athletes, elderly, or pregnant women</p>
          <p>• BMI doesn't distinguish between muscle and fat mass</p>
          <p>• Consult healthcare professionals for comprehensive health assessment</p>
          <p>• Consider other factors like waist circumference and overall fitness</p>
        </CardContent>
      </Card>
    </div>
  )
}
