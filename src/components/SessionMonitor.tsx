"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Camera, Crop, Image, Maximize, MessageSquare, Monitor, Square } from 'lucide-react';

interface Violation {
  id: string;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  resolved: boolean;
}

interface Props {
  session: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendMessage?: (session: any) => void;
  onTerminate?: (session: any) => void;
  onPrepareViolationAction?: (violation: any) => void;
}

export default function SessionMonitor({ session, open, onOpenChange, onSendMessage, onTerminate, onPrepareViolationAction }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">{session?.studentName ?? '—'}</div>
              <div className="text-sm text-muted-foreground">{session?.examTitle ?? ''}</div>
            </div>
            <Badge variant={session?.status === 'active' ? 'default' : 'secondary'}>
              {session?.status ?? '—'}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Video Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  {session?.studentName ?? '—'} - {session?.examTitle ?? ''}
                </span>
                <Badge variant={session?.status === 'active' ? 'default' : 'secondary'}>
                  {session?.status ?? '—'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black/5 rounded-lg overflow-hidden relative">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Image className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="mt-2">Live video stream</p>
                  </div>
                </div>
                {/* Controls */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 px-3 py-2 rounded-md shadow">
                  <Button size="sm" variant="outline" onClick={() => onSendMessage?.(session)}>
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => console.log('snapshot')}>
                    <Crop className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => console.log('fullscreen')}>
                    <Maximize className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onTerminate?.(session)}>
                    <Square className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Minimal Session Info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span>Started: {session ? new Date(session.startTime).toLocaleTimeString() : '—'}</span>
              <span>Duration: {session?.duration ? `${session.duration} min` : '—'}</span>
              <span className="flex items-center gap-1">
                <Monitor className={`w-4 h-4 ${session?.tabVisible ? 'text-green-600' : 'text-red-600'}`} />
                {session?.tabVisible ? 'Focused' : 'Unfocused'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => onSendMessage?.(session)}>
                <MessageSquare className="w-4 h-4 mr-1" />
                Message
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onTerminate?.(session)}>
                <Square className="w-4 h-4 mr-1" />
                Terminate
              </Button>
            </div>
          </div>

          {/* Violations - Compact */}
          {session?.violations?.filter((v: Violation) => !v.resolved).length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Active Violations</h4>
              <div className="flex gap-2 flex-wrap">
                {session.violations.filter((v: Violation) => !v.resolved).map((v: Violation) => (
                  <Badge key={v.id} variant="destructive" className="cursor-pointer" onClick={() => onPrepareViolationAction?.(v)}>
                    {v.type.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
