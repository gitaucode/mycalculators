"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Activity, Target, BarChart3, AlertTriangle } from "lucide-react"

interface HeartRateZone {
  name: string
  percentage: { min: number; max: number }
  heartRate: { min: number; max: number }
  description: string
  benefits: string[]
  bg: string
  text: string
}

interface HeartRateResult {
  maxHeartRate: number
  restingHeartRate: number
  zones: HeartRateZone[]
  fitnessLevel: string
  recommendations: string[]
}

const fitnessLevels = {
  beginner: { label: "Beginner (new to exercise)", adjustment: 0 },
  intermediate: { label: "Intermediate (regular exercise)", adjustment: -5 },
  advanced: { label: "Advanced (athlete/very fit)", adjustment: -10 },
}

export function HeartRateZonesCalculator() {
  const [age, setAge] = useState("")
  const [restingHR, setRestingHR] = useState("")
  const [fitnessLevel, setFitnessLevel] = useState("")
  const [result, setResult] = useState<HeartRateResult | null>(null)

  const calculateHeartRateZones = () => {
    if (!age || !restingHR || !fitnessLevel) return

    const ageNum = Number.parseInt(age)
    const restingHRNum = Number.parseInt(restingHR)
    const adjustment = fitnessLevels[fitnessLevel as keyof typeof fitnessLevels].adjustment
    const maxHeartRate = 220 - ageNum + adjustment
    const heartRateReserve = maxHeartRate - restingHRNum

    const zoneDefinitions = [
      { name: "Recovery", percentage: { min: 50, max: 60 }, description: "Active recovery & warm-up", benefits: ["Promotes recovery", "Improves circulation", "Builds aerobic base"], bg: "#F3F4F6", text: "#374151" },
      { name: "Aerobic Base", percentage: { min: 60, max: 70 }, description: "Fat burning & endurance", benefits: ["Burns fat efficiently", "Builds aerobic capacity", "Improves endurance"], bg: "#EFF6FF", text: "#2563EB" },
      { name: "Aerobic", percentage: { min: 70, max: 80 }, description: "Cardiovascular fitness", benefits: ["Improves cardiovascular fitness", "Increases stroke volume", "Enhances oxygen delivery"], bg: "#ECFDF3", text: "#0B5A2A" },
      { name: "Lactate Threshold", percentage: { min: 80, max: 90 }, description: "Tempo training", benefits: ["Improves lactate clearance", "Increases sustainable pace", "Builds mental toughness"], bg: "#FEF9C3", text: "#CA8A04" },
      { name: "Neuromuscular", percentage: { min: 90, max: 100 }, description: "Maximum effort", benefits: ["Develops maximum power", "Improves coordination", "Increases VO2 max"], bg: "#FEF2F2", text: "#DC2626" },
    ]

    const zones: HeartRateZone[] = zoneDefinitions.map((z) => ({
      ...z,
      heartRate: {
        min: Math.round(restingHRNum + (heartRateReserve * z.percentage.min) / 100),
        max: Math.round(restingHRNum + (heartRateReserve * z.percentage.max) / 100),
      },
    }))

    const recommendations: string[] = ["Always warm up before intense exercise and cool down afterward", "Monitor your heart rate during exercise to stay in target zones"]
    if (fitnessLevel === "beginner") { recommendations.push("Start with 60–70% zones and gradually increase intensity"); recommendations.push("Focus on building aerobic base before high-intensity training") }
    else if (fitnessLevel === "intermediate") recommendations.push("Incorporate variety with different zones throughout the week")
    else { recommendations.push("Use periodization to peak for competitions or events"); recommendations.push("Include regular recovery weeks to prevent overtraining") }
    if (Number.parseInt(age) > 50) recommendations.push("Pay extra attention to recovery and joint health")

    setResult({
      maxHeartRate,
      restingHeartRate: restingHRNum,
      zones,
      fitnessLevel: fitnessLevels[fitnessLevel as keyof typeof fitnessLevels].label,
      recommendations: recommendations.slice(0, 5),
    })
  }

  const getRestingHRStatus = (rhr: number) => {
    if (rhr < 60) return { label: "Excellent", bg: "#ECFDF3", text: "#0B5A2A" }
    if (rhr < 70) return { label: "Good", bg: "#EFF6FF", text: "#2563EB" }
    if (rhr < 80) return { label: "Average", bg: "#FEF9C3", text: "#CA8A04" }
    return { label: "Above Average", bg: "#FEF2F2", text: "#DC2626" }
  }

  const rhrStatus = result ? getRestingHRStatus(result.restingHeartRate) : null

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs + zones table + disclaimer */}
      <div className="space-y-4">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020] flex items-center gap-2">
              <Heart className="h-6 w-6 text-[#DC2626]" />
              Heart Rate Zones
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Calculate your personalised heart rate training zones using the Karvonen method.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="font-semibold text-[#0B1020]">Age (years)</Label>
                <Input id="age" type="number" placeholder="30" value={age} onChange={(e) => setAge(e.target.value)} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="restingHR" className="font-semibold text-[#0B1020]">Resting HR (bpm)</Label>
                <Input id="restingHR" type="number" placeholder="65" value={restingHR} onChange={(e) => setRestingHR(e.target.value)} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
                <p className="text-xs text-[#667085]">Measure first thing in the morning</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-[#0B1020]">Fitness Level</Label>
                <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
                  <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base"><SelectValue placeholder="Select level" /></SelectTrigger>
                  <SelectContent>{Object.entries(fitnessLevels).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={calculateHeartRateZones} disabled={!age || !restingHR || !fitnessLevel} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
              <Target className="mr-2 h-4 w-4" /> Calculate Heart Rate Zones
            </Button>
            <div className="rounded-2xl bg-[#FEF2F2] p-4 text-sm leading-6 text-[#DC2626]">
              <p className="font-semibold">Karvonen method applied</p>
              <p>Uses Heart Rate Reserve (HRR) = Max HR − Resting HR for more precise zones.</p>
            </div>
          </CardContent>
        </Card>

        {/* Zones table */}
        {result && (
          <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
            <CardHeader>
              <CardTitle className="font-poppins text-lg font-bold text-[#0B1020] flex items-center gap-2"><Activity className="h-5 w-5" /> Training Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {result.zones.map((zone, i) => (
                  <div key={i} className="rounded-xl p-3 flex justify-between items-center" style={{ backgroundColor: zone.bg }}>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: zone.text }}>{zone.name}</p>
                      <p className="text-xs" style={{ color: zone.text }}>{zone.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-poppins font-bold text-sm" style={{ color: zone.text }}>{zone.heartRate.min}–{zone.heartRate.max} bpm</p>
                      <p className="text-xs" style={{ color: zone.text }}>{zone.percentage.min}–{zone.percentage.max}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <div className="rounded-2xl border border-[#FEF9C3] bg-[#FEFCE8] p-5 text-sm leading-6 text-[#854D0E] space-y-1">
          <div className="flex items-center gap-2 font-semibold mb-1"><AlertTriangle className="h-4 w-4" /> Safety Information</div>
          <p>• Consult a healthcare provider before starting any new exercise programme.</p>
          <p>• Stop exercising if you experience chest pain, dizziness, or unusual shortness of breath.</p>
          <p>• Medications can affect heart rate — discuss with your doctor if applicable.</p>
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
          {result && rhrStatus ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-semibold text-[#667085]">Max Heart Rate</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#DC2626]">{result.maxHeartRate} bpm</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                  <p className="font-poppins text-xl font-bold text-[#0B5A2A]">{result.restingHeartRate} bpm</p>
                  <p className="text-xs text-[#667085] mt-1">Resting HR</p>
                  <span className="mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: rhrStatus.bg, color: rhrStatus.text }}>{rhrStatus.label}</span>
                </div>
                <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                  <p className="font-poppins text-xl font-bold text-[#0B5A2A]">{result.maxHeartRate - result.restingHeartRate} bpm</p>
                  <p className="text-xs text-[#667085] mt-1">HR Reserve</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-xl bg-[#EFF6FF] p-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                    <span className="text-sm text-[#2563EB]">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF2F2] text-[#DC2626]">
                <Heart className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter your age, resting heart rate, and fitness level to calculate your zones.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Max heart rate</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Training zones</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">HR Reserve</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Individual heart rate responses may vary.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
