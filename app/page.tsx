'use client'

import { useState, useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import Sidebar from '@/components/Sidebar'
import ExpenseTracker from '@/components/ExpenseTracker'
import IncomeTracker from '@/components/IncomeTracker'
import BudgetPlanner from '@/components/BudgetPlanner'
import SavingsGoals from '@/components/SavingsGoals'
import InvestmentTracker from '@/components/InvestmentTracker'
import DebtManager from '@/components/DebtManager'
import Insights from '@/components/Insights'
import Settings from '@/components/Settings'

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />
      case 'expenses':
        return <ExpenseTracker />
      case 'income':
        return <IncomeTracker />
      case 'budget':
        return <BudgetPlanner />
      case 'goals':
        return <SavingsGoals />
      case 'investments':
        return <InvestmentTracker />
      case 'debts':
        return <DebtManager />
      case 'insights':
        return <Insights />
      case 'settings':
        return <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  )
}