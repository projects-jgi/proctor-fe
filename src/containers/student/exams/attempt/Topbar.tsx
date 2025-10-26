import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Countdown } from './Countdown'
import { save_student_exam_attempt } from '@/lib/server_api/student'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog'
import { toast } from 'sonner'

function Topbar({ startTime, duration }: { startTime: string, duration: number }) {
    const router = useRouter()
    
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
        onSuccess: (data) => {
            router.push("/student/dashboard")
        },
        onError: (error) => {
            toast.error("Unable to submit exam answers", {
                description: error.message
            })
        }
    })

    return (
        <nav className="mb-2 w-full h-16 flex items-center justify-between px-6 border-b shadow-lg">
            <div className='text-destructive'>
                {/* <Countdown startTime={new Date(startTime)} duration={duration * 60} /> */}
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
        </nav>
    )
}

export default Topbar