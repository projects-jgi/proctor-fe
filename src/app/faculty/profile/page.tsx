"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [examNotifications, setExamNotifications] = useState(false);
  const [submissionNotifications, setSubmissionNotifications] = useState(false);
  const [examDuration, setExamDuration] = useState('');
  const [immediateResultViewing, setImmediateResultViewing] = useState(false);
  const [gptEnabled, setGptEnabled] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('gpt5_mini_enabled');
      if (stored !== null) setGptEnabled(stored === 'true');
    } catch (e) {
      // ignore localStorage read errors in environments where it's not available
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('gpt5_mini_enabled', gptEnabled ? 'true' : 'false');
    } catch (e) {
      // ignore localStorage write errors
    }
  }, [gptEnabled]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center rounded-lg shadow-md">
                <span className="text-white text-sm font-bold">▲</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Exam Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <span className="text-white text-sm font-bold">DR</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen shadow-sm">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/faculty/dashboard" className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-all group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="font-medium">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty/addQuestion" className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-all group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">Exams</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty/question_bank" className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-all group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span className="font-medium">Question Bank</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty/stud_results" className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-all group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium">Results</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty/profile" className="flex items-center space-x-3 px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-semibold">Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-blue-600 font-medium">Manage your profile, account settings, and preferences.</p>
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Profile Picture</label>
                <div className="flex items-center space-x-4">
                  <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Choose Image</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 font-semibold shadow-md hover:shadow-lg transition-all">
              Save Profile
            </button>
          </div>

          {/* Account Settings Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none pr-12"
                    placeholder="Enter password"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              <button className="bg-white text-gray-700 px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 font-semibold transition-all">
                Change Password
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none appearance-none bg-white cursor-pointer"
                >
                  <option value="">Select language</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Time Zone</label>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none appearance-none bg-white cursor-pointer"
                >
                  <option value="">Select time zone</option>
                  <option value="pst">PST (UTC-8)</option>
                  <option value="est">EST (UTC-5)</option>
                  <option value="gmt">GMT (UTC+0)</option>
                </select>
              </div>
              
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Enable GPT-5 mini for all clients</h3>
                  <p className="text-sm text-gray-600">When enabled, the GPT-5 mini assistant will be available to all connected clients (demo-only; this is stored locally).</p>
                </div>
                <button
                  onClick={() => setGptEnabled(!gptEnabled)}
                  role="switch"
                  aria-checked={gptEnabled}
                  aria-label="Enable GPT-5 mini for all clients"
                  className={`ml-4 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    gptEnabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      gptEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{gptEnabled ? 'On' : 'Off'}</span>
                </button>
              </div>
            </div>

            <button className="mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 font-semibold shadow-md hover:shadow-lg transition-all">
              Save Preferences
            </button>
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
            
            <div className="space-y-6">
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Exam Notifications</h3>
                  <p className="text-sm text-gray-600">Receive notifications about exam schedules, updates, and important announcements.</p>
                </div>
                <button
                  onClick={() => setExamNotifications(!examNotifications)}
                  className={`ml-4 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    examNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      examNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Submission Notifications</h3>
                  <p className="text-sm text-gray-600">Get notified when students submit their exams or when results are available.</p>
                </div>
                <button
                  onClick={() => setSubmissionNotifications(!submissionNotifications)}
                  className={`ml-4 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    submissionNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      submissionNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <button className="mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 font-semibold shadow-md hover:shadow-lg transition-all">
              Save Notifications
            </button>
          </div>

          {/* Exam Configuration Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Exam Configuration</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Default Exam Duration (minutes)</label>
                <input
                  type="number"
                  value={examDuration}
                  onChange={(e) => setExamDuration(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  placeholder="Enter duration in minutes"
                />
              </div>

              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Immediate Result Viewing</h3>
                  <p className="text-sm text-gray-600">Allow students to view their results immediately after submission.</p>
                </div>
                <button
                  onClick={() => setImmediateResultViewing(!immediateResultViewing)}
                  className={`ml-4 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    immediateResultViewing ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      immediateResultViewing ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <button className="mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 font-semibold shadow-md hover:shadow-lg transition-all">
              Save Exam Configuration
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}