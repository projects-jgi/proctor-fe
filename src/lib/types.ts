export type UserRole = 'student' | 'faculty' | 'department' | 'school' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string;
  profileImage?: string;
  phone?: string;
  password?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  type?: string; // 'public' | 'private' | etc.
  departmentId: string;
  facultyId: string;
  questions: string[] | Question[]; // can be either IDs or full objects
  totalMarks?: number;
  duration: number; // in minutes
  startTime: string;
  endTime: string;
  instructions?: string;
  status: 'draft' | 'published' | 'active' | 'completed' | 'cancelled';
  settings?: ExamSettings;
  enrolledStudents?: string[]; // student IDs
  createdAt?: string;
  updatedAt?: string;
}

export interface Question {
  id: string;
  examId: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[]; // for multiple choice
  correctAnswer: string | string[]; // can be multiple for some types
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExamSettings {
  allowReview?: boolean;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
  timeLimit?: number; // in minutes
  attemptsAllowed?: number;
  showResultsImmediately?: boolean;
  proctoringEnabled?: boolean;
  webcamRequired?: boolean;
  screenSharingRequired?: boolean;
  allowTabSwitch?: boolean;
  allowCopyPaste?: boolean;
  showResults?: boolean;
  maxViolations?: number;
}

export interface Result {
  id: string;
  examId: string;
  studentId: string;
  attemptId?: string;
  studentName?: string;
  score: number;
  totalPoints: number;
  percentage: number;
  status: 'in-progress' | 'completed' | 'submitted' | 'graded';
  answers?: Answer[];
  startedAt?: string;
  submittedAt?: string;
  gradedAt?: string;
  generatedAt?: string;
  feedback?: string;
  grade?: string;
  proctoringData?: ProctoringData;
}

export interface Answer {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  points: number;
  timeSpent: number; // in seconds
}

export interface ProctoringData {
  sessionId: string;
  screenshots: string[];
  webcamFrames: string[];
  mouseMovements: MouseMovement[];
  keyboardEvents: KeyboardEvent[];
  tabSwitches: number;
  suspiciousActivities: SuspiciousActivity[];
  overallIntegrity: number; // 0-100 score
}

export interface MouseMovement {
  timestamp: string;
  x: number;
  y: number;
}

export interface KeyboardEvent {
  timestamp: string;
  key: string;
  type: 'press' | 'release';
}

export interface SuspiciousActivity {
  timestamp: string;
  type: 'tab_switch' | 'window_blur' | 'multiple_faces' | 'no_face' | 'looking_away';
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
  headId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  description?: string;
  credits: number;
  facultyId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Faculty {
  id: string;
  userId: string;
  departmentId: string;
  courses: string[]; // course IDs
  qualifications: string[];
  experience: number; // years
  specializations: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  userId: string;
  departmentId: string;
  enrollmentNumber: string;
  rollNumber?: string;
  year: number;
  semester: number;
  courses: string[]; // course IDs
  gpa?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProctoringSession {
  id: string;
  examId: string;
  studentId: string;
  startTime: string;
  endTime?: string;
  status: 'active' | 'completed' | 'terminated';
  integrityScore: number;
  flags: ProctoringFlag[];
}

export interface ProctoringFlag {
  timestamp: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  screenshot?: string;
}