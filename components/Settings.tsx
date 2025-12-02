'use client'

import { Moon, Sun, Download, Upload, Trash2 } from 'lucide-react'

interface SettingsProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

export default function Settings({ darkMode, setDarkMode }: SettingsProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Customize your experience</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Dark Mode</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode theme</div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Management</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <Download className="text-primary-600 dark:text-primary-400" size={20} />
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">Export Data</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Download all your data as CSV</div>
                </div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <Upload className="text-primary-600 dark:text-primary-400" size={20} />
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">Import Data</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Import data from CSV file</div>
                </div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <div className="flex items-center gap-3">
                <Trash2 className="text-red-600 dark:text-red-400" size={20} />
                <div className="text-left">
                  <div className="font-medium text-red-600 dark:text-red-400">Clear All Data</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Permanently delete all your data</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Version</span>
              <span className="font-medium text-gray-900 dark:text-white">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Built with</span>
              <span className="font-medium text-gray-900 dark:text-white">Next.js + Supabase</span>
            </div>
            <div className="flex justify-between">
              <span>License</span>
              <span className="font-medium text-gray-900 dark:text-white">MIT</span>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Privacy & Security</h3>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>✓ All data is stored securely in your Supabase database</p>
            <p>✓ No third-party tracking or analytics</p>
            <p>✓ Your financial data never leaves your control</p>
            <p>✓ End-to-end encryption for sensitive information</p>
          </div>
        </div>
      </div>
    </div>
  )
}