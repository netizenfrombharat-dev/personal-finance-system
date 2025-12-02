# 💰 Personal Finance System

A complete, modern personal finance management application built with Next.js, TypeScript, and Supabase. Track expenses, income, budgets, savings goals, investments, and debts with intelligent insights and automation.

![Personal Finance System](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue) ![Supabase](https://img.shields.io/badge/Supabase-Latest-green)

## ✨ Features

### 📊 **Unified Financial Dashboard**
- Real-time net worth tracking (assets - liabilities)
- Monthly cash-flow summary (income vs expenses)
- Upcoming bills with reminders
- Snapshot of savings, investments, and debts

### 💸 **Smart Expense Tracking**
- Quick manual entry
- Automatic categorization
- Search and filter capabilities
- Payment method tracking
- Monthly and category-wise analysis

### 💰 **Income Management**
- Track multiple income sources (salary, freelance, investments)
- Regular vs one-time income classification
- Income trend analysis

### 🎯 **Budget Planning**
- Category-based budgeting
- Soft and hard limits with warnings
- Rollover budgeting (unused amounts carry forward)
- Real-time budget vs actual tracking
- Visual progress indicators

### 🎯 **Savings Goals**
- Multiple goal tracking (emergency fund, travel, purchases)
- Target amount and date
- Monthly contribution planning
- Progress visualization
- Smart recommendations for goal achievement

### 📈 **Investment Tracking**
- Portfolio overview (mutual funds, stocks, FDs, crypto, etc.)
- Returns calculation and visualization
- Asset allocation analysis
- Platform-wise tracking

### 💳 **Debt Management**
- Track all debts (credit cards, loans, EMIs)
- Interest rate monitoring
- Payment due date reminders
- High-interest debt alerts

### 💡 **Intelligent Insights**
- Spending anomaly detection
- Budget alerts and warnings
- Savings rate analysis
- Investment performance tracking
- Subscription review suggestions
- Personalized financial tips

### 🎨 **Modern UI/UX**
- Clean, minimalist design
- Dark/light mode support
- Responsive layout (mobile, tablet, desktop)
- Interactive charts and visualizations
- Smooth animations and transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works great)
- Git

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/netizenfrombharat-dev/personal-finance-system.git
cd personal-finance-system
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API
3. Copy your project URL and anon key
4. Run the SQL from `database-setup.sql` in the Supabase SQL Editor

### 4. Configure Environment Variables
\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` and add your Supabase credentials:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### 5. Run the Development Server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod

## 🗂️ Project Structure

\`\`\`
personal-finance-system/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Dashboard.tsx      # Main dashboard
│   ├── ExpenseTracker.tsx # Expense management
│   ├── IncomeTracker.tsx  # Income management
│   ├── BudgetPlanner.tsx  # Budget planning
│   ├── SavingsGoals.tsx   # Savings goals
│   ├── InvestmentTracker.tsx # Investment tracking
│   ├── DebtManager.tsx    # Debt management
│   ├── Insights.tsx       # AI insights
│   ├── Settings.tsx       # App settings
│   └── Sidebar.tsx        # Navigation sidebar
├── lib/                   # Utility functions
│   └── supabase.ts        # Supabase client
├── database-setup.sql     # Database schema
└── README.md             # This file
\`\`\`

## 🎯 Usage Guide

### Adding Expenses
1. Click "Add Expense" button
2. Fill in date, category, amount, payment method, and description
3. Expenses are automatically categorized and tracked

### Setting Up Budgets
1. Go to Budget Planner
2. Add budget for each category
3. Enable rollover if you want unused amounts to carry forward
4. Monitor budget vs actual spending in real-time

### Creating Savings Goals
1. Navigate to Savings Goals
2. Set goal name, target amount, and target date
3. Define monthly contribution
4. Track progress with visual indicators

### Tracking Investments
1. Go to Investment Tracker
2. Add investments with type, amount, and current value
3. Monitor returns and portfolio performance

### Managing Debts
1. Open Debt Manager
2. Add debts with interest rates and EMI details
3. Get alerts for high-interest debts
4. Track payment due dates

## 🔒 Security & Privacy

- ✅ All data stored securely in your Supabase database
- ✅ No third-party tracking or analytics
- ✅ Your financial data never leaves your control
- ✅ Row-level security (RLS) enabled on all tables
- ✅ Environment variables for sensitive credentials

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/netizenfrombharat-dev/personal-finance-system)

### Deploy to Other Platforms
- **Netlify:** Connect GitHub repo and deploy
- **Railway:** Import from GitHub
- **Render:** Connect and deploy

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with ❤️ using Next.js and Supabase
- Icons by Lucide
- Charts by Recharts

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Made with 💰 for better financial management**