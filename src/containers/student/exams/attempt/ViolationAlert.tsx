import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RootState } from "@/lib/redux/store";
import { OctagonAlert } from "lucide-react";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";

function ViolationAlert({
  onClose,
  description,
}: {
  description: string;
  onClose: () => void;
}) {
  const attempt = useSelector((state: RootState) => state.exam_attempt.attempt);
  const violations = useSelector(
    (state: RootState) => state.exam_attempt.violations,
  );
  let violation_count = useCallback(() => {
    return violations.length;
  }, [violations]);

  return (
    <>
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle asChild>
              <h2 className="flex items-center gap-2 text-destructive/90">
                <OctagonAlert />
                <span>Violation Alert</span>
              </h2>
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <p className="mb-2">{description}</p>
                <p className="text-destructive">
                  <b>
                    {Math.max(
                      0,
                      attempt.exam.max_violation_count - violation_count(),
                    )}
                  </b>{" "}
                  out of <b>{attempt.exam.max_violation_count}</b> violations
                  left
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button onClick={onClose}>Continue</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ViolationAlert;
