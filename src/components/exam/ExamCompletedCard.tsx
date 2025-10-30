import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Exam } from '@/types/exam'
import { CalendarDays, Hourglass } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function ExamCompletedCard({ exam }: { exam: Exam }) {
    return (
        <Card className="w-full">
            <CardHeader className="grid">
                <CardTitle className="text-lg">
                <div className="mb-1">
                    <Badge variant={"default"} className={
                        cn(
                            exam.completion_status == 0 && 'bg-destructive text-destructive-foreground',
                            exam.completion_status == 1 && 'bg-success text-success-foreground',
                        )
                    }>{exam.completion_status ? "Completed" : "Missed"}</Badge>
                </div>
                    {exam.name}
                </CardTitle>
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
                <div className="flex flex-wrap gap-8 items-center">
                    <div>
                        <p className='font-bold inline-flex gap-1 items-center'>
                            <CalendarDays size={14} />
                            <span>Start Time</span>
                        </p>
                        <p>{exam.start_time && new Date(exam.start_time).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className='font-bold inline-flex gap-1 items-center'>
                            <CalendarDays size={14} />
                            <span>End Time</span>
                        </p>
                        <p>{exam.end_time && new Date(exam.end_time).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className='font-bold inline-flex gap-1 items-center'>
                            <Hourglass size={14} />
                            <span>Duration</span>
                        </p>
                        <p>{exam.duration_in_minutes} Minutes</p>
                    </div>
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