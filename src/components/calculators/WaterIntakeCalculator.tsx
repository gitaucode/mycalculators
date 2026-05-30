"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplets, Activity, BarChart3, AlertTriangle, Thermometer } from "lucide-react"

interface WaterIntakeResult {
  baseIntake: number
  activityAdjustment: number
  climateAdjustment: number
  totalIntake: number
  glassesPerDay: number
  bottlesPerDay: number
  tips: string[]
}

const activityLevels = {
  sedentary: { label: "Sedentary (little/no exercise)", multiplier: 0 },
  light: { label: "Light activity (1-3 days/week)", multiplier: 350 },
  moderate: { label: "Moderate activity (3-5 days/week)", multiplier: 500 },
  active: { label: "Very active (6-7 days/week)", multiplier: 750 },
  intense: { label: "Intense activity (2x/day, training)", multiplier: 1000 },
}

const climateTypes = {
  temperate: { label: "Temperate (normal conditions)", adjustment: 0 },
  hot: { label: "Hot/Humid climate", adjustment: 500 },
  cold: { label: "Cold climate", adjustment: -200 },
  dry: { label: "Dry/Arid climate", adjustment: 300 },
}

export function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [climate, setClimate] = useState("")
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [result, setResult] = useState<WaterIntakeResult | null>(null)

  const calculateWaterIntake = () => {
    if (!weight || !activityLevel || !climate) return

    let weightInKg = Number.parseFloat(weight)
    if (unit === "imperial") weightInKg *= 0.453592

    const baseIntake = weightInKg * 35
    const activityAdjustment = activityLevels[activityLevel as keyof typeof activityLevels].multiplier
    const climateAdjustment = climateTypes[climate as keyof typeof climateTypes].adjustment
    const totalIntake = baseIntake + activityAdjustment + climateAdjustment
    const glassesPerDay = Math.round(totalIntake / 250)
    const bottlesPerDay = Math.round(totalIntake / 500)
    const tips = generateTips(activityLevel, climate, totalIntake)

    setResult({ baseIntake: Math.round(baseIntake), activityAdjustment, climateAdjustment, totalIntake: Math.round(totalIntake), glassesPerDay, bottlesPerDay, tips })
  }

  const generateTips = (activity: string, climateType: string, intake: number): string[] => {
    const tips = ["Drink water consistently throughout the day, not all at once", "Start your day with a glass of water to kickstart hydration"]
    if (activity === "active" || activity === "intense") { tips.push("Drink 150–250ml of water 15–20 minutes before exercise"); tips.push("During exercise, drink 200–300ml every 15–20 minutes") }
    if (climateType === "hot") tips.push("Increase intake during hot weather to replace sweat losses")
    else if (climateType === "cold") tips.push("Don't forget to hydrate in cold weather — you still lose fluids")
    else if (climateType === "dry") tips.push("Dry climates increase water loss through breathing and skin")
    if (intake > 3000) tips.push("With high water needs, consider electrolyte replacement")
    return tips.slice(0, 5)
  }

  const getIntakeStatus = (intake: number) => {
    if (intake < 2000) return { label: "Low", bg: "#FEF2F2", text: "#DC2626" }
    if (intake < 2500) return { label: "Moderate", bg: "#FEF9C3", text: "#CA8A04" }
    if (intake < 3500) return { label: "Good", bg: "#ECFDF3", text: "#0B5A2A" }
    return { label: "High", bg: "#EFF6FF", text: "#2563EB" }
  }

  const status = result ? getIntakeStatus(result.totalIntake) : null

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs + tips + disclaimer */}
      <div className="space-y-4">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020] flex items-center gap-2">
              <Droplets className="h-6 w-6 text-[#2563EB]" />
              Water Intake Calculator
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Calculate your daily water needs based on weight, activity level, and climate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Tabs value={unit} onValueChange={(v) => setUnit(v as "metric" | "imperial")}>
              <TabsList className="grid w-full grid-cols-2 rounded-xl">
                <TabsTrigger value="metric">Metric (kg)</TabsTrigger>
                <TabsTrigger value="imperial">Imperial (lbs)</TabsTrigger>
              </TabsList>
              <TabsContent value="metric" className="mt-4">
                <div className="space-y-2">
                  <Label htmlFor="weight-metric" className="font-semibold text-[#0B1020]">Body Weight (kg)</Label>
                  <Input id="weight-metric" type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
                </div>
              </TabsContent>
              <TabsContent value="imperial" className="mt-4">
                <div className="space-y-2">
                  <Label htmlFor="weight-imperial" className="font-semibold text-[#0B1020]">Body Weight (lbs)</Label>
                  <Input id="weight-imperial" type="number" placeholder="154" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
                </div>
              </TabsContent>
            </Tabs>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-semibold text-[#0B1020]">Activity Level</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base"><SelectValue placeholder="Select activity level" /></SelectTrigger>
                  <SelectContent>{Object.entries(activityLevels).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-[#0B1020]">Climate Conditions</Label>
                <Select value={climate} onValueChange={setClimate}>
                  <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base"><SelectValue placeholder="Select climate" /></SelectTrigger>
                  <SelectContent>{Object.entries(climateTypes).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={calculateWaterIntake} disabled={!weight || !activityLevel || !climate} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
              <Droplets className="mr-2 h-4 w-4" /> Calculate Water Intake
            </Button>
            <div className="rounded-2xl bg-[#EFF6FF] p-4 text-sm leading-6 text-[#2563EB]">
              <p className="font-semibold">WHO recommended formula</p>
              <p>Base calculation: 35ml per kg of body weight, adjusted for activity and climate.</p>
            </div>
          </CardContent>
        </Card>

        {/* Tips shown after calculation */}
        {result && (
          <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
            <CardHeader>
              <CardTitle className="font-poppins text-lg font-bold text-[#0B1020]">Hydration Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {result.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-xl bg-[#EFF6FF] p-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                    <span className="text-sm text-[#2563EB]">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <div className="rounded-2xl border border-[#FEF9C3] bg-[#FEFCE8] p-5 text-sm leading-6 text-[#854D0E] space-y-1">
          <div className="flex items-center gap-2 font-semibold mb-1"><AlertTriangle className="h-4 w-4" /> Important Information</div>
          <p>• These are general recommendations — individual needs may vary.</p>
          <p>• Monitor urine color: pale yellow indicates good hydration.</p>
          <p>• Consult healthcare providers for specific medical conditions.</p>
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
          {result && status ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-semibold text-[#667085]">Daily Water Intake</p>
                <p className="mt-2 font-poppins text-3xl font-bold" style={{ color: status.text }}>
                  {result.totalIntake.toLocaleString()} ml
                </p>
                <span className="mt-2 inline-flex rounded-full px-3 py-1 text-sm font-bold" style={{ backgroundColor: status.bg, color: status.text }}>
                  {status.label} Intake Level
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                  <p className="font-poppins text-2xl font-bold text-[#0B5A2A]">{result.glassesPerDay}</p>
                  <p className="text-xs text-[#667085] mt-1">Glasses/day (250ml)</p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                  <p className="font-poppins text-2xl font-bold text-[#0B5A2A]">{result.bottlesPerDay}</p>
                  <p className="text-xs text-[#667085] mt-1">Bottles/day (500ml)</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Base intake (35ml/kg)</span>
                  <span className="font-semibold text-[#0B1020]">{result.baseIntake} ml</span>
                </div>
                {result.activityAdjustment > 0 && (
                  <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                    <span className="text-[#667085] flex items-center gap-1"><Activity className="h-3.5 w-3.5" /> Activity adjustment</span>
                    <span className="font-semibold text-[#0B5A2A]">+{result.activityAdjustment} ml</span>
                  </div>
                )}
                {result.climateAdjustment !== 0 && (
                  <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                    <span className="text-[#667085] flex items-center gap-1"><Thermometer className="h-3.5 w-3.5" /> Climate adjustment</span>
                    <span className={`font-semibold ${result.climateAdjustment > 0 ? "text-[#0B5A2A]" : "text-[#2563EB]"}`}>{result.climateAdjustment > 0 ? "+" : ""}{result.climateAdjustment} ml</span>
                  </div>
                )}
                <div className="flex justify-between pt-1 text-base font-bold">
                  <span>Total Daily Intake</span>
                  <span className="text-[#0B5A2A]">{result.totalIntake.toLocaleString()} ml</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                <Droplets className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter your weight, activity level, and climate to see your recommended water intake.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Daily intake (ml)</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Glasses per day</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Bottles per day</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Individual hydration needs may vary based on health status.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
