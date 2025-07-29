"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Activity, Target, AlertTriangle } from "lucide-react"

interface HeartRateZone {
  name: string
  percentage: string
  range: { min: number; max: number }
  description: string
  benefits: string[]
  color: string
  intensity: string
}

interface HeartRateResult {
  maxHeartRate: number
  restingHeartRate: number
  zones: HeartRateZone[]
  fitnessLevel: string
  recommendations: string[]
}

export function HeartRateZonesCalculator() {
  const [age, setAge] = useState("")
  const [restingHR, setRestingHR] = useState("")
  const [fitnessLevel, setFitnessLevel] = useState("")
  const [result, setResult] = useState<HeartRateResult | null>(null)

  const fitnessLevels = {
    beginner: { label: "Beginner (new to exercise)", adjustment: 0 },
    average: { label: "Average fitness", adjustment: 0 },
    good: { label: "Good fitness", adjustment: 5 },
    excellent: { label: "Excellent fitness", adjustment: 10 },
    athlete: { label: "Elite athlete", adjustment: 15 },
  }

  const calculateHeartRateZones = () => {
    if (!age || !restingHR || !fitnessLevel) return

    const ageNum = Number.parseInt(age)
    const restingHRNum = Number.parseInt(restingHR)
    const fitnessAdjustment = fitnessLevels[fitnessLevel as keyof typeof fitnessLevels].adjustment

    // Calculate maximum heart rate (220 - age + fitness adjustment)
    const maxHR = 220 - ageNum + fitnessAdjustment

    // Calculate heart rate reserve (HRR) for Karvonen method
    const hrReserve = maxHR - restingHRNum

    // Define zones using both percentage of max HR and Karvonen method
    const zones: HeartRateZone[] = [
      {
        name: "Recovery Zone",
        percentage: "50-60%",
        range: {
          min: Math.round(restingHRNum + hrReserve * 0.5),
          max: Math.round(restingHRNum + hrReserve * 0.6),
        },
        description: "Active recovery and warm-up",
        benefits: ["Promotes recovery", "Improves general health", "Burns fat efficiently", "Safe for beginners"],
        color: "bg-blue-100 border-blue-300 text-blue-800",
        intensity: "Very Light",
      },
      {
        name: "Aerobic Base Zone",
        percentage: "60-70%",
        range: {
          min: Math.round(restingHRNum + hrReserve * 0.6),
          max: Math.round(restingHRNum + hrReserve * 0.7),
        },
        description: "Build aerobic base and endurance",
        benefits: [
          "Builds aerobic capacity",
          "Improves fat burning",
          "Strengthens heart muscle",
          "Increases capillary density",
        ],
        color: "bg-green-100 border-green-300 text-green-800",
        intensity: "Light",
      },
      {
        name: "Aerobic Zone",
        percentage: "70-80%",
        range: {
          min: Math.round(restingHRNum + hrReserve * 0.7),
          max: Math.round(restingHRNum + hrReserve * 0.8),
        },
        description: "Improve cardiovascular fitness",
        benefits: [
          "Improves cardiovascular efficiency",
          "Increases stroke volume",
          "Enhances oxygen delivery",
          "Optimal for endurance training",
        ],
        color: "bg-yellow-100 border-yellow-300 text-yellow-800",
        intensity: "Moderate",
      },
      {
        name: "Lactate Threshold Zone",
        percentage: "80-90%",
        range: {
          min: Math.round(restingHRNum + hrReserve * 0.8),
          max: Math.round(restingHRNum + hrReserve * 0.9),
        },
        description: "Improve lactate threshold and speed",
        benefits: [
          "Increases lactate threshold",
          "Improves race pace",
          "Enhances buffering capacity",
          "Builds mental toughness",
        ],
        color: "bg-orange-100 border-orange-300 text-orange-800",
        intensity: "Hard",
      },
      {
        name: "Neuromuscular Power Zone",
        percentage: "90-100%",
        range: {
          min: Math.round(restingHRNum + hrReserve * 0.9),
          max: maxHR,
        },
        description: "Develop speed and power",
        benefits: [
          "Develops neuromuscular power",
          "Improves VO2 max",
          "Increases anaerobic capacity",
          "Enhances sprint speed",
        ],
        color: "bg-red-100 border-red-300 text-red-800",
        intensity: "Maximum",
      },
    ]

    const recommendations = generateRecommendations(fitnessLevel, ageNum)

    setResult({
      maxHeartRate: maxHR,
      restingHeartRate: restingHRNum,
      zones,
      fitnessLevel: fitnessLevels[fitnessLevel as keyof typeof fitnessLevels].label,
      recommendations,
    })
  }

  const generateRecommendations = (fitness: string, age: number): string[] => {
    const recommendations = [
      "Always warm up before entering higher heart rate zones",
      "Cool down gradually after intense exercise",
      "Monitor how you feel during exercise",
    ]

    if (fitness === "beginner") {
      recommendations.push("Start with Recovery and Aerobic Base zones")
      recommendations.push("Gradually increase intensity over weeks")
    } else if (fitness === "athlete") {
      recommendations.push("Use all zones strategically in training")
      recommendations.push("Focus on periodization and recovery")
    }

    if (age > 50) {
      recommendations.push("Consider medical clearance before high-intensity training")
      recommendations.push("Pay extra attention to recovery between sessions")
    }

    return recommendations
  }

  const getZoneProgress = (zone: HeartRateZone, maxHR: number) => {
    return (zone.range.max / maxHR) * 100
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-600" />
            <span>Heart Rate Zones Calculator</span>
          </CardTitle>
          <CardDescription>Calculate your training heart rate zones for optimal workout intensity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="15"
                max="80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restingHR">Resting Heart Rate (bpm)</Label>
              <Input
                id="restingHR"
                type="number"
                placeholder="60"
                value={restingHR}
                onChange={(e) => setRestingHR(e.target.value)}
                min="40"
                max="100"
              />
              <p className="text-xs text-muted-foreground">Measure first thing in the morning</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fitness">Fitness Level</Label>
              <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fitness level" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(fitnessLevels).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateHeartRateZones} className="w-full" disabled={!age || !restingHR || !fitnessLevel}>
            <Target className="mr-2 h-4 w-4" />
            Calculate Heart Rate Zones
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Maximum Heart Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-3xl font-bold text-red-800 mb-1">{result.maxHeartRate}</div>
                  <div className="text-sm text-red-600">beats per minute</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resting Heart Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-3xl font-bold text-blue-800 mb-1">{result.restingHeartRate}</div>
                  <div className="text-sm text-blue-600">beats per minute</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fitness Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-lg font-bold text-green-800 mb-1">{result.fitnessLevel}</div>
                  <div className="text-sm text-green-600">Current level</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Heart Rate Zones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Training Zones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {result.zones.map((zone, index) => (
                <div key={index} className={`p-4 rounded-lg border ${zone.color}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{zone.name}</h3>
                      <p className="text-sm opacity-80">{zone.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">
                        {zone.range.min}-{zone.range.max} bpm
                      </div>
                      <Badge variant="outline" className="mt-1">
                        {zone.percentage} Max HR
                      </Badge>
                    </div>
                  </div>

                  <Progress value={getZoneProgress(zone, result.maxHeartRate)} className="mb-3 h-2" />

                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{zone.intensity} Intensity</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {zone.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Training Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Training Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-blue-800">{recommendation}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Zone Distribution Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekly Training Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                  <div className="font-semibold text-blue-800">Recovery</div>
                  <div className="text-2xl font-bold text-blue-700">20%</div>
                  <div className="text-xs text-blue-600">Easy days</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center">
                  <div className="font-semibold text-green-800">Base</div>
                  <div className="text-2xl font-bold text-green-700">50%</div>
                  <div className="text-xs text-green-600">Foundation</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
                  <div className="font-semibold text-yellow-800">Aerobic</div>
                  <div className="text-2xl font-bold text-yellow-700">20%</div>
                  <div className="text-xs text-yellow-600">Steady state</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 text-center">
                  <div className="font-semibold text-orange-800">Threshold</div>
                  <div className="text-2xl font-bold text-orange-700">8%</div>
                  <div className="text-xs text-orange-600">Tempo runs</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-center">
                  <div className="font-semibold text-red-800">Power</div>
                  <div className="text-2xl font-bold text-red-700">2%</div>
                  <div className="text-xs text-red-600">High intensity</div>
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
            <span>Important Safety Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-amber-700 space-y-2">
          <p>• These calculations are estimates and may vary based on individual factors</p>
          <p>• Consult a healthcare provider before starting any new exercise program</p>
          <p>• Listen to your body and adjust intensity based on how you feel</p>
          <p>• Use a heart rate monitor for accurate zone training</p>
          <p>• Medications and health conditions can affect heart rate response</p>
        </CardContent>
      </Card>
    </div>
  )
}
