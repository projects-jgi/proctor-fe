import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RootState } from "@/lib/redux/store";
import { OctagonAlert } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
    (state: RootState) => state.exam_attempt.violations
  );
  let violation_count = useCallback(() => {
    return violations.length + 1;
  }, [violations]);

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
          <DialogDescription asChild>
            <div>
              <p className="mb-2">{description}</p>
              <p className="text-destructive">
                <b>
                  {Math.max(
                    0,
                    attempt.exam.max_violation_count - violation_count()
                  )}
                </b>{" "}
                out of <b>{attempt.exam.max_violation_count}</b> violations left
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onClose}>Continue</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ViolationAlert;
