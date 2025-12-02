import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      expenses: {
        Row: {
          id: string
          date: string
          category: string
          amount: number
          payment_method: string
          description: string
          notes: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['expenses']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['expenses']['Insert']>
      }
      income: {
        Row: {
          id: string
          date: string
          amount: number
          source: string
          type: string
          notes: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['income']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['income']['Insert']>
      }
      budgets: {
        Row: {
          id: string
          category: string
          monthly_limit: number
          rollover_enabled: boolean
          notes: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['budgets']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['budgets']['Insert']>
      }
      savings_goals: {
        Row: {
          id: string
          name: string
          target_amount: number
          current_amount: number
          monthly_contribution: number
          target_date: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['savings_goals']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['savings_goals']['Insert']>
      }
      investments: {
        Row: {
          id: string
          date: string
          type: string
          amount_invested: number
          current_value: number
          platform: string
          notes: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['investments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['investments']['Insert']>
      }
      debts: {
        Row: {
          id: string
          type: string
          lender: string
          interest_rate: number
          outstanding_amount: number
          monthly_emi: number
          due_date: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['debts']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['debts']['Insert']>
      }
    }
  }
}