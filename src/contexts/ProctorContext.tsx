"use client";

import { User, UserRole, Exam, Result } from '@/lib/types';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface ProctorContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => void;
  apiCall: (endpoint: string, options?: RequestInit) => Promise<any>;
  exams: Exam[];
  addExam: (exam: any) => void;
  updateExam: (id: string, updates: any) => void;
  deleteExam: (id: string) => void;
  departments: any[];
  addDepartment: (department: any) => void;
  updateDepartment: (id: string, updates: any) => void;
  deleteDepartment: (id: string) => void;
  categories: any[];
  addCategory: (category: any) => void;
  updateCategory: (id: string, updates: any) => void;
  deleteCategory: (id: string) => void;
  results: Result[];
  students: any[];
  users: any[];
  addStudent: (student: any) => void;
  updateStudent: (id: string, updates: any) => void;
  deleteStudent: (id: string) => void;
  faculties: any[];
  questions: any[];
  addQuestion: (question: any) => void;
  updateQuestion: (id: string, updates: any) => void;
  deleteQuestion: (id: string) => void;
  addFaculty: (faculty: any) => void;
  updateFaculty: (id: string, updates: any) => void;
  deleteFaculty: (id: string) => void;
  publishExam: (id: string) => void;
  unpublishExam: (id: string) => void;
  getExamsForFaculty: (facultyId: string) => any[];
  recordViolation: (attemptId?: string, violation?: any) => void;
  createEligibilityTest: (examId: string, userId: string) => string;
  updateEligibilityTest: (id: string, updates: any) => void;
  startExamAttempt: (examId: string, userId: string) => string;
  startProctoringSession: (attemptId: string) => void;
}

const ProctorContext = createContext<ProctorContextType | undefined>(undefined);

export const useProctor = () => {
  const context = useContext(ProctorContext);
  if (!context) {
    throw new Error('useProctor must be used within a ProctorProvider');
  }
  return context;
};

export const ProctorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [exams, setExams] = useState<Exam[]>([
    {
      id: '1',
      title: 'Data Structures Final Exam',
      description: 'Comprehensive exam covering all data structures topics',
      type: 'private',
      departmentId: 'computer-science-it',
      facultyId: 'faculty-1',
      questions: ['q1', 'q2', 'q3'],
      totalMarks: 60,
      duration: 120,
      startTime: new Date(Date.now() + 86400000).toISOString(),
      endTime: new Date(Date.now() + 86400000 + 7200000).toISOString(),
      instructions: 'Answer all questions. No cheating allowed.',
      status: 'published',
      settings: {
        allowTabSwitch: false,
        allowCopyPaste: false,
        showResults: true,
        maxViolations: 3
      },
      enrolledStudents: ['student-1'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]);
  const [departments, setDepartments] = useState<any[]>([
    {
      id: 'mca-dept',
      name: 'Department of Master of Computer Applications',
      code: 'MCA',
      schoolId: 'school-of-csit',
      headOfDepartment: 'Dr. Rajesh Kumar',
      description: 'Advanced computing and software development programs',
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'msc-dept',
      name: 'Department of Master of Science (CS & IT)',
      code: 'MSC',
      schoolId: 'school-of-csit',
      headOfDepartment: 'Dr. Priya Sharma',
      description: 'Research-oriented computer science and IT programs',
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'bca-dept',
      name: 'Department of Bachelor of Computer Applications',
      code: 'BCA',
      schoolId: 'school-of-csit',
      headOfDepartment: 'Prof. Amit Singh',
      description: 'Foundation programs in computer applications and programming',
      isActive: true,
      createdAt: new Date().toISOString(),
    }
  ]);
  const [categories, setCategories] = useState<any[]>([]);
  const [results, setResults] = useState<Result[]>([
    {
      id: 'result-1',
      attemptId: 'attempt-1',
      examId: '1',
      studentId: 'student-1',
      score: 42,
      totalMarks: 60,
      percentage: 70,
      grade: 'B',
      status: 'passed',
      feedback: 'Good performance. Focus on algorithm complexity.',
      generatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'result-2',
      attemptId: 'attempt-2',
      examId: '1',
      studentId: 'student-2',
      score: 35,
      totalMarks: 60,
      percentage: 58.3,
      grade: 'C',
      status: 'passed',
      feedback: 'Satisfactory. Review data structures concepts.',
      generatedAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: 'result-3',
      attemptId: 'attempt-3',
      examId: '1',
      studentId: 'student-3',
      score: 55,
      totalMarks: 60,
      percentage: 91.7,
      grade: 'A',
      status: 'passed',
      feedback: 'Excellent work! Strong understanding of concepts.',
      generatedAt: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: 'result-4',
      attemptId: 'attempt-4',
      examId: '1',
      studentId: 'student-4',
      score: 48,
      totalMarks: 60,
      percentage: 80,
      grade: 'B+',
      status: 'passed',
      feedback: 'Very good performance. Keep up the good work.',
      generatedAt: new Date(Date.now() - 345600000).toISOString(),
    },
    {
      id: 'result-5',
      attemptId: 'attempt-5',
      examId: 'exam-2',
      studentId: 'student-1',
      score: 38,
      totalMarks: 50,
      percentage: 76,
      grade: 'B+',
      status: 'passed',
      feedback: 'Good understanding of programming concepts.',
      generatedAt: new Date(Date.now() - 432000000).toISOString(),
    },
    {
      id: 'result-6',
      attemptId: 'attempt-6',
      examId: 'exam-2',
      studentId: 'student-2',
      score: 28,
      totalMarks: 50,
      percentage: 56,
      grade: 'C',
      status: 'passed',
      feedback: 'Needs improvement in programming fundamentals.',
      generatedAt: new Date(Date.now() - 518400000).toISOString(),
    }
  ]);
  const [students, setStudents] = useState<any[]>([
    {
      id: 'student-1',
      userId: 'user-student-1',
      rollNumber: 'BCA001',
      departmentId: 'computer-science-it',
      schoolId: 'school-1',
      semester: 4,
      enrollmentYear: 2022,
      examsTaken: 5,
      averageScore: 78.5,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'student-2',
      userId: 'user-student-2',
      rollNumber: 'BCA002',
      departmentId: 'computer-science-it',
      schoolId: 'school-1',
      semester: 4,
      enrollmentYear: 2022,
      examsTaken: 3,
      averageScore: 65.2,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'student-3',
      userId: 'user-student-3',
      rollNumber: 'BCA003',
      departmentId: 'computer-science-it',
      schoolId: 'school-1',
      semester: 4,
      enrollmentYear: 2022,
      examsTaken: 4,
      averageScore: 88.7,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'student-4',
      userId: 'user-student-4',
      rollNumber: 'BCA004',
      departmentId: 'computer-science-it',
      schoolId: 'school-1',
      semester: 4,
      enrollmentYear: 2022,
      examsTaken: 2,
      averageScore: 72.1,
      isActive: true,
      createdAt: new Date().toISOString(),
    }
  ]);
  const [users, setUsers] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([
    // MCA Department Faculty
    {
      id: 'fac-mca-1',
      userId: 'user-fac-mca-1',
      employeeId: 'MCA001',
      departmentId: 'mca-dept',
      designation: 'Professor & Head',
      qualification: 'PhD in Computer Science',
      experience: 15,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'fac-mca-2',
      userId: 'user-fac-mca-2',
      employeeId: 'MCA002',
      departmentId: 'mca-dept',
      designation: 'Associate Professor',
      qualification: 'MTech in Cyber Security',
      experience: 10,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'fac-mca-3',
      userId: 'user-fac-mca-3',
      employeeId: 'MCA003',
      departmentId: 'mca-dept',
      designation: 'Assistant Professor',
      qualification: 'MCA, MTech',
      experience: 6,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    // MSC Department Faculty
    {
      id: 'fac-msc-1',
      userId: 'user-fac-msc-1',
      employeeId: 'MSC001',
      departmentId: 'msc-dept',
      designation: 'Professor & Head',
      qualification: 'PhD in Computer Science',
      experience: 18,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'fac-msc-2',
      userId: 'user-fac-msc-2',
      employeeId: 'MSC002',
      departmentId: 'msc-dept',
      designation: 'Associate Professor',
      qualification: 'PhD in Data Science',
      experience: 12,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    // BCA Department Faculty
    {
      id: 'fac-bca-1',
      userId: 'user-fac-bca-1',
      employeeId: 'BCA001',
      departmentId: 'bca-dept',
      designation: 'Professor & Head',
      qualification: 'PhD in Computer Applications',
      experience: 14,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'fac-bca-2',
      userId: 'user-fac-bca-2',
      employeeId: 'BCA002',
      departmentId: 'bca-dept',
      designation: 'Assistant Professor',
      qualification: 'MTech in AI & ML',
      experience: 8,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'fac-bca-3',
      userId: 'user-fac-bca-3',
      employeeId: 'BCA003',
      departmentId: 'bca-dept',
      designation: 'Lecturer',
      qualification: 'MCA',
      experience: 4,
      isActive: true,
      createdAt: new Date().toISOString(),
    }
  ]);
  const [questions, setQuestions] = useState<any[]>([
    {
      id: 'q1',
      title: 'What is a Stack?',
      type: 'multiple-choice',
      content: 'Which of the following data structures follows LIFO (Last In First Out) principle?',
      options: ['Queue', 'Stack', 'Array', 'Linked List'],
      correctAnswer: 1,
      marks: 5,
      explanation: 'A stack follows LIFO principle where the last element added is the first one to be removed.',
      difficulty: 'easy',
      subject: 'Data Structures',
      categoryId: '',
      facultyId: 'faculty-1',
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'q2',
      title: 'Binary Search Algorithm',
      type: 'short-answer',
      content: 'Explain the binary search algorithm with an example.',
      correctAnswer: 'Binary search is a divide and conquer algorithm that works on sorted arrays...',
      marks: 10,
      explanation: 'Binary search repeatedly divides the search interval in half.',
      difficulty: 'medium',
      subject: 'Algorithms',
      categoryId: '',
      facultyId: 'faculty-1',
      isActive: true,
      createdAt: new Date().toISOString(),
    }
  ]);

  useEffect(() => {
    // Mock auth check - in real app this would verify token
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Mock user data - replace with actual user data structure
          const mockUser: User = {
            id: '1',
            email: 'student@jainuniversity.ac.in',
            password: '', // Not stored in state
            role: 'student',
            name: 'John Doe',
            phone: '+91 9876543210',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setCurrentUser(mockUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in real app this would call API
    try {
      // Simple mock validation - accept demo accounts from login page
      const validCredentials = [
        { email: 'student@school.com', password: 'student123', role: 'student' },
        { email: 'faculty@cs.com', password: 'faculty123', role: 'faculty' },
        { email: 'hod@cs.com', password: 'hod123', role: 'department' },
        { email: 'admin@school.com', password: 'admin123', role: 'campus' },
      ];

      const userCredential = validCredentials.find(
        cred => cred.email === email && cred.password === password
      );

      if (userCredential) {
        const mockUser: User = {
          id: '1',
          email,
          password: '', // Not stored
          role: userCredential.role as UserRole,
          name: userCredential.role === 'student' ? 'John Doe' :
                userCredential.role === 'faculty' ? 'Dr. Smith' :
                userCredential.role === 'department' ? 'Prof. Johnson' : 'Admin User',
          phone: '+91 9876543210',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setCurrentUser(mockUser);
        localStorage.setItem('authToken', 'mock-token');
        return { success: true, user: mockUser };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
  };

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    // Mock API call - returns empty data
    console.log('Mock API call to:', endpoint);
    return { success: true, data: [] };
  };

  const addExam = (exam: any) => {
    // Mock add exam - add to state
    const newExam = {
      ...exam,
      id: `exam_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setExams(prev => [...prev, newExam]);
    console.log('Mock add exam:', newExam);
  };

  const updateExam = (id: string, updates: any) => {
    // Mock update exam - update in state
    setExams(prev => prev.map(exam =>
      exam.id === id ? { ...exam, ...updates, updatedAt: new Date().toISOString() } : exam
    ));
    console.log('Mock update exam:', id, updates);
  };

  const deleteExam = (id: string) => {
    // Mock delete exam - remove from state
    setExams(prev => prev.filter(exam => exam.id !== id));
    console.log('Mock delete exam:', id);
  };

  const addStudent = (student: any) => {
    // Mock add student - add to state
    const newStudent = {
      ...student,
      id: `student_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setStudents(prev => [...prev, newStudent]);
    console.log('Mock add student:', newStudent);
  };

  const updateStudent = (id: string, updates: any) => {
    // Mock update student - update in state
    setStudents(prev => prev.map(student =>
      student.id === id ? { ...student, ...updates } : student
    ));
    console.log('Mock update student:', id, updates);
  };

  const deleteStudent = (id: string) => {
    // Mock delete student - remove from state
    setStudents(prev => prev.filter(student => student.id !== id));
    console.log('Mock delete student:', id);
  };

  const addQuestion = (question: any) => {
    // Mock add question - add to state
    const newQuestion = {
      ...question,
      id: `question_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setQuestions(prev => [...prev, newQuestion]);
    console.log('Mock add question:', newQuestion);
  };

  const updateQuestion = (id: string, updates: any) => {
    // Mock update question - update in state
    setQuestions(prev => prev.map(question =>
      question.id === id ? { ...question, ...updates } : question
    ));
    console.log('Mock update question:', id, updates);
  };

  const deleteQuestion = (id: string) => {
    // Mock delete question - remove from state
    setQuestions(prev => prev.filter(question => question.id !== id));
    console.log('Mock delete question:', id);
  };

  const addFaculty = (faculty: any) => {
    // Mock add faculty - add to state
    const newFaculty = {
      ...faculty,
      id: `faculty_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setFaculties(prev => [...prev, newFaculty]);

    // If a user object is provided, add it to users array
    if (faculty.userData) {
      const newUser = {
        ...faculty.userData,
        id: faculty.userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUsers(prev => [...prev, newUser]);
    }

    console.log('Mock add faculty:', newFaculty);
  };

  const updateFaculty = (id: string, updates: any) => {
    // Mock update faculty - update in state
    setFaculties(prev => prev.map(faculty =>
      faculty.id === id ? { ...faculty, ...updates } : faculty
    ));
    console.log('Mock update faculty:', id, updates);
  };

  const deleteFaculty = (id: string) => {
    // Mock delete faculty - remove from state
    setFaculties(prev => prev.filter(faculty => faculty.id !== id));
    console.log('Mock delete faculty:', id);
  };

  const addCategory = (category: any) => {
    // Mock add category - add to state
    const newCategory = {
      ...category,
      id: `category_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setCategories(prev => [...prev, newCategory]);
    console.log('Mock add category:', newCategory);
  };

  const updateCategory = (id: string, updates: any) => {
    // Mock update category - update in state
    setCategories(prev => prev.map(category =>
      category.id === id ? { ...category, ...updates } : category
    ));
    console.log('Mock update category:', id, updates);
  };

  const deleteCategory = (id: string) => {
    // Mock delete category - remove from state
    setCategories(prev => prev.filter(category => category.id !== id));
    console.log('Mock delete category:', id);
  };

  const addDepartment = (department: any) => {
    // Mock add department - add to state
    const newDepartment = {
      ...department,
      id: `department_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setDepartments(prev => [...prev, newDepartment]);
    console.log('Mock add department:', newDepartment);
  };

  const updateDepartment = (id: string, updates: any) => {
    // Mock update department - update in state
    setDepartments(prev => prev.map(department =>
      department.id === id ? { ...department, ...updates } : department
    ));
    console.log('Mock update department:', id, updates);
  };

  const deleteDepartment = (id: string) => {
    // Mock delete department - remove from state
    setDepartments(prev => prev.filter(department => department.id !== id));
    console.log('Mock delete department:', id);
  };

  const publishExam = (id: string) => {
    // Mock publish exam
    console.log('Mock publish exam:', id);
  };

  const unpublishExam = (id: string) => {
    // Mock unpublish exam
    console.log('Mock unpublish exam:', id);
  };

  const getExamsForFaculty = (facultyId: string) => {
    // Mock get exams for faculty - return exams created by this faculty
    return exams.filter(exam => exam.facultyId === facultyId);
  };

  const recordViolation = (attemptId?: string, violation?: any) => {
    // Mock record violation
    console.log('Mock record violation:', attemptId, violation);
  };

  const createEligibilityTest = (examId: string, userId: string) => {
    // Mock create eligibility test
    console.log('Mock create eligibility test:', examId, userId);
    return `test_${Date.now()}`;
  };

  const updateEligibilityTest = (id: string, updates: any) => {
    // Mock update eligibility test
    console.log('Mock update eligibility test:', id, updates);
  };

  const startExamAttempt = (examId: string, userId: string) => {
    // Mock start exam attempt
    console.log('Mock start exam attempt:', examId, userId);
    return `attempt_${Date.now()}`;
  };

  const startProctoringSession = (attemptId: string) => {
    // Mock start proctoring session
    console.log('Mock start proctoring session:', attemptId);
  };

  const value: ProctorContextType = {
    currentUser,
    isLoading,
    login,
    logout,
    apiCall,
    exams,
    addExam,
    updateExam,
    deleteExam,
    departments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    results,
    students,
    users,
    addStudent,
    updateStudent,
    deleteStudent,
    faculties,
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addFaculty,
    updateFaculty,
    deleteFaculty,
    publishExam,
    unpublishExam,
    getExamsForFaculty,
    recordViolation,
    createEligibilityTest,
    updateEligibilityTest,
    startExamAttempt,
    startProctoringSession,
  };

  return (
    <ProctorContext.Provider value={value}>
      {children}
    </ProctorContext.Provider>
  );
};
