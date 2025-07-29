"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplets, Thermometer, Activity, Sun } from "lucide-react"

export function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [climate, setClimate] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [unit, setUnit] = useState("metric")
  const [results, setResults] = useState<{
    baseWater: number
    activityWater: number
    climateWater: number
    totalWater: number
    cupsPerDay: number
    bottlesPerDay: number
  } | null>(null)

  const activityLevels = {
    sedentary: { label: "Sedentary (little/no exercise)", extra: 0 },
    light: { label: "Light activity (1-3 days/week)", extra: 350 },
    moderate: { label: "Moderate activity (3-5 days/week)", extra: 500 },
    active: { label: "Very active (6-7 days/week)", extra: 750 },
    extra: { label: "Extra active (2x/day, intense)", extra: 1000 },
  }

  const climateTypes = {
    temperate: { label: "Temperate (mild weather)", extra: 0 },
    hot: { label: "Hot climate (>30°C/86°F)", extra: 500 },
    humid: { label: "Hot & humid", extra: 750 },
    dry: { label: "Hot & dry", extra: 1000 },
  }

  const calculateWaterIntake = () => {
    if (!weight || !activityLevel || !climate || !age || !gender) return

    let weightInKg = Number.parseFloat(weight)

    // Convert to metric if needed
    if (unit === "imperial") {
      weightInKg = Number.parseFloat(weight) * 0.453592 // pounds to kg
    }

    // Base water intake calculation
    // General formula: 35ml per kg of body weight
    let baseWater = weightInKg * 35

    // Adjust for age
    const ageNum = Number.parseInt(age)
    if (ageNum > 65) {
      baseWater *= 0.9 // Elderly need slightly less
    } else if (ageNum < 18) {
      baseWater *= 1.1 // Young people need slightly more
    }

    // Adjust for gender (men typically need more)
    if (gender === "male") {
      baseWater *= 1.1
    }

    // Additional water for activity
    const activityWater = activityLevels[activityLevel as keyof typeof activityLevels].extra

    // Additional water for climate
    const climateWater = climateTypes[climate as keyof typeof climateTypes].extra

    // Total water intake
    const totalWater = baseWater + activityWater + climateWater

    // Convert to cups (250ml per cup) and bottles (500ml per bottle)
    const cupsPerDay = Math.round(totalWater / 250)
    const bottlesPerDay = Math.round((totalWater / 500) * 10) / 10

    setResults({
      baseWater: Math.round(baseWater),
      activityWater,
      climateWater,
      totalWater: Math.round(totalWater),
      cupsPerDay,
      bottlesPerDay,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Droplets className="h-5 w-5" />
            <span>Water Intake Calculator</span>
          </CardTitle>
          <CardDescription>
            Calculate your daily water needs based on weight, activity level, and environmental factors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={unit} onValueChange={setUnit}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="metric">Metric (kg)</TabsTrigger>
              <TabsTrigger value="imperial">Imperial (lbs)</TabsTrigger>
            </TabsList>

            <TabsContent value="metric" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight-metric">Weight (kg)</Label>
                  <Input
                    id="weight-metric"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    min="30"
                    max="200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="30"
                    min="10"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="imperial" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight-imperial">Weight (lbs)</Label>
                  <Input
                    id="weight-imperial"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="154"
                    min="66"
                    max="440"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="30"
                    min="10"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="activity">Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(activityLevels).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="climate">Climate</Label>
              <Select value={climate} onValueChange={setClimate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select climate" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(climateTypes).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={calculateWaterIntake}
            className="w-full"
            disabled={!weight || !activityLevel || !climate || !age || !gender}
          >
            Calculate Water Intake
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Droplets className="h-5 w-5 text-blue-600" />
                <span>Base Need</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-2">{results.baseWater}ml</div>
              <p className="text-sm text-muted-foreground">Based on body weight</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span>Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-2">+{results.activityWater}ml</div>
              <p className="text-sm text-muted-foreground">Exercise adjustment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Sun className="h-5 w-5 text-orange-600" />
                <span>Climate</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600 mb-2">+{results.climateWater}ml</div>
              <p className="text-sm text-muted-foreground">Weather adjustment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Thermometer className="h-5 w-5 text-purple-600" />
                <span>Total Daily</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 mb-2">{results.totalWater}ml</div>
              <p className="text-sm text-muted-foreground">Recommended intake</p>
            </CardContent>
          </Card>
        </div>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Daily Water Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{results.cupsPerDay}</div>
                <p className="text-sm text-muted-foreground">Cups per day (250ml each)</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{results.bottlesPerDay}</div>
                <p className="text-sm text-muted-foreground">Water bottles (500ml each)</p>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Hydration Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Start your day with a glass of water</li>
                <li>• Drink water before, during, and after exercise</li>
                <li>• Monitor urine color - pale yellow indicates good hydration</li>
                <li>• Increase intake during illness, pregnancy, or breastfeeding</li>
                <li>• Include water-rich foods like fruits and vegetables</li>
              </ul>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>
                <strong>Note:</strong> These are general recommendations. Individual needs may vary based on health
                conditions, medications, and other factors. Consult healthcare providers for personalized hydration
                advice, especially if you have kidney problems or heart conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
