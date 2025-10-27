// Comprehensive Proctoring System Types

export type UserRole = 'student' | 'faculty' | 'department' | 'campus' | 'admin';

export type ExamStatus = 'draft' | 'published' | 'active' | 'completed' | 'cancelled';
export type ExamType = 'private' | 'public' | 'practice' | 'timed';
export type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';

export interface User {
  id: string;
  email: string;
  password: string; // In real app, this would be hashed
  role: UserRole;
  name: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface School {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  principal: string;
  establishedYear: number;
  isActive: boolean;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  schoolId: string;
  headOfDepartment: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export interface Specialization {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  description: string;
  duration: number; // in semesters
  isActive: boolean;
  createdAt: string;
}

export interface Student {
  id: string;
  userId: string;
  rollNumber: string;
  specializationId: string;
  departmentId: string;
  schoolId: string;
  semester: number;
  enrollmentYear: number;
  examsTaken: number;
  averageScore: number;
  isActive: boolean;
  createdAt: string;
}

export interface Faculty {
  id: string;
  userId: string;
  employeeId: string;
  departmentId: string;
  specializationId?: string;
  designation: string;
  qualification: string;
  experience: number;
  phone?: string;
  bio?: string;
  officeLocation?: string;
  joinDate?: string;
  isActive: boolean;
  createdAt: string;
}

export interface DepartmentUser {
  id: string;
  userId: string;
  departmentId: string;
  role: 'hod' | 'coordinator' | 'admin';
  permissions: string[];
  isActive: boolean;
  createdAt: string;
}

export interface CampusUser {
  id: string;
  userId: string;
  schoolId: string;
  role: 'principal' | 'dean' | 'admin';
  permissions: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  content: string;
  options?: string[]; // For multiple choice
  correctAnswer: string | number;
  marks: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  specializationId: string;
  facultyId: string;
  isActive: boolean;
  createdAt: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  type: ExamType;
  specializationId: string;
  departmentId: string;
  facultyId: string;
  questions: string[]; // Question IDs
  totalMarks: number;
  duration: number; // in minutes
  startTime: string;
  endTime: string;
  instructions: string;
  status: ExamStatus;
  settings: {
    allowTabSwitch: boolean;
    allowCopyPaste: boolean;
    showResults: boolean;
    maxViolations: number;
  };
  enrolledStudents: string[]; // Student IDs
  createdAt: string;
  updatedAt: string;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  startTime: string;
  endTime?: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'terminated';
  answers: Record<string, any>; // questionId -> answer
  score?: number;
  totalMarks?: number;
  violations: Violation[];
  submittedAt?: string;
}

export interface Violation {
  id: string;
  attemptId: string;
  type: 'tab-switch' | 'copy-paste' | 'face-not-visible' | 'multiple-faces' | 'suspicious-audio' | 'timeout';
  timestamp: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  screenshot?: string;
}

export interface EligibilityTest {
  id: string;
  examId: string;
  studentId: string;
  requirements: {
    camera: boolean;
    microphone: boolean;
    internet: boolean;
    systemCheck: boolean;
  };
  results: {
    cameraWorking: boolean;
    microphoneWorking: boolean;
    internetStable: boolean;
    systemCompatible: boolean;
  };
  status: 'pending' | 'passed' | 'failed';
  completedAt?: string;
}

export interface ProctoringSession {
  id: string;
  attemptId: string;
  studentId: string;
  examId: string;
  startTime: string;
  endTime?: string;
  status: 'active' | 'completed' | 'terminated';
  streamUrl?: string;
  recordings: string[];
  violations: Violation[];
  alerts: ProctoringAlert[];
}

export interface ProctoringAlert {
  id: string;
  sessionId: string;
  type: 'warning' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
  resolvedAt?: string;
}

export interface Result {
  id: string;
  attemptId: string;
  examId: string;
  studentId: string;
  score: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  status: 'passed' | 'failed' | 'pending-review';
  feedback?: string;
  generatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface CreateExamForm {
  title: string;
  description: string;
  type: ExamType;
  specializationId: string;
  questions: string[];
  duration: number;
  startTime: string;
  endTime: string;
  instructions: string;
  settings: Exam['settings'];
}

export interface CreateQuestionForm {
  title: string;
  type: QuestionType;
  content: string;
  options?: string[];
  correctAnswer: string | number;
  marks: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  specializationId: string;
}