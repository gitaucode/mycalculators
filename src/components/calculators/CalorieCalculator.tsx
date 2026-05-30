"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Apple, Activity, Target, BarChart3, AlertTriangle } from "lucide-react"

interface CalorieResult {
  bmr: number
  tdee: number
  weightLoss: { mild: number; moderate: number; aggressive: number }
  weightGain: { mild: number; moderate: number }
  macros: {
    protein: { grams: number; calories: number }
    carbs: { grams: number; calories: number }
    fats: { grams: number; calories: number }
  }
}

const activityLevels = {
  sedentary: { label: "Sedentary (little/no exercise)", multiplier: 1.2 },
  light: { label: "Light activity (1-3 days/week)", multiplier: 1.375 },
  moderate: { label: "Moderate activity (3-5 days/week)", multiplier: 1.55 },
  active: { label: "Very active (6-7 days/week)", multiplier: 1.725 },
  extra: { label: "Extra active (physical job)", multiplier: 1.9 },
}

export function CalorieCalculator() {
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [result, setResult] = useState<CalorieResult | null>(null)

  const calculateCalories = () => {
    if (!age || !gender || !height || !weight || !activityLevel) return

    let hCm = unit === "metric" ? Number.parseFloat(height) : Number.parseFloat(height) * 2.54
    let wKg = unit === "metric" ? Number.parseFloat(weight) : Number.parseFloat(weight) * 0.453592
    const a = Number.parseFloat(age)

    const bmr = gender === "male"
      ? 10 * wKg + 6.25 * hCm - 5 * a + 5
      : 10 * wKg + 6.25 * hCm - 5 * a - 161

    const multiplier = activityLevels[activityLevel as keyof typeof activityLevels].multiplier
    const tdee = bmr * multiplier

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLoss: { mild: tdee - 250, moderate: tdee - 500, aggressive: tdee - 750 },
      weightGain: { mild: tdee + 250, moderate: tdee + 500 },
      macros: {
        protein: { calories: Math.round(tdee * 0.3), grams: Math.round((tdee * 0.3) / 4) },
        carbs: { calories: Math.round(tdee * 0.4), grams: Math.round((tdee * 0.4) / 4) },
        fats: { calories: Math.round(tdee * 0.3), grams: Math.round((tdee * 0.3) / 9) },
      },
    })
  }

  const inputGrid = (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="age" className="font-semibold text-[#0B1020]">Age (years)</Label>
        <Input id="age" type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
      </div>
      <div className="space-y-2">
        <Label className="font-semibold text-[#0B1020]">Gender</Label>
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base"><SelectValue placeholder="Select gender" /></SelectTrigger>
          <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`height-${unit}`} className="font-semibold text-[#0B1020]">Height ({unit === "metric" ? "cm" : "in"})</Label>
        <Input id={`height-${unit}`} type="number" placeholder={unit === "metric" ? "170" : "67"} value={height} onChange={(e) => setHeight(e.target.value)} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`weight-${unit}`} className="font-semibold text-[#0B1020]">Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
        <Input id={`weight-${unit}`} type="number" placeholder={unit === "metric" ? "70" : "154"} value={weight} onChange={(e) => setWeight(e.target.value)} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
      </div>
    </div>
  )

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs + weight goal table + disclaimer */}
      <div className="space-y-4">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020] flex items-center gap-2">
              <Apple className="h-6 w-6 text-[#DB2777]" />
              Calorie Calculator
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Calculate your daily calorie needs using the Mifflin–St Jeor equation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Tabs value={unit} onValueChange={(v) => setUnit(v as "metric" | "imperial")}>
              <TabsList className="grid w-full grid-cols-2 rounded-xl">
                <TabsTrigger value="metric">Metric (cm / kg)</TabsTrigger>
                <TabsTrigger value="imperial">Imperial (in / lbs)</TabsTrigger>
              </TabsList>
              <TabsContent value="metric" className="mt-4">{inputGrid}</TabsContent>
              <TabsContent value="imperial" className="mt-4">{inputGrid}</TabsContent>
            </Tabs>
            <div className="space-y-2">
              <Label className="font-semibold text-[#0B1020]">Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base"><SelectValue placeholder="Select activity level" /></SelectTrigger>
                <SelectContent>{Object.entries(activityLevels).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Button onClick={calculateCalories} disabled={!age || !gender || !height || !weight || !activityLevel} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
              <Activity className="mr-2 h-4 w-4" /> Calculate Calories
            </Button>
            <div className="rounded-2xl bg-[#FDF2F8] p-4 text-sm leading-6 text-[#DB2777]">
              <p className="font-semibold">Mifflin–St Jeor Equation</p>
              <p>The most accurate formula for estimating BMR, validated for men and women.</p>
            </div>
          </CardContent>
        </Card>

        {/* Weight goals table */}
        {result && (
          <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
            <CardHeader>
              <CardTitle className="font-poppins text-lg font-bold text-[#0B1020] flex items-center gap-2"><Target className="h-5 w-5" /> Calorie Goals by Objective</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold text-[#DC2626] mb-2">Weight Loss</p>
                  <div className="space-y-2">
                    {[["Mild (–0.25kg/wk)", result.weightLoss.mild], ["Moderate (–0.5kg/wk)", result.weightLoss.moderate], ["Aggressive (–0.75kg/wk)", result.weightLoss.aggressive]].map(([label, cal]) => (
                      <div key={label as string} className="flex justify-between items-center rounded-xl bg-[#FEF2F2] p-2.5">
                        <span className="text-xs text-[#667085]">{label}</span>
                        <span className="text-xs font-bold text-[#DC2626]">{Math.round(cal as number)} cal</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2563EB] mb-2">Weight Gain</p>
                  <div className="space-y-2">
                    {[["Mild (+0.25kg/wk)", result.weightGain.mild], ["Moderate (+0.5kg/wk)", result.weightGain.moderate]].map(([label, cal]) => (
                      <div key={label as string} className="flex justify-between items-center rounded-xl bg-[#EFF6FF] p-2.5">
                        <span className="text-xs text-[#667085]">{label}</span>
                        <span className="text-xs font-bold text-[#2563EB]">{Math.round(cal as number)} cal</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <div className="rounded-2xl border border-[#FEF9C3] bg-[#FEFCE8] p-5 text-sm leading-6 text-[#854D0E] space-y-1">
          <div className="flex items-center gap-2 font-semibold mb-1"><AlertTriangle className="h-4 w-4" /> Important Information</div>
          <p>• Calculations are estimates — individual metabolic rates can vary ±10–15%.</p>
          <p>• Consult a registered dietitian for personalised nutrition advice.</p>
          <p>• Extreme calorie restriction (&lt;1200 cal/day) should be medically supervised.</p>
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
                <p className="text-sm font-semibold text-[#667085]">Maintenance Calories (TDEE)</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">{result.tdee.toLocaleString()} cal</p>
                <p className="text-xs text-[#667085] mt-1">calories/day to maintain weight</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">BMR (at rest)</span>
                  <span className="font-semibold text-[#0B1020]">{result.bmr.toLocaleString()} cal</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">TDEE (with activity)</span>
                  <span className="font-semibold text-[#0B5A2A]">{result.tdee.toLocaleString()} cal</span>
                </div>
              </div>

              {/* Macros */}
              <div>
                <p className="text-sm font-bold text-[#0B1020] mb-2">Recommended Macros</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Protein", pct: "30%", grams: result.macros.protein.grams, bg: "#FFF4E5", text: "#B54708" },
                    { label: "Carbs", pct: "40%", grams: result.macros.carbs.grams, bg: "#ECFDF3", text: "#0B5A2A" },
                    { label: "Fats", pct: "30%", grams: result.macros.fats.grams, bg: "#EFF6FF", text: "#2563EB" },
                  ].map((m) => (
                    <div key={m.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: m.bg }}>
                      <p className="font-poppins text-lg font-bold" style={{ color: m.text }}>{m.grams}g</p>
                      <p className="text-xs font-semibold" style={{ color: m.text }}>{m.label}</p>
                      <p className="text-xs" style={{ color: m.text }}>{m.pct}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FDF2F8] text-[#DB2777]">
                <Apple className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter your details in the calculator to see your personalised calorie needs.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">BMR (at rest)</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">TDEE (with activity)</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Recommended macros</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Actual needs vary by individual metabolism, health, and goals.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
