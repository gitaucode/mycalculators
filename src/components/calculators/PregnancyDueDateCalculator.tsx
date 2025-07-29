"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Baby, Calendar, Clock } from "lucide-react"

export function PregnancyDueDateCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState("")
  const [cycleLength, setCycleLength] = useState("28")
  const [results, setResults] = useState<{
    dueDate: string
    currentWeek: number
    currentTrimester: number
    weeksLeft: number
    conceptionDate: string
  } | null>(null)

  const calculateDueDate = () => {
    if (!lastPeriodDate) return

    const lmp = new Date(lastPeriodDate)
    const cycle = Number.parseInt(cycleLength)

    // Calculate due date (280 days from LMP)
    const dueDate = new Date(lmp)
    dueDate.setDate(dueDate.getDate() + 280)

    // Calculate conception date (approximately 14 days after LMP for 28-day cycle)
    const conceptionDate = new Date(lmp)
    conceptionDate.setDate(conceptionDate.getDate() + cycle / 2)

    // Calculate current week
    const today = new Date()
    const daysSinceLMP = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24))
    const currentWeek = Math.floor(daysSinceLMP / 7)

    // Calculate trimester
    let currentTrimester = 1
    if (currentWeek >= 13) currentTrimester = 2
    if (currentWeek >= 27) currentTrimester = 3

    // Calculate weeks left
    const weeksLeft = Math.max(0, 40 - currentWeek)

    setResults({
      dueDate: dueDate.toLocaleDateString(),
      currentWeek: Math.max(0, currentWeek),
      currentTrimester,
      weeksLeft,
      conceptionDate: conceptionDate.toLocaleDateString(),
    })
  }

  const getTrimesterInfo = (trimester: number) => {
    const info = {
      1: { name: "First Trimester", weeks: "1-12", color: "bg-green-100 text-green-800" },
      2: { name: "Second Trimester", weeks: "13-26", color: "bg-blue-100 text-blue-800" },
      3: { name: "Third Trimester", weeks: "27-40", color: "bg-purple-100 text-purple-800" },
    }
    return info[trimester as keyof typeof info]
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Baby className="h-5 w-5" />
            <span>Pregnancy Due Date Calculator</span>
          </CardTitle>
          <CardDescription>
            Calculate your estimated due date, current trimester, and weeks remaining based on your last menstrual
            period
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="lastPeriod">Last Menstrual Period (LMP)</Label>
              <Input
                id="lastPeriod"
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
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
          </div>

          <Button onClick={calculateDueDate} className="w-full" disabled={!lastPeriodDate}>
            Calculate Due Date
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-pink-600" />
                <span>Due Date</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-600 mb-2">{results.dueDate}</div>
              <p className="text-sm text-muted-foreground">Estimated delivery date</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Current Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-2">Week {results.currentWeek}</div>
              <Badge className={getTrimesterInfo(results.currentTrimester).color}>
                {getTrimesterInfo(results.currentTrimester).name}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                Weeks {getTrimesterInfo(results.currentTrimester).weeks}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Baby className="h-5 w-5 text-purple-600" />
                <span>Time Remaining</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 mb-2">{results.weeksLeft} weeks</div>
              <p className="text-sm text-muted-foreground">
                Approximately {Math.ceil(results.weeksLeft / 4)} months left
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Estimated Conception Date</h4>
                <p className="text-lg">{results.conceptionDate}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Pregnancy Progress</h4>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(results.currentWeek / 40) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {Math.round((results.currentWeek / 40) * 100)}% complete
                </p>
              </div>
            </div>

            <Separator />

            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>Note:</strong> This calculator provides estimates based on average pregnancy duration.
              </p>
              <p>• Only about 5% of babies are born on their exact due date</p>
              <p>• Most babies are born within 2 weeks of the due date</p>
              <p>• Always consult with your healthcare provider for personalized care</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
