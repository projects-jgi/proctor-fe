'use client';

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExamQuestion } from "@/types/exam";
import { ChevronLeft, ChevronRight, TriangleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";

function QuestionCard({ totalQuestions, setQuestionCounter, questionCounter, question, hasNext, hasPrev }: { totalQuestions: number, setQuestionCounter: React.Dispatch<React.SetStateAction<number | null>>, questionCounter: number | null, question: ExamQuestion, hasNext: boolean, hasPrev: boolean }) {
    const options: {
        [option: string]: string | undefined
    } = {
        option_1: question.option_1,
        option_2: question.option_2,
        option_3: question.option_3,
        option_4: question.option_4,
        option_5: question.option_5,
    }

    // stored all the selected answers in memory
    const [selectedOptions, setSelectedOptions] = useState<null | string[]>(null)

    // load the selected options for a question from localStorage
    useEffect(() => {
        const local_storage: string | null = localStorage.getItem("user_answers")
        if(local_storage != null){
            const user_answers = JSON.parse(local_storage);
            setSelectedOptions(user_answers[question.id])
        }

    }, [question])

    // save the selected options from state to localStorage
    useEffect(() => {
        if(selectedOptions != null){
            let prev_user_answers_str: string | null = localStorage.getItem("user_answers");
            let prev_user_answers: object = {};
            if(prev_user_answers_str != null){
                prev_user_answers = JSON.parse(prev_user_answers_str)
            }
            let new_values = {
                ...prev_user_answers,
                [question.id]: selectedOptions
            }
            localStorage.setItem("user_answers", JSON.stringify(new_values))
        }

    }, [selectedOptions])

    function onOptionClicked(option: string){
        setSelectedOptions(prev => {
            if (prev) {
                if (prev.includes(option)) {
                    return prev.filter(item => item !== option);
                } else {
                    return [...prev, option];
                }
            } else {
                return [option];
            }
        })
    }

    function incrementCounter(){
        setQuestionCounter(prev => {
            if(prev != null){
                return prev + 1;
            }

            return null;
        })
    }

    function decrementCounter(){
        setQuestionCounter(prev => {
            if(prev != null){
                return prev - 1;
            }

            return null;
        })
    }

    return (
        <Card className="card__question" data-question-id={question.id}>
            <CardHeader>
                <CardDescription className="text-sm mb-2">
                Question {questionCounter} of {totalQuestions}
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
                                <Label
                                    key={`toggle-${question.id}-${option}`}
                                    className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                >
                                    <Checkbox
                                        id={`toggle-${question.id}-${option}`}
                                        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                        data-option-name={option}
                                        data-question-id={question.id}
                                        onCheckedChange={() => onOptionClicked(option)}
                                        checked={selectedOptions != null && selectedOptions.includes(option)}
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
                <Button disabled={!hasPrev} variant="outline" onClick={decrementCounter}>
                    <ChevronLeft />
                    Previous
                </Button>
                <Button className="bg-warning text-warning-foreground">
                    <TriangleAlert />
                    Mark for Review
                </Button>
                <Button disabled={!hasNext} onClick={incrementCounter}>
                    Next
                    <ChevronRight />
                </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default QuestionCard;
