"use client";

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useProctor } from '@/contexts/ProctorContext';
import {
    AlertTriangle,
    Camera,
    Eye,
    Mic,
    Monitor,
    Shield,
    ShieldAlert
} from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface ProctoringMonitorProps {
  attemptId: string;
  sessionId: string;
  onViolation: (violation: any) => void;
}

interface ProctoringState {
  cameraActive: boolean;
  microphoneActive: boolean;
  screenShared: boolean;
  tabVisible: boolean;
  copyPasteDetected: boolean;
  mouseMovements: number;
  suspiciousActivities: number;
  lastActivity: Date;
}

export const ProctoringMonitor: React.FC<ProctoringMonitorProps> = ({
  attemptId,
  sessionId,
  onViolation
}) => {
  const { recordViolation } = useProctor();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [proctoringState, setProctoringState] = useState<ProctoringState>({
    cameraActive: false,
    microphoneActive: false,
    screenShared: false,
    tabVisible: true,
    copyPasteDetected: false,
    mouseMovements: 0,
    suspiciousActivities: 0,
    lastActivity: new Date()
  });

  const [violations, setViolations] = useState<any[]>([]);
  const [showViolationDialog, setShowViolationDialog] = useState(false);
  const [currentViolation, setCurrentViolation] = useState<any>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  // Initialize camera and microphone
  const initializeMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      streamRef.current = stream;
      setProctoringState(prev => ({
        ...prev,
        cameraActive: true,
        microphoneActive: true
      }));
      setIsMonitoring(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      recordViolation(attemptId, {
        attemptId,
        type: 'face-not-visible', // Using existing type for media access issues
        description: 'Failed to access camera or microphone',
        timestamp: new Date().toISOString(),
        severity: 'high'
      });
    }
  }, [attemptId, recordViolation]);

  // Tab visibility monitoring
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      setProctoringState(prev => ({ ...prev, tabVisible: isVisible }));

      if (!isVisible) {
        const violation = {
          attemptId,
          type: 'tab-switch' as const,
          description: 'Student switched tabs or minimized window',
          timestamp: new Date().toISOString(),
          severity: 'medium' as const
        };
        recordViolation(attemptId, violation);
        setViolations(prev => [...prev, violation]);
        setCurrentViolation(violation);
        setShowViolationDialog(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [attemptId, recordViolation]);

  // Copy/Paste detection
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      const violation = {
        attemptId,
        type: 'copy-paste' as const,
        description: 'Student attempted to copy content',
        timestamp: new Date().toISOString(),
        severity: 'high' as const
      };
      recordViolation(attemptId, violation);
      setViolations(prev => [...prev, violation]);
      setCurrentViolation(violation);
      setShowViolationDialog(true);
      e.preventDefault();
    };

    const handlePaste = (e: ClipboardEvent) => {
      const violation = {
        attemptId,
        type: 'copy-paste' as const,
        description: 'Student attempted to paste content',
        timestamp: new Date().toISOString(),
        severity: 'high' as const
      };
      recordViolation(attemptId, violation);
      setViolations(prev => [...prev, violation]);
      setCurrentViolation(violation);
      setShowViolationDialog(true);
      e.preventDefault();
    };

    const handleCut = (e: ClipboardEvent) => {
      const violation = {
        attemptId,
        type: 'copy-paste' as const,
        description: 'Student attempted to cut content',
        timestamp: new Date().toISOString(),
        severity: 'high' as const
      };
      recordViolation(attemptId, violation);
      setViolations(prev => [...prev, violation]);
      setCurrentViolation(violation);
      setShowViolationDialog(true);
      e.preventDefault();
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('cut', handleCut);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('cut', handleCut);
    };
  }, [attemptId, recordViolation]);

  // Mouse movement tracking
  useEffect(() => {
    let lastMouseMove = Date.now();
    let mouseMoveCount = 0;

    const handleMouseMove = () => {
      mouseMoveCount++;
      lastMouseMove = Date.now();

      setProctoringState(prev => ({
        ...prev,
        mouseMovements: mouseMoveCount,
        lastActivity: new Date()
      }));
    };

    // Check for suspicious inactivity (no mouse movement for 2 minutes)
    const checkInactivity = setInterval(() => {
      const timeSinceLastMove = Date.now() - lastMouseMove;
      if (timeSinceLastMove > 120000 && isMonitoring) { // 2 minutes
        const violation = {
          attemptId,
          type: 'timeout' as const,
          description: 'No mouse movement detected for 2+ minutes',
          timestamp: new Date().toISOString(),
          severity: 'medium' as const
        };
        recordViolation(attemptId, violation);
        setViolations(prev => [...prev, violation]);
      }
    }, 30000); // Check every 30 seconds

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(checkInactivity);
    };
  }, [attemptId, recordViolation, isMonitoring]);

  // Right-click detection
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const violation = {
        attemptId,
        type: 'tab-switch' as const, // Using tab-switch for right-click as it's suspicious activity
        description: 'Student attempted right-click context menu',
        timestamp: new Date().toISOString(),
        severity: 'medium' as const
      };
      recordViolation(attemptId, violation);
      setViolations(prev => [...prev, violation]);
      setCurrentViolation(violation);
      setShowViolationDialog(true);
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [attemptId, recordViolation]);

  // Keyboard shortcuts detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Detect common cheating shortcuts
      const suspiciousKeys = [
        { ctrl: true, key: 'c' }, // Ctrl+C
        { ctrl: true, key: 'v' }, // Ctrl+V
        { ctrl: true, key: 'x' }, // Ctrl+X
        { ctrl: true, key: 'a' }, // Ctrl+A
        { ctrl: true, key: 'f' }, // Ctrl+F
        { ctrl: true, shift: true, key: 'I' }, // F12 Developer Tools
        { key: 'F12' },
        { key: 'F11' }
      ];

      const isSuspicious = suspiciousKeys.some(shortcut => {
        if (shortcut.ctrl && !e.ctrlKey) return false;
        if (shortcut.shift && !e.shiftKey) return false;
        return e.key.toLowerCase() === shortcut.key.toLowerCase();
      });

      if (isSuspicious) {
        const violation = {
          attemptId,
          type: 'copy-paste' as const, // Using copy-paste for suspicious shortcuts
          description: `Student used suspicious keyboard shortcut: ${e.ctrlKey ? 'Ctrl+' : ''}${e.shiftKey ? 'Shift+' : ''}${e.key}`,
          timestamp: new Date().toISOString(),
          severity: 'high' as const
        };
        recordViolation(attemptId, violation);
        setViolations(prev => [...prev, violation]);
        setCurrentViolation(violation);
        setShowViolationDialog(true);
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [attemptId, recordViolation]);

  // Screen sharing detection (basic)
  useEffect(() => {
    const checkScreenSharing = async () => {
      try {
        // This is a simplified check - in a real implementation,
        // you'd use more sophisticated screen sharing detection
        const displays = await (navigator as any).getDisplayMedia?.({ video: true });
        if (displays) {
          setProctoringState(prev => ({ ...prev, screenShared: true }));
          const violation = {
            attemptId,
            type: 'multiple-faces' as const, // Using multiple-faces for screen sharing detection
            description: 'Screen sharing detected',
            timestamp: new Date().toISOString(),
            severity: 'high' as const
          };
          recordViolation(attemptId, violation);
          setViolations(prev => [...prev, violation]);
          setCurrentViolation(violation);
          setShowViolationDialog(true);
        }
      } catch (error) {
        // Screen sharing not active or not supported
      }
    };

    const interval = setInterval(checkScreenSharing, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [attemptId, recordViolation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <ShieldAlert className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'low': return <Shield className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <>
      {/* Proctoring Status Bar */}
      <Card className="mb-4 border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Eye className="w-5 h-5 text-blue-600" />
            Proctoring Active
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Camera className={`w-4 h-4 ${proctoringState.cameraActive ? 'text-green-600' : 'text-red-600'}`} />
              <span className="text-sm">Camera</span>
              <Badge variant={proctoringState.cameraActive ? 'default' : 'destructive'} className="text-xs">
                {proctoringState.cameraActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Mic className={`w-4 h-4 ${proctoringState.microphoneActive ? 'text-green-600' : 'text-red-600'}`} />
              <span className="text-sm">Microphone</span>
              <Badge variant={proctoringState.microphoneActive ? 'default' : 'destructive'} className="text-xs">
                {proctoringState.microphoneActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className={`w-4 h-4 ${proctoringState.tabVisible ? 'text-green-600' : 'text-red-600'}`} />
              <span className="text-sm">Tab Focus</span>
              <Badge variant={proctoringState.tabVisible ? 'default' : 'destructive'} className="text-xs">
                {proctoringState.tabVisible ? 'Focused' : 'Unfocused'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Violations</span>
              <Badge variant={violations.length > 0 ? 'destructive' : 'default'} className="text-xs">
                {violations.length}
              </Badge>
            </div>
          </div>

          {!isMonitoring && (
            <div className="mt-4">
              <Button onClick={initializeMedia} className="w-full">
                Start Proctoring Session
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Camera Feed */}
      {isMonitoring && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Live Camera Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-48 bg-gray-100 rounded-lg object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Badge variant="secondary" className="text-xs">
                  <Eye className="w-3 h-3 mr-1" />
                  Monitoring
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Violations */}
      {violations.length > 0 && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="w-4 h-4" />
              Recent Violations ({violations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {violations.slice(-5).map((violation, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(violation.severity)}
                    <span className="text-sm font-medium">{violation.type.replace('_', ' ')}</span>
                  </div>
                  <Badge variant={getSeverityColor(violation.severity)} className="text-xs">
                    {violation.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Violation Alert Dialog */}
      <Dialog open={showViolationDialog} onOpenChange={setShowViolationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              {getSeverityIcon(currentViolation?.severity)}
              Proctoring Alert
            </DialogTitle>
            <DialogDescription className="space-y-3">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Violation Detected:</strong> {currentViolation?.description}
                </AlertDescription>
              </Alert>
              <p className="text-sm text-muted-foreground">
                This incident has been recorded and will be reviewed by your instructor.
                Please return to your exam and avoid any suspicious activities.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setShowViolationDialog(false)}>
              I Understand
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProctoringMonitor;