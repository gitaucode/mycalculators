"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CalculatorIcon,
  CreditCard,
  PiggyBank,
  Zap,
  HomeIcon,
  Shield,
  Clock,
  Users,
  Wallet,
  Building,
  Split,
  GraduationCap,
  Percent,
  Landmark,
  Target,
  ReceiptText,
  Car,
  ArrowRight,
  CheckCircle,
  Baby,
  Scale,
  Apple,
  Calendar,
  Droplets,
  Heart,
} from "lucide-react"

// Import calculators
import { MpesaCalculator } from "../src/components/calculators/MpesaCalculator"
import { LoanCalculator } from "../src/components/calculators/LoanCalculator"
import { BudgetCalculator } from "../src/components/calculators/BudgetCalculator"
import { ElectricityCalculator } from "../src/components/calculators/ElectricityCalculator"
import { CostOfLivingCalculator } from "../src/components/calculators/CostOfLivingCalculator"
import { NetSalaryCalculator } from "../src/components/calculators/NetSalaryCalculator"
import { FulizaCalculator } from "../src/components/calculators/FulizaCalculator"
import { ConstructionCostCalculator } from "../src/components/calculators/ConstructionCostCalculator"
import { BillSplittingCalculator } from "../src/components/calculators/BillSplittingCalculator"
import { SchoolFeePlanner } from "../src/components/calculators/SchoolFeePlanner"
import { RoiEstimator } from "../src/components/calculators/RoiEstimator"
import { VatCalculator } from "../src/components/calculators/VatCalculator"
import { SavingsGoalCalculator } from "../src/components/calculators/SavingsGoalCalculator"
import { CarImportTaxCalculator } from "../src/components/calculators/CarImportTaxCalculator"
import { PregnancyDueDateCalculator } from "../src/components/calculators/PregnancyDueDateCalculator"
import { BmiCalculator } from "../src/components/calculators/BmiCalculator"
import { CalorieCalculator } from "../src/components/calculators/CalorieCalculator"
import { OvulationTracker } from "../src/components/calculators/OvulationTracker"
import { WaterIntakeCalculator } from "../src/components/calculators/WaterIntakeCalculator"
import { HeartRateZonesCalculator } from "../src/components/calculators/HeartRateZonesCalculator"
import { Header, Footer } from "../src/components/layout/HeaderFooter"

type CalculatorId = string

interface CalculatorType {
  id: CalculatorId
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  component: React.ComponentType
  category: string
  popular: boolean
}

const calculators: CalculatorType[] = [
  {
    id: "mpesa",
    title: "M-Pesa Charges",
    description: "Calculate transaction fees for send money, withdrawals, and payments",
    icon: CreditCard,
    component: MpesaCalculator,
    category: "Mobile Money",
    popular: true,
  },
  {
    id: "loan",
    title: "Loan Calculator",
    description: "Calculate monthly payments, interest, and amortization schedules",
    icon: CalculatorIcon,
    component: LoanCalculator,
    category: "Loans",
    popular: true,
  },
  {
    id: "net-salary",
    title: "Net Salary",
    description: "Calculate take-home pay after PAYE, NHIF, and NSSF deductions",
    icon: Wallet,
    component: NetSalaryCalculator,
    category: "Salary",
    popular: true,
  },
  {
    id: "fuliza",
    title: "Fuliza Calculator",
    description: "Calculate overdraft fees and total repayment amounts",
    icon: Landmark,
    component: FulizaCalculator,
    category: "Mobile Money",
    popular: true,
  },
  {
    id: "car-import-tax",
    title: "Car Import Tax",
    description: "Calculate import duties and taxes for vehicles",
    icon: Car,
    component: CarImportTaxCalculator,
    category: "Tax",
    popular: true,
  },
  {
    id: "budget",
    title: "Budget Planner",
    description: "Track income and expenses across categories",
    icon: PiggyBank,
    component: BudgetCalculator,
    category: "Budgeting",
    popular: false,
  },
  {
    id: "electricity",
    title: "Electricity Calculator",
    description: "Calculate KPLC token units and costs",
    icon: Zap,
    component: ElectricityCalculator,
    category: "Utilities",
    popular: false,
  },
  {
    id: "cost-of-living",
    title: "Cost of Living",
    description: "Compare living expenses across Kenyan cities",
    icon: HomeIcon,
    component: CostOfLivingCalculator,
    category: "Living Costs",
    popular: false,
  },
  {
    id: "construction-cost",
    title: "Construction Cost",
    description: "Estimate building costs based on area and quality",
    icon: Building,
    component: ConstructionCostCalculator,
    category: "Construction",
    popular: false,
  },
  {
    id: "bill-splitting",
    title: "Bill Splitting",
    description: "Split bills fairly among friends or roommates",
    icon: Split,
    component: BillSplittingCalculator,
    category: "Utilities",
    popular: false,
  },
  {
    id: "school-fee-planner",
    title: "School Fee Planner",
    description: "Project future education costs with annual increments",
    icon: GraduationCap,
    component: SchoolFeePlanner,
    category: "Education",
    popular: false,
  },
  {
    id: "roi-estimator",
    title: "ROI Estimator",
    description: "Calculate investment returns with compound interest",
    icon: Percent,
    component: RoiEstimator,
    category: "Investment",
    popular: false,
  },
  {
    id: "vat-calculator",
    title: "VAT Calculator",
    description: "Convert between VAT inclusive and exclusive prices",
    icon: ReceiptText,
    component: VatCalculator,
    category: "Tax",
    popular: false,
  },
  {
    id: "savings-goal",
    title: "Savings Goal",
    description: "Plan timeline to reach savings targets with regular contributions",
    icon: Target,
    component: SavingsGoalCalculator,
    category: "Savings",
    popular: false,
  },
  {
    id: "pregnancy-due-date",
    title: "Pregnancy Due Date",
    description: "Estimate due date, trimester, weeks left",
    icon: Baby,
    component: PregnancyDueDateCalculator,
    category: "Health",
    popular: false,
  },
  {
    id: "bmi-calculator",
    title: "BMI Calculator",
    description: "Body Mass Index from height & weight",
    icon: Scale,
    component: BmiCalculator,
    category: "Health",
    popular: false,
  },
  {
    id: "calorie-calculator",
    title: "Calorie Calculator",
    description: "Estimate daily calorie needs (BMR)",
    icon: Apple,
    component: CalorieCalculator,
    category: "Health",
    popular: false,
  },
  {
    id: "ovulation-tracker",
    title: "Ovulation Tracker",
    description: "Show fertile window from menstrual cycle",
    icon: Calendar,
    component: OvulationTracker,
    category: "Health",
    popular: false,
  },
  {
    id: "water-intake",
    title: "Water Intake",
    description: "Daily recommended water based on weight & activity",
    icon: Droplets,
    component: WaterIntakeCalculator,
    category: "Health",
    popular: false,
  },
  {
    id: "heart-rate-zones",
    title: "Heart Rate Zones",
    description: "Calculate training zones based on age and fitness level",
    icon: Heart,
    component: HeartRateZonesCalculator,
    category: "Health",
    popular: false,
  },
]

const categoryColors = {
  "Mobile Money": {
    bg: "bg-green-50 dark:bg-green-950/20",
    border: "border-green-200 dark:border-green-800",
    icon: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-100 dark:bg-green-900/30",
    hover: "hover:bg-green-100 dark:hover:bg-green-900/40",
  },
  Loans: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
    icon: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    hover: "hover:bg-blue-100 dark:hover:bg-blue-900/40",
  },
  Tax: {
    bg: "bg-red-50 dark:bg-red-950/20",
    border: "border-red-200 dark:border-red-800",
    icon: "text-red-600 dark:text-red-400",
    iconBg: "bg-red-100 dark:bg-red-900/30",
    hover: "hover:bg-red-100 dark:hover:bg-red-900/40",
  },
  Salary: {
    bg: "bg-orange-50 dark:bg-orange-950/20",
    border: "border-orange-200 dark:border-orange-800",
    icon: "text-orange-600 dark:text-orange-400",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    hover: "hover:bg-orange-100 dark:hover:bg-orange-900/40",
  },
  Utilities: {
    bg: "bg-yellow-50 dark:bg-yellow-950/20",
    border: "border-yellow-200 dark:border-yellow-800",
    icon: "text-yellow-600 dark:text-yellow-400",
    iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
    hover: "hover:bg-yellow-100 dark:hover:bg-yellow-900/40",
  },
  Budgeting: {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-800",
    icon: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    hover: "hover:bg-purple-100 dark:hover:bg-purple-900/40",
  },
  Savings: {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-800",
    icon: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    hover: "hover:bg-purple-100 dark:hover:bg-purple-900/40",
  },
  "Living Costs": {
    bg: "bg-teal-50 dark:bg-teal-950/20",
    border: "border-teal-200 dark:border-teal-800",
    icon: "text-teal-600 dark:text-teal-400",
    iconBg: "bg-teal-100 dark:bg-teal-900/30",
    hover: "hover:bg-teal-100 dark:hover:bg-teal-900/40",
  },
  Construction: {
    bg: "bg-teal-50 dark:bg-teal-950/20",
    border: "border-teal-200 dark:border-teal-800",
    icon: "text-teal-600 dark:text-teal-400",
    iconBg: "bg-teal-100 dark:bg-teal-900/30",
    hover: "hover:bg-teal-100 dark:hover:bg-teal-900/40",
  },
  Education: {
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    border: "border-indigo-200 dark:border-indigo-800",
    icon: "text-indigo-600 dark:text-indigo-400",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
    hover: "hover:bg-indigo-100 dark:hover:bg-indigo-900/40",
  },
  Investment: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
    icon: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    hover: "hover:bg-blue-100 dark:hover:bg-blue-900/40",
  },
  Health: {
    bg: "bg-pink-50 dark:bg-pink-950/20",
    border: "border-pink-200 dark:border-pink-800",
    icon: "text-pink-600 dark:text-pink-400",
    iconBg: "bg-pink-100 dark:bg-pink-900/30",
    hover: "hover:bg-pink-100 dark:hover:bg-pink-900/40",
  },
}

export default function Main() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorId | null>(null)

  // Scroll to top when calculator changes
  useEffect(() => {
    if (activeCalculator) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [activeCalculator])

  // Calculator view
  if (activeCalculator) {
    const calculator = calculators.find((c) => c.id === activeCalculator)
    if (calculator) {
      const Component = calculator.component
      return (
        <>
          <Header />
          <div className="min-h-screen bg-gradient-to-br from-background to-muted/10">
            <div className="container mx-auto px-4 py-8">
              {/* Calculator Header */}
              <div className="mb-8">
                <Button variant="ghost" onClick={() => setActiveCalculator(null)} className="mb-6 -ml-2">
                  ← Back to Calculators
                </Button>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <calculator.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-heading-1">{calculator.title}</h1>
                      <Badge variant="secondary" className="mt-1">
                        {calculator.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-body-large text-muted-foreground max-w-2xl">{calculator.description}</p>
                </div>
              </div>

              {/* Calculator Component */}
              <Component />
            </div>
          </div>
          <Footer />
        </>
      )
    }
  }

  // Home view
  const popularCalculators = calculators.filter((calc) => calc.popular)
  const otherCalculators = calculators.filter((calc) => !calc.popular)

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <CalculatorIcon className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-sm text-white">🇰🇪</span>
                </div>
              </div>
            </div>

            <h1 className="text-display text-foreground mb-6 leading-tight">
              Financial Toolkit
              <span className="block text-primary">for Kenya</span>
            </h1>

            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto mb-8">
              Make smarter money decisions with calculators built specifically for Kenyan consumers. Accurate rates,
              always updated.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-caption">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Always Accurate</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Free Forever</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Kenya-Focused</span>
              </div>
            </div>
          </div>

          {/* Popular Calculators */}
          <div id="calculators" className="scroll-mt-20 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-heading-1 text-foreground mb-4">Most Used Calculators</h2>
              <p className="text-body text-muted-foreground max-w-xl mx-auto">
                Start with these essential tools used by thousands of Kenyans daily
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {popularCalculators.map((calculator) => {
                const Icon = calculator.icon
                const colors = categoryColors[calculator.category as keyof typeof categoryColors]
                return (
                  <Card
                    key={calculator.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${colors.bg} ${colors.border} ${colors.hover} shadow-sm`}
                    onClick={() => setActiveCalculator(calculator.id)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center transition-colors`}
                          >
                            <Icon className={`h-6 w-6 ${colors.icon}`} />
                          </div>
                          <div>
                            <CardTitle className="text-heading-3 transition-colors">{calculator.title}</CardTitle>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {calculator.category}
                            </Badge>
                          </div>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20 shadow-sm">Popular</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-body text-muted-foreground mb-4">
                        {calculator.description}
                      </CardDescription>
                      <Button className="w-full">
                        Open Calculator
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <Separator className="mb-16" />

          {/* All Calculators */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-heading-2 text-foreground mb-4">All Calculators</h2>
              <p className="text-body text-muted-foreground">Complete suite of financial planning tools</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {otherCalculators.map((calculator) => {
                const Icon = calculator.icon
                const colors = categoryColors[calculator.category as keyof typeof categoryColors]
                return (
                  <Card
                    key={calculator.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.01] ${colors.bg} ${colors.border} ${colors.hover} shadow-sm p-4`}
                    onClick={() => setActiveCalculator(calculator.id)}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center transition-colors`}
                      >
                        <Icon className={`h-5 w-5 ${colors.icon}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-heading-3 text-sm transition-colors truncate">{calculator.title}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {calculator.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-caption text-muted-foreground line-clamp-2">{calculator.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* About Section */}
          <div id="about" className="scroll-mt-20">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-muted/20 p-8 lg:p-12">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-heading-1 text-foreground mb-6">Built for Kenyan Consumers</h2>
                <p className="text-body-large text-muted-foreground leading-relaxed mb-12">
                  Our calculators use current rates from official sources like CBK, KRA, and service providers. Make
                  confident financial decisions with tools designed specifically for the Kenyan market.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-heading-3 text-foreground mb-2">Always Accurate</h3>
                    <p className="text-body text-muted-foreground">Updated with latest rates from official sources</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-heading-3 text-foreground mb-2">Regularly Updated</h3>
                    <p className="text-body text-muted-foreground">Maintained with current regulations and fees</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-heading-3 text-foreground mb-2">Kenya-Focused</h3>
                    <p className="text-body text-muted-foreground">Designed for Kenyan financial landscape</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
