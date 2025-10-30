import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Exam } from '@/types/exam'
import { CalendarDays, Hourglass } from 'lucide-react'
import React from 'react'

function ExamUpcomingCard({ exam }: {exam: Exam}) {
    return (
        <Card className='w-full'>
            <CardHeader className='grid'>
                <CardTitle className="text-lg">{ exam.name }</CardTitle>
                <CardDescription>{ exam.description }</CardDescription>
                <CardAction className='hidden sm:block'>
                    <Button>View Details</Button>
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
                    <Button>View Details</Button>
                </CardAction>
            </CardFooter>
        </Card>            
    )
}

export default ExamUpcomingCard