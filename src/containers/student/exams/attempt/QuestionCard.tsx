'use client';

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExamQuestion } from "@/types/exam";
import { ChevronLeft, ChevronRight, TriangleAlert } from "lucide-react";
import React from "react";

function QuestionCard({ setQuestionCounter, question_no, question }: { setQuestionCounter: React.Dispatch<React.SetStateAction<number>>, question_no: number, question: ExamQuestion }) {
    const options: {
        [option: string]: string | undefined
    } = {
        option_1: question.option_1,
        option_2: question.option_2,
        option_3: question.option_3,
        option_4: question.option_4,
        option_5: question.option_5,
    }

    return (
        <Card>
            <CardHeader>
                <CardDescription className="text-sm mb-2">
                Question {question_no} of 30
                </CardDescription>
                <CardTitle>
                {question.question_text}
                </CardTitle>
                <CardAction className="text-sm font-bold">Score: { question.score }</CardAction>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {Object.keys(options).map((option: string, index) => {
                        if(options[option]){
                            return (
                                <Label key={index} data-option-name={option} className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                    <Checkbox
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    />
                                    <div className="grid gap-1.5 font-normal">
                                    <p className="text-sm leading-none font-medium">{options[option]}</p>
                                    </div>
                                </Label>
                            )
                        }
                    })}
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full flex items-center justify-between">
                <Button variant="outline" onClick={() => setQuestionCounter(question_no - 1)}>
                    <ChevronLeft />
                    Previous
                </Button>
                <Button className="bg-warning text-warning-foreground">
                    <TriangleAlert />
                    Mark for Review
                </Button>
                <Button onClick={() => setQuestionCounter(question_no + 1)}>
                    Next
                    <ChevronRight />
                </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default QuestionCard;
