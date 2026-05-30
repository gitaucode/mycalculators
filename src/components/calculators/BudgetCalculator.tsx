"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus, BarChart3, Wallet } from "lucide-react"

interface BudgetItem {
  id: string
  name: string
  amount: number
  category: string
}

export const BudgetCalculator = () => {
  const [income, setIncome] = useState<BudgetItem[]>([])
  const [expenses, setExpenses] = useState<BudgetItem[]>([])
  const [newIncomeItem, setNewIncomeItem] = useState({ name: "", amount: "", category: "salary" })
  const [newExpenseItem, setNewExpenseItem] = useState({ name: "", amount: "", category: "housing" })

  const incomeCategories = [
    { value: "salary", label: "Salary" },
    { value: "business", label: "Business" },
    { value: "freelance", label: "Freelance" },
    { value: "investments", label: "Investments" },
    { value: "other", label: "Other" },
  ]

  const expenseCategories = [
    { value: "housing", label: "Housing" },
    { value: "food", label: "Food & Dining" },
    { value: "transport", label: "Transport" },
    { value: "utilities", label: "Utilities" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "savings", label: "Savings" },
    { value: "other", label: "Other" },
  ]

  const addIncomeItem = () => {
    if (newIncomeItem.name && newIncomeItem.amount) {
      setIncome([...income, { id: Date.now().toString(), name: newIncomeItem.name, amount: Number.parseFloat(newIncomeItem.amount), category: newIncomeItem.category }])
      setNewIncomeItem({ name: "", amount: "", category: "salary" })
    }
  }

  const addExpenseItem = () => {
    if (newExpenseItem.name && newExpenseItem.amount) {
      setExpenses([...expenses, { id: Date.now().toString(), name: newExpenseItem.name, amount: Number.parseFloat(newExpenseItem.amount), category: newExpenseItem.category }])
      setNewExpenseItem({ name: "", amount: "", category: "housing" })
    }
  }

  const getCategoryLabel = (category: string, isIncome: boolean) => {
    const cats = isIncome ? incomeCategories : expenseCategories
    return cats.find((c) => c.value === category)?.label || category
  }

  const totalIncome = income.reduce((s, i) => s + i.amount, 0)
  const totalExpenses = expenses.reduce((s, i) => s + i.amount, 0)
  const netIncome = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? ((Math.max(0, netIncome) / totalIncome) * 100).toFixed(1) : "0.0"

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Income + Expense inputs */}
      <div className="space-y-4">
        {/* Income */}
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-xl font-bold tracking-tight text-[#0B5A2A]">Income Sources</CardTitle>
            <CardDescription className="text-sm leading-6 text-[#667085]">Add your monthly income sources.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
              <div className="space-y-1">
                <Label htmlFor="income-name" className="font-semibold text-[#0B1020] text-sm">Source Name</Label>
                <Input id="income-name" placeholder="e.g., Monthly Salary" value={newIncomeItem.name} onChange={(e) => setNewIncomeItem({ ...newIncomeItem, name: e.target.value })} className="h-11 rounded-xl border-[#E4E7EC]" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="income-amount" className="font-semibold text-[#0B1020] text-sm">Amount (KSH)</Label>
                <Input id="income-amount" type="number" placeholder="0" value={newIncomeItem.amount} onChange={(e) => setNewIncomeItem({ ...newIncomeItem, amount: e.target.value })} className="h-11 rounded-xl border-[#E4E7EC]" />
              </div>
              <Button onClick={addIncomeItem} className="h-11 rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20] px-4">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              <Label className="font-semibold text-[#0B1020] text-sm">Category</Label>
              <Select value={newIncomeItem.category} onValueChange={(v) => setNewIncomeItem({ ...newIncomeItem, category: v })}>
                <SelectTrigger className="h-11 rounded-xl border-[#E4E7EC]"><SelectValue /></SelectTrigger>
                <SelectContent>{incomeCategories.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>

            {income.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {income.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl bg-[#F0FAF4] p-3">
                    <div>
                      <p className="font-semibold text-sm text-[#0B1020]">{item.name}</p>
                      <p className="text-xs text-[#667085]">{getCategoryLabel(item.category, true)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0B5A2A] text-sm">KSH {item.amount.toLocaleString()}</span>
                      <Button variant="ghost" size="sm" onClick={() => setIncome(income.filter((i) => i.id !== item.id))} className="h-8 w-8 p-0 text-[#DC2626] hover:text-[#DC2626]">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Expenses */}
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-xl font-bold tracking-tight text-[#DC2626]">Expenses</CardTitle>
            <CardDescription className="text-sm leading-6 text-[#667085]">Add your monthly expenses.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
              <div className="space-y-1">
                <Label htmlFor="expense-name" className="font-semibold text-[#0B1020] text-sm">Expense Name</Label>
                <Input id="expense-name" placeholder="e.g., Rent" value={newExpenseItem.name} onChange={(e) => setNewExpenseItem({ ...newExpenseItem, name: e.target.value })} className="h-11 rounded-xl border-[#E4E7EC]" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="expense-amount" className="font-semibold text-[#0B1020] text-sm">Amount (KSH)</Label>
                <Input id="expense-amount" type="number" placeholder="0" value={newExpenseItem.amount} onChange={(e) => setNewExpenseItem({ ...newExpenseItem, amount: e.target.value })} className="h-11 rounded-xl border-[#E4E7EC]" />
              </div>
              <Button onClick={addExpenseItem} className="h-11 rounded-xl bg-[#DC2626] font-bold text-white hover:bg-[#B91C1C] px-4">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              <Label className="font-semibold text-[#0B1020] text-sm">Category</Label>
              <Select value={newExpenseItem.category} onValueChange={(v) => setNewExpenseItem({ ...newExpenseItem, category: v })}>
                <SelectTrigger className="h-11 rounded-xl border-[#E4E7EC]"><SelectValue /></SelectTrigger>
                <SelectContent>{expenseCategories.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>

            {expenses.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {expenses.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl bg-[#FEF2F2] p-3">
                    <div>
                      <p className="font-semibold text-sm text-[#0B1020]">{item.name}</p>
                      <p className="text-xs text-[#667085]">{getCategoryLabel(item.category, false)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#DC2626] text-sm">KSH {item.amount.toLocaleString()}</span>
                      <Button variant="ghost" size="sm" onClick={() => setExpenses(expenses.filter((i) => i.id !== item.id))} className="h-8 w-8 p-0 text-[#DC2626] hover:text-[#DC2626]">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right – Summary */}
      <Card className="rounded-[20px] border-[#CFEBDD] bg-[radial-gradient(circle_at_50%_18%,rgba(11,90,42,0.06),transparent_42%),#F7FAF8] shadow-[0_14px_36px_rgba(11,90,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Budget Summary</CardTitle>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]">
            <BarChart3 className="h-5 w-5" />
          </span>
        </CardHeader>
        <CardContent>
          {income.length > 0 || expenses.length > 0 ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-semibold text-[#667085]">{netIncome >= 0 ? "Monthly Surplus" : "Monthly Deficit"}</p>
                <p className={`mt-2 font-poppins text-3xl font-bold ${netIncome >= 0 ? "text-[#0B5A2A]" : "text-[#DC2626]"}`}>
                  KSH {Math.abs(netIncome).toLocaleString()}
                </p>
                {totalIncome > 0 && netIncome >= 0 && (
                  <p className="mt-1 text-xs font-semibold text-[#667085]">{savingsRate}% savings rate</p>
                )}
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Total Income</span>
                  <span className="font-semibold text-[#0B5A2A]">KSH {totalIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Total Expenses</span>
                  <span className="font-semibold text-[#DC2626]">KSH {totalExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Income items</span>
                  <span className="font-semibold text-[#0B1020]">{income.length}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Expense items</span>
                  <span className="font-semibold text-[#0B1020]">{expenses.length}</span>
                </div>
                <div className={`flex justify-between pt-1 text-base font-bold`}>
                  <span>{netIncome >= 0 ? "Surplus" : "Deficit"}</span>
                  <span className={netIncome >= 0 ? "text-[#0B5A2A]" : "text-[#DC2626]"}>KSH {Math.abs(netIncome).toLocaleString()}</span>
                </div>
              </div>
              {netIncome < 0 && (
                <div className="rounded-2xl border border-[#FEF9C3] bg-[#FEFCE8] p-4 text-sm text-[#854D0E]">
                  <p className="font-semibold mb-1">⚠️ Budget Alert</p>
                  <p>Your expenses exceed income by KSH {Math.abs(netIncome).toLocaleString()}. Consider reducing expenses or increasing income.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                <Wallet className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Add your income and expenses to see your monthly budget summary.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Total income</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Total expenses</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Net income</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Actual income and expenses may vary month to month.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
