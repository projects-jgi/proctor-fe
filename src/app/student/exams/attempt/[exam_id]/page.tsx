'use client';

import ExamResults from '@/components/ExamResults';
import ProctoringMonitor from '@/components/ProctoringMonitor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/containers/student/exams/attempt/Sidebar';
import Topbar from '@/containers/student/exams/attempt/Topbar';
import { ChevronLeft, ChevronRight, Clock, Flag, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

// Types
interface Question {
  id: number;
  text: string;
  options: string[];
  score: number;
  type: 'multiple-choice' | 'single-choice';
}

interface ExamState {
  answers: Record<number, string[]>;
  markedForReview: Set<number>;
  currentQuestionIndex: number;
  timeLeft: number;
}

// Static questions data
const questions: Question[] = [
  {
    id: 1,
    text: '1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat provident reprehenderit ut, tenetur explicabo ad consequuntur numquam, consectetur, vero officia at perspiciatis! Porro necessitatibus pariatur in laborum ab, eius, veniam labore a ullam ex inventore architecto reprehenderit. Beatae dolore ipsa voluptas! Error, molestias? A quisquam laudantium incidunt dignissimos in!',
    options: ['First Option', 'Second Option', 'Third Option', 'Fourth Option'],
    score: 1,
    type: 'multiple-choice'
  },
  {
    id: 2,
    text: '2. Another sample question text here with single choice.',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    score: 2,
    type: 'single-choice'
  },
  {
    id: 3,
    text: '3. Third question about advanced topics in computer science and programming paradigms.',
    options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
    score: 1,
    type: 'multiple-choice'
  },
];

function ExamHall() {
  const router = useRouter();
  const [examState, setExamState] = useState<ExamState>({
    answers: {},
    markedForReview: new Set(),
    currentQuestionIndex: 0,
    timeLeft: 60 * 60, // 60 minutes
  });
  
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isTimeWarningOpen, setIsTimeWarningOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Proctoring state
  const [attemptId] = useState(`attempt-${Date.now()}`);
  const [sessionId] = useState(`session-${Date.now()}`);

  const currentQuestion = questions[examState.currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(examState.answers).length;
  const skippedCount = totalQuestions - answeredCount;
  const reviewCount = examState.markedForReview.size;

  // Timer effects
  useEffect(() => {
    if (examState.timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    // Show warning when 5 minutes left
    if (examState.timeLeft === 5 * 60) {
      setIsTimeWarningOpen(true);
    }

    const timer = setInterval(() => {
      setExamState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
    }, 1000);

    return () => clearInterval(timer);
  }, [examState.timeLeft]);

  // Save exam state to localStorage
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    try {
      const savedState = localStorage.getItem('examState');
      if (savedState && savedState.trim()) {
        const parsedState = JSON.parse(savedState);
        setExamState({
          ...parsedState,
          markedForReview: new Set(parsedState.markedForReview || []),
        });
      }
    } catch (error) {
      console.error('Failed to load saved exam state:', error);
      // Clear corrupted data
      try {
        localStorage.removeItem('examState');
      } catch (storageError) {
        console.error('Failed to clear corrupted localStorage:', storageError);
      }
    }
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    try {
      const stateToSave = {
        ...examState,
        markedForReview: Array.from(examState.markedForReview),
      };
      localStorage.setItem('examState', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Failed to save exam state:', error);
    }
  }, [examState]);

  // Format time helper
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (examState.currentQuestionIndex < totalQuestions - 1) {
      setExamState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    }
  }, [examState.currentQuestionIndex, totalQuestions]);

  const handlePrevious = useCallback(() => {
    if (examState.currentQuestionIndex > 0) {
      setExamState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    }
  }, [examState.currentQuestionIndex]);

  const handleQuestionSelect = useCallback((index: number) => {
    setExamState(prev => ({ ...prev, currentQuestionIndex: index }));
  }, []);

  // Answer handling
  const handleOptionChange = useCallback((option: string, checked: boolean) => {
    setExamState(prev => {
      const currentAnswers = prev.answers[currentQuestion.id] || [];
      let newAnswers: string[];

      if (currentQuestion.type === 'single-choice') {
        // For single choice, replace the entire selection
        newAnswers = checked ? [option] : [];
      } else {
        // For multiple choice, add/remove from selection
        if (checked) {
          newAnswers = [...currentAnswers, option];
        } else {
          newAnswers = currentAnswers.filter(o => o !== option);
        }
      }

      return {
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion.id]: newAnswers,
        },
      };
    });
  }, [currentQuestion.id, currentQuestion.type]);

  // Mark for review
  const handleMarkForReview = useCallback(() => {
    setExamState(prev => {
      const newMarkedForReview = new Set(prev.markedForReview);
      if (newMarkedForReview.has(currentQuestion.id)) {
        newMarkedForReview.delete(currentQuestion.id);
      } else {
        newMarkedForReview.add(currentQuestion.id);
      }
      return { ...prev, markedForReview: newMarkedForReview };
    });
  }, [currentQuestion.id]);

  // Submit handlers
  const handleAutoSubmit = useCallback(() => {
    console.log('Auto-submitted answers:', examState.answers);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('examState');
      } catch (error) {
        console.error('Failed to clear exam state:', error);
      }
    }
    setIsSuccessDialogOpen(true);
  }, [examState.answers]);

  const handleSubmit = useCallback(() => {
    console.log('Submitted answers:', examState.answers);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('examState');
      } catch (error) {
        console.error('Failed to clear exam state:', error);
      }
    }
    setIsSubmitDialogOpen(false);
    setShowResults(true);
  }, [examState.answers]);

  const calculateScore = useCallback(() => {
    return Object.entries(examState.answers).reduce((total, [questionId, selectedOptions]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      return question ? total + question.score : total;
    }, 0);
  }, [examState.answers]);

  // Clear all answers for current question
  const handleClearSelection = useCallback(() => {
    setExamState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: [],
      },
    }));
  }, [currentQuestion.id]);

  const isOptionSelected = (option: string): boolean => {
    return (examState.answers[currentQuestion.id] || []).includes(option);
  };

  const isLastQuestion = examState.currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = examState.currentQuestionIndex === 0;

  // Mock result data for demonstration
  const mockResult = {
    examId: 'exam-1',
    studentId: 'stu-1',
    attemptId,
    totalQuestions,
    answeredQuestions: answeredCount,
    correctAnswers: Math.floor(answeredCount * 0.7), // Mock correct answers
    totalScore: calculateScore(),
    maxScore: questions.reduce((sum, q) => sum + q.score, 0),
    percentage: Math.round((calculateScore() / questions.reduce((sum, q) => sum + q.score, 0)) * 100),
    grade: calculateScore() > 25 ? 'B' : calculateScore() > 15 ? 'C' : 'F',
    timeTaken: Math.floor((3600 - examState.timeLeft) / 60),
    violations: 2, // Mock violations
    submittedAt: new Date().toISOString()
  };

  const mockQuestionReviews = questions.map(q => ({
    id: q.id,
    text: q.text,
    selectedAnswer: examState.answers[q.id] || [],
    correctAnswer: ['Option A'], // Mock correct answers
    isCorrect: Math.random() > 0.3, // Mock correctness
    score: examState.answers[q.id] ? q.score : 0,
    maxScore: q.score
  }));

  if (showResults) {
    return <ExamResults result={mockResult} questionReviews={mockQuestionReviews} />;
  }

  return (
    <>
      <SidebarProvider>
        <aside>
          <AppSidebar
            questions={questions}
            currentIndex={examState.currentQuestionIndex}
            answers={examState.answers}
            markedForReview={examState.markedForReview}
            onQuestionSelect={handleQuestionSelect}
          />
        </aside>
        <main className='w-full flex flex-col min-h-screen bg-background'>
          <Topbar />
          
          {/* Proctoring Monitor */}
          <div className="p-4 md:p-6">
            <ProctoringMonitor
              attemptId={attemptId}
              sessionId={sessionId}
              onViolation={(violation) => {
                console.log('Violation recorded:', violation);
              }}
            />
          </div>
          
          <div className="flex-1 p-6 md:p-8 overflow-auto">
            {/* Exam Stats */}
            <div className="flex flex-wrap gap-4 md:gap-6 items-center mb-6 justify-center md:justify-start">
              <div className='text-sm md:text-base font-semibold flex items-center gap-2'>
                Questions: <Badge variant="secondary">{totalQuestions}</Badge>
              </div>
              <div className='text-sm md:text-base font-semibold flex items-center gap-2'>
                Answered: <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                  {answeredCount}
                </Badge>
              </div>
              <div className='text-sm md:text-base font-semibold flex items-center gap-2'>
                Skipped: <Badge variant="destructive">{skippedCount}</Badge>
              </div>
              <div className='text-sm md:text-base font-semibold flex items-center gap-2'>
                <Flag className="w-4 h-4 text-yellow-600" />
                Marked: <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                  {reviewCount}
                </Badge>
              </div>
              <div className='text-sm md:text-base font-semibold flex items-center gap-2'>
                <Clock className="w-4 h-4 text-red-600" />
                Time: <Badge 
                  variant="outline" 
                  className={`${
                    examState.timeLeft < 300 ? 'text-red-600 border-red-600 animate-pulse' : 'text-foreground'
                  }`}
                >
                  {formatTime(examState.timeLeft)}
                </Badge>
              </div>
            </div>

            {/* Question Card */}
            <section className='flex flex-col min-h-[calc(100vh-250px)]'>
              <Card className="flex-1 flex flex-col shadow-lg border-2">
                <CardHeader className="pb-4 border-b">
                  <div className="flex justify-between items-start mb-2">
                    <CardDescription className='text-sm'>
                      Question {examState.currentQuestionIndex + 1} of {totalQuestions}
                    </CardDescription>
                    <div className="flex items-center gap-2">
                      {examState.markedForReview.has(currentQuestion.id) && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          <TriangleAlert className="w-3 h-3 mr-1" />
                          Marked
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        Score: {currentQuestion.score}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {currentQuestion.type}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg md:text-xl leading-relaxed">
                    {currentQuestion.text}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 px-6 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, idx) => (
                      <Label
                        key={idx}
                        className={`hover:bg-accent/50 cursor-pointer flex items-start gap-3 rounded-lg border p-4 transition-all duration-200 ${
                          isOptionSelected(option)
                            ? 'border-blue-600 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/50 shadow-sm'
                            : 'border-border hover:border-blue-300'
                        }`}
                      >
                        <Checkbox
                          checked={isOptionSelected(option)}
                          onCheckedChange={(checked) => 
                            handleOptionChange(option, checked as boolean)
                          }
                          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white mt-1"
                        />
                        <div className="grid gap-1.5 font-normal flex-1">
                          <p className="text-sm leading-relaxed font-medium">
                            {option}
                          </p>
                        </div>
                      </Label>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="sticky bottom-0 bg-background border-t p-6">
                  <div className="w-full flex flex-col gap-4">
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2 order-2 sm:order-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleClearSelection}
                          disabled={!examState.answers[currentQuestion.id]?.length}
                        >
                          Clear Selection
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2 order-1 sm:order-2">
                        <Button 
                          variant="outline" 
                          size="default"
                          onClick={handlePrevious}
                          disabled={isFirstQuestion}
                          className="flex items-center gap-2"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </Button>
                        
                        <Button
                          variant={examState.markedForReview.has(currentQuestion.id) ? "default" : "secondary"}
                          size="default"
                          onClick={handleMarkForReview}
                          className={`flex items-center gap-2 ${
                            examState.markedForReview.has(currentQuestion.id) 
                              ? 'bg-yellow-500 hover:bg-yellow-600' 
                              : 'bg-secondary'
                          }`}
                        >
                          <TriangleAlert className="w-4 h-4" />
                          {examState.markedForReview.has(currentQuestion.id) ? 'Unmark Review' : 'Mark for Review'}
                        </Button>
                        
                        <Button 
                          size="default"
                          onClick={isLastQuestion ? () => setIsSubmitDialogOpen(true) : handleNext}
                          className="flex items-center gap-2"
                        >
                          {isLastQuestion ? 'Submit' : 'Next'}
                          {!isLastQuestion && <ChevronRight className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      size="lg" 
                      onClick={() => setIsSubmitDialogOpen(true)}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      Submit Exam
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </section>
          </div>
        </main>
      </SidebarProvider>

      {/* Submit Confirmation Dialog */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TriangleAlert className="w-5 h-5 text-yellow-600" />
              Confirm Submission
            </DialogTitle>
            <DialogDescription className="space-y-3">
              <p>Are you sure you want to submit the exam? This action cannot be undone.</p>
              <div className="bg-muted p-3 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Questions Answered:</span>
                  <span className="font-semibold">{answeredCount}/{totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Score:</span>
                  <span className="font-semibold">{calculateScore()} points</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Used:</span>
                  <span className="font-semibold">
                    {formatTime(60 * 60 - examState.timeLeft)}
                  </span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsSubmitDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Submit Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Time Warning Dialog */}
      <Dialog open={isTimeWarningOpen} onOpenChange={setIsTimeWarningOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-yellow-600">
              <Clock className="w-5 h-5" />
              Time Warning
            </DialogTitle>
            <DialogDescription>
              Only 5 minutes remaining! Please review your answers and submit the exam soon.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsTimeWarningOpen(false)}>
              Continue Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-green-600">Exam Submitted Successfully!</DialogTitle>
            <DialogDescription className="space-y-3">
              <p>Your exam has been submitted successfully. Here's your summary:</p>
              <div className="bg-muted p-3 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Total Questions:</span>
                  <span className="font-semibold">{totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions Answered:</span>
                  <span className="font-semibold">{answeredCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Final Score:</span>
                  <span className="font-semibold">{calculateScore()} points</span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => router.push('/student/dashboard')}
              className="w-full"
            >
              Return to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExamHall;