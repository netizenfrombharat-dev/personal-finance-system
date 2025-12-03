// Type definitions for Personal Finance System

export interface Expense {
  id: string
  date: string
  category: string
  amount: number
  payment_method: string
  description: string
  notes: string | null
  created_at: string
}

export interface Income {
  id: string
  date: string
  amount: number
  source: string
  type: string
  notes: string | null
  created_at: string
}

export interface Budget {
  id: string
  category: string
  monthly_limit: number
  rollover_enabled: boolean
  notes: string | null
  created_at: string
}

export interface SavingsGoal {
  id: string
  name: string
  target_amount: number
  current_amount: number
  monthly_contribution: number
  target_date: string
  created_at: string
}

export interface Investment {
  id: string
  date: string
  type: string
  amount_invested: number
  current_value: number
  platform: string
  notes: string | null
  created_at: string
}

export interface Debt {
  id: string
  type: string
  lender: string
  interest_rate: number
  outstanding_amount: number
  monthly_emi: number
  due_date: number
  created_at: string
}

export interface FinancialStats {
  totalIncome: number
  totalExpenses: number
  netSavings: number
  savingsRate: number
  totalInvestments: number
  totalDebts: number
  netWorth: number
}

export interface Insight {
  type: 'success' | 'warning' | 'info' | 'error'
  icon: any
  title: string
  description: string
  action: string
}

export interface ChartData {
  name: string
  value: number
  color?: string
}

export type ViewType = 
  | 'dashboard' 
  | 'expenses' 
  | 'income' 
  | 'budget' 
  | 'goals' 
  | 'investments' 
  | 'debts' 
  | 'insights' 
  | 'settings'

export type PaymentMethod = 'Cash' | 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking'

export type IncomeType = 'Regular' | 'Bonus' | 'One-time'

export type InvestmentType = 
  | 'Mutual Fund' 
  | 'Stocks' 
  | 'Index Fund' 
  | 'Fixed Deposit' 
  | 'PPF' 
  | 'NPS' 
  | 'Crypto' 
  | 'Gold' 
  | 'Real Estate'

export type DebtType = 
  | 'Credit Card' 
  | 'Personal Loan' 
  | 'Home Loan' 
  | 'Car Loan' 
  | 'Education Loan' 
  | 'Other'