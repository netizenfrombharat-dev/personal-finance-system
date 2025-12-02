'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react'

export default function Insights() {
  const [insights, setInsights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateInsights()
  }, [])

  const generateInsights = async () => {
    const newInsights: any[] = []

    // Fetch all data
    const { data: expenses } = await supabase.from('expenses').select('*')
    const { data: income } = await supabase.from('income').select('*')
    const { data: budgets } = await supabase.from('budgets').select('*')
    const { data: investments } = await supabase.from('investments').select('*')

    // Current month data
    const currentMonth = new Date().getMonth()
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
    
    const currentMonthExpenses = expenses?.filter(e => new Date(e.date).getMonth() === currentMonth) || []
    const lastMonthExpenses = expenses?.filter(e => new Date(e.date).getMonth() === lastMonth) || []

    // Insight 1: Spending Trend
    const currentTotal = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0)
    const lastTotal = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0)
    const spendingChange = lastTotal > 0 ? ((currentTotal - lastTotal) / lastTotal) * 100 : 0

    if (Math.abs(spendingChange) > 10) {
      newInsights.push({
        type: spendingChange > 0 ? 'warning' : 'success',
        icon: spendingChange > 0 ? TrendingUp : TrendingDown,
        title: `Spending ${spendingChange > 0 ? 'Increased' : 'Decreased'} by ${Math.abs(spendingChange).toFixed(1)}%`,
        description: `You spent ₹${currentTotal.toLocaleString()} this month compared to ₹${lastTotal.toLocaleString()} last month.`,
        action: spendingChange > 0 ? 'Review your expenses and identify areas to cut back' : 'Great job! Keep up the good spending habits'
      })
    }

    // Insight 2: Category Analysis
    const categorySpending = new Map()
    currentMonthExpenses.forEach(e => {
      categorySpending.set(e.category, (categorySpending.get(e.category) || 0) + e.amount)
    })

    const topCategory = Array.from(categorySpending.entries()).sort((a, b) => b[1] - a[1])[0]
    if (topCategory) {
      newInsights.push({
        type: 'info',
        icon: Lightbulb,
        title: `Highest Spending: ${topCategory[0]}`,
        description: `You've spent ₹${topCategory[1].toLocaleString()} on ${topCategory[0]} this month.`,
        action: 'Consider if this aligns with your financial priorities'
      })
    }

    // Insight 3: Budget Alerts
    budgets?.forEach(budget => {
      const spent = currentMonthExpenses
        .filter(e => e.category === budget.category)
        .reduce((sum, e) => sum + e.amount, 0)
      const percentage = (spent / budget.monthly_limit) * 100

      if (percentage > 90) {
        newInsights.push({
          type: 'warning',
          icon: AlertTriangle,
          title: `${budget.category} Budget Alert`,
          description: `You've used ${percentage.toFixed(0)}% of your ${budget.category} budget (₹${spent.toLocaleString()} / ₹${budget.monthly_limit.toLocaleString()})`,
          action: 'Reduce spending in this category for the rest of the month'
        })
      }
    })

    // Insight 4: Savings Rate
    const totalIncome = income?.reduce((sum, i) => sum + i.amount, 0) || 0
    const totalExpenses = expenses?.reduce((sum, e) => sum + e.amount, 0) || 0
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0

    if (savingsRate < 20) {
      newInsights.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Low Savings Rate',
        description: `Your savings rate is ${savingsRate.toFixed(1)}%. Financial experts recommend saving at least 20% of your income.`,
        action: 'Try to increase your savings by reducing discretionary expenses'
      })
    } else if (savingsRate > 30) {
      newInsights.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Excellent Savings Rate!',
        description: `You're saving ${savingsRate.toFixed(1)}% of your income. This is above the recommended 20%.`,
        action: 'Consider investing your surplus savings for better returns'
      })
    }

    // Insight 5: Investment Returns
    const totalInvested = investments?.reduce((sum, i) => sum + i.amount_invested, 0) || 0
    const totalCurrent = investments?.reduce((sum, i) => sum + i.current_value, 0) || 0
    const returns = totalCurrent - totalInvested
    const returnsPercent = totalInvested > 0 ? (returns / totalInvested) * 100 : 0

    if (totalInvested > 0) {
      newInsights.push({
        type: returnsPercent >= 0 ? 'success' : 'warning',
        icon: returnsPercent >= 0 ? TrendingUp : TrendingDown,
        title: `Investment Returns: ${returnsPercent >= 0 ? '+' : ''}${returnsPercent.toFixed(2)}%`,
        description: `Your investments have ${returnsPercent >= 0 ? 'gained' : 'lost'} ₹${Math.abs(returns).toLocaleString()}.`,
        action: returnsPercent < 0 ? 'Review your investment strategy and consider rebalancing' : 'Your investments are performing well'
      })
    }

    // Insight 6: Unused Subscriptions (mock data - would need subscription tracking)
    const subscriptionExpenses = currentMonthExpenses.filter(e => 
      e.description.toLowerCase().includes('subscription') || 
      e.description.toLowerCase().includes('netflix') ||
      e.description.toLowerCase().includes('spotify')
    )

    if (subscriptionExpenses.length > 0) {
      const subscriptionTotal = subscriptionExpenses.reduce((sum, e) => sum + e.amount, 0)
      newInsights.push({
        type: 'info',
        icon: Lightbulb,
        title: 'Subscription Review',
        description: `You're spending ₹${subscriptionTotal.toLocaleString()} on subscriptions this month.`,
        action: 'Review and cancel any subscriptions you no longer use'
      })
    }

    setInsights(newInsights)
    setLoading(false)
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 dark:text-green-400'
      case 'warning': return 'text-yellow-600 dark:text-yellow-400'
      case 'info': return 'text-blue-600 dark:text-blue-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 dark:bg-green-900'
      case 'warning': return 'bg-yellow-100 dark:bg-yellow-900'
      case 'info': return 'bg-blue-100 dark:bg-blue-900'
      default: return 'bg-gray-100 dark:bg-gray-900'
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Insights</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">AI-powered insights to improve your finances</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          Analyzing your financial data...
        </div>
      ) : insights.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center">
          <Lightbulb className="mx-auto mb-4 text-gray-400" size={48} />
          <div className="text-gray-500 dark:text-gray-400">
            Not enough data to generate insights yet. Keep tracking your finances!
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getBgColor(insight.type)}`}>
                    <Icon className={getIconColor(insight.type)} size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {insight.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {insight.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500 dark:text-gray-400">💡 Action:</span>
                      <span className="text-primary-600 dark:text-primary-400 font-medium">
                        {insight.action}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Quick Tips */}
      <div className="mt-8 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">💡 Quick Financial Tips</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• Follow the 50-30-20 rule: 50% needs, 30% wants, 20% savings</li>
          <li>• Build an emergency fund covering 6 months of expenses</li>
          <li>• Pay off high-interest debts first (credit cards)</li>
          <li>• Automate your savings on salary day</li>
          <li>• Review and adjust your budget monthly</li>
          <li>• Invest consistently through SIPs for long-term wealth</li>
        </ul>
      </div>
    </div>
  )
}