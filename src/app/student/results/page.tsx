"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, Award, ArrowLeft } from "lucide-react";

export default function ResultsPage() {
  const router = useRouter();
  
  const tests = [
    { id: "test1", title: "Mathematics Advanced", score: 62, max: 100, date: "07 Feb, 2025", trend: "up" },
    { id: "test2", title: "Physics Fundamentals", score: 57, max: 100, date: "04 Feb, 2025", trend: "same" },
    { id: "test3", title: "Chemistry Basics", score: 85, max: 100, date: "01 Feb, 2025", trend: "up" }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-blue-100 text-blue-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => router.push('/student/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2">
              My Results
            </h1>
            <p className="text-muted-foreground">Track your academic progress and performance</p>
          </div>
          <div className="w-32"></div> {/* Spacer for balance */}
        </div>

        <div className="space-y-4">
          {tests.map((test) => (
            <Card 
              key={test.id}
              className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/50"
              onClick={() => router.push(`/student/results/${test.id}/submission`)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">{test.title}</h3>
                      <Badge variant="secondary" className={getScoreBadge(test.score)}>
                        {test.score}%
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {test.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-4 h-4 ${
                          test.trend === "up" ? "text-green-600" : "text-muted-foreground"
                        }`} />
                        <span className={test.trend === "up" ? "text-green-600 font-medium" : "text-muted-foreground"}>
                          {test.trend === "up" ? "Improving" : "Stable"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(test.score)}`}>
                      {test.score}/{test.max}
                    </div>
                    <div className="text-sm text-muted-foreground">Score</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        test.score >= 80 ? "bg-green-500" :
                        test.score >= 60 ? "bg-blue-500" : "bg-red-500"
                      }`}
                      style={{ width: `${test.score}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Summary */}
        <Card className="mt-8 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{tests.length}</div>
                <div className="text-sm text-muted-foreground">Tests Taken</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(tests.reduce((acc, test) => acc + test.score, 0) / tests.length)}%
                </div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-600">
                  {tests.filter(t => t.trend === "up").length}
                </div>
                <div className="text-sm text-muted-foreground">Improving</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}