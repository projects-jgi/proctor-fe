import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Exam } from '@/types/exam'
import Link from 'next/link'
import React from 'react'

function ExamCompletedCard({ exam }: { exam: Exam }) {
    return (
        <Card className="w-full">
            <CardHeader className="grid">
                <CardTitle className="text-lg">{exam.name}</CardTitle>
                {exam.description && <CardDescription>{exam.description}</CardDescription>}
                <CardAction>
                    <span className="hidden sm:block">
                        {
                            exam.completion_status == 0 ? 
                            <Button disabled>
                                <Link href="#">Not Available</Link>
                            </Button>
                            : (
                                <Button>
                                    <Link href={`/student/exams/${exam.id}/result`}>View result</Link>
                                </Button>
                            )
                        }
                    </span>
                </CardAction>
            </CardHeader>
            <CardContent className="text-sm">
                <div className="mb-2">
                    <Badge variant={"default"} className={
                        cn(
                            exam.completion_status == 0 && 'bg-destructive text-destructive-foreground',
                            exam.completion_status == 1 && 'bg-success text-success-foreground',
                        )
                    }>{exam.completion_status ? "Completed" : "Missed"}</Badge>
                </div>
                <div className="flex flex-col gap-2 flex-wrap">
                    {exam.start_time && <p className="inline">Start Date & Time: {new Date(exam.start_time).toLocaleString()}</p>}
                    {exam.end_time && <p className="inline">End Date & Time: {new Date(exam.end_time).toLocaleString()}</p>}
                    <Separator
                        orientation="vertical"
                        className="hidden data-[orientation=vertical]:h-4"
                    />
                    <p className='inline'>Duration: {exam.duration_in_minutes} Minutes</p>
                    <Separator
                        orientation="vertical"
                        className="hidden data-[orientation=vertical]:h-4"
                    />
                    <p className='inline'>Passing: {exam.passing_percentage}</p>
                </div>
            </CardContent>
            <CardFooter className="sm:hidden">
                <CardAction>
                    {
                        exam.completion_status == 0 ? 
                        <Button disabled>
                            <Link href="#">Not Available</Link>
                        </Button>
                        : (
                            <Button>
                                <Link href={`/student/exams/${exam.id}/result`}>View result</Link>
                            </Button>
                        )
                    }
                </CardAction>
            </CardFooter>
        </Card>
    )
}

export default ExamCompletedCard