'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Target, TrendingUp } from 'lucide-react'

export default function SavingsGoals() {
  const [goals, setGoals] = useState<any[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    target_amount: '',
    current_amount: '',
    monthly_contribution: '',
    target_date: ''
  })

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    const { data } = await supabase.from('savings_goals').select('*')
    if (data) setGoals(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await supabase.from('savings_goals').insert([{
      ...formData,
      target_amount: parseFloat(formData.target_amount),
      current_amount: parseFloat(formData.current_amount),
      monthly_contribution: parseFloat(formData.monthly_contribution)
    }])
    setShowAddForm(false)
    setFormData({ name: '', target_amount: '', current_amount: '', monthly_contribution: '', target_date: '' })
    fetchGoals()
  }

  const calculateMonthsRemaining = (targetDate: string) => {
    const target = new Date(targetDate)
    const now = new Date()
    const months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth())
    return Math.max(0, months)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Savings Goals</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track your financial goals</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus size={20} />
          Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = (goal.current_amount / goal.target_amount) * 100
          const remaining = goal.target_amount - goal.current_amount
          const monthsLeft = calculateMonthsRemaining(goal.target_date)
          const requiredMonthly = monthsLeft > 0 ? remaining / monthsLeft : 0

          return (
            <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <Target className="text-primary-600 dark:text-primary-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{goal.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Target: {new Date(goal.target_date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Current</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ₹{goal.current_amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Target</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ₹{goal.target_amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Remaining</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ₹{remaining.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Monthly Contribution</span>
                  <span className="font-medium text-primary-600 dark:text-primary-400">
                    ₹{goal.monthly_contribution.toLocaleString()}
                  </span>
                </div>
                {monthsLeft > 0 && requiredMonthly > goal.monthly_contribution && (
                  <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-yellow-800 dark:text-yellow-200 text-xs">
                    Increase to ₹{Math.ceil(requiredMonthly).toLocaleString()}/month to reach goal on time
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Savings Goal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goal Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., Emergency Fund"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Amount</label>
                <input
                  type="number"
                  value={formData.target_amount}
                  onChange={(e) => setFormData({...formData, target_amount: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Amount</label>
                <input
                  type="number"
                  value={formData.current_amount}
                  onChange={(e) => setFormData({...formData, current_amount: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Contribution</label>
                <input
                  type="number"
                  value={formData.monthly_contribution}
                  onChange={(e) => setFormData({...formData, monthly_contribution: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Date</label>
                <input
                  type="date"
                  value={formData.target_date}
                  onChange={(e) => setFormData({...formData, target_date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                  Add Goal
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