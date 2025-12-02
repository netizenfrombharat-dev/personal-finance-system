'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { TrendingUp, TrendingDown, Wallet, Target, AlertCircle } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netSavings: 0,
    savingsRate: 0,
    totalInvestments: 0,
    totalDebts: 0,
    netWorth: 0
  })

  const [expensesByCategory, setExpensesByCategory] = useState<any[]>([])
  const [monthlyTrend, setMonthlyTrend] = useState<any[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    // Fetch income
    const { data: incomeData } = await supabase
      .from('income')
      .select('amount')
    
    const totalIncome = incomeData?.reduce((sum, item) => sum + item.amount, 0) || 0

    // Fetch expenses
    const { data: expensesData } = await supabase
      .from('expenses')
      .select('amount, category')
    
    const totalExpenses = expensesData?.reduce((sum, item) => sum + item.amount, 0) || 0

    // Group expenses by category
    const categoryMap = new Map()
    expensesData?.forEach(expense => {
      const current = categoryMap.get(expense.category) || 0
      categoryMap.set(expense.category, current + expense.amount)
    })
    
    const categoryData = Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value
    }))

    // Fetch investments
    const { data: investmentsData } = await supabase
      .from('investments')
      .select('current_value')
    
    const totalInvestments = investmentsData?.reduce((sum, item) => sum + item.current_value, 0) || 0

    // Fetch debts
    const { data: debtsData } = await supabase
      .from('debts')
      .select('outstanding_amount')
    
    const totalDebts = debtsData?.reduce((sum, item) => sum + item.outstanding_amount, 0) || 0

    const netSavings = totalIncome - totalExpenses
    const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0
    const netWorth = totalInvestments - totalDebts

    setStats({
      totalIncome,
      totalExpenses,
      netSavings,
      savingsRate,
      totalInvestments,
      totalDebts,
      netWorth
    })

    setExpensesByCategory(categoryData)
  }

  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Your complete financial overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Income"
          value={`₹${stats.totalIncome.toLocaleString()}`}
          icon={<TrendingUp className="text-green-500" />}
          trend="+12.5%"
          trendUp={true}
        />
        <StatCard
          title="Total Expenses"
          value={`₹${stats.totalExpenses.toLocaleString()}`}
          icon={<TrendingDown className="text-red-500" />}
          trend="+5.2%"
          trendUp={false}
        />
        <StatCard
          title="Net Savings"
          value={`₹${stats.netSavings.toLocaleString()}`}
          icon={<Wallet className="text-blue-500" />}
          trend={`${stats.savingsRate.toFixed(1)}%`}
          trendUp={stats.savingsRate > 20}
        />
        <StatCard
          title="Net Worth"
          value={`₹${stats.netWorth.toLocaleString()}`}
          icon={<Target className="text-purple-500" />}
          trend="+8.3%"
          trendUp={true}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Expenses by Category */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Expenses by Category
          </h3>
          {expensesByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No expense data yet
            </div>
          )}
        </div>

        {/* Budget Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Budget Status
          </h3>
          <div className="space-y-4">
            <BudgetBar category="Housing" spent={15000} budget={20000} />
            <BudgetBar category="Food" spent={8500} budget={10000} />
            <BudgetBar category="Transport" spent={3200} budget={5000} />
            <BudgetBar category="Entertainment" spent={4500} budget={3000} />
          </div>
        </div>
      </div>

      {/* Upcoming Bills */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upcoming Bills & Reminders
        </h3>
        <div className="space-y-3">
          <BillItem name="Credit Card Payment" amount={12500} dueDate="Dec 5" />
          <BillItem name="Electricity Bill" amount={2300} dueDate="Dec 8" />
          <BillItem name="Internet Bill" amount={999} dueDate="Dec 10" />
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, trend, trendUp }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      <div className={`text-sm ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
        {trend} from last month
      </div>
    </div>
  )
}

function BudgetBar({ category, spent, budget }: any) {
  const percentage = (spent / budget) * 100
  const isOverBudget = percentage > 100

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700 dark:text-gray-300">{category}</span>
        <span className="text-gray-500 dark:text-gray-400">
          ₹{spent.toLocaleString()} / ₹{budget.toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-green-500'}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  )
}

function BillItem({ name, amount, dueDate }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center gap-3">
        <AlertCircle className="text-orange-500" size={20} />
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Due: {dueDate}</div>
        </div>
      </div>
      <div className="font-semibold text-gray-900 dark:text-white">
        ₹{amount.toLocaleString()}
      </div>
    </div>
  )
}