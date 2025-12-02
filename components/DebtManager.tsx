'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, CreditCard, AlertCircle } from 'lucide-react'

export default function DebtManager() {
  const [debts, setDebts] = useState<any[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  
  const [formData, setFormData] = useState({
    type: 'Credit Card',
    lender: '',
    interest_rate: '',
    outstanding_amount: '',
    monthly_emi: '',
    due_date: '5'
  })

  const types = ['Credit Card', 'Personal Loan', 'Home Loan', 'Car Loan', 'Education Loan', 'Other']

  useEffect(() => {
    fetchDebts()
  }, [])

  const fetchDebts = async () => {
    const { data } = await supabase.from('debts').select('*')
    if (data) setDebts(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await supabase.from('debts').insert([{
      ...formData,
      interest_rate: parseFloat(formData.interest_rate),
      outstanding_amount: parseFloat(formData.outstanding_amount),
      monthly_emi: parseFloat(formData.monthly_emi),
      due_date: parseInt(formData.due_date)
    }])
    setShowAddForm(false)
    setFormData({ type: 'Credit Card', lender: '', interest_rate: '', outstanding_amount: '', monthly_emi: '', due_date: '5' })
    fetchDebts()
  }

  const totalDebt = debts.reduce((sum, debt) => sum + debt.outstanding_amount, 0)
  const totalMonthlyEMI = debts.reduce((sum, debt) => sum + debt.monthly_emi, 0)
  const avgInterestRate = debts.length > 0 
    ? debts.reduce((sum, debt) => sum + debt.interest_rate, 0) / debts.length 
    : 0

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Debt Manager</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage your debts</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Plus size={20} />
          Add Debt
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Debt</div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            ₹{totalDebt.toLocaleString()}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Monthly EMI</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{totalMonthlyEMI.toLocaleString()}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg Interest Rate</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {avgInterestRate.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {debts.map((debt) => (
          <div key={debt.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                  <CreditCard className="text-red-600 dark:text-red-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{debt.type}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{debt.lender}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  ₹{debt.outstanding_amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Outstanding</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Monthly EMI</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  ₹{debt.monthly_emi.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Interest Rate</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {debt.interest_rate}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Due Date</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {debt.due_date} of month
                </div>
              </div>
            </div>

            {debt.interest_rate > 15 && (
              <div className="mt-4 flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-800 dark:text-yellow-200 text-sm">
                <AlertCircle size={16} />
                <span>High interest rate - consider prioritizing this debt for early repayment</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {debts.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center">
          <div className="text-gray-500 dark:text-gray-400">
            No debts tracked. Great job staying debt-free!
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Debt</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lender</label>
                <input
                  type="text"
                  value={formData.lender}
                  onChange={(e) => setFormData({...formData, lender: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., HDFC Bank"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.interest_rate}
                  onChange={(e) => setFormData({...formData, interest_rate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Outstanding Amount</label>
                <input
                  type="number"
                  value={formData.outstanding_amount}
                  onChange={(e) => setFormData({...formData, outstanding_amount: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly EMI</label>
                <input
                  type="number"
                  value={formData.monthly_emi}
                  onChange={(e) => setFormData({...formData, monthly_emi: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date (Day of Month)</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={formData.due_date}
                  onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                  Add Debt
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