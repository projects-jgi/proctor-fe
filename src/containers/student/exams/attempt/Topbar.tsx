import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Countdown } from './Countdown'
import { save_student_exam_attempt } from '@/lib/server_api/student'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog'
import { toast } from 'sonner'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

function Topbar({ startTime, duration }: { startTime: string, duration: number }) {
    const router = useRouter()
    const [isFullyLoaded, onFullyLoaded] = useState(false)
    
    function onFinish(){
        const local_storage = localStorage.getItem("user_answers");
        let data: object = {};
        if(local_storage){
            data = JSON.parse(local_storage)
        }

        onFinishMutation.mutate({ exam_id: 1, answers: data})
    }

    const onFinishMutation = useMutation({
        mutationFn: save_student_exam_attempt,
        onSuccess: async (data) => {
            localStorage.removeItem("user_answers")

            if (document.fullscreenElement) {
                await document.exitFullscreen();
            }
            
            router.push("/student/dashboard")
        },
        onError: (error) => {
            toast.error("Unable to submit exam answers", {
                description: error.message
            })
        }
    })

    useEffect(() => {
        onFullyLoaded(true)
    }, [])

    return (
        <header className="flex h-16 shrink-0 justify-between items-center gap-2 border-b px-4">
            <div className="flex gap-2 h-16 items-center">
                <SidebarTrigger className="-ml-1" />
            </div>
            <div className='text-destructive'>
                {isFullyLoaded && <Countdown startTime={new Date(startTime)} duration={duration * 60} />}
            </div>
            <div className="flex items-center gap-4">
                <ThemeToggle />
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" disabled={onFinishMutation.isPending}>Finish</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Please check your answers before submission
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button variant="destructive" onClick={onFinish}>Continue</Button>
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </header>
    )
}

export default Topbar