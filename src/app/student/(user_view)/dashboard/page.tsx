import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CompletedExams from '@/containers/student/dashboard/CompletedExams'
import HeroBanner from '@/containers/student/dashboard/HeroBanner'
import OngoingExams from '@/containers/student/dashboard/OnGoingExams'
import Stats from '@/containers/student/dashboard/Stats'
import UpcomingExams from '@/containers/student/dashboard/UpcomingExams'
import { AlarmClock, AlarmClockCheck, ArrowRight, Award, CalendarDays, Hourglass, Siren, Tally1 } from 'lucide-react'
import React from 'react'

function page() {
    return (
        <>
            <main className=''>
                <HeroBanner />
                <div className="xl:px-12 container mx-auto">
                    <Stats />
                    <div className="mb-12">
                        <OngoingExams />
                        <UpcomingExams />
                        <CompletedExams />
                    </div>
                </div>
            </main>
        </>
    )
}

export default page