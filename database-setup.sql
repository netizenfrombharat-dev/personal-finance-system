-- Personal Finance System Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    category VARCHAR(100) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Income Table
CREATE TABLE IF NOT EXISTS income (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    source VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Budgets Table
CREATE TABLE IF NOT EXISTS budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(100) NOT NULL UNIQUE,
    monthly_limit DECIMAL(12, 2) NOT NULL,
    rollover_enabled BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Savings Goals Table
CREATE TABLE IF NOT EXISTS savings_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    target_amount DECIMAL(12, 2) NOT NULL,
    current_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
    monthly_contribution DECIMAL(12, 2) NOT NULL,
    target_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Investments Table
CREATE TABLE IF NOT EXISTS investments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    type VARCHAR(100) NOT NULL,
    amount_invested DECIMAL(12, 2) NOT NULL,
    current_value DECIMAL(12, 2) NOT NULL,
    platform VARCHAR(100) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Debts Table
CREATE TABLE IF NOT EXISTS debts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(100) NOT NULL,
    lender VARCHAR(200) NOT NULL,
    interest_rate DECIMAL(5, 2) NOT NULL,
    outstanding_amount DECIMAL(12, 2) NOT NULL,
    monthly_emi DECIMAL(12, 2) NOT NULL,
    due_date INTEGER NOT NULL CHECK (due_date >= 1 AND due_date <= 31),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);
CREATE INDEX IF NOT EXISTS idx_income_date ON income(date DESC);
CREATE INDEX IF NOT EXISTS idx_investments_date ON investments(date DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE income ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE debts ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for single-user app)
-- Note: For multi-user app, you'd want to add user authentication and user-specific policies

CREATE POLICY "Enable all operations for all users" ON expenses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for all users" ON income FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for all users" ON budgets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for all users" ON savings_goals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for all users" ON investments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for all users" ON debts FOR ALL USING (true) WITH CHECK (true);

-- Insert sample data (optional - remove if you want to start fresh)

-- Sample Budgets
INSERT INTO budgets (category, monthly_limit, rollover_enabled, notes) VALUES
('Housing', 20000, false, 'Rent and maintenance'),
('Food', 10000, true, 'Groceries and dining'),
('Transportation', 5000, true, 'Fuel and public transport'),
('Utilities', 3000, false, 'Electricity, water, internet'),
('Entertainment', 3000, true, 'Movies, subscriptions, hobbies'),
('Healthcare', 2000, true, 'Medicine and doctor visits'),
('Shopping', 5000, true, 'Clothing and personal items'),
('Education', 2000, true, 'Courses and books')
ON CONFLICT (category) DO NOTHING;

-- Sample Savings Goal
INSERT INTO savings_goals (name, target_amount, current_amount, monthly_contribution, target_date) VALUES
('Emergency Fund', 100000, 25000, 5000, '2025-12-31')
ON CONFLICT DO NOTHING;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Database setup completed successfully!';
    RAISE NOTICE 'Tables created: expenses, income, budgets, savings_goals, investments, debts';
    RAISE NOTICE 'Sample data inserted for budgets and savings goals';
    RAISE NOTICE 'You can now start using your Personal Finance System!';
END $$;