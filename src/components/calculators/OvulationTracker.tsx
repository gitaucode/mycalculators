"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, Heart, Baby, AlertCircle } from "lucide-react"

export function OvulationTracker() {
  const [lastPeriodDate, setLastPeriodDate] = useState("")
  const [cycleLength, setCycleLength] = useState("28")
  const [periodLength, setPeriodLength] = useState("5")
  const [results, setResults] = useState<{
    ovulationDate: string
    fertileWindowStart: string
    fertileWindowEnd: string
    nextPeriodDate: string
    daysUntilOvulation: number
    currentPhase: string
  } | null>(null)

  const calculateOvulation = () => {
    if (!lastPeriodDate) return

    const lmp = new Date(lastPeriodDate)
    const cycle = Number.parseInt(cycleLength)
    const period = Number.parseInt(periodLength)

    // Calculate ovulation date (typically 14 days before next period)
    const ovulationDate = new Date(lmp)
    ovulationDate.setDate(ovulationDate.getDate() + cycle - 14)

    // Calculate fertile window (5 days before ovulation + ovulation day)
    const fertileWindowStart = new Date(ovulationDate)
    fertileWindowStart.setDate(fertileWindowStart.getDate() - 5)

    const fertileWindowEnd = new Date(ovulationDate)
    fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 1)

    // Calculate next period date
    const nextPeriodDate = new Date(lmp)
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycle)

    // Calculate days until ovulation
    const today = new Date()
    const daysUntilOvulation = Math.ceil((ovulationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    // Determine current cycle phase
    const daysSinceLMP = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24))
    let currentPhase = ""

    if (daysSinceLMP < period) {
      currentPhase = "Menstrual Phase"
    } else if (daysSinceLMP < cycle - 14 - 2) {
      currentPhase = "Follicular Phase"
    } else if (daysSinceLMP >= cycle - 14 - 5 && daysSinceLMP <= cycle - 14 + 1) {
      currentPhase = "Fertile Window"
    } else if (daysSinceLMP > cycle - 14 + 1) {
      currentPhase = "Luteal Phase"
    } else {
      currentPhase = "Follicular Phase"
    }

    setResults({
      ovulationDate: ovulationDate.toLocaleDateString(),
      fertileWindowStart: fertileWindowStart.toLocaleDateString(),
      fertileWindowEnd: fertileWindowEnd.toLocaleDateString(),
      nextPeriodDate: nextPeriodDate.toLocaleDateString(),
      daysUntilOvulation,
      currentPhase,
    })
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Menstrual Phase":
        return "bg-red-100 text-red-800"
      case "Follicular Phase":
        return "bg-blue-100 text-blue-800"
      case "Fertile Window":
        return "bg-green-100 text-green-800"
      case "Luteal Phase":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPhaseDescription = (phase: string) => {
    switch (phase) {
      case "Menstrual Phase":
        return "Your period is occurring. The lining of the uterus is shedding."
      case "Follicular Phase":
        return "Your body is preparing for ovulation. Estrogen levels are rising."
      case "Fertile Window":
        return "You're most likely to conceive during this time. Peak fertility period."
      case "Luteal Phase":
        return "After ovulation. If pregnancy doesn't occur, your next period will start."
      default:
        return ""
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Ovulation Tracker</span>
          </CardTitle>
          <CardDescription>
            Track your menstrual cycle and identify your fertile window for family planning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="lastPeriod">Last Period Start Date</Label>
              <Input
                id="lastPeriod"
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycleLength">Cycle Length (days)</Label>
              <Input
                id="cycleLength"
                type="number"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                min="21"
                max="35"
                placeholder="28"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="periodLength">Period Length (days)</Label>
              <Input
                id="periodLength"
                type="number"
                value={periodLength}
                onChange={(e) => setPeriodLength(e.target.value)}
                min="3"
                max="8"
                placeholder="5"
              />
            </div>
          </div>

          <Button onClick={calculateOvulation} className="w-full" disabled={!lastPeriodDate}>
            Calculate Fertile Window
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-600" />
                <span>Ovulation Date</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-600 mb-2">{results.ovulationDate}</div>
              <p className="text-sm text-muted-foreground">
                {results.daysUntilOvulation > 0
                  ? `In ${results.daysUntilOvulation} days`
                  : results.daysUntilOvulation === 0
                    ? "Today!"
                    : `${Math.abs(results.daysUntilOvulation)} days ago`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Baby className="h-5 w-5 text-green-600" />
                <span>Fertile Window</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-green-600 mb-2">
                {results.fertileWindowStart} - {results.fertileWindowEnd}
              </div>
              <p className="text-sm text-muted-foreground">Best time to conceive</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span>Next Period</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 mb-2">{results.nextPeriodDate}</div>
              <p className="text-sm text-muted-foreground">Expected start date</p>
            </CardContent>
          </Card>
        </div>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Current Cycle Phase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Badge className={getPhaseColor(results.currentPhase)}>{results.currentPhase}</Badge>
            </div>

            <p className="text-sm text-muted-foreground">{getPhaseDescription(results.currentPhase)}</p>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>Important Notes</span>
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ovulation can vary by ±2 days even with regular cycles</li>
                <li>• Sperm can survive up to 5 days in the reproductive tract</li>
                <li>• The egg is viable for about 12-24 hours after ovulation</li>
                <li>• Track your cycle for 3+ months for better accuracy</li>
                <li>• Consider additional methods like basal body temperature or ovulation tests</li>
              </ul>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>
                <strong>Disclaimer:</strong> This calculator provides estimates based on average cycle patterns.
                Individual cycles can vary significantly. For family planning or fertility concerns, consult with a
                healthcare provider or fertility specialist.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
