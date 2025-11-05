"use client";

import { useState, useEffect, useCallback } from 'react';
import { FacultyLayout } from '@/components/FacultyLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useProctor } from '@/contexts/ProctorContext';
import {
  Eye,
  Users,
  AlertTriangle,
  Camera,
  Mic,
  Monitor,
  Shield,
  ShieldAlert,
  Clock,
  UserCheck,
  UserX,
  Play,
  Pause,
  Square,
  MessageSquare,
  RefreshCw,
  Wifi,
  WifiOff,
  Search,
  Filter,
  Download,
  Bell,
  BellOff,
  Activity,
  TrendingUp,
  CheckCircle,
  Volume2,
  VolumeX,
  Grid3X3,
  List,
  Calendar,
  BarChart3
} from 'lucide-react';

interface ProctoringSession {
  id: string;
  examId: string;
  examTitle: string;
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
  questionsCompleted: number;
  totalQuestions: number;
  warnings: number;
}

interface Violation {
  id: string;
  type: 'tab-switch' | 'copy-paste' | 'face-not-visible' | 'multiple-faces' | 'timeout';
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  resolved: boolean;
}

export default function ProctoringPage() {
  const { currentUser, exams, students } = useProctor();
  const [activeSessions, setActiveSessions] = useState<ProctoringSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ProctoringSession | null>(null);
  const [showViolationDialog, setShowViolationDialog] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isConnected, setIsConnected] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds

  // Enhanced state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'terminated'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedExamFilter, setSelectedExamFilter] = useState<string>('all');
  const [violationStats, setViolationStats] = useState({
    total: 0,
    resolved: 0,
    high: 0,
    medium: 0,
    low: 0
  });

  // Mock data for demonstration - in real app this would come from API
  useEffect(() => {
    const mockSessions: ProctoringSession[] = [
      {
        id: 'session-1',
        examId: '1',
        examTitle: 'Data Structures Final Exam',
        studentId: 'student-1',
        studentName: 'John Doe',
        startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        duration: 120,
        status: 'active',
        cameraActive: true,
        micActive: true,
        tabVisible: true,
        lastActivity: new Date(Date.now() - 30000).toISOString(), // 30 seconds ago
        questionsCompleted: 15,
        totalQuestions: 25,
        warnings: 2,
        violations: [
          {
            id: 'v1',
            type: 'tab-switch',
            description: 'Student switched tabs briefly',
            severity: 'medium',
            timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
            resolved: true
          },
          {
            id: 'v2',
            type: 'copy-paste',
            description: 'Attempted to copy question text',
            severity: 'high',
            timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
            resolved: false
          }
        ]
      },
      {
        id: 'session-2',
        examId: '1',
        examTitle: 'Data Structures Final Exam',
        studentId: 'student-2',
        studentName: 'Jane Smith',
        startTime: new Date(Date.now() - 2700000).toISOString(), // 45 minutes ago
        duration: 120,
        status: 'active',
        cameraActive: true,
        micActive: false,
        tabVisible: true,
        lastActivity: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
        questionsCompleted: 18,
        totalQuestions: 25,
        warnings: 0,
        violations: []
      },
      {
        id: 'session-3',
        examId: '1',
        examTitle: 'Data Structures Final Exam',
        studentId: 'student-3',
        studentName: 'Bob Johnson',
        startTime: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        duration: 120,
        status: 'paused',
        cameraActive: false,
        micActive: false,
        tabVisible: false,
        lastActivity: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        questionsCompleted: 8,
        totalQuestions: 25,
        warnings: 3,
        violations: [
          {
            id: 'v3',
            type: 'face-not-visible',
            description: 'Face not visible in camera frame',
            severity: 'high',
            timestamp: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
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
    // In real app, this would send action to backend
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

  const totalViolations = activeSessions.reduce((sum, session) => sum + session.violations.length, 0);
  const activeExams = activeSessions.filter(s => s.status === 'active').length;
  const highSeverityViolations = activeSessions.reduce((sum, session) =>
    sum + session.violations.filter(v => v.severity === 'high' && !v.resolved).length, 0
  );

  // Enhanced filtering and stats
  const filteredSessions = activeSessions.filter(session => {
    const matchesSearch = session.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.examTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    const matchesExam = selectedExamFilter === 'all' || session.examId === selectedExamFilter;
    return matchesSearch && matchesStatus && matchesExam;
  });

  // Update violation stats
  useEffect(() => {
    const allViolations = activeSessions.flatMap(session => session.violations);
    setViolationStats({
      total: allViolations.length,
      resolved: allViolations.filter(v => v.resolved).length,
      high: allViolations.filter(v => v.severity === 'high').length,
      medium: allViolations.filter(v => v.severity === 'medium').length,
      low: allViolations.filter(v => v.severity === 'low').length
    });
  }, [activeSessions]);

  return (
    <FacultyLayout title="Proctoring Dashboard" subtitle="Advanced real-time exam monitoring and violation detection">
      {/* Enhanced Status Bar */}
      <div className="mb-6 space-y-4">
        <Card className="border-l-4 border-l-gradient-to-r from-blue-500 to-purple-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900 rounded-full">
                      <Wifi className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">Connected</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900 rounded-full">
                      <WifiOff className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-700 dark:text-red-300">Disconnected</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <RefreshCw className={`w-4 h-4 ${isAutoRefreshEnabled ? 'text-blue-600 animate-spin' : 'text-gray-400'}`} />
                  <span className="text-sm">
                    Auto-refresh: <span className={isAutoRefreshEnabled ? 'text-blue-600 font-medium' : 'text-gray-500'}>{isAutoRefreshEnabled ? 'ON' : 'OFF'}</span>
                  </span>
                </div>

                <div className="text-sm text-muted-foreground">
                  Last update: {lastUpdate.toLocaleTimeString()}
                </div>

                {highSeverityViolations > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900 rounded-full">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-700 dark:text-red-300">
                      {highSeverityViolations} Critical Alert{highSeverityViolations > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(Number(e.target.value))}
                  className="text-sm border rounded px-2 py-1 bg-white dark:bg-gray-800"
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
                  className={isAutoRefreshEnabled ? 'border-blue-200 text-blue-700 hover:bg-blue-50' : ''}
                >
                  {isAutoRefreshEnabled ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                  {isAutoRefreshEnabled ? 'Pause' : 'Resume'}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleManualRefresh}
                  disabled={!isConnected}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Refresh
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                >
                  {notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter Bar */}
        <Card>
          <CardContent className="pt-0">
            <div className="mb-4">
              <span className="text-lg font-semibold">Filters</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by student name or exam title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedExamFilter} onValueChange={setSelectedExamFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Exams</SelectItem>
                    <SelectItem value="1">Data Structures</SelectItem>
                    {/* Add more exam options as needed */}
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md overflow-hidden bg-muted">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`rounded-none border-0 flex-1 ${
                      viewMode === 'grid'
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'hover:bg-muted-foreground/10'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`rounded-none border-0 flex-1 ${
                      viewMode === 'list'
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'hover:bg-muted-foreground/10'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Enhanced Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-3xl" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Eye className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{activeExams}</div>
              <p className="text-xs text-muted-foreground">
                {filteredSessions.length} of {activeSessions.length} total sessions
              </p>
              <Progress value={(activeExams / Math.max(activeSessions.length, 1)) * 100} className="mt-2 h-1" />
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-bl-3xl" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Users className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{filteredSessions.length}</div>
              <p className="text-xs text-muted-foreground">
                Currently monitored
              </p>
              <div className="flex items-center gap-1 mt-2">
                <Activity className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">All systems operational</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/10 rounded-bl-3xl" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Violations</CardTitle>
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{violationStats.total}</div>
              <p className="text-xs text-muted-foreground">
                {violationStats.resolved} resolved, {violationStats.high} high severity
              </p>
              <div className="flex gap-1 mt-2">
                <div className="flex-1 bg-red-200 dark:bg-red-900 rounded-full h-1">
                  <div
                    className="bg-red-500 h-1 rounded-full"
                    style={{ width: `${(violationStats.high / Math.max(violationStats.total, 1)) * 100}%` }}
                  />
                </div>
                <div className="flex-1 bg-yellow-200 dark:bg-yellow-900 rounded-full h-1">
                  <div
                    className="bg-yellow-500 h-1 rounded-full"
                    style={{ width: `${(violationStats.medium / Math.max(violationStats.total, 1)) * 100}%` }}
                  />
                </div>
                <div className="flex-1 bg-green-200 dark:bg-green-900 rounded-full h-1">
                  <div
                    className="bg-green-500 h-1 rounded-full"
                    style={{ width: `${(violationStats.low / Math.max(violationStats.total, 1)) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-3xl" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues</CardTitle>
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <ShieldAlert className="h-4 w-4 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {activeSessions.filter(s => !s.cameraActive || !s.micActive || !s.tabVisible).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Technical issues detected
              </p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs">+12% from last hour</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="sessions" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="sessions" className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Sessions
                {filteredSessions.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 text-xs">
                    {filteredSessions.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="violations" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Violations
                {violationStats.total > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 text-xs">
                    {violationStats.total}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export Report
              </Button>
            </div>
          </div>

          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Active Proctoring Sessions
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredSessions.length} of {activeSessions.length} sessions
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredSessions.length === 0 ? (
                  <div className="text-center py-12">
                    <Monitor className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400">No sessions found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div className={viewMode === 'grid'
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-4"
                  }>
                    {filteredSessions.map((session) => {
                      // Check for alerts
                      const hasAlerts = !session.cameraActive || !session.micActive || !session.tabVisible || session.violations.some(v => !v.resolved);
                      const unresolvedViolations = session.violations.filter(v => !v.resolved);
                      const highSeverityViolations = unresolvedViolations.filter(v => v.severity === 'high');

                      return (
                        <div
                          key={session.id}
                          className={`border rounded-lg p-4 transition-all hover:shadow-md cursor-pointer relative flex flex-col h-full ${
                            selectedSession?.id === session.id ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' : ''
                          } ${hasAlerts ? 'border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/50' : ''}`}
                          onClick={() => handleViewSession(session)}
                        >
                          {/* Header with alert indicator */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className={`w-3 h-3 rounded-full ${getStatusColor(session.status)} animate-pulse flex-shrink-0`} />
                              {getStatusIcon(session.status)}
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-sm truncate">{session.studentName}</h3>
                                <p className="text-xs text-muted-foreground truncate">{session.examTitle}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {hasAlerts && (
                                <div className="flex items-center gap-1">
                                  <AlertTriangle className="w-4 h-4 text-red-600" />
                                  {highSeverityViolations.length > 0 && (
                                    <Badge variant="destructive" className="text-xs px-1 py-0 h-5">
                                      {highSeverityViolations.length}
                                    </Badge>
                                  )}
                                </div>
                              )}
                              <Badge
                                variant={session.status === 'active' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {session.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Technical Status Grid */}
                          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                            <div className="flex items-center gap-2">
                              <Camera className={`w-3 h-3 flex-shrink-0 ${session.cameraActive ? 'text-green-600' : 'text-red-600'}`} />
                              <span className={`truncate ${session.cameraActive ? 'text-green-600' : 'text-red-600'}`}>
                                {session.cameraActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mic className={`w-3 h-3 flex-shrink-0 ${session.micActive ? 'text-green-600' : 'text-red-600'}`} />
                              <span className={`truncate ${session.micActive ? 'text-green-600' : 'text-red-600'}`}>
                                {session.micActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Monitor className={`w-3 h-3 flex-shrink-0 ${session.tabVisible ? 'text-green-600' : 'text-red-600'}`} />
                              <span className={`truncate ${session.tabVisible ? 'text-green-600' : 'text-red-600'}`}>
                                {session.tabVisible ? 'Focused' : 'Unfocused'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-blue-600 flex-shrink-0" />
                              <span className="text-blue-600 truncate">
                                {new Date(session.startTime).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>

                          {/* Alert details section */}
                          {hasAlerts && (
                            <div className="mb-3 p-2 bg-red-50 dark:bg-red-950/50 rounded border border-red-200 dark:border-red-800">
                              <div className="space-y-1">
                                {!session.cameraActive && (
                                  <div className="flex items-center gap-2 text-xs text-red-600">
                                    <Camera className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">Camera inactive</span>
                                  </div>
                                )}
                                {!session.micActive && (
                                  <div className="flex items-center gap-2 text-xs text-red-600">
                                    <Mic className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">Microphone inactive</span>
                                  </div>
                                )}
                                {!session.tabVisible && (
                                  <div className="flex items-center gap-2 text-xs text-red-600">
                                    <Monitor className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">Tab unfocused</span>
                                  </div>
                                )}
                                {unresolvedViolations.length > 0 && (
                                  <div className="flex items-center gap-2 text-xs text-red-600">
                                    <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">{unresolvedViolations.length} unresolved violation{unresolvedViolations.length > 1 ? 's' : ''}</span>
                                    {highSeverityViolations.length > 0 && (
                                      <Badge variant="destructive" className="text-xs px-1 py-0 h-4 ml-1 flex-shrink-0">
                                        {highSeverityViolations.length} high
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Violations section */}
                          {session.violations.length > 0 && (
                            <div className="flex items-center justify-between mb-3 p-2 bg-orange-50 dark:bg-orange-950/50 rounded border border-orange-200 dark:border-orange-800">
                              <div className="flex items-center gap-2 text-xs text-orange-600 min-w-0 flex-1">
                                <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{session.violations.length} violation{session.violations.length > 1 ? 's' : ''}</span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 text-xs flex-shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewSession(session);
                                }}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                Monitor
                              </Button>
                            </div>
                          )}

                          {/* Progress bar - always at bottom */}
                          <div className="mt-auto">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span>{Math.min(100, Math.round((Date.now() - new Date(session.startTime).getTime()) / (session.duration * 60 * 1000) * 100))}%</span>
                            </div>
                            <Progress
                              value={Math.min(100, (Date.now() - new Date(session.startTime).getTime()) / (session.duration * 60 * 1000) * 100)}
                              className="h-1"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="violations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Violation Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeSessions
                    .filter(session => session.violations.length > 0)
                    .map((session) => (
                      <div key={session.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3">{session.studentName} - {session.examTitle}</h3>
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

        </Tabs>

        {/* Simple Session Monitor Modal */}
        {selectedSession && (
          <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Monitor Session
                </DialogTitle>
                <DialogDescription>
                  {selectedSession.studentName} - {selectedSession.examTitle}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Camera Feed */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Live Camera Feed
                  </h4>
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                    <div className="text-center">
                      <Camera className={`w-12 h-12 mx-auto mb-2 ${selectedSession.cameraActive ? 'text-green-500' : 'text-red-500'}`} />
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {selectedSession.cameraActive ? 'Camera Active' : 'Camera Inactive'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        Live feed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Session Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <Badge variant={selectedSession.status === 'active' ? 'default' : 'secondary'}>
                    {selectedSession.status}
                  </Badge>
                </div>

                {/* Technical Status */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Technical Status</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-2">
                      <Camera className={`w-4 h-4 ${selectedSession.cameraActive ? 'text-green-600' : 'text-red-600'}`} />
                      <span className="text-xs">Camera</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mic className={`w-4 h-4 ${selectedSession.micActive ? 'text-green-600' : 'text-red-600'}`} />
                      <span className="text-xs">Mic</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className={`w-4 h-4 ${selectedSession.tabVisible ? 'text-green-600' : 'text-red-600'}`} />
                      <span className="text-xs">Tab</span>
                    </div>
                  </div>
                </div>

                {/* Violations */}
                {selectedSession.violations.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Recent Violations</h4>
                    <div className="space-y-1">
                      {selectedSession.violations.slice(-3).map((violation) => (
                        <div key={violation.id} className="flex items-center justify-between text-xs">
                          <span>{violation.type.replace('_', ' ')}</span>
                          <Badge variant={getViolationSeverityColor(violation.severity)} className="text-xs">
                            {violation.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.min(100, Math.round((Date.now() - new Date(selectedSession.startTime).getTime()) / (selectedSession.duration * 60 * 1000) * 100))}%</span>
                  </div>
                  <Progress
                    value={Math.min(100, (Date.now() - new Date(selectedSession.startTime).getTime()) / (selectedSession.duration * 60 * 1000) * 100)}
                    className="h-2"
                  />
                </div>
              </div>

              <DialogFooter className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedSession(null)}>
                  Close
                </Button>
                {selectedSession.violations.some(v => !v.resolved) && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (window.confirm('Terminate this session?')) {
                        setActiveSessions(prev =>
                          prev.map(session =>
                            session.id === selectedSession.id
                              ? { ...session, status: 'terminated' as const }
                              : session
                          )
                        );
                        setSelectedSession(null);
                      }
                    }}
                  >
                    Terminate Session
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}        {/* Violation Action Dialog */}
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
    </FacultyLayout>
  );
}