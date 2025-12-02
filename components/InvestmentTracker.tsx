'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, TrendingUp, TrendingDown } from 'lucide-react'

export default function InvestmentTracker() {
  const [investments, setInvestments] = useState<any[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Mutual Fund',
    amount_invested: '',
    current_value: '',
    platform: '',
    notes: ''
  })

  const types = ['Mutual Fund', 'Stocks', 'Index Fund', 'Fixed Deposit', 'PPF', 'NPS', 'Crypto', 'Gold', 'Real Estate']

  useEffect(() => {
    fetchInvestments()
  }, [])

  const fetchInvestments = async () => {
    const { data } = await supabase.from('investments').select('*').order('date', { ascending: false })
    if (data) setInvestments(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await supabase.from('investments').insert([{
      ...formData,
      amount_invested: parseFloat(formData.amount_invested),
      current_value: parseFloat(formData.current_value)
    }])
    setShowAddForm(false)
    setFormData({ date: new Date().toISOString().split('T')[0], type: 'Mutual Fund', amount_invested: '', current_value: '', platform: '', notes: '' })
    fetchInvestments()
  }

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount_invested, 0)
  const totalCurrent = investments.reduce((sum, inv) => sum + inv.current_value, 0)
  const totalReturns = totalCurrent - totalInvested
  const returnsPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Investment Tracker</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Monitor your investment portfolio</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Plus size={20} />
          Add Investment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Invested</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{totalInvested.toLocaleString()}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Value</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{totalCurrent.toLocaleString()}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Returns</div>
          <div className={`text-2xl font-bold ${totalReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalReturns >= 0 ? '+' : ''}₹{totalReturns.toLocaleString()}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Returns %</div>
          <div className={`text-2xl font-bold flex items-center gap-2 ${returnsPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {returnsPercentage >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            {returnsPercentage.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Platform</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Invested</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Current Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Returns</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {investments.map((inv) => {
              const returns = inv.current_value - inv.amount_invested
              const returnsPercent = (returns / inv.amount_invested) * 100

              return (
                <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {new Date(inv.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                      {inv.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{inv.platform}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    ₹{inv.amount_invested.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                    ₹{inv.current_value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className={`font-semibold ${returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {returns >= 0 ? '+' : ''}₹{returns.toLocaleString()}
                    </div>
                    <div className={`text-xs ${returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ({returnsPercent.toFixed(2)}%)
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {investments.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No investments tracked yet. Add your first investment!
          </div>
        )}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Investment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount Invested</label>
                <input
                  type="number"
                  value={formData.amount_invested}
                  onChange={(e) => setFormData({...formData, amount_invested: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Value</label>
                <input
                  type="number"
                  value={formData.current_value}
                  onChange={(e) => setFormData({...formData, current_value: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Platform</label>
                <input
                  type="text"
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., Zerodha, Groww"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  Add Investment
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