"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, Heart, AlertTriangle } from "lucide-react"
import { format, addDays, subDays, differenceInDays } from "date-fns"

interface OvulationResult {
  ovulationDate: Date
  fertileWindowStart: Date
  fertileWindowEnd: Date
  nextPeriodDate: Date
  daysUntilOvulation: number
  currentPhase: string
  phaseDescription: string
  fertilityStatus: "high" | "medium" | "low"
  tips: string[]
}

export function OvulationTracker() {
  const [lastPeriodDate, setLastPeriodDate] = useState("")
  const [cycleLength, setCycleLength] = useState("28")
  const [result, setResult] = useState<OvulationResult | null>(null)

  const calculateOvulation = () => {
    if (!lastPeriodDate || !cycleLength) return

    const lmpDate = new Date(lastPeriodDate)
    const cycleDays = Number.parseInt(cycleLength)
    const today = new Date()

    // Calculate ovulation (typically 14 days before next period)
    const ovulationDate = addDays(lmpDate, cycleDays - 14)

    // Fertile window (5 days before ovulation + ovulation day)
    const fertileWindowStart = subDays(ovulationDate, 5)
    const fertileWindowEnd = ovulationDate

    // Next period date
    const nextPeriodDate = addDays(lmpDate, cycleDays)

    // Days until ovulation
    const daysUntilOvulation = differenceInDays(ovulationDate, today)

    // Determine current phase and fertility status
    const daysSinceLastPeriod = differenceInDays(today, lmpDate)
    const { phase, description, fertility, tips } = getCurrentPhase(daysSinceLastPeriod, cycleDays, daysUntilOvulation)

    setResult({
      ovulationDate,
      fertileWindowStart,
      fertileWindowEnd,
      nextPeriodDate,
      daysUntilOvulation,
      currentPhase: phase,
      phaseDescription: description,
      fertilityStatus: fertility,
      tips,
    })
  }

  const getCurrentPhase = (daysSinceLastPeriod: number, cycleDays: number, daysUntilOvulation: number) => {
    const ovulationDay = cycleDays - 14

    if (daysSinceLastPeriod <= 5) {
      return {
        phase: "Menstrual Phase",
        description: "Menstruation period - lowest fertility",
        fertility: "low" as const,
        tips: [
          "Focus on rest and self-care",
          "Stay hydrated and eat iron-rich foods",
          "Light exercise like walking or yoga",
        ],
      }
    } else if (daysSinceLastPeriod <= ovulationDay - 6) {
      return {
        phase: "Follicular Phase",
        description: "Pre-ovulation - fertility increasing",
        fertility: "medium" as const,
        tips: ["Energy levels typically increase", "Good time for new projects", "Monitor cervical mucus changes"],
      }
    } else if (daysSinceLastPeriod >= ovulationDay - 5 && daysSinceLastPeriod <= ovulationDay) {
      return {
        phase: "Fertile Window",
        description: "Peak fertility period",
        fertility: "high" as const,
        tips: [
          "Highest chance of conception",
          "Cervical mucus becomes clear and stretchy",
          "Basal body temperature may rise slightly",
        ],
      }
    } else {
      return {
        phase: "Luteal Phase",
        description: "Post-ovulation - fertility decreasing",
        fertility: "low" as const,
        tips: ["PMS symptoms may begin", "Focus on stress management", "Prepare for next cycle"],
      }
    }
  }

  const getFertilityColor = (status: string) => {
    switch (status) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Menstrual Phase":
        return "bg-red-50 border-red-200"
      case "Follicular Phase":
        return "bg-blue-50 border-blue-200"
      case "Fertile Window":
        return "bg-pink-50 border-pink-200"
      case "Luteal Phase":
        return "bg-purple-50 border-purple-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-pink-600" />
            <span>Ovulation Tracker</span>
          </CardTitle>
          <CardDescription>Track your fertile window and ovulation date based on your menstrual cycle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="lastPeriod">Last Period Start Date</Label>
              <Input
                id="lastPeriod"
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
                max={format(new Date(), "yyyy-MM-dd")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
              <Input
                id="cycleLength"
                type="number"
                placeholder="28"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                min="21"
                max="35"
              />
              <p className="text-xs text-muted-foreground">Normal range: 21-35 days</p>
            </div>
          </div>

          <Button onClick={calculateOvulation} className="w-full" disabled={!lastPeriodDate || !cycleLength}>
            <Heart className="mr-2 h-4 w-4" />
            Calculate Fertile Window
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Current Status */}
          <Card className={getPhaseColor(result.currentPhase)}>
            <CardHeader>
              <CardTitle className="text-lg">Current Cycle Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{result.currentPhase}</h3>
                  <p className="text-muted-foreground">{result.phaseDescription}</p>
                </div>
                <Badge className={`${getFertilityColor(result.fertilityStatus)} px-3 py-1`}>
                  {result.fertilityStatus.charAt(0).toUpperCase() + result.fertilityStatus.slice(1)} Fertility
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Key Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Important Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                  <div className="text-sm font-medium text-pink-700">Ovulation Date</div>
                  <div className="text-lg font-semibold text-pink-800">
                    {format(result.ovulationDate, "MMMM dd, yyyy")}
                  </div>
                  <div className="text-xs text-pink-600">
                    {result.daysUntilOvulation > 0
                      ? `In ${result.daysUntilOvulation} days`
                      : result.daysUntilOvulation === 0
                        ? "Today!"
                        : `${Math.abs(result.daysUntilOvulation)} days ago`}
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm font-medium text-blue-700">Next Period</div>
                  <div className="text-lg font-semibold text-blue-800">
                    {format(result.nextPeriodDate, "MMMM dd, yyyy")}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fertile Window</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-center">
                  <div className="text-sm font-medium text-red-700 mb-2">Peak Fertility Period</div>
                  <div className="text-lg font-semibold text-red-800">
                    {format(result.fertileWindowStart, "MMM dd")} - {format(result.fertileWindowEnd, "MMM dd")}
                  </div>
                  <div className="text-xs text-red-600 mt-1">6-day window including ovulation</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tips and Advice */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips for Current Phase</CardTitle>
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

          {/* Cycle Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Menstrual Cycle Phases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-center">
                  <div className="font-semibold text-red-800">Menstrual</div>
                  <div className="text-sm text-red-600">Days 1-5</div>
                  <div className="text-xs text-red-500 mt-1">Low fertility</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                  <div className="font-semibold text-blue-800">Follicular</div>
                  <div className="text-sm text-blue-600">Days 6-13</div>
                  <div className="text-xs text-blue-500 mt-1">Increasing fertility</div>
                </div>
                <div className="p-3 bg-pink-50 rounded-lg border border-pink-200 text-center">
                  <div className="font-semibold text-pink-800">Ovulation</div>
                  <div className="text-sm text-pink-600">Days 14-15</div>
                  <div className="text-xs text-pink-500 mt-1">Peak fertility</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-center">
                  <div className="font-semibold text-purple-800">Luteal</div>
                  <div className="text-sm text-purple-600">Days 16-28</div>
                  <div className="text-xs text-purple-500 mt-1">Decreasing fertility</div>
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
          <p>• This calculator provides estimates based on average cycle patterns</p>
          <p>• Individual cycles can vary significantly from month to month</p>
          <p>• Track additional signs like basal body temperature and cervical mucus for accuracy</p>
          <p>• Consult healthcare providers for fertility planning or concerns</p>
          <p>• This tool is not suitable as a contraceptive method</p>
        </CardContent>
      </Card>
    </div>
  )
}
