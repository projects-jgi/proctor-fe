"use client";

import { useEffect, useState } from "react";

// Types
interface Question {
  id: number;
  globalId: number;
  text: string;
  options: string[];
  answer?: string;
  markedForReview?: boolean;
}

interface Section {
  name: string;
  total: number;
  questions: Question[];
}

export default function ExamInterface() {
  // Build sections/questions dynamically but keep data minimal and easy to follow.
  let globalId = 1;
  const sections: Section[] = [
    {
      name: "Quantitative Aptitude",
      total: 10,
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        globalId: globalId++,
        text: `Quantitative Aptitude Question ${i + 1}`,
        options: ["A", "B", "C", "D"],
      })),
    },
    {
      name: "English",
      total: 8,
      questions: Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        globalId: globalId++,
        text: `English Question ${i + 1}`,
        options: ["A", "B", "C", "D"],
      })),
    },
    {
      name: "Reasoning",
      total: 7,
      questions: Array.from({ length: 7 }, (_, i) => ({
        id: i + 1,
        globalId: globalId++,
        text: `Reasoning Question ${i + 1}`,
        options: ["A", "B", "C", "D"],
      })),
    },
  ];

  const totalQuestions = sections.reduce((s, cur) => s + cur.total, 0);

  // Local state for the exam interface
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [marked, setMarked] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // default 60 minutes for demo
  const [confirmOpen, setConfirmOpen] = useState(false);

  const candidate = { name: "Rajesh Kumar", studentId: "24MCAR0111" };

  // Timer
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((sec % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const activeSection = sections[activeSectionIndex];
  const question = activeSection.questions[activeQuestionIndex];

  // Answer handling
  const pickAnswer = (qId: number, choice: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: choice }));
  };

  const toggleMark = (qId: number) => {
    setMarked((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const goToQuestion = (index: number) => setActiveQuestionIndex(index);

  // Submit
  const submitExam = () => {
    // Build payload
    const payload = {
      candidate,
      timeLeft,
      answers,
      marked,
    };
    console.log("Submitting exam:", payload);
    alert("Exam submitted — check console for payload (demo)");
  };

  // UI helpers
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Left: Sections & palette */}
      <aside className="w-72 border-r bg-white p-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-blue-800 flex items-center justify-center text-white font-semibold">
            J
          </div>
          <div>
            <div className="text-sm font-semibold">{candidate.name}</div>
            <div className="text-xs text-muted-foreground">{candidate.studentId}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">Time Left</div>
          <div className="font-mono font-semibold">{formatTime(timeLeft)}</div>
        </div>

        <div className="space-y-2">
          {sections.map((s, idx) => (
            <button
              key={s.name}
              onClick={() => {
                setActiveSectionIndex(idx);
                setActiveQuestionIndex(0);
              }}
              className={`w-full text-left px-3 py-2 rounded ${idx === activeSectionIndex ? "bg-blue-900 text-white" : "hover:bg-slate-100"}`}
            >
              <div className="flex justify-between">
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-muted-foreground">{s.total}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <div className="text-xs text-muted-foreground mb-2">Question Palette</div>
          <div className="grid grid-cols-6 gap-2">
            {activeSection.questions.map((q, i) => {
              const status = answers[q.globalId] ? "bg-green-600 text-white" : marked[q.globalId] ? "bg-yellow-400" : "bg-white";
              return (
                <button
                  key={q.globalId}
                  onClick={() => goToQuestion(i)}
                  className={`w-10 h-10 rounded border ${status} flex items-center justify-center text-sm`}
                >
                  {q.globalId}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm">Answered: <span className="font-semibold">{answeredCount}</span></div>
            <div>
              <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => setConfirmOpen(true)}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{activeSection.name}</h3>
                <div className="text-sm text-muted-foreground">Question {question.globalId} of {totalQuestions}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-sm px-3 py-1 border rounded" onClick={() => toggleMark(question.globalId)}>
                  Mark for review
                </button>
                <div className="text-sm">{answers[question.globalId] ? <span className="text-green-600">Answered</span> : <span className="text-muted-foreground">Not answered</span>}</div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-base">{question.text}</p>
            </div>

            <div className="space-y-3">
              {question.options.map((opt, i) => {
                const picked = answers[question.globalId] === opt;
                return (
                  <button
                    key={i}
                    onClick={() => pickAnswer(question.globalId, opt)}
                    className={`w-full text-left p-3 rounded border ${picked ? "bg-blue-900 text-white" : "bg-white"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border flex items-center justify-center">{String.fromCharCode(65 + i)}</div>
                      <div>{opt}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex justify-between">
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 border rounded"
                  onClick={() => setActiveQuestionIndex((p) => Math.max(0, p - 1))}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 bg-blue-900 text-white rounded"
                  onClick={() => setActiveQuestionIndex((p) => Math.min(activeSection.questions.length - 1, p + 1))}
                >
                  Next
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-2 border rounded" onClick={() => { /* Save local draft - placeholder */ alert('Saved draft (demo)') }}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Submit confirmation (simple modal) */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded p-6 w-[420px]">
            <h3 className="text-lg font-semibold mb-2">Submit Exam</h3>
            <p className="text-sm text-muted-foreground mb-4">Are you sure you want to submit? You won't be able to change answers after submission.</p>
            <div className="flex justify-end gap-2">
              <button className="px-3 py-1 border rounded" onClick={() => setConfirmOpen(false)}>Cancel</button>
              <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => { submitExam(); setConfirmOpen(false); }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
