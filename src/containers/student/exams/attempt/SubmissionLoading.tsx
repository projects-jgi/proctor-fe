import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Loading from '@/components/Loading';

export default function SubmissionLoading(){
    return (
        <AlertDialog open={true}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Submitting Exam <Loading /></AlertDialogTitle>
            <AlertDialogDescription asChild>
                <div className="flex justify-between">
                    {/* <p>Submitting Exam</p> */}
                    <Loading />
                </div>
            </AlertDialogDescription>
            </AlertDialogHeader>
        </AlertDialogContent>
        </AlertDialog>
    )
}