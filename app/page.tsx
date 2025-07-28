"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  CreditCard,
  PiggyBank,
  Zap,
  Home,
  DollarSign,
  TrendingUp,
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
} from "lucide-react"
import { useState, useEffect } from "react"
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
import { Header, Footer } from "../src/components/layout/HeaderFooter"

const Index = () => {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null)

  // Scroll to top when activeCalculator changes
  useEffect(() => {
    if (activeCalculator) {
      window.scrollTo(0, 0)
    }
  }, [activeCalculator])

  const calculators = [
    {
      id: "mpesa",
      title: "Mpesa Charges",
      description:
        "Calculate transaction charges for all Mpesa services including send money, withdrawals, and payments",
      icon: CreditCard,
      component: MpesaCalculator,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      popular: true,
    },
    {
      id: "loan",
      title: "Loan Calculator",
      description: "Calculate monthly payments, interest rates, and amortization schedules for all loan types",
      icon: Calculator,
      component: LoanCalculator,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      popular: true,
    },
    {
      id: "net-salary",
      title: "Net Salary Calculator",
      description: "Estimate your take-home pay after all deductions like PAYE, NHIF, and NSSF.",
      icon: Wallet,
      component: NetSalaryCalculator,
      color: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600",
      popular: true,
    },
    {
      id: "fuliza",
      title: "Fuliza Calculator",
      description: "Estimate the total repayment for your Fuliza overdraft, including access fees and daily charges.",
      icon: Landmark,
      component: FulizaCalculator,
      color: "bg-red-50 border-red-200",
      iconColor: "text-red-600",
      popular: true,
    },
    {
      id: "car-import-tax",
      title: "Car Import Tax Calculator",
      description: "Calculate import taxes and duties for vehicles imported to Kenya with detailed breakdown.",
      icon: Car,
      component: CarImportTaxCalculator,
      color: "bg-slate-50 border-slate-200",
      iconColor: "text-slate-600",
      popular: true,
    },
    {
      id: "budget",
      title: "Budget Planner",
      description: "Track income and expenses across categories to optimize your monthly budget",
      icon: PiggyBank,
      component: BudgetCalculator,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
      popular: false,
    },
    {
      id: "electricity",
      title: "Electricity Calculator",
      description: "Estimate KPLC token units and costs with accurate tariff calculations",
      icon: Zap,
      component: ElectricityCalculator,
      color: "bg-yellow-50 border-yellow-200",
      iconColor: "text-yellow-600",
      popular: false,
    },
    {
      id: "cost-of-living",
      title: "Cost of Living",
      description: "Compare living expenses across Kenyan cities for better relocation decisions",
      icon: Home,
      component: CostOfLivingCalculator,
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
      popular: false,
    },
    {
      id: "construction-cost",
      title: "Construction Cost Calculator",
      description: "Estimate the cost of building a house in Kenya based on area and quality.",
      icon: Building,
      component: ConstructionCostCalculator,
      color: "bg-teal-50 border-teal-200",
      iconColor: "text-teal-600",
      popular: false,
    },
    {
      id: "bill-splitting",
      title: "Bill Splitting Calculator",
      description: "Easily split bills among friends, including individual items and shared expenses.",
      icon: Split,
      component: BillSplittingCalculator,
      color: "bg-pink-50 border-pink-200",
      iconColor: "text-pink-600",
      popular: false,
    },
    {
      id: "school-fee-planner",
      title: "School Fee Planner",
      description: "Project future school fees and total costs over time with annual increments.",
      icon: GraduationCap,
      component: SchoolFeePlanner,
      color: "bg-cyan-50 border-cyan-200",
      iconColor: "text-cyan-600",
      popular: false,
    },
    {
      id: "roi-estimator",
      title: "ROI Estimator",
      description: "Estimate the potential return on your investment over time with compound interest.",
      icon: Percent,
      component: RoiEstimator,
      color: "bg-lime-50 border-lime-200",
      iconColor: "text-lime-600",
      popular: false,
    },
    {
      id: "vat-calculator",
      title: "VAT Calculator",
      description: "Calculate VAT amounts for prices, converting between VAT inclusive and exclusive.",
      icon: ReceiptText,
      component: VatCalculator,
      color: "bg-gray-50 border-gray-200",
      iconColor: "text-gray-600",
      popular: false,
    },
    {
      id: "savings-goal",
      title: "Savings Goal Calculator",
      description:
        "Determine how long it will take to reach your savings target with regular contributions and interest.",
      icon: Target,
      component: SavingsGoalCalculator,
      color: "bg-emerald-50 border-emerald-200",
      iconColor: "text-emerald-600",
      popular: false,
    },
  ]

  if (activeCalculator) {
    const calculator = calculators.find((c) => c.id === activeCalculator)
    if (calculator) {
      const Component = calculator.component
      return (
        <>
          <Header />
          <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
            <div className="container mx-auto px-4 py-6 lg:py-12">
              <div className="mb-6 lg:mb-8">
                <Button
                  variant="outline"
                  onClick={() => setActiveCalculator(null)}
                  className="mb-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  ← Back to Toolkit
                </Button>
                <div className="space-y-2">
                  <h1 className="text-2xl lg:text-4xl font-poppins font-bold text-foreground">{calculator.title}</h1>
                  <p className="text-muted-foreground text-sm lg:text-base max-w-2xl">{calculator.description}</p>
                </div>
              </div>
              <Component />
            </div>
          </div>
          <Footer />
        </>
      )
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
        <div className="container mx-auto px-4 py-8 lg:py-16">
          {/* Hero Section */}
          <div className="text-center mb-12 lg:mb-20">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <DollarSign className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">🇰🇪</span>
                </div>
              </div>
            </div>
            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-poppins font-bold text-foreground mb-4 lg:mb-6 leading-tight">
              Kenyan Financial
              <span className="block text-primary">Toolkit</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Essential financial calculators and tools designed specifically for Kenyan consumers. Make informed
              financial decisions with accurate, up-to-date calculations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-success" />
                <span>Accurate Rates</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-success" />
                <span>Always Updated</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-success" />
                <span>Kenya-Focused</span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-12 lg:mb-20">
            <div className="text-center p-4 lg:p-6 bg-white rounded-xl shadow-sm border border-border/50">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">13+</div>
              <div className="text-sm text-muted-foreground">Calculators</div>
            </div>
            <div className="text-center p-4 lg:p-6 bg-white rounded-xl shadow-sm border border-border/50">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Free to Use</div>
            </div>
            <div className="text-center p-4 lg:p-6 bg-white rounded-xl shadow-sm border border-border/50">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">📱</div>
              <div className="text-sm text-muted-foreground">Mobile Ready</div>
            </div>
            <div className="text-center p-4 lg:p-6 bg-white rounded-xl shadow-sm border border-border/50">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">🇰🇪</div>
              <div className="text-sm text-muted-foreground">Kenya Only</div>
            </div>
          </div>

          {/* Calculator Cards */}
          <div id="calculators" className="scroll-mt-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-poppins font-bold text-foreground mb-4">
                Choose Your Calculator
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select from our comprehensive suite of financial tools designed for Kenyan markets
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {calculators.map((calculator) => {
                const Icon = calculator.icon
                return (
                  <Card
                    key={calculator.id}
                    className={`group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/30 hover:-translate-y-1 ${calculator.color} relative overflow-hidden`}
                    onClick={() => setActiveCalculator(calculator.id)}
                  >
                    {calculator.popular && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                          Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="pb-4">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 bg-white rounded-xl shadow-sm border ${calculator.iconColor}`}>
                          <Icon className="h-6 w-6 lg:h-7 lg:w-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg lg:text-xl font-poppins font-semibold text-foreground group-hover:text-primary transition-colors">
                            {calculator.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <CardDescription className="text-muted-foreground mb-6 text-sm lg:text-base leading-relaxed">
                        {calculator.description}
                      </CardDescription>
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        Open Calculator
                        <TrendingUp className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* About Section */}
          <div id="about" className="scroll-mt-20 mt-20 lg:mt-32">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-border/50">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl lg:text-3xl font-poppins font-bold text-foreground mb-6">
                  Why Choose Our Financial Toolkit?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Built specifically for the Kenyan market with accurate, up-to-date rates and fees. Our tools help you
                  make smarter financial decisions whether you're budgeting, taking a loan, or planning your expenses.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Accurate Data</h3>
                    <p className="text-sm text-muted-foreground">Current rates and fees from official sources</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Always Updated</h3>
                    <p className="text-sm text-muted-foreground">Regularly maintained with latest information</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Kenya-Focused</h3>
                    <p className="text-sm text-muted-foreground">Designed for Kenyan financial landscape</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Index
