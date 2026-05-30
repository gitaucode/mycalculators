"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scale, TrendingUp, BarChart3, AlertTriangle } from "lucide-react"

interface BMIResult {
  bmi: number
  category: string
  healthyRange: string
  recommendation: string
  risks: string[]
  accentBg: string
  accentText: string
}

export function BmiCalculator() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [result, setResult] = useState<BMIResult | null>(null)

  const calculateBMI = () => {
    if (!height || !weight) return

    let heightInMeters: number
    let weightInKg: number

    if (unit === "metric") {
      heightInMeters = Number.parseFloat(height) / 100
      weightInKg = Number.parseFloat(weight)
    } else {
      heightInMeters = Number.parseFloat(height) * 0.0254
      weightInKg = Number.parseFloat(weight) * 0.453592
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters)
    setResult(getBMICategory(bmi))
  }

  const getBMICategory = (bmi: number): BMIResult => {
    if (bmi < 18.5) {
      return {
        bmi,
        category: "Underweight",
        healthyRange: "18.5 – 24.9",
        recommendation: "Consider gaining weight through a healthy diet and regular exercise.",
        accentBg: "#EFF6FF",
        accentText: "#2563EB",
        risks: ["Malnutrition", "Osteoporosis", "Decreased immunity", "Fertility issues"],
      }
    } else if (bmi < 25) {
      return {
        bmi,
        category: "Normal Weight",
        healthyRange: "18.5 – 24.9",
        recommendation: "Maintain your current weight through a balanced diet and regular exercise.",
        accentBg: "#ECFDF3",
        accentText: "#0B5A2A",
        risks: ["Lowest health risk category", "Continue healthy lifestyle habits"],
      }
    } else if (bmi < 30) {
      return {
        bmi,
        category: "Overweight",
        healthyRange: "18.5 – 24.9",
        recommendation: "Consider losing weight through diet and increased physical activity.",
        accentBg: "#FEF9C3",
        accentText: "#CA8A04",
        risks: ["High blood pressure", "Type 2 diabetes", "Heart disease", "Sleep apnea"],
      }
    } else {
      return {
        bmi,
        category: "Obese",
        healthyRange: "18.5 – 24.9",
        recommendation: "Consult a healthcare provider for a personalised weight management plan.",
        accentBg: "#FEF2F2",
        accentText: "#DC2626",
        risks: ["Heart disease", "Stroke", "Type 2 diabetes", "Certain cancers", "Sleep apnea"],
      }
    }
  }

  const getHealthyWeightRange = () => {
    if (!height) return null
    const hm = unit === "metric" ? Number.parseFloat(height) / 100 : Number.parseFloat(height) * 0.0254
    const min = 18.5 * hm * hm
    const max = 24.9 * hm * hm
    return unit === "metric"
      ? `${min.toFixed(1)} – ${max.toFixed(1)} kg`
      : `${(min * 2.20462).toFixed(1)} – ${(max * 2.20462).toFixed(1)} lbs`
  }

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs + BMI categories reference */}
      <div className="space-y-4">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020] flex items-center gap-2">
              <Scale className="h-6 w-6 text-[#DB2777]" />
              BMI Calculator
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Calculate your Body Mass Index and get personalised health recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Tabs value={unit} onValueChange={(v) => setUnit(v as "metric" | "imperial")}>
              <TabsList className="grid w-full grid-cols-2 rounded-xl">
                <TabsTrigger value="metric">Metric (cm / kg)</TabsTrigger>
                <TabsTrigger value="imperial">Imperial (in / lbs)</TabsTrigger>
              </TabsList>
              <TabsContent value="metric" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height-metric" className="font-semibold text-[#0B1020]">Height (cm)</Label>
                    <Input id="height-metric" type="number" placeholder="170" value={height} onChange={(e) => setHeight(e.target.value)} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight-metric" className="font-semibold text-[#0B1020]">Weight (kg)</Label>
                    <Input id="weight-metric" type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="imperial" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height-imperial" className="font-semibold text-[#0B1020]">Height (inches)</Label>
                    <Input id="height-imperial" type="number" placeholder="67" value={height} onChange={(e) => setHeight(e.target.value)} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight-imperial" className="font-semibold text-[#0B1020]">Weight (lbs)</Label>
                    <Input id="weight-imperial" type="number" placeholder="154" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <Button onClick={calculateBMI} disabled={!height || !weight} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
              <TrendingUp className="mr-2 h-4 w-4" /> Calculate BMI
            </Button>
            <div className="rounded-2xl bg-[#FDF2F8] p-4 text-sm leading-6 text-[#DB2777]">
              <p className="font-semibold">BMI reference ranges</p>
              <p>BMI is a screening tool. It does not distinguish muscle from fat — use it as a general guide only.</p>
            </div>
          </CardContent>
        </Card>

        {/* BMI Categories reference */}
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-lg font-bold text-[#0B1020]">BMI Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Underweight", range: "Below 18.5", bg: "#EFF6FF", text: "#2563EB" },
                { label: "Normal", range: "18.5 – 24.9", bg: "#ECFDF3", text: "#0B5A2A" },
                { label: "Overweight", range: "25.0 – 29.9", bg: "#FEF9C3", text: "#CA8A04" },
                { label: "Obese", range: "30.0+", bg: "#FEF2F2", text: "#DC2626" },
              ].map((cat) => (
                <div key={cat.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: cat.bg }}>
                  <p className="font-semibold text-sm" style={{ color: cat.text }}>{cat.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: cat.text }}>{cat.range}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="rounded-2xl border border-[#FEF9C3] bg-[#FEFCE8] p-5 text-sm leading-6 text-[#854D0E] space-y-1">
          <div className="flex items-center gap-2 font-semibold mb-1"><AlertTriangle className="h-4 w-4" /> Important Disclaimer</div>
          <p>• BMI is a screening tool and not a diagnostic measure.</p>
          <p>• It may not accurately reflect health for athletes, elderly, or pregnant women.</p>
          <p>• Consult healthcare professionals for a comprehensive health assessment.</p>
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
                <p className="text-sm font-semibold text-[#667085]">Your BMI</p>
                <p className="mt-2 font-poppins text-4xl font-bold" style={{ color: result.accentText }}>
                  {result.bmi.toFixed(1)}
                </p>
                <span className="mt-2 inline-flex rounded-full px-3 py-1 text-sm font-bold" style={{ backgroundColor: result.accentBg, color: result.accentText }}>
                  {result.category}
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Healthy BMI Range</span>
                  <span className="font-semibold text-[#0B1020]">{result.healthyRange}</span>
                </div>
                {height && (
                  <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                    <span className="text-[#667085]">Healthy Weight Range</span>
                    <span className="font-semibold text-[#0B1020]">{getHealthyWeightRange()}</span>
                  </div>
                )}
                <div className="rounded-xl p-3" style={{ backgroundColor: result.accentBg }}>
                  <p className="font-semibold text-sm mb-1" style={{ color: result.accentText }}>Recommendation</p>
                  <p className="text-sm" style={{ color: result.accentText }}>{result.recommendation}</p>
                </div>
                <div className="pt-1">
                  <p className="font-semibold text-[#0B1020] mb-2">Health Considerations</p>
                  <ul className="space-y-1">
                    {result.risks.map((risk, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#667085]">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#667085] shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                <Scale className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter your height and weight to calculate your BMI and see health recommendations.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">BMI score</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Category</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Healthy weight range</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Always consult a healthcare professional for medical advice.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
