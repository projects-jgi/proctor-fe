import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Exam } from '@/types/exam'
import { StudentExamResult } from '@/types/student'
import React from 'react'

type ResultWithExam = StudentExamResult & { "exam" : Exam }

function ResultStat({ result }: { result: ResultWithExam }) {

    return (
        <div className={
            cn(
                'mb-6',
                result.result == 0 ? `bg-destructive/10 ` : `bg-success/10`,
            )
        }>
            <div className="container">
                <div className="px-4 py-6">
                    <h2 className='text-3xl mb-4'>Your grade: <span className={cn(result.result == 0 ? 'text-destructive' : 'text-success')}>{result.percentage}%</span></h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-md flex-wrap">
                        <p>Obtained Score: <b>{result.obtained_score}</b></p>
                        <Separator
                            orientation="vertical"
                            className="hidden sm:inline data-[orientation=vertical]:h-6 bg-white"
                        />
                        <p>Total Score: <b>{result.total_score}</b></p>
                        <Separator
                            orientation="vertical"
                            className="hidden sm:inline data-[orientation=vertical]:h-6 bg-white"
                        />
                        <p>Passing Percentage: <b>{result.exam.passing_percentage}</b></p>
                        <Separator
                            orientation="vertical"
                            className="hidden sm:inline data-[orientation=vertical]:h-6 bg-white"
                        />
                        <p>Result: <b className={cn(result.result == 0 ? `text-destructive` : 'text-success')}>{result.result == 1 ? "Pass" : "Fail"}</b></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultStat