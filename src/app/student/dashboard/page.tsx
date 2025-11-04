import { StudentLayout } from '@/components/StudentLayout'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CompletedExams from '@/containers/student/dashboard/CompletedExams'
import HeroBanner from '@/containers/student/dashboard/HeroBanner'
import OngoingExams from '@/containers/student/dashboard/OnGoingExams'
import UpcomingExams from '@/containers/student/dashboard/UpcomingExams'
import { AlarmClock, AlarmClockCheck, Award, Siren } from 'lucide-react'

function page() {
    return (
        <StudentLayout title="Student Dashboard" subtitle="Welcome back! Here's your academic overview">
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
                        <OngoingExams />
                        <UpcomingExams />
                        <CompletedExams />
                    </div>
                </div>
            </main>
        </StudentLayout>
    )

}

export default page