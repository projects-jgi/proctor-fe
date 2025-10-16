"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function QuestionBank() {
  const router = useRouter();

  const initialCategories = [
    { name: 'Mathematics', total: 150, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { name: 'Physics', total: 120, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { name: 'Chemistry', total: 100, color: 'bg-green-50 text-green-700 border-green-200' },
    { name: 'Biology', total: 80, color: 'bg-amber-50 text-amber-700 border-amber-200' }
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryTotal, setNewCategoryTotal] = useState('');

  const colorPool = [
    'bg-blue-50 text-blue-700 border-blue-200',
    'bg-purple-50 text-purple-700 border-purple-200',
    'bg-green-50 text-green-700 border-green-200',
    'bg-amber-50 text-amber-700 border-amber-200',
    'bg-pink-50 text-pink-700 border-pink-200'
  ];

  function handleAddCategory(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const name = newCategoryName.trim();
    const total = Number(newCategoryTotal) || 0;
    if (!name) return;
    const color = colorPool[categories.length % colorPool.length];
    setCategories(prev => [{ name, total, color }, ...prev]);
    setNewCategoryName('');
    setNewCategoryTotal('');
    setShowAddForm(false);
  }

  const recentQuestions = [
    {
      question: 'What is the derivative of x^2?',
      category: 'Mathematics',
      difficulty: 'Easy',
      difficultyColor: 'bg-green-100 text-green-700',
      addedOn: '2023-11-15'
    },
    {
      question: 'Explain the concept of quantum entanglement.',
      category: 'Physics',
      difficulty: 'Hard',
      difficultyColor: 'bg-red-100 text-red-700',
      addedOn: '2023-11-14'
    },
    {
      question: 'Describe the structure of a DNA molecule.',
      category: 'Biology',
      difficulty: 'Medium',
      difficultyColor: 'bg-yellow-100 text-yellow-700',
      addedOn: '2023-11-13'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center rounded-lg shadow-md">
                <span className="text-white text-sm font-bold">▲</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Exam Portal
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="font-medium">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty/addQuestion" className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-all group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">Exams</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty/question_bank" className="flex items-center space-x-3 px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span className="font-semibold">Question Bank</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty/stud_results" className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-all group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium">Results</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty/profile" className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-all group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Question Bank</h1>
            <p className="text-blue-600 font-medium">Manage your question repository</p>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Question Categories</h2>
              <div className="flex items-center space-x-3">
                {showAddForm ? (
                  <form onSubmit={handleAddCategory} className="flex items-center space-x-2">
                    <Label className="sr-only">Category name</Label>
                    <Input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Category name"
                      className="min-w-[220px]"
                    />
                    <Label className="sr-only">Total</Label>
                    <Input
                      value={newCategoryTotal}
                      onChange={(e) => setNewCategoryTotal(e.target.value)}
                      placeholder="Total"
                      className="w-24"
                    />
                    <Button type="submit">Add</Button>
                    <Button variant="ghost" type="button" onClick={() => setShowAddForm(false)}>Cancel</Button>
                  </form>
                ) : (
                  <Button variant="outline" onClick={() => setShowAddForm(true)}>Add category</Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {categories.map((category, index) => (
                <Card key={index} className="cursor-pointer">
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-gray-900">{category.name}</CardTitle>
                    <CardAction>
                      <div className={`px-4 py-2 rounded-xl border ${category.color} font-bold text-2xl`}>
                        {category.total}
                      </div>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                      <span>View All Questions</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => router.push('/faculty/addQuestion')}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 font-semibold shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Question</span>
              </button>

              <button className="bg-white text-gray-700 px-8 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 font-semibold transition-all flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Add via CSV/PDF</span>
              </button>
            </div>
          </div>

          {/* Recently Added */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Added Questions</h2>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="col-span-5 text-sm font-bold text-gray-700 uppercase tracking-wide">Question</div>
                <div className="col-span-2 text-sm font-bold text-gray-700 uppercase tracking-wide">Category</div>
                <div className="col-span-2 text-sm font-bold text-gray-700 uppercase tracking-wide">Difficulty</div>
                <div className="col-span-3 text-sm font-bold text-gray-700 uppercase tracking-wide">Added On</div>
              </div>

              {recentQuestions.map((item, index) => (
                <div key={index} className={`grid grid-cols-12 gap-4 px-6 py-5 hover:bg-blue-50 transition-colors ${index !== recentQuestions.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="col-span-5 text-gray-900 font-medium">{item.question}</div>
                  <div className="col-span-2">
                    <span className="inline-block px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className={`inline-block px-3 py-1.5 text-sm rounded-lg font-semibold ${item.difficultyColor}`}>
                      {item.difficulty}
                    </span>
                  </div>
                  <div className="col-span-3 text-gray-600 font-medium">{item.addedOn}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
