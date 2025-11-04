"use client";

import { SchoolLayout } from '@/components/SchoolLayout';
import SessionMonitor from '@/components/SessionMonitor';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProctor } from '@/contexts/ProctorContext';
import {
    AlertTriangle,
    Building,
    Camera,
    Clock,
    Eye,
    Mic,
    Monitor,
    Pause,
    Play,
    RefreshCw,
    Shield,
    ShieldAlert,
    Square,
    Users,
    Wifi,
    WifiOff
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface ProctoringSession {
  id: string;
  examId: string;
  examTitle: string;
  departmentName: string;
  facultyName: string;
  studentId: string;
  studentName: string;
  startTime: string;
  duration: number;
  status: 'active' | 'paused' | 'terminated';
  violations: Violation[];
  cameraActive: boolean;
  micActive: boolean;
  tabVisible: boolean;
  lastActivity: string;
}

interface Violation {
  id: string;
  type: 'tab-switch' | 'copy-paste' | 'face-not-visible' | 'multiple-faces' | 'timeout';
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  resolved: boolean;
}

export default function SchoolProctoringPage() {
  const { currentUser, exams, students, departments, faculties } = useProctor();
  const [activeSessions, setActiveSessions] = useState<ProctoringSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ProctoringSession | null>(null);
  const [showViolationDialog, setShowViolationDialog] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isConnected, setIsConnected] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [activeTab, setActiveTab] = useState("sessions");

  // Mock data for demonstration - in real app this would come from API
  useEffect(() => {
    const mockSessions: ProctoringSession[] = [
      {
        id: 'session-1',
        examId: '1',
        examTitle: 'Data Structures Final Exam',
        departmentName: 'Computer Science',
        facultyName: 'Dr. Smith',
        studentId: 'student-1',
        studentName: 'John Doe',
        startTime: new Date(Date.now() - 3600000).toISOString(),
        duration: 120,
        status: 'active',
        cameraActive: true,
        micActive: true,
        tabVisible: true,
        lastActivity: new Date(Date.now() - 30000).toISOString(),
        violations: [
          {
            id: 'v1',
            type: 'tab-switch',
            description: 'Student switched tabs briefly',
            severity: 'medium',
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            resolved: true
          }
        ]
      },
      {
        id: 'session-2',
        examId: '2',
        examTitle: 'Database Management Systems',
        departmentName: 'Computer Science',
        facultyName: 'Dr. Johnson',
        studentId: 'student-2',
        studentName: 'Jane Smith',
        startTime: new Date(Date.now() - 2700000).toISOString(),
        duration: 90,
        status: 'active',
        cameraActive: true,
        micActive: false,
        tabVisible: true,
        lastActivity: new Date(Date.now() - 60000).toISOString(),
        violations: []
      },
      {
        id: 'session-3',
        examId: '3',
        examTitle: 'Business Mathematics',
        departmentName: 'Mathematics',
        facultyName: 'Prof. Davis',
        studentId: 'student-3',
        studentName: 'Bob Johnson',
        startTime: new Date(Date.now() - 1800000).toISOString(),
        duration: 60,
        status: 'paused',
        cameraActive: false,
        micActive: false,
        tabVisible: false,
        lastActivity: new Date(Date.now() - 300000).toISOString(),
        violations: [
          {
            id: 'v2',
            type: 'face-not-visible',
            description: 'Face not visible in camera frame',
            severity: 'high',
            timestamp: new Date(Date.now() - 600000).toISOString(),
            resolved: false
          },
          {
            id: 'v3',
            type: 'copy-paste',
            description: 'Attempted to copy question text',
            severity: 'high',
            timestamp: new Date(Date.now() - 300000).toISOString(),
            resolved: false
          }
        ]
      }
    ];

    setActiveSessions(mockSessions);
  }, []);

  // Simulate real-time updates
  const simulateRealTimeUpdates = useCallback(() => {
    setActiveSessions(prevSessions => {
      return prevSessions.map(session => {
        // Randomly update session status and add new violations
        const shouldUpdate = Math.random() < 0.3; // 30% chance of update
        if (!shouldUpdate) return session;

        const updatedSession = { ...session };

        // Update last activity
        updatedSession.lastActivity = new Date().toISOString();

        // Randomly change camera/mic status
        if (Math.random() < 0.1) { // 10% chance
          updatedSession.cameraActive = !updatedSession.cameraActive;
        }
        if (Math.random() < 0.05) { // 5% chance
          updatedSession.micActive = !updatedSession.micActive;
        }
        if (Math.random() < 0.15) { // 15% chance
          updatedSession.tabVisible = !updatedSession.tabVisible;
        }

        // Randomly add new violations
        if (Math.random() < 0.2 && updatedSession.status === 'active') { // 20% chance for active sessions
          const violationTypes: Violation['type'][] = ['tab-switch', 'copy-paste', 'face-not-visible', 'timeout'];
          const severities: Violation['severity'][] = ['low', 'medium', 'high'];
          const descriptions = {
            'tab-switch': 'Student switched tabs or minimized window',
            'copy-paste': 'Suspicious clipboard activity detected',
            'face-not-visible': 'Face not visible in camera frame',
            'multiple-faces': 'Multiple faces detected in camera frame',
            'timeout': 'No activity detected for extended period'
          };

          const randomType = violationTypes[Math.floor(Math.random() * violationTypes.length)];
          const randomSeverity = severities[Math.floor(Math.random() * severities.length)];

          const newViolation: Violation = {
            id: `v${Date.now()}`,
            type: randomType,
            description: descriptions[randomType],
            severity: randomSeverity,
            timestamp: new Date().toISOString(),
            resolved: false
          };

          updatedSession.violations = [...updatedSession.violations, newViolation];
        }

        return updatedSession;
      });
    });

    setLastUpdate(new Date());
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    if (!isAutoRefreshEnabled) return;

    const interval = setInterval(() => {
      simulateRealTimeUpdates();
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [isAutoRefreshEnabled, refreshInterval, simulateRealTimeUpdates]);

  // Simulate connection status
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      // Simulate occasional connection issues (5% chance)
      setIsConnected(Math.random() > 0.05);
    }, 10000); // Check every 10 seconds

    return () => clearInterval(connectionInterval);
  }, []);

  // Manual refresh function
  const handleManualRefresh = () => {
    simulateRealTimeUpdates();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'terminated': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-3 h-3" />;
      case 'paused': return <Pause className="w-3 h-3" />;
      case 'terminated': return <Square className="w-3 h-3" />;
      default: return <Monitor className="w-3 h-3" />;
    }
  };

  const getViolationSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const handleViewSession = (session: ProctoringSession) => {
    setSelectedSession(session);
  };

  const handleViolationAction = (violation: Violation, action: 'warn' | 'terminate' | 'dismiss') => {
    console.log(`Taking action ${action} on violation ${violation.id}`);

    if (action === 'terminate') {
      setActiveSessions(prev =>
        prev.map(session =>
          session.id === selectedSession?.id
            ? { ...session, status: 'terminated' as const }
            : session
        )
      );
    }

    setShowViolationDialog(false);
    setSelectedViolation(null);
  };

  const filteredSessions = selectedDepartment === 'all'
    ? activeSessions
    : activeSessions.filter(session => session.departmentName === selectedDepartment);

  const totalViolations = filteredSessions.reduce((sum, session) => sum + session.violations.length, 0);
  const activeExams = filteredSessions.filter(s => s.status === 'active').length;
  const highSeverityViolations = filteredSessions.reduce((sum, session) =>
    sum + session.violations.filter(v => v.severity === 'high' && !v.resolved).length, 0
  );

  const departmentStats = activeSessions.reduce((acc, session) => {
    if (!acc[session.departmentName]) {
      acc[session.departmentName] = { sessions: 0, violations: 0 };
    }
    acc[session.departmentName].sessions += 1;
    acc[session.departmentName].violations += session.violations.length;
    return acc;
  }, {} as Record<string, { sessions: number; violations: number }>);

  return (
    <SchoolLayout title="School Proctoring Dashboard" subtitle="Monitor all ongoing exam sessions across departments">
      <div className="space-y-6">
        {/* Department Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Department Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              <Button
                variant={selectedDepartment === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedDepartment('all')}
              >
                All Departments ({activeSessions.length})
              </Button>
              {Object.entries(departmentStats).map(([dept, stats]) => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? 'default' : 'outline'}
                  onClick={() => setSelectedDepartment(dept)}
                >
                  {dept} ({stats.sessions})
                  {stats.violations > 0 && (
                    <Badge variant="destructive" className="ml-2 text-xs">
                      {stats.violations}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

      {/* Real-time Status Bar */}
      <Card className="mb-6 border-l-4 border-l-green-500">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <Wifi className="w-4 h-4 text-green-600" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-600" />
                )}
                <span className="text-sm font-medium">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <RefreshCw className={`w-4 h-4 ${isAutoRefreshEnabled ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="text-sm">
                  Auto-refresh: {isAutoRefreshEnabled ? 'ON' : 'OFF'}
                </span>
              </div>

              <div className="text-sm text-muted-foreground">
                Last update: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="text-sm border rounded px-2 py-1"
                disabled={!isAutoRefreshEnabled}
              >
                <option value={10}>10s</option>
                <option value={30}>30s</option>
                <option value={60}>1m</option>
                <option value={300}>5m</option>
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAutoRefreshEnabled(!isAutoRefreshEnabled)}
              >
                {isAutoRefreshEnabled ? 'Pause' : 'Resume'} Auto-refresh
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleManualRefresh}
                disabled={!isConnected}
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeExams}</div>
              <p className="text-xs text-muted-foreground">
                {filteredSessions.length} total sessions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredSessions.length}</div>
              <p className="text-xs text-muted-foreground">
                Currently monitored
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Violations</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViolations}</div>
              <p className="text-xs text-muted-foreground">
                {highSeverityViolations} high severity
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues</CardTitle>
              <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {filteredSessions.filter(s => !s.cameraActive || !s.micActive || !s.tabVisible).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Technical issues detected
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
            <TabsTrigger value="violations">Violation Reports</TabsTrigger>
            <TabsTrigger value="alerts">Live Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Proctoring Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(session.status)}`} />
                          {getStatusIcon(session.status)}
                          <div>
                            <h3 className="font-semibold">{session.studentName}</h3>
                            <p className="text-sm text-muted-foreground">{session.examTitle}</p>
                            <p className="text-xs text-muted-foreground">
                              {session.departmentName} • {session.facultyName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={session.status === 'active' ? 'default' : 'secondary'}>
                            {session.status}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewSession(session)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Monitor
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Camera className={`w-4 h-4 ${session.cameraActive ? 'text-green-600' : 'text-red-600'}`} />
                          <span>Camera: {session.cameraActive ? 'Active' : 'Inactive'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mic className={`w-4 h-4 ${session.micActive ? 'text-green-600' : 'text-red-600'}`} />
                          <span>Mic: {session.micActive ? 'Active' : 'Inactive'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Monitor className={`w-4 h-4 ${session.tabVisible ? 'text-green-600' : 'text-red-600'}`} />
                          <span>Tab: {session.tabVisible ? 'Focused' : 'Unfocused'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>Started: {new Date(session.startTime).toLocaleTimeString()}</span>
                        </div>
                      </div>

                      {session.violations.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center gap-2 text-sm text-orange-600">
                            <AlertTriangle className="w-4 h-4" />
                            <span>{session.violations.length} violation(s) detected</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="violations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Violation Reports by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSessions
                    .filter(session => session.violations.length > 0)
                    .map((session) => (
                      <div key={session.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="font-semibold">{session.studentName}</h3>
                          <Badge variant="outline">{session.departmentName}</Badge>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{session.facultyName}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{session.examTitle}</p>
                        <div className="space-y-2">
                          {session.violations.map((violation) => (
                            <div key={violation.id} className="flex items-center justify-between p-2 bg-muted rounded">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-600" />
                                <div>
                                  <p className="text-sm font-medium">{violation.type.replace('_', ' ')}</p>
                                  <p className="text-xs text-muted-foreground">{violation.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={getViolationSeverityColor(violation.severity)}>
                                  {violation.severity}
                                </Badge>
                                {!violation.resolved && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedViolation(violation);
                                      setShowViolationDialog(true);
                                    }}
                                  >
                                    Action
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Live Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSessions
                    .filter(session => !session.cameraActive || !session.micActive || !session.tabVisible || session.violations.some(v => !v.resolved))
                    .map((session) => (
                      <Alert key={session.id}>
                        <AlertTriangle className="h-4 w-4" />
                        <div className="ml-2">
                          <strong>{session.studentName}</strong> - {session.examTitle}
                          <div className="mt-2 space-y-1">
                            {!session.cameraActive && <p>• Camera is inactive</p>}
                            {!session.micActive && <p>• Microphone is inactive</p>}
                            {!session.tabVisible && <p>• Tab is not focused</p>}
                            {session.violations.filter(v => !v.resolved).length > 0 && (
                              <p>• {session.violations.filter(v => !v.resolved).length} unresolved violation(s)</p>
                            )}
                          </div>
                        </div>
                      </Alert>
                    ))}
                  {filteredSessions.every(session =>
                    session.cameraActive && session.micActive && session.tabVisible &&
                    session.violations.every(v => v.resolved)
                  ) && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Shield className="w-12 h-12 mx-auto mb-4 text-green-600" />
                      <p>All sessions are running smoothly. No alerts at this time.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <SessionMonitor
          session={selectedSession}
          open={!!selectedSession}
          onOpenChange={() => setSelectedSession(null)}
          onSendMessage={(s) => console.log('Send message to', s?.studentName)}
          onTerminate={(s) => {
            setActiveSessions(prev => prev.map(sess => sess.id === s.id ? { ...sess, status: 'terminated' as const } : sess));
            setSelectedSession(null);
          }}
          onPrepareViolationAction={(v) => {
            setSelectedViolation(v);
            setShowViolationDialog(true);
          }}
        />

        {/* Violation Action Dialog */}
        <Dialog open={showViolationDialog} onOpenChange={setShowViolationDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Violation Action Required</DialogTitle>
              <DialogDescription>
                {selectedViolation && (
                  <div className="space-y-2">
                    <p><strong>Type:</strong> {selectedViolation.type.replace('_', ' ')}</p>
                    <p><strong>Description:</strong> {selectedViolation.description}</p>
                    <p><strong>Severity:</strong> <Badge variant={getViolationSeverityColor(selectedViolation.severity)}>{selectedViolation.severity}</Badge></p>
                    <p><strong>Time:</strong> {new Date(selectedViolation.timestamp).toLocaleString()}</p>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => selectedViolation && handleViolationAction(selectedViolation, 'dismiss')}
              >
                Dismiss
              </Button>
              <Button
                variant="default"
                onClick={() => selectedViolation && handleViolationAction(selectedViolation, 'warn')}
              >
                Send Warning
              </Button>
              <Button
                variant="destructive"
                onClick={() => selectedViolation && handleViolationAction(selectedViolation, 'terminate')}
              >
                Terminate Exam
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      </div>
    </SchoolLayout>
  );
}