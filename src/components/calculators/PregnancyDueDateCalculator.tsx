"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, Baby, AlertTriangle } from "lucide-react"
import { format, addDays, differenceInDays } from "date-fns"

interface PregnancyResult {
  dueDate: Date
  currentWeek: number
  currentDay: number
  trimester: number
  weeksLeft: number
  daysLeft: number
  trimesterName: string
  milestones: string[]
}

export function PregnancyDueDateCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState("")
  const [result, setResult] = useState<PregnancyResult | null>(null)

  const calculateDueDate = () => {
    if (!lastPeriodDate) return

    const lmpDate = new Date(lastPeriodDate)
    const dueDate = addDays(lmpDate, 280) // 40 weeks
    const today = new Date()

    const totalDays = differenceInDays(today, lmpDate)
    const currentWeek = Math.floor(totalDays / 7)
    const currentDay = totalDays % 7

    const weeksLeft = 40 - currentWeek
    const daysLeft = differenceInDays(dueDate, today)

    let trimester = 1
    let trimesterName = "First Trimester"

    if (currentWeek >= 13 && currentWeek < 27) {
      trimester = 2
      trimesterName = "Second Trimester"
    } else if (currentWeek >= 27) {
      trimester = 3
      trimesterName = "Third Trimester"
    }

    const milestones = getMilestones(currentWeek)

    setResult({
      dueDate,
      currentWeek,
      currentDay,
      trimester,
      weeksLeft: Math.max(0, weeksLeft),
      daysLeft: Math.max(0, daysLeft),
      trimesterName,
      milestones,
    })
  }

  const getMilestones = (week: number): string[] => {
    const milestones = []

    if (week >= 4) milestones.push("Heart begins to beat")
    if (week >= 8) milestones.push("All major organs formed")
    if (week >= 12) milestones.push("End of first trimester")
    if (week >= 16) milestones.push("Gender can be determined")
    if (week >= 20) milestones.push("Halfway point reached")
    if (week >= 24) milestones.push("Viability milestone")
    if (week >= 28) milestones.push("Third trimester begins")
    if (week >= 32) milestones.push("Rapid brain development")
    if (week >= 36) milestones.push("Considered full-term soon")
    if (week >= 37) milestones.push("Full-term pregnancy")

    return milestones.slice(-3) // Show last 3 milestones
  }

  const getTrimesterColor = (trimester: number) => {
    switch (trimester) {
      case 1:
        return "bg-green-100 text-green-800 border-green-200"
      case 2:
        return "bg-blue-100 text-blue-800 border-blue-200"
      case 3:
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Baby className="h-5 w-5 text-pink-600" />
            <span>Pregnancy Due Date Calculator</span>
          </CardTitle>
          <CardDescription>Calculate your due date, current trimester, and pregnancy milestones</CardDescription>
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
                max={format(new Date(), "yyyy-MM-dd")}
              />
            </div>
          </div>

          <Button onClick={calculateDueDate} className="w-full" disabled={!lastPeriodDate}>
            <Calendar className="mr-2 h-4 w-4" />
            Calculate Due Date
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Due Date & Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Due Date & Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-pink-50 rounded-lg border border-pink-200">
                <div className="text-2xl font-bold text-pink-800 mb-1">{format(result.dueDate, "MMMM dd, yyyy")}</div>
                <div className="text-sm text-pink-600">Estimated Due Date</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-xl font-bold text-blue-800">
                    {result.currentWeek}w {result.currentDay}d
                  </div>
                  <div className="text-xs text-blue-600">Current Progress</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-xl font-bold text-green-800">{result.weeksLeft}w</div>
                  <div className="text-xs text-green-600">Weeks Remaining</div>
                </div>
              </div>

              <Badge className={`w-full justify-center py-2 ${getTrimesterColor(result.trimester)}`}>
                {result.trimesterName}
              </Badge>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-purple-800">{milestone}</span>
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
            <span>Important Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-amber-700 space-y-2">
          <p>• This calculator provides estimates based on a 280-day pregnancy (40 weeks)</p>
          <p>• Only about 5% of babies are born on their exact due date</p>
          <p>• Normal delivery can occur 2 weeks before or after the due date</p>
          <p>• Always consult with your healthcare provider for accurate medical advice</p>
          <p>• Regular prenatal checkups are essential for monitoring pregnancy health</p>
        </CardContent>
      </Card>
    </div>
  )
}
