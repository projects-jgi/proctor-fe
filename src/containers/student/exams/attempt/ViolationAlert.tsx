import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { setViolations } from '@/lib/redux/state/ExamAttempt'
import { RootState } from '@/lib/redux/store'
import { create_attempt_violation } from '@/lib/server_api/student'
import { InvalidateQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'
import { OctagonAlert } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function ViolationAlert({onClose, description}: {description: string, onClose: () => void}) {
    const initialized = useRef<boolean>(false)
    const attempt_id = useSelector((state: RootState) => state.exam_attempt.attempt.id)
    const exam_id = useSelector((state: RootState) => state.exam_attempt.attempt.exam_id)
    const attempt = useSelector((state: RootState) => state.exam_attempt.attempt);
    const violations = useSelector((state: RootState) => state.exam_attempt.violations);
    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    const violation_count = useRef(violations.length + 1)

    const store_violation_mutation = useMutation({
        mutationFn: create_attempt_violation,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["exams", variables.exam_id, "attempts", variables.attempt_id, "violations"]})
            dispatch(setViolations(data))
        }
    })

    async function store_violation(){
        const params = {
            description: "Tab switch",
            exam_id: exam_id,
            attempt_id: attempt_id,
        }
        store_violation_mutation.mutate({...params})
    }

    useEffect(() => {
        if(initialized.current) return

        initialized.current = true
        store_violation()
    }, [])

    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle asChild>
                        <h2 className="flex items-center gap-2 text-destructive/90">
                            <OctagonAlert />
                            <span>Violation Alert</span>
                        </h2>
                    </DialogTitle>
                    <DialogDescription>
                        <p className='mb-2'>{description}</p>
                        <p className='text-destructive'><b>{Math.max(0, attempt.exam.max_violation_count - violation_count.current)}</b> out of <b>{attempt.exam.max_violation_count}</b> violations left</p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={onClose}>Continue</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>  
    )
}

export default ViolationAlert