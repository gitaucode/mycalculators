"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Heart, BarChart3, AlertTriangle } from "lucide-react"
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

const phaseStyle: Record<string, { bg: string; text: string }> = {
  "Menstrual Phase": { bg: "#FEF2F2", text: "#DC2626" },
  "Follicular Phase": { bg: "#EFF6FF", text: "#2563EB" },
  "Fertile Window": { bg: "#FDF2F8", text: "#DB2777" },
  "Luteal Phase": { bg: "#FDF4FF", text: "#7C3AED" },
}

const fertilityStyle: Record<string, { bg: string; text: string; label: string }> = {
  high: { bg: "#FEF2F2", text: "#DC2626", label: "High Fertility" },
  medium: { bg: "#FEF9C3", text: "#CA8A04", label: "Medium Fertility" },
  low: { bg: "#ECFDF3", text: "#0B5A2A", label: "Low Fertility" },
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

    const ovulationDate = addDays(lmpDate, cycleDays - 14)
    const fertileWindowStart = subDays(ovulationDate, 5)
    const fertileWindowEnd = ovulationDate
    const nextPeriodDate = addDays(lmpDate, cycleDays)
    const daysUntilOvulation = differenceInDays(ovulationDate, today)
    const daysSinceLastPeriod = differenceInDays(today, lmpDate)
    const ovulationDay = cycleDays - 14

    let phase: string, description: string, fertility: "high" | "medium" | "low", tips: string[]

    if (daysSinceLastPeriod <= 5) {
      phase = "Menstrual Phase"; description = "Menstruation period — lowest fertility"; fertility = "low"
      tips = ["Focus on rest and self-care", "Stay hydrated and eat iron-rich foods", "Light exercise like walking or yoga"]
    } else if (daysSinceLastPeriod <= ovulationDay - 6) {
      phase = "Follicular Phase"; description = "Pre-ovulation — fertility increasing"; fertility = "medium"
      tips = ["Energy levels typically increase", "Good time for new projects", "Monitor cervical mucus changes"]
    } else if (daysSinceLastPeriod >= ovulationDay - 5 && daysSinceLastPeriod <= ovulationDay) {
      phase = "Fertile Window"; description = "Peak fertility period"; fertility = "high"
      tips = ["Highest chance of conception", "Cervical mucus becomes clear and stretchy", "Basal body temperature may rise slightly"]
    } else {
      phase = "Luteal Phase"; description = "Post-ovulation — fertility decreasing"; fertility = "low"
      tips = ["PMS symptoms may begin", "Focus on stress management", "Prepare for next cycle"]
    }

    setResult({ ovulationDate, fertileWindowStart, fertileWindowEnd, nextPeriodDate, daysUntilOvulation, currentPhase: phase, phaseDescription: description, fertilityStatus: fertility, tips })
  }

  const ps = result ? phaseStyle[result.currentPhase] ?? { bg: "#F7FAF8", text: "#667085" } : null
  const fs = result ? fertilityStyle[result.fertilityStatus] : null

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs + cycle phases reference + disclaimer */}
      <div className="space-y-4">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020] flex items-center gap-2">
              <Calendar className="h-6 w-6 text-[#DB2777]" />
              Ovulation Tracker
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Track your fertile window and ovulation date based on your menstrual cycle.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastPeriod" className="font-semibold text-[#0B1020]">Last Period Start Date</Label>
                <Input id="lastPeriod" type="date" value={lastPeriodDate} onChange={(e) => setLastPeriodDate(e.target.value)} max={format(new Date(), "yyyy-MM-dd")} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cycleLength" className="font-semibold text-[#0B1020]">Average Cycle Length (days)</Label>
                <Input id="cycleLength" type="number" placeholder="28" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} min="21" max="35" className="h-12 rounded-xl border-[#E4E7EC] text-base" />
                <p className="text-xs text-[#667085]">Normal range: 21–35 days</p>
              </div>
            </div>
            <Button onClick={calculateOvulation} disabled={!lastPeriodDate || !cycleLength} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
              <Heart className="mr-2 h-4 w-4" /> Calculate Fertile Window
            </Button>
            <div className="rounded-2xl bg-[#FDF2F8] p-4 text-sm leading-6 text-[#DB2777]">
              <p className="font-semibold">Standard cycle calculation</p>
              <p>Ovulation is estimated 14 days before your next period, with a 6-day fertile window.</p>
            </div>
          </CardContent>
        </Card>

        {/* Cycle phases reference */}
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-lg font-bold text-[#0B1020]">Menstrual Cycle Phases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { phase: "Menstrual", days: "Days 1–5", note: "Low fertility", ...phaseStyle["Menstrual Phase"] },
                { phase: "Follicular", days: "Days 6–13", note: "Increasing", ...phaseStyle["Follicular Phase"] },
                { phase: "Ovulation", days: "Days 14–15", note: "Peak fertility", ...phaseStyle["Fertile Window"] },
                { phase: "Luteal", days: "Days 16–28", note: "Decreasing", ...phaseStyle["Luteal Phase"] },
              ].map((p) => (
                <div key={p.phase} className="rounded-xl p-3 text-center" style={{ backgroundColor: p.bg }}>
                  <p className="font-semibold text-sm" style={{ color: p.text }}>{p.phase}</p>
                  <p className="text-xs mt-0.5" style={{ color: p.text }}>{p.days}</p>
                  <p className="text-xs mt-0.5 opacity-80" style={{ color: p.text }}>{p.note}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="rounded-2xl border border-[#FEF9C3] bg-[#FEFCE8] p-5 text-sm leading-6 text-[#854D0E] space-y-1">
          <div className="flex items-center gap-2 font-semibold mb-1"><AlertTriangle className="h-4 w-4" /> Important Information</div>
          <p>• Estimates are based on average cycle patterns — individual cycles vary.</p>
          <p>• This tool is not suitable as a contraceptive method.</p>
          <p>• Consult healthcare providers for fertility planning or concerns.</p>
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
          {result && ps && fs ? (
            <div className="space-y-4">
              {/* Current phase badge */}
              <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: ps.bg }}>
                <p className="font-poppins text-lg font-bold" style={{ color: ps.text }}>{result.currentPhase}</p>
                <p className="text-sm mt-0.5" style={{ color: ps.text }}>{result.phaseDescription}</p>
                <span className="mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: fs.bg, color: fs.text }}>{fs.label}</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Ovulation Date</span>
                  <div className="text-right">
                    <span className="font-semibold text-[#DB2777]">{format(result.ovulationDate, "MMM dd, yyyy")}</span>
                    <p className="text-xs text-[#667085]">
                      {result.daysUntilOvulation > 0 ? `In ${result.daysUntilOvulation} days` : result.daysUntilOvulation === 0 ? "Today!" : `${Math.abs(result.daysUntilOvulation)} days ago`}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Fertile Window</span>
                  <span className="font-semibold text-[#0B1020] text-right">{format(result.fertileWindowStart, "MMM dd")} – {format(result.fertileWindowEnd, "MMM dd")}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Next Period</span>
                  <span className="font-semibold text-[#0B1020]">{format(result.nextPeriodDate, "MMM dd, yyyy")}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#0B1020] mb-2">Tips for Current Phase</p>
                <div className="space-y-2">
                  {result.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-xl p-2.5" style={{ backgroundColor: ps.bg }}>
                      <div className="h-1.5 w-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: ps.text }} />
                      <span className="text-sm" style={{ color: ps.text }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FDF2F8] text-[#DB2777]">
                <Heart className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter your last period date and cycle length to calculate your fertile window.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Ovulation date</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Fertile window</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Next period</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Always consult a healthcare provider for fertility advice.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
