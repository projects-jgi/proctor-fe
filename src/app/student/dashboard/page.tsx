import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import HeroBanner from '@/containers/student/dashboard/HeroBanner'
import Topbar from '@/containers/student/Topbar'
import { AlarmClock, AlarmClockCheck, ArrowRight, Award, CalendarDays, Hourglass, Siren, Tally1 } from 'lucide-react'
import React from 'react'

function page() {
    return (
        <>
            <Topbar />
            <main className=''>
                <HeroBanner />
                <div className="container mx-auto">
                    <div className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className='w-full'>
                            <CardHeader>
                                    <CardTitle className='text-2xl'>1</CardTitle>
                                    <CardDescription>Ongoing Exams</CardDescription>
                                    <CardAction className='bg-primary text-primary-foreground p-4 rounded-full'>
                                        <Siren />
                                    </CardAction>
                            </CardHeader>
                        </Card>
                        <Card className='w-full'>
                            <CardHeader>
                                    <CardTitle className='text-2xl'>2</CardTitle>
                                    <CardDescription>Upcoming Exams</CardDescription>
                                    <CardAction className='bg-primary text-primary-foreground p-4 rounded-full'>
                                        <AlarmClock />
                                    </CardAction>
                            </CardHeader>
                        </Card>
                        <Card className='w-full'>
                            <CardHeader>
                                    <CardTitle className='text-2xl'>15</CardTitle>
                                    <CardDescription>Completed Exams</CardDescription>
                                    <CardAction className='bg-primary text-primary-foreground p-4 rounded-full'>
                                        <AlarmClockCheck />                                            
                                    </CardAction>
                            </CardHeader>
                        </Card>
                        <Card className='w-full'>
                            <CardHeader>
                                    <CardTitle className='text-2xl'>78%</CardTitle>
                                    <CardDescription>Average Score</CardDescription>
                                    <CardAction className='bg-primary text-primary-foreground p-4 rounded-full'>
                                        <Award />
                                    </CardAction>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="mb-12">
                        <section className=''>
                            <h2 className='text-xl font-bold'>Ongoing Exams</h2>
                            <div className="grid grid-cols-1 gap-4 mt-4">
                                {Array(2).fill(0).map((_, index) => (
                                    <Card className='w-full' key={index}>
                                        <CardHeader>
                                                <CardTitle className='text-lg'>MATHEMATICS FINAL EXAM</CardTitle>
                                                <CardDescription>Master of Computer Applications</CardDescription>
                                                <CardAction>
                                                    <Button>Enter Exam</Button>
                                                </CardAction>
                                                <CardContent className='text-sm p-0'>
                                                    <div className="flex gap-4 flex-wrap">
                                                        <div className='flex gap-2 items-center'>
                                                            <span className='inline'><CalendarDays size={20} /></span>
                                                            <span className='inline'>01/01/2025 to 03/01/2025</span>
                                                        </div>
                                                        <div className='flex gap-2 items-center'>
                                                            <span className='inline'><Hourglass size={20} /></span>
                                                            <span className='inline'>90 Minutes</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </section>
                        <section className='mt-8'>
                            <div className="flex justify-between items-center">
                                <h2 className='text-xl font-bold'>Upcoming Exams</h2>
                                <Button variant={"outline"}>
                                    View All
                                    <span>
                                        <ArrowRight />
                                    </span>    
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 gap-4 mt-4">
                                {Array(2).fill(0).map((_, index) => (
                                    <Card className='w-full' key={index}>
                                        <CardHeader>
                                                <CardTitle className='text-lg'>MATHEMATICS FINAL EXAM</CardTitle>
                                                <CardDescription>Master of Computer Applications</CardDescription>
                                                <CardAction>
                                                    <Button>
                                                        Set Remainder
                                                        <span>
                                                            <AlarmClock />
                                                        </span>    
                                                    </Button>
                                                </CardAction>
                                                <CardContent className='text-sm p-0'>
                                                    <div className="flex gap-4 flex-wrap">
                                                        <div className='flex gap-2 items-center'>
                                                            <span className='inline'><CalendarDays size={20} /></span>
                                                            <span className='inline'>01/01/2025 to 03/01/2025</span>
                                                        </div>
                                                        
                                                        <div className='flex gap-2 items-center'>
                                                            <span className='inline'><Hourglass size={20} /></span>
                                                            <span className='inline'>90 Minutes</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </section>
                        <section className='mt-8'>
                            <div className="flex justify-between items-center">
                                <h2 className='text-xl font-bold'>Completed Exams</h2>
                                <Button variant={"outline"}>
                                    View All
                                    <span>
                                        <ArrowRight />
                                    </span>    
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 gap-4 mt-4">
                                {Array(2).fill(0).map((_, index) => (
                                    <Card className='w-full' key={index}>
                                        <CardHeader>
                                                <CardTitle className='text-lg'>MATHEMATICS FINAL EXAM</CardTitle>
                                                <CardDescription>Master of Computer Applications</CardDescription>
                                                <CardAction>
                                                    <Button>
                                                        View Details
                                                    </Button>
                                                </CardAction>
                                                <CardContent className='text-sm p-0'>
                                                    <div className="flex gap-4 flex-wrap">
                                                        <div className='flex gap-2 items-center'>
                                                            <span className='inline'><CalendarDays size={20} /></span>
                                                            <span className='inline'>01/01/2025 to 03/01/2025</span>
                                                        </div>
                                                        
                                                        <div className='flex gap-2 items-center'>
                                                            <span className='inline'><Hourglass size={20} /></span>
                                                            <span className='inline'>90 Minutes</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    )
}

export default page