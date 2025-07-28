"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus } from "lucide-react"

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
      const item: BudgetItem = {
        id: Date.now().toString(),
        name: newIncomeItem.name,
        amount: Number.parseFloat(newIncomeItem.amount),
        category: newIncomeItem.category,
      }
      setIncome([...income, item])
      setNewIncomeItem({ name: "", amount: "", category: "salary" })
    }
  }

  const addExpenseItem = () => {
    if (newExpenseItem.name && newExpenseItem.amount) {
      const item: BudgetItem = {
        id: Date.now().toString(),
        name: newExpenseItem.name,
        amount: Number.parseFloat(newExpenseItem.amount),
        category: newExpenseItem.category,
      }
      setExpenses([...expenses, item])
      setNewExpenseItem({ name: "", amount: "", category: "housing" })
    }
  }

  const removeIncomeItem = (id: string) => {
    setIncome(income.filter((item) => item.id !== id))
  }

  const removeExpenseItem = (id: string) => {
    setExpenses(expenses.filter((item) => item.id !== id))
  }

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0)
  const netIncome = totalIncome - totalExpenses

  const getCategoryLabel = (category: string, isIncome: boolean) => {
    const categories = isIncome ? incomeCategories : expenseCategories
    return categories.find((cat) => cat.value === category)?.label || category
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-success">Income Sources</CardTitle>
            <CardDescription>Add your monthly income sources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="income-name">Source Name</Label>
                <Input
                  id="income-name"
                  placeholder="e.g., Monthly Salary"
                  value={newIncomeItem.name}
                  onChange={(e) => setNewIncomeItem({ ...newIncomeItem, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="income-amount">Amount (KSH)</Label>
                <Input
                  id="income-amount"
                  type="number"
                  placeholder="0"
                  value={newIncomeItem.amount}
                  onChange={(e) => setNewIncomeItem({ ...newIncomeItem, amount: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="income-category">Category</Label>
                <Select
                  value={newIncomeItem.category}
                  onValueChange={(value) => setNewIncomeItem({ ...newIncomeItem, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {incomeCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addIncomeItem} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Income
              </Button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {income.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-success/5 rounded">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{getCategoryLabel(item.category, true)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-success">KSH {item.amount.toLocaleString()}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeIncomeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expenses Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Expenses</CardTitle>
            <CardDescription>Add your monthly expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="expense-name">Expense Name</Label>
                <Input
                  id="expense-name"
                  placeholder="e.g., Rent"
                  value={newExpenseItem.name}
                  onChange={(e) => setNewExpenseItem({ ...newExpenseItem, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="expense-amount">Amount (KSH)</Label>
                <Input
                  id="expense-amount"
                  type="number"
                  placeholder="0"
                  value={newExpenseItem.amount}
                  onChange={(e) => setNewExpenseItem({ ...newExpenseItem, amount: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="expense-category">Category</Label>
                <Select
                  value={newExpenseItem.category}
                  onValueChange={(value) => setNewExpenseItem({ ...newExpenseItem, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addExpenseItem} variant="destructive" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {expenses.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-destructive/5 rounded">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{getCategoryLabel(item.category, false)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-destructive">KSH {item.amount.toLocaleString()}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeExpenseItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-success/5 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-2xl font-bold text-success">KSH {totalIncome.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-destructive/5 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold text-destructive">KSH {totalExpenses.toLocaleString()}</p>
            </div>
            <div className={`text-center p-4 rounded-lg ${netIncome >= 0 ? "bg-success/5" : "bg-warning/5"}`}>
              <p className="text-sm text-muted-foreground">Net Income</p>
              <p className={`text-2xl font-bold ${netIncome >= 0 ? "text-success" : "text-warning"}`}>
                KSH {netIncome.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{netIncome >= 0 ? "Surplus" : "Deficit"}</p>
            </div>
          </div>

          {netIncome < 0 && (
            <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-warning font-medium">⚠️ Budget Alert</p>
              <p className="text-sm text-muted-foreground">
                Your expenses exceed your income by KSH {Math.abs(netIncome).toLocaleString()}. Consider reducing
                expenses or increasing income.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
