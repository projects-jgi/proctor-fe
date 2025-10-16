"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function StudentResults() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');

  const allStudents = [
    { name: 'Liam Carter', exam: 'Midterm Exam', score: '85/100', status: 'Pass', class: 'class-a' },
    { name: 'Olivia Bennett', exam: 'Final Exam', score: '92/100', status: 'Pass', class: 'class-b' },
    { name: 'Noah Thompson', exam: 'Midterm Exam', score: '78/100', status: 'Pass', class: 'class-a' },
    { name: 'Ava Harper', exam: 'Final Exam', score: '65/100', status: 'Pass', class: 'class-c' },
    { name: 'Ethan Foster', exam: 'Midterm Exam', score: '50/100', status: 'Fail', class: 'class-b' },
    { name: 'Isabella Hayes', exam: 'Final Exam', score: '88/100', status: 'Pass', class: 'class-a' },
    { name: 'Mason Reynolds', exam: 'Midterm Exam', score: '72/100', status: 'Pass', class: 'class-c' },
    { name: 'Sophia Morgan', exam: 'Final Exam', score: '95/100', status: 'Pass', class: 'class-b' },
    { name: 'Jackson Reed', exam: 'Midterm Exam', score: '60/100', status: 'Pass', class: 'class-a' },
    { name: 'Amelia Cox', exam: 'Final Exam', score: '45/100', status: 'Fail', class: 'class-c' }
  ];

  // Filter students based on search query and filters
  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = !selectedClass || student.class === selectedClass;
    const matchesExam = !selectedExam || 
                       (selectedExam === 'midterm' && student.exam === 'Midterm Exam') ||
                       (selectedExam === 'final' && student.exam === 'Final Exam');
    
    return matchesSearch && matchesClass && matchesExam;
  });

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
                <Link href="/faculty/stud_results" className="flex items-center space-x-3 px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-semibold">Results</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty/profile" className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-all group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <main className="flex-1 p-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Results</h1>
            <p className="text-blue-600 font-medium">View and manage student performance in exams</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name or ID"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none cursor-pointer font-medium text-gray-700"
            >
              <option value="">Class</option>
              <option value="class-a">Class A</option>
              <option value="class-b">Class B</option>
              <option value="class-c">Class C</option>
            </select>

            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none cursor-pointer font-medium text-gray-700"
            >
              <option value="">Exam</option>
              <option value="midterm">Midterm Exam</option>
              <option value="final">Final Exam</option>
            </select>

            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none cursor-pointer font-medium text-gray-700"
            >
              <option value="">Date Range</option>
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
              <option value="last-quarter">Last Quarter</option>
            </select>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-6">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <div className="col-span-3 text-sm font-bold text-gray-700 uppercase tracking-wide">Student Name</div>
              <div className="col-span-3 text-sm font-bold text-gray-700 uppercase tracking-wide">Exam Name</div>
              <div className="col-span-2 text-sm font-bold text-gray-700 uppercase tracking-wide">Score</div>
              <div className="col-span-2 text-sm font-bold text-gray-700 uppercase tracking-wide">Status</div>
              <div className="col-span-2 text-sm font-bold text-gray-700 uppercase tracking-wide">Actions</div>
            </div>

            {/* Table Rows */}
            {filteredStudents.map((student, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-12 gap-4 px-6 py-5 hover:bg-blue-50 transition-colors ${index !== filteredStudents.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <div className="col-span-3 text-gray-900 font-medium">{student.name}</div>
                <div className="col-span-3 text-blue-600 font-medium">{student.exam}</div>
                <div className="col-span-2 text-gray-900 font-semibold">{student.score}</div>
                <div className="col-span-2">
                  <span className={`inline-block px-4 py-1.5 text-sm rounded-lg font-semibold ${
                    student.status === 'Pass' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {student.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    View Scorecard
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Export Buttons */}
          <div className="flex justify-end gap-4">
            <button className="bg-white text-gray-700 px-8 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 font-semibold transition-all">
              Export CSV
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 font-semibold shadow-md hover:shadow-lg transition-all">
              Export PDF
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}