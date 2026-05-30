"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Baby, BarChart3, AlertTriangle } from "lucide-react"
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
    const dueDate = addDays(lmpDate, 280)
    const today = new Date()

    const totalDays = differenceInDays(today, lmpDate)
    const currentWeek = Math.floor(totalDays / 7)
    const currentDay = totalDays % 7
    const weeksLeft = 40 - currentWeek
    const daysLeft = differenceInDays(dueDate, today)

    let trimester = 1
    let trimesterName = "First Trimester"
    if (currentWeek >= 13 && currentWeek < 27) { trimester = 2; trimesterName = "Second Trimester" }
    else if (currentWeek >= 27) { trimester = 3; trimesterName = "Third Trimester" }

    const milestones = getMilestones(currentWeek)

    setResult({ dueDate, currentWeek, currentDay, trimester, weeksLeft: Math.max(0, weeksLeft), daysLeft: Math.max(0, daysLeft), trimesterName, milestones })
  }

  const getMilestones = (week: number): string[] => {
    const m = []
    if (week >= 4) m.push("Heart begins to beat")
    if (week >= 8) m.push("All major organs formed")
    if (week >= 12) m.push("End of first trimester")
    if (week >= 16) m.push("Gender can be determined")
    if (week >= 20) m.push("Halfway point reached")
    if (week >= 24) m.push("Viability milestone")
    if (week >= 28) m.push("Third trimester begins")
    if (week >= 32) m.push("Rapid brain development")
    if (week >= 36) m.push("Considered full-term soon")
    if (week >= 37) m.push("Full-term pregnancy")
    return m.slice(-4)
  }

  const trimesterColors: Record<number, { bg: string; text: string; border: string }> = {
    1: { bg: "#ECFDF3", text: "#0B5A2A", border: "#CFEBDD" },
    2: { bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE" },
    3: { bg: "#FDF4FF", text: "#7C3AED", border: "#E9D5FF" },
  }

  const trimCol = result ? trimesterColors[result.trimester] : trimesterColors[1]
  const progressPct = result ? Math.min(100, Math.round((result.currentWeek / 40) * 100)) : 0

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs + disclaimer */}
      <div className="space-y-4">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020] flex items-center gap-2">
              <Baby className="h-6 w-6 text-[#DB2777]" />
              Pregnancy Due Date
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Calculate your estimated due date, current trimester, and pregnancy milestones.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="lastPeriod" className="font-semibold text-[#0B1020]">Last Menstrual Period (LMP)</Label>
              <Input
                id="lastPeriod"
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
                max={format(new Date(), "yyyy-MM-dd")}
                className="h-12 rounded-xl border-[#E4E7EC] text-base"
              />
            </div>
            <Button onClick={calculateDueDate} disabled={!lastPeriodDate} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
              <Calendar className="mr-2 h-4 w-4" /> Calculate Due Date
            </Button>
            <div className="rounded-2xl bg-[#FDF2F8] p-4 text-sm leading-6 text-[#DB2777]">
              <p className="font-semibold">Naegele's Rule applied</p>
              <p>Estimates due date as 280 days (40 weeks) from the first day of your last period.</p>
            </div>
          </CardContent>
        </Card>

        {/* Medical disclaimer */}
        <div className="rounded-2xl border border-[#FEF9C3] bg-[#FEFCE8] p-5 text-sm leading-6 text-[#854D0E] space-y-1">
          <div className="flex items-center gap-2 font-semibold mb-1"><AlertTriangle className="h-4 w-4" /> Important Information</div>
          <p>• This calculator provides estimates based on a 280-day pregnancy (40 weeks).</p>
          <p>• Only about 5% of babies are born on their exact due date.</p>
          <p>• Normal delivery can occur 2 weeks before or after the due date.</p>
          <p>• Always consult your healthcare provider for accurate medical advice.</p>
        </div>
      </div>

      {/* Right – Results */}
      <Card className="rounded-[20px] border-[#CFEBDD] bg-[radial-gradient(circle_at_50%_18%,rgba(11,90,42,0.06),transparent_42%),#F7FAF8] shadow-[0_14px_36px_rgba(11,90,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Your Estimate</CardTitle>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]">
            <BarChart3 className="h-5 w-5" />
          </span>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-semibold text-[#667085]">Estimated Due Date</p>
                <p className="mt-2 font-poppins text-2xl font-bold text-[#0B5A2A]">
                  {format(result.dueDate, "MMMM dd, yyyy")}
                </p>
                <span className="mt-2 inline-flex rounded-full px-3 py-1 text-sm font-bold" style={{ backgroundColor: trimCol.bg, color: trimCol.text }}>
                  {result.trimesterName}
                </span>
              </div>

              {/* Progress bar */}
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex justify-between text-xs font-semibold text-[#667085] mb-2">
                  <span>Week {result.currentWeek}w {result.currentDay}d</span>
                  <span>{progressPct}% complete</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#E4E7EC] overflow-hidden">
                  <div className="h-full rounded-full bg-[#0B5A2A] transition-all" style={{ width: `${progressPct}%` }} />
                </div>
                <div className="flex justify-between text-xs text-[#667085] mt-1.5">
                  <span>LMP</span>
                  <span>40 weeks</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Current Progress</span>
                  <span className="font-semibold text-[#0B1020]">{result.currentWeek}w {result.currentDay}d</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Weeks Remaining</span>
                  <span className="font-semibold text-[#0B1020]">{result.weeksLeft} weeks ({result.daysLeft} days)</span>
                </div>
                {result.milestones.length > 0 && (
                  <div className="pt-1">
                    <p className="font-semibold text-[#0B1020] mb-2">Recent Milestones</p>
                    <div className="space-y-2">
                      {result.milestones.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 rounded-xl p-2.5" style={{ backgroundColor: trimCol.bg }}>
                          <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: trimCol.text }} />
                          <span className="text-sm" style={{ color: trimCol.text }}>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FDF2F8] text-[#DB2777]">
                <Baby className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter the first day of your last menstrual period to calculate your due date.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Estimated due date</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Current week</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Weeks remaining</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Actual delivery dates vary — consult your healthcare provider.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
