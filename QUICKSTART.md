# ⚡ Quick Start Guide

Get your Personal Finance System running in **10 minutes**!

## 🎯 What You'll Need

- Supabase account (free)
- Vercel account (free) OR Node.js installed locally

---

## 🚀 Option 1: Deploy to Vercel (Fastest - 5 minutes)

### Step 1: Set Up Database (3 minutes)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com) → Sign up/Login
   - Click "New Project"
   - Name: `finance-db`, Password: (create one), Region: (closest to you)
   - Wait 2 minutes for setup

2. **Run Database Setup**
   - In Supabase, click "SQL Editor" (left sidebar)
   - Click "New query"
   - Copy ALL content from `database-setup.sql` in this repo
   - Paste and click "Run"
   - ✅ You should see "Database setup completed successfully!"

3. **Get Your Keys**
   - Click "Settings" (gear icon) → "API"
   - Copy:
     - **Project URL** (e.g., `https://abc123.supabase.co`)
     - **anon public key** (long string starting with `eyJ...`)

### Step 2: Deploy App (2 minutes)

1. **One-Click Deploy**
   
   Click here: [![Deploy](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/netizenfrombharat-dev/personal-finance-system&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY)

2. **Configure**
   - Sign in with GitHub
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL` = (paste your Supabase URL)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (paste your anon key)
   - Click "Deploy"

3. **Done!**
   - Wait 2-3 minutes
   - Click "Visit" to open your app
   - 🎉 Your finance system is live!

---

## 🖥️ Option 2: Run Locally (10 minutes)

### Step 1: Set Up Database (Same as above - 3 minutes)

Follow "Step 1" from Option 1 above.

### Step 2: Clone and Install (3 minutes)

```bash
# Clone repository
git clone https://github.com/netizenfrombharat-dev/personal-finance-system.git
cd personal-finance-system

# Install dependencies
npm install
```

### Step 3: Configure Environment (1 minute)

```bash
# Create .env file
cp .env.example .env

# Edit .env and add your Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL=your_url_here
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### Step 4: Run App (1 minute)

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

## ✅ Verify Everything Works

1. **Add Test Expense**
   - Click "Add Expense"
   - Fill in: Date (today), Category (Food), Amount (500), Description (Lunch)
   - Click "Add Expense"
   - ✅ Should appear in the list

2. **Check Database**
   - Go to Supabase → "Table Editor" → "expenses"
   - ✅ You should see your test expense

3. **Test Other Features**
   - Add income
   - Create budget
   - Set savings goal
   - Toggle dark mode

---

## 🎨 First-Time Setup Recommendations

### 1. Set Up Your Budgets (2 minutes)

Go to "Budget" and add monthly limits:
- Housing: ₹15,000
- Food: ₹8,000
- Transportation: ₹3,000
- Utilities: ₹2,500
- Entertainment: ₹2,000

### 2. Create Savings Goals (1 minute)

Go to "Savings Goals" and add:
- Emergency Fund: ₹1,00,000 (target)
- Vacation: ₹50,000 (target)

### 3. Add Current Month Data (5 minutes)

- Add all expenses from this month
- Add your salary/income
- Add any investments
- Add any debts/loans

---

## 🆘 Troubleshooting

### "Failed to fetch" error
- ✅ Check environment variables are correct
- ✅ Verify Supabase URL starts with `https://`
- ✅ Ensure anon key is complete (very long string)

### Database connection error
- ✅ Run `database-setup.sql` again in Supabase
- ✅ Check RLS policies are enabled
- ✅ Verify project is not paused in Supabase

### Build fails
- ✅ Delete `node_modules` and `.next` folders
- ✅ Run `npm install` again
- ✅ Run `npm run build` to check for errors

### Charts not showing
- ✅ Add some data first (expenses, income)
- ✅ Refresh the page
- ✅ Check browser console for errors

---

## 📱 Mobile Access

### For Vercel Deployment:
- Your app URL: `https://your-project.vercel.app`
- Bookmark on phone home screen
- Works like a native app!

### For Local Development:
- Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
- Access from phone: `http://YOUR_IP:3000`
- Make sure phone is on same WiFi

---

## 🎯 Next Steps

1. ✅ Add this month's financial data
2. ✅ Set up all budget categories
3. ✅ Create your savings goals
4. ✅ Track investments and debts
5. ✅ Review insights weekly
6. ✅ Bookmark the app
7. ✅ Set up custom domain (optional)

---

## 📚 Learn More

- **Full Documentation**: See `README.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Database Schema**: See `database-setup.sql`
- **Contributing**: See `CONTRIBUTING.md`

---

## 🎉 You're All Set!

Start tracking your finances and building wealth today!

**Need help?** Open an issue on GitHub.

---

**Made with 💰 for better financial management**