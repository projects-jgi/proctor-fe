import React from 'react';
import Link from 'next/link';

export default function FacultyDashboard() {
  const recentActivities = [
    { title: 'Latest Exam Submissions', date: '2024-03-22', icon: 'document', color: 'blue' },
    { title: 'Pending Approvals', date: '2024-03-20', icon: 'clock', color: 'amber' },
    { title: 'Exam Results Published', date: '2024-03-18', icon: 'check', color: 'green' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
                <Link href="/faculty/dashboard" className="flex items-center space-x-3 px-4 py-3 text-blue-600 font-semibold rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="font-medium">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty/addQuestion" className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">Exams</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty/question_bank" className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span className="font-medium">Question Bank</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty/stud_results" className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium">Results</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty/profile" className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-6 py-10">
        {/* Title Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Faculty Dashboard</h1>
          <p className="text-lg text-gray-600">Welcome back, <span className="font-semibold text-gray-900">Dr. Eleanor Reed</span></p>
        </div>

        {/* Overview Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Ongoing Exams Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <p className="text-blue-100 font-medium text-lg">Ongoing Exams</p>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-5xl font-bold text-white">3</p>
            </div>

            {/* Upcoming Exams Card */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <p className="text-purple-100 font-medium text-lg">Upcoming Exams</p>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-5xl font-bold text-white">2</p>
            </div>
          </div>

          {/* Student Performance Snapshot */}
          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Student Performance Snapshot</h3>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full shadow-md transition-all duration-500" style={{ width: '76%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700 font-medium">Average Score Across All Exams</p>
                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold text-lg">76%</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 font-semibold shadow-md hover:shadow-lg transition-all flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create New Exam</span>
            </button>
            <button className="bg-white text-gray-700 px-8 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 font-semibold transition-all flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span>View All Notifications</span>
            </button>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="grid grid-cols-1 gap-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group">
                <div className="flex items-center space-x-5">
                  <div className={`w-14 h-14 bg-gradient-to-br ${
                    activity.color === 'blue' ? 'from-blue-100 to-blue-200' :
                    activity.color === 'amber' ? 'from-amber-100 to-amber-200' :
                    'from-green-100 to-green-200'
                  } rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    {activity.icon === 'document' && (
                      <svg className={`w-7 h-7 ${
                        activity.color === 'blue' ? 'text-blue-600' :
                        activity.color === 'amber' ? 'text-amber-600' :
                        'text-green-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {activity.icon === 'clock' && (
                      <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {activity.icon === 'check' && (
                      <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-bold text-lg mb-1">{activity.title}</p>
                    <p className="text-sm text-gray-500 font-medium">{activity.date}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}