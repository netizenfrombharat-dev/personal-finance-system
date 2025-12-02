'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, AlertTriangle } from 'lucide-react'

export default function BudgetPlanner() {
  const [budgets, setBudgets] = useState<any[]>([])
  const [expenses, setExpenses] = useState<any[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  
  const [formData, setFormData] = useState({
    category: '',
    monthly_limit: '',
    rollover_enabled: false,
    notes: ''
  })

  useEffect(() => {
    fetchBudgets()
    fetchExpenses()
  }, [])

  const fetchBudgets = async () => {
    const { data } = await supabase.from('budgets').select('*')
    if (data) setBudgets(data)
  }

  const fetchExpenses = async () => {
    const { data } = await supabase.from('expenses').select('*')
    if (data) setExpenses(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await supabase.from('budgets').insert([{
      ...formData,
      monthly_limit: parseFloat(formData.monthly_limit)
    }])
    setShowAddForm(false)
    setFormData({ category: '', monthly_limit: '', rollover_enabled: false, notes: '' })
    fetchBudgets()
  }

  const getSpentAmount = (category: string) => {
    return expenses
      .filter(e => e.category === category && new Date(e.date).getMonth() === new Date().getMonth())
      .reduce((sum, e) => sum + e.amount, 0)
  }

  const totalBudget = budgets.reduce((sum, b) => sum + b.monthly_limit, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + getSpentAmount(b.category), 0)

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Budget Planner</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Plan and track your monthly budgets</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus size={20} />
          Add Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Budget</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{totalBudget.toLocaleString()}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Spent</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{totalSpent.toLocaleString()}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Remaining</div>
          <div className={`text-2xl font-bold ${totalBudget - totalSpent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{(totalBudget - totalSpent).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {budgets.map((budget) => {
          const spent = getSpentAmount(budget.category)
          const remaining = budget.monthly_limit - spent
          const percentage = (spent / budget.monthly_limit) * 100
          const isOverBudget = percentage > 100
          const isWarning = percentage > 80 && percentage <= 100

          return (
            <div key={budget.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{budget.category}</h3>
                  {budget.rollover_enabled && (
                    <span className="text-xs text-primary-600 dark:text-primary-400">Rollover Enabled</span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ₹{spent.toLocaleString()} / ₹{budget.monthly_limit.toLocaleString()}
                  </div>
                  <div className={`text-sm font-medium ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {remaining >= 0 ? `₹${remaining.toLocaleString()} left` : `₹${Math.abs(remaining).toLocaleString()} over`}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      isOverBudget ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                {isOverBudget && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertTriangle size={16} />
                    <span>Budget exceeded by {(percentage - 100).toFixed(1)}%</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Budget</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Limit</label>
                <input
                  type="number"
                  value={formData.monthly_limit}
                  onChange={(e) => setFormData({...formData, monthly_limit: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.rollover_enabled}
                  onChange={(e) => setFormData({...formData, rollover_enabled: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="text-sm text-gray-700 dark:text-gray-300">Enable rollover to next month</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                  Add Budget
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}