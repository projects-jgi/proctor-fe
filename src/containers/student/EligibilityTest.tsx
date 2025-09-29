'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function safePermissionQuery(name: string) {
  if (!navigator.permissions || !navigator.permissions.query) return Promise.resolve('prompt');
  return navigator.permissions.query({ name: name as PermissionName }).then(p => p.state).catch(() => 'prompt');
}

// try to request fullscreen on an element (document.documentElement by default)
// returns true if fullscreen entered, false otherwise
async function tryEnterFullscreen(element = document.documentElement) {
  if (!element) return false;

  // standard API
  if (element.requestFullscreen) {
    try {
      await element.requestFullscreen();
      return true;
    } catch (e) {
      // rejected or failed
      return false;
    }
  }

  // WebKit fallback (Safari)
  // @ts-ignore
  if (element.webkitRequestFullscreen) {
    try {
      // @ts-ignore
      element.webkitRequestFullscreen();
      // Safari's webkit method does not return a promise; assume success if no exception
      return true;
    } catch (e) {
      return false;
    }
  }

  // no fullscreen support
  return false;
}

export default function EligibilityTest() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [systemCheck, setSystemCheck] = useState({
    audio: 'Not Checked',
    video: 'Not Checked',
    fullscreen: 'Not Checked',
    internet: 'Not Checked',
  });

  const [isChecking, setIsChecking] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [isEligible, setIsEligible] = useState(false);

  // Run checks (audio/video/online). This runs in response to a user action (open dialog)
  const performSystemCheck = async () => {
    if (isChecking) return;
    setIsChecking(true);
    setSystemCheck({
      audio: 'Checking...',
      video: 'Checking...',
      fullscreen: 'Checking...',
      internet: 'Checking...',
    });
    setIsEligible(false);

    const results = {
      audio: 'Failed',
      video: 'Failed',
      fullscreen: 'Failed',
      internet: 'Failed',
    };

    // Internet
    results.internet = navigator.onLine ? 'Stable' : 'Failed';
    setSystemCheck(prev => ({ ...prev, internet: results.internet }));

    // Fullscreen *capability* (not guarantee it will enter)
    results.fullscreen = !!document?.fullscreenEnabled ? 'Working' : 'Failed';
    setSystemCheck(prev => ({ ...prev, fullscreen: results.fullscreen }));

    // Audio (permission-aware)
    try {
      const micState = await safePermissionQuery('microphone');
      if (micState === 'denied') {
        results.audio = 'Failed';
        setSystemCheck(prev => ({ ...prev, audio: results.audio }));
      } else {
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          audioStream.getTracks().forEach(t => t.stop());
          results.audio = 'Working';
          setSystemCheck(prev => ({ ...prev, audio: results.audio }));
        } catch {
          results.audio = 'Failed';
          setSystemCheck(prev => ({ ...prev, audio: results.audio }));
        }
      }
    } catch {
      results.audio = 'Failed';
      setSystemCheck(prev => ({ ...prev, audio: results.audio }));
    }

    // Video
    try {
      const camState = await safePermissionQuery('camera');
      if (camState === 'denied') {
        results.video = 'Failed';
        setSystemCheck(prev => ({ ...prev, video: results.video }));
      } else {
        try {
          const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoStream.getTracks().forEach(t => t.stop());
          results.video = 'Working';
          setSystemCheck(prev => ({ ...prev, video: results.video }));
        } catch {
          results.video = 'Failed';
          setSystemCheck(prev => ({ ...prev, video: results.video }));
        }
      }
    } catch {
      results.video = 'Failed';
      setSystemCheck(prev => ({ ...prev, video: results.video }));
    }

    const ok =
      results.audio === 'Working' &&
      results.video === 'Working' &&
      results.internet === 'Stable' &&
      results.fullscreen === 'Working';

    setIsEligible(ok);
    setIsChecking(false);
  };

  // Called when the external Enter Exam button is clicked:
  // open the dialog and run the checks (permission prompts appear inside dialog)
  const openDialogAndCheck = () => {
    setOpen(true);
    // run checks immediately (still considered a user flow). If you see permission prompts not attached,
    // ensure the browser hasn't permanently blocked them for the site
    setTimeout(performSystemCheck, 50);
  };

  // FINAL action: attempt to enter fullscreen (user gesture required), then navigate if success
  const enterExamAndFullscreen = async () => {
    if (isChecking || !accepted) return;

    // Attempt to actually enter fullscreen now. This must be called from the click handler (user gesture).
    const fsSuccess = await tryEnterFullscreen(document.documentElement);
    // Update UI with actual fullscreen result
    setSystemCheck(prev => ({ ...prev, fullscreen: fsSuccess ? 'Working' : 'Failed' }));

    // Re-evaluate eligibility: fullscreen must be Working now
    const finalOk =
      systemCheck.audio === 'Working' &&
      systemCheck.video === 'Working' &&
      systemCheck.internet === 'Stable' &&
      fsSuccess;

    setIsEligible(finalOk);

    if (!finalOk) {
      // If fullscreen failed, show a helpful message (browser might have blocked it)
      // The user can re-run checks or allow site permissions manually.
      return;
    }

    // All good — navigate to exam (replace route as needed)
    router.push('/exam'); // change to your exam route
  };

  return (
    <>
      <Button onClick={openDialogAndCheck}>Enter Exam</Button>

      <Dialog open={open} onOpenChange={v => setOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exam Eligibility Check</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Terms & Conditions</h3>
              <ul className="list-disc pl-5 text-sm">
                <li>I agree to maintain academic integrity throughout this examination.</li>
                <li>I will not use any unauthorized materials during the exam.</li>
                <li>I understand that any attempt to cheat will result in immediate disqualification.</li>
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox id="terms" checked={accepted} onCheckedChange={v => setAccepted(!!v)} />
              <Label htmlFor="terms">Accept terms and conditions (required)</Label>
            </div>

            <div>
              <h3 className="text-lg font-semibold">System Check</h3>
              <ul className="text-sm">
                <li>Audio System: {systemCheck.audio}</li>
                <li>Video System: {systemCheck.video}</li>
                <li>Fullscreen Mode: {systemCheck.fullscreen}</li>
                <li>Internet Connection: {systemCheck.internet}</li>
              </ul>

              <div className="text-xs mt-2 text-muted-foreground">
                {isChecking ? 'Checking systems... (permission prompts may appear)' : 'Click Re-run check to recheck'}
              </div>

              <div style={{ marginTop: 8, fontSize: 13, color: '#444' }}>
                <strong>Note:</strong> Actually entering fullscreen requires a direct user click. If Fullscreen shows{' '}
                <em>Failed</em> after clicking the final button, open the lock icon in the address bar → Site settings → ensure Fullscreen access is allowed (or try another browser). Some browsers block fullscreen when not in a user gesture.
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <div style={{ display: 'flex', gap: 8 }}>
              <Button onClick={performSystemCheck} disabled={isChecking}>
                {isChecking ? 'Checking…' : 'Re-run check'}
              </Button>

              <Button
                variant="default"
                disabled={!accepted || isChecking}
                onClick={enterExamAndFullscreen}
              >
                Check Eligibility & Enter Exam
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
