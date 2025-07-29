"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Heart, Activity, Target, AlertTriangle } from "lucide-react"

interface HeartRateZone {
  name: string
  percentage: { min: number; max: number }
  heartRate: { min: number; max: number }
  description: string
  benefits: string[]
  color: string
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
    intermediate: { label: "Intermediate (regular exercise)", adjustment: -5 },
    advanced: { label: "Advanced (athlete/very fit)", adjustment: -10 },
  }

  const calculateHeartRateZones = () => {
    if (!age || !restingHR || !fitnessLevel) return

    const ageNum = Number.parseInt(age)
    const restingHRNum = Number.parseInt(restingHR)
    const adjustment = fitnessLevels[fitnessLevel as keyof typeof fitnessLevels].adjustment

    // Calculate maximum heart rate (220 - age + fitness adjustment)
    const maxHeartRate = 220 - ageNum + adjustment

    // Calculate heart rate reserve (HRR) for Karvonen method
    const heartRateReserve = maxHeartRate - restingHRNum

    // Define zones with percentages and calculate actual heart rates
    const zoneDefinitions = [
      {
        name: "Recovery Zone",
        percentage: { min: 50, max: 60 },
        description: "Active recovery and warm-up",
        benefits: ["Promotes recovery", "Improves circulation", "Builds aerobic base"],
        color: "bg-gray-100 text-gray-800 border-gray-200",
      },
      {
        name: "Aerobic Base Zone",
        percentage: { min: 60, max: 70 },
        description: "Fat burning and endurance building",
        benefits: ["Burns fat efficiently", "Builds aerobic capacity", "Improves endurance"],
        color: "bg-blue-100 text-blue-800 border-blue-200",
      },
      {
        name: "Aerobic Zone",
        percentage: { min: 70, max: 80 },
        description: "Cardiovascular fitness improvement",
        benefits: ["Improves cardiovascular fitness", "Increases stroke volume", "Enhances oxygen delivery"],
        color: "bg-green-100 text-green-800 border-green-200",
      },
      {
        name: "Lactate Threshold",
        percentage: { min: 80, max: 90 },
        description: "Lactate threshold and tempo training",
        benefits: ["Improves lactate clearance", "Increases sustainable pace", "Builds mental toughness"],
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      {
        name: "Neuromuscular Power",
        percentage: { min: 90, max: 100 },
        description: "Maximum effort and power development",
        benefits: ["Develops maximum power", "Improves neuromuscular coordination", "Increases VO2 max"],
        color: "bg-red-100 text-red-800 border-red-200",
      },
    ]

    const zones: HeartRateZone[] = zoneDefinitions.map((zone) => ({
      ...zone,
      heartRate: {
        min: Math.round(restingHRNum + (heartRateReserve * zone.percentage.min) / 100),
        max: Math.round(restingHRNum + (heartRateReserve * zone.percentage.max) / 100),
      },
    }))

    // Generate recommendations based on fitness level
    const recommendations = generateRecommendations(fitnessLevel, ageNum)

    setResult({
      maxHeartRate,
      restingHeartRate: restingHRNum,
      zones,
      fitnessLevel: fitnessLevels[fitnessLevel as keyof typeof fitnessLevels].label,
      recommendations,
    })
  }

  const generateRecommendations = (fitness: string, ageNum: number): string[] => {
    const recommendations = []

    // Base recommendations
    recommendations.push("Always warm up before intense exercise and cool down afterward")
    recommendations.push("Monitor your heart rate during exercise to stay in target zones")

    // Fitness level specific
    if (fitness === "beginner") {
      recommendations.push("Start with 60-70% zones and gradually increase intensity")
      recommendations.push("Focus on building aerobic base before high-intensity training")
      recommendations.push("Allow adequate recovery time between intense sessions")
    } else if (fitness === "intermediate") {
      recommendations.push("Incorporate variety with different zones throughout the week")
      recommendations.push("Use 80-90% zone for tempo runs and threshold training")
    } else {
      recommendations.push("Use periodization to peak for competitions or events")
      recommendations.push("Include regular recovery weeks to prevent overtraining")
    }

    // Age-specific recommendations
    if (ageNum > 50) {
      recommendations.push("Pay extra attention to recovery and joint health")
      recommendations.push("Consider longer warm-up periods as you age")
    }

    return recommendations.slice(0, 5)
  }

  const getRestingHRStatus = (rhr: number) => {
    if (rhr < 60) return { status: "Excellent", color: "text-green-600" }
    if (rhr < 70) return { status: "Good", color: "text-blue-600" }
    if (rhr < 80) return { status: "Average", color: "text-yellow-600" }
    return { status: "Above Average", color: "text-red-600" }
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
          <CardDescription>
            Calculate your personalized heart rate training zones based on age, resting heart rate, and fitness level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input id="age" type="number" placeholder="30" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="restingHR">Resting Heart Rate (bpm)</Label>
              <Input
                id="restingHR"
                type="number"
                placeholder="65"
                value={restingHR}
                onChange={(e) => setRestingHR(e.target.value)}
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
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Heart Rate Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-center">
                  <div className="text-2xl font-bold text-red-800 mb-1">{result.maxHeartRate}</div>
                  <div className="text-sm text-red-600">Max Heart Rate (bpm)</div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                  <div className="text-2xl font-bold text-blue-800 mb-1">{result.restingHeartRate}</div>
                  <div className="text-sm text-blue-600">Resting Heart Rate (bpm)</div>
                  <Badge className={`mt-1 ${getRestingHRStatus(result.restingHeartRate).color}`}>
                    {getRestingHRStatus(result.restingHeartRate).status}
                  </Badge>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                  <div className="text-lg font-bold text-green-800 mb-1">
                    {result.maxHeartRate - result.restingHeartRate}
                  </div>
                  <div className="text-sm text-green-600">Heart Rate Reserve</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training Zones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Training Zones</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.zones.map((zone, index) => (
                <div key={index} className={`p-4 rounded-lg border ${zone.color}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{zone.name}</h4>
                      <p className="text-sm opacity-80">{zone.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">
                        {zone.heartRate.min} - {zone.heartRate.max}
                      </div>
                      <div className="text-sm opacity-80">
                        {zone.percentage.min}% - {zone.percentage.max}%
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Benefits:</p>
                    <ul className="text-sm space-y-1">
                      {zone.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Training Recommendations</CardTitle>
              <CardDescription>Based on your {result.fitnessLevel.toLowerCase()}</CardDescription>
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
          <p>• Consult a healthcare provider before starting any new exercise program</p>
          <p>• Stop exercising if you experience chest pain, dizziness, or unusual shortness of breath</p>
          <p>• Heart rate monitors may not be accurate for everyone - listen to your body</p>
          <p>• Medications can affect heart rate - discuss with your doctor if applicable</p>
          <p>• These zones are estimates - individual responses may vary</p>
        </CardContent>
      </Card>
    </div>
  )
}
