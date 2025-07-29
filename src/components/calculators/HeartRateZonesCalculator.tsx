"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Heart, Activity, Target, Zap, TrendingUp } from "lucide-react"

export function HeartRateZonesCalculator() {
  const [age, setAge] = useState("")
  const [restingHR, setRestingHR] = useState("")
  const [fitnessLevel, setFitnessLevel] = useState("")
  const [results, setResults] = useState<{
    maxHR: number
    zones: {
      name: string
      range: string
      percentage: string
      description: string
      color: string
      icon: React.ComponentType<{ className?: string }>
    }[]
  } | null>(null)

  const fitnessLevels = {
    beginner: { label: "Beginner (just starting)", adjustment: 0 },
    average: { label: "Average fitness", adjustment: 0 },
    good: { label: "Good fitness", adjustment: 2 },
    excellent: { label: "Excellent fitness", adjustment: 5 },
  }

  const calculateHeartRateZones = () => {
    if (!age || !restingHR || !fitnessLevel) return

    const ageNum = Number.parseInt(age)
    const restingHRNum = Number.parseInt(restingHR)
    const adjustment = fitnessLevels[fitnessLevel as keyof typeof fitnessLevels].adjustment

    // Calculate maximum heart rate (220 - age + fitness adjustment)
    const maxHR = 220 - ageNum + adjustment

    // Calculate heart rate reserve (HRR) for Karvonen method
    const hrr = maxHR - restingHRNum

    // Define training zones using both percentage of max HR and HRR
    const zones = [
      {
        name: "Recovery Zone",
        percentage: "50-60%",
        description: "Active recovery, warm-up, cool-down",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: Heart,
        minHR: Math.round(restingHRNum + hrr * 0.5),
        maxHR: Math.round(restingHRNum + hrr * 0.6),
      },
      {
        name: "Aerobic Base",
        percentage: "60-70%",
        description: "Build aerobic base, fat burning, easy pace",
        color: "bg-green-100 text-green-800 border-green-200",
        icon: Activity,
        minHR: Math.round(restingHRNum + hrr * 0.6),
        maxHR: Math.round(restingHRNum + hrr * 0.7),
      },
      {
        name: "Aerobic Zone",
        percentage: "70-80%",
        description: "Improve aerobic capacity, moderate effort",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Target,
        minHR: Math.round(restingHRNum + hrr * 0.7),
        maxHR: Math.round(restingHRNum + hrr * 0.8),
      },
      {
        name: "Threshold Zone",
        percentage: "80-90%",
        description: "Lactate threshold, comfortably hard effort",
        color: "bg-orange-100 text-orange-800 border-orange-200",
        icon: TrendingUp,
        minHR: Math.round(restingHRNum + hrr * 0.8),
        maxHR: Math.round(restingHRNum + hrr * 0.9),
      },
      {
        name: "Anaerobic Zone",
        percentage: "90-95%",
        description: "High intensity, short intervals, hard effort",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: Zap,
        minHR: Math.round(restingHRNum + hrr * 0.9),
        maxHR: Math.round(restingHRNum + hrr * 0.95),
      },
    ]

    const zonesWithRange = zones.map((zone) => ({
      ...zone,
      range: `${zone.minHR} - ${zone.maxHR} bpm`,
    }))

    setResults({
      maxHR,
      zones: zonesWithRange,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5" />
            <span>Heart Rate Zones Calculator</span>
          </CardTitle>
          <CardDescription>
            Calculate your training heart rate zones based on age, resting heart rate, and fitness level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="30"
                min="15"
                max="80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restingHR">Resting Heart Rate (bpm)</Label>
              <Input
                id="restingHR"
                type="number"
                value={restingHR}
                onChange={(e) => setRestingHR(e.target.value)}
                placeholder="60"
                min="40"
                max="100"
              />
              <p className="text-xs text-muted-foreground">Measure first thing in the morning before getting up</p>
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
            Calculate Heart Rate Zones
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Training Zones</span>
              <div className="text-sm text-muted-foreground">
                Max HR: <span className="font-semibold text-red-600">{results.maxHR} bpm</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {results.zones.map((zone, index) => {
              const Icon = zone.icon
              const percentage = ((zone.maxHR - 40) / (results.maxHR - 40)) * 100

              return (
                <div key={index} className={`p-4 rounded-lg border-2 ${zone.color}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/50 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{zone.name}</h3>
                        <p className="text-sm opacity-80">{zone.percentage} of HRR</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">{zone.range}</div>
                    </div>
                  </div>

                  <Progress value={percentage} className="mb-3 h-2" />

                  <p className="text-sm opacity-90">{zone.description}</p>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Training Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Zone Distribution for Training</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Recovery/Base (Zones 1-2):</span>
                    <span className="font-semibold">80% of training</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Threshold (Zone 4):</span>
                    <span className="font-semibold">15% of training</span>
                  </div>
                  <div className="flex justify-between">
                    <span>High Intensity (Zone 5):</span>
                    <span className="font-semibold">5% of training</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">How to Use These Zones</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Use a heart rate monitor for accuracy</li>
                  <li>• Warm up in Zone 1 before workouts</li>
                  <li>• Build base fitness with Zone 2 training</li>
                  <li>• Use Zone 4 for tempo runs/rides</li>
                  <li>• Zone 5 for short, intense intervals</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Important Notes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• These zones are calculated using the Karvonen method (Heart Rate Reserve)</li>
                <li>• Individual responses may vary - listen to your body</li>
                <li>• Consider getting a lactate threshold test for more precise zones</li>
                <li>• Zones may change as fitness improves</li>
                <li>• Consult a sports medicine professional for personalized training plans</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
