import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import React from 'react'

function ResultList({ result }: {result: any}) {    
    const options = [
        'option_1',
        'option_2',
        'option_3',
        'option_4',
        'option_5',
    ]

    const option_explanation_map: {
        [option: string]: string
    } = {
        'option_1': 'explanation_1',
        'option_2': 'explanation_2',
        'option_3': 'explanation_3',
        'option_4': 'explanation_4',
        'option_5': 'explanation_5',
    }

    const option_answer_map: {
        [option: string]: string
    } = {
        'option_1': 'is_correct_1',
        'option_2': 'is_correct_2',
        'option_3': 'is_correct_3',
        'option_4': 'is_correct_4',
        'option_5': 'is_correct_5',
    }

    return (
        <main className='container mx-auto'>
            <div className="space-y-6">
                {result.map((item: any, index: number) => (
                    <Card className="hover:shadow-md transition" key={index}>
                        <CardHeader>
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                {index + 1 + ". " + item.exam_question.question_text}
                            </CardTitle>
                            <CardAction className="text-sm font-bold">Score: { item.marks_obtained } / { item.exam_question.score }</CardAction>
                        </CardHeader>
                        <CardContent>
                            {
                                options.map((option, option_index) => {
                                    if(item.exam_question[option]){
                                        return (
                                        <div key={option_index}>
                                            <Label
                                                className={cn(
                                                    'flex items-start gap-3 rounded-lg border p-3 mb-2',
                                                    item.exam_question[option_answer_map[option]] == 1 && 'has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950',
                                                    item.exam_question[option_answer_map[option]] == 0 && 'has-[[aria-checked=true]]:border-red-600 has-[[aria-checked=true]]:bg-red-50 dark:has-[[aria-checked=true]]:border-red-900 dark:has-[[aria-checked=true]]:bg-red-950',
                                                )}
                                            >
                                                <Checkbox
                                                    className=""
                                                    checked={item.exam_question[option_explanation_map[option]] ? true : false}
                                                />
                                                <div className="grid gap-1.5 font-normal">
                                                <p className="text-sm leading-none font-medium">{item.exam_question[option]}</p>
                                                <p className={
                                                        cn(
                                                            'text-sm',
                                                            item.exam_question[option_answer_map[option]] == 1 ? 'text-green-700 dark:text-green-300' : '',
                                                            item.exam_question[option_answer_map[option]] == 0 ? 'text-red-700 dark:text-red-300' : '',
                                                        )
                                                    }>
                                                    {item.exam_question[option_explanation_map[option]]}
                                                </p>
                                                </div>
                                            </Label>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    )
}

export default ResultList