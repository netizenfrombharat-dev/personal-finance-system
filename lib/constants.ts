// Application constants

export const EXPENSE_CATEGORIES = [
  'Housing',
  'Food',
  'Transportation',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Education',
  'Insurance',
  'Miscellaneous',
] as const

export const PAYMENT_METHODS = [
  'Cash',
  'UPI',
  'Credit Card',
  'Debit Card',
  'Net Banking',
] as const

export const INCOME_SOURCES = [
  'Salary',
  'Freelance',
  'Business',
  'Investment Returns',
  'Gift',
  'Other',
] as const

export const INCOME_TYPES = [
  'Regular',
  'Bonus',
  'One-time',
] as const

export const INVESTMENT_TYPES = [
  'Mutual Fund',
  'Stocks',
  'Index Fund',
  'Fixed Deposit',
  'PPF',
  'NPS',
  'Crypto',
  'Gold',
  'Real Estate',
] as const

export const DEBT_TYPES = [
  'Credit Card',
  'Personal Loan',
  'Home Loan',
  'Car Loan',
  'Education Loan',
  'Other',
] as const

export const CATEGORY_COLORS: Record<string, string> = {
  Housing: '#3b82f6',
  Food: '#10b981',
  Transportation: '#f59e0b',
  Utilities: '#8b5cf6',
  Entertainment: '#ec4899',
  Healthcare: '#ef4444',
  Shopping: '#06b6d4',
  Education: '#6366f1',
  Insurance: '#14b8a6',
  Miscellaneous: '#64748b',
}

export const CHART_COLORS = [
  '#0ea5e9',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#6366f1',
]

export const FINANCIAL_RULES = {
  RECOMMENDED_SAVINGS_RATE: 20,
  EMERGENCY_FUND_MONTHS: 6,
  HIGH_INTEREST_THRESHOLD: 15,
  BUDGET_WARNING_THRESHOLD: 80,
  BUDGET_DANGER_THRESHOLD: 100,
}

export const APP_CONFIG = {
  NAME: 'FinanceHub',
  TAGLINE: 'Your Money, Simplified',
  VERSION: '1.0.0',
  CURRENCY: 'INR',
  CURRENCY_SYMBOL: '₹',
  DATE_FORMAT: 'DD/MM/YYYY',
  LOCALE: 'en-IN',
}

export const ROUTES = {
  DASHBOARD: '/',
  EXPENSES: '/expenses',
  INCOME: '/income',
  BUDGET: '/budget',
  GOALS: '/goals',
  INVESTMENTS: '/investments',
  DEBTS: '/debts',
  INSIGHTS: '/insights',
  SETTINGS: '/settings',
} as const