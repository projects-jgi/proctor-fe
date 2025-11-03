"use client";

import { DepartmentLayout } from "@/components/DepartmentLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useProctor } from '@/contexts/ProctorContext';
import {
    AlertTriangle,
    Bell,
    CheckCircle,
    Download,
    Eye,
    FileText,
    Lock,
    RefreshCw,
    Save,
    Settings,
    Shield,
    ShieldCheck,
    Trash2,
    Upload,
    User
} from 'lucide-react';
import { useState } from 'react';

export default function DepartmentSettingsPage() {
  const { currentUser, departments } = useProctor();
  const [activeTab, setActiveTab] = useState('general');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [settings, setSettings] = useState({
    // General Settings
    departmentName: 'Computer Science',
    departmentCode: 'CS',
    headOfDepartment: 'Dr. Sarah Johnson',
    email: 'hod.cs@jainuniversity.ac.in',
    phone: '+91-9876543210',
    website: 'https://cs.jainuniversity.ac.in',
    description: 'Department of Computer Science and Engineering',
    established: '2005',
    location: 'Block A, Main Campus',

    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    examReminders: true,
    resultNotifications: true,
    systemUpdates: false,
    facultyMessages: true,
    studentMessages: false,
    maintenanceAlerts: true,

    // Privacy & Security
    profileVisibility: 'school' as 'public' | 'school' | 'private',
    showEmail: false,
    showPhone: false,
    showWebsite: true,
    allowFacultyMessages: true,
    allowStudentMessages: false,
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,

    // Exam Settings
    defaultExamDuration: 120,
    defaultMaxViolations: 5,
    allowSelfEnrollment: false,
    requireApproval: true,
    autoPublishResults: false,
    enableProctoring: true,
    allowLateSubmission: false,
    gracePeriod: 5,

    // Department Policies
    attendanceRequired: true,
    minimumGrade: 40,
    maxExamAttempts: 3,
    plagiarismCheck: true,
    backupFrequency: 'daily' as 'hourly' | 'daily' | 'weekly',
    dataRetention: 365
  });

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings:`, settings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleResetToDefaults = () => {
    setSettings({
      departmentName: 'Computer Science',
      departmentCode: 'CS',
      headOfDepartment: 'Dr. Sarah Johnson',
      email: 'hod.cs@jainuniversity.ac.in',
      phone: '+91-9876543210',
      website: 'https://cs.jainuniversity.ac.in',
      description: 'Department of Computer Science and Engineering',
      established: '2005',
      location: 'Block A, Main Campus',
      emailNotifications: true,
      pushNotifications: false,
      examReminders: true,
      resultNotifications: true,
      systemUpdates: false,
      facultyMessages: true,
      studentMessages: false,
      maintenanceAlerts: true,
      profileVisibility: 'school',
      showEmail: false,
      showPhone: false,
      showWebsite: true,
      allowFacultyMessages: true,
      allowStudentMessages: false,
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5,
      defaultExamDuration: 120,
      defaultMaxViolations: 5,
      allowSelfEnrollment: false,
      requireApproval: true,
      autoPublishResults: false,
      enableProctoring: true,
      allowLateSubmission: false,
      gracePeriod: 5,
      attendanceRequired: true,
      minimumGrade: 40,
      maxExamAttempts: 3,
      plagiarismCheck: true,
      backupFrequency: 'daily',
      dataRetention: 365
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <DepartmentLayout
      title="Department Settings"
      subtitle="Configure department preferences and options"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Department Settings</h1>
              <p className="text-muted-foreground">Configure your department preferences and policies</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleResetToDefaults}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Department
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Department</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete the department
                    and all associated data including exams, results, and faculty assignments.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive">Delete Department</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {showSuccess && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Settings saved successfully!
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Exams
            </TabsTrigger>
            <TabsTrigger value="policies" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Policies
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Department Information
                </CardTitle>
                <CardDescription>
                  Basic information about your department
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/api/department-logo" />
                    <AvatarFallback className="text-lg">
                      {settings.departmentCode}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="departmentName">Department Name</Label>
                        <Input
                          id="departmentName"
                          value={settings.departmentName}
                          onChange={(e) => handleSettingChange('departmentName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="departmentCode">Department Code</Label>
                        <Input
                          id="departmentCode"
                          value={settings.departmentCode}
                          onChange={(e) => handleSettingChange('departmentCode', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="headOfDepartment">Head of Department</Label>
                        <Input
                          id="headOfDepartment"
                          value={settings.headOfDepartment}
                          onChange={(e) => handleSettingChange('headOfDepartment', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="established">Established Year</Label>
                        <Input
                          id="established"
                          value={settings.established}
                          onChange={(e) => handleSettingChange('established', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={settings.email}
                          onChange={(e) => handleSettingChange('email', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={settings.phone}
                          onChange={(e) => handleSettingChange('phone', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          value={settings.website}
                          onChange={(e) => handleSettingChange('website', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={settings.location}
                          onChange={(e) => handleSettingChange('location', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={settings.description}
                        onChange={(e) => handleSettingChange('description', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                <Button onClick={() => handleSave('general')} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save General Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how and when you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Exam Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminded about upcoming exams</p>
                    </div>
                    <Switch
                      checked={settings.examReminders}
                      onCheckedChange={(checked) => handleSettingChange('examReminders', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Result Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when results are published</p>
                    </div>
                    <Switch
                      checked={settings.resultNotifications}
                      onCheckedChange={(checked) => handleSettingChange('resultNotifications', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">System Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about system maintenance and updates</p>
                    </div>
                    <Switch
                      checked={settings.systemUpdates}
                      onCheckedChange={(checked) => handleSettingChange('systemUpdates', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Faculty Messages</Label>
                      <p className="text-sm text-muted-foreground">Receive messages from faculty members</p>
                    </div>
                    <Switch
                      checked={settings.facultyMessages}
                      onCheckedChange={(checked) => handleSettingChange('facultyMessages', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Student Messages</Label>
                      <p className="text-sm text-muted-foreground">Receive messages from students</p>
                    </div>
                    <Switch
                      checked={settings.studentMessages}
                      onCheckedChange={(checked) => handleSettingChange('studentMessages', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Maintenance Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get alerts about system maintenance</p>
                    </div>
                    <Switch
                      checked={settings.maintenanceAlerts}
                      onCheckedChange={(checked) => handleSettingChange('maintenanceAlerts', checked)}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('notifications')} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy & Security */}
          <TabsContent value="privacy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>
                    Control what information is visible to others
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileVisibility">Profile Visibility</Label>
                    <Select
                      value={settings.profileVisibility}
                      onValueChange={(value) => handleSettingChange('profileVisibility', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Visible to everyone</SelectItem>
                        <SelectItem value="school">School - Visible to school members only</SelectItem>
                        <SelectItem value="private">Private - Visible to department only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Show Email Address</Label>
                      <p className="text-sm text-muted-foreground">Display email in public profile</p>
                    </div>
                    <Switch
                      checked={settings.showEmail}
                      onCheckedChange={(checked) => handleSettingChange('showEmail', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Show Phone Number</Label>
                      <p className="text-sm text-muted-foreground">Display phone number in public profile</p>
                    </div>
                    <Switch
                      checked={settings.showPhone}
                      onCheckedChange={(checked) => handleSettingChange('showPhone', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Show Website</Label>
                      <p className="text-sm text-muted-foreground">Display website link in public profile</p>
                    </div>
                    <Switch
                      checked={settings.showWebsite}
                      onCheckedChange={(checked) => handleSettingChange('showWebsite', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Allow Faculty Messages</Label>
                      <p className="text-sm text-muted-foreground">Let faculty members send you messages</p>
                    </div>
                    <Switch
                      checked={settings.allowFacultyMessages}
                      onCheckedChange={(checked) => handleSettingChange('allowFacultyMessages', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Allow Student Messages</Label>
                      <p className="text-sm text-muted-foreground">Let students send you messages</p>
                    </div>
                    <Switch
                      checked={settings.allowStudentMessages}
                      onCheckedChange={(checked) => handleSettingChange('allowStudentMessages', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage security and access controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Enable 2FA for enhanced security</p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      value={settings.passwordExpiry}
                      onChange={(e) => handleSettingChange('passwordExpiry', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={settings.loginAttempts}
                      onChange={(e) => handleSettingChange('loginAttempts', parseInt(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <Button onClick={() => handleSave('privacy')} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Privacy & Security Settings
            </Button>
          </TabsContent>

          {/* Exam Settings */}
          <TabsContent value="exams" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Exam Configuration
                </CardTitle>
                <CardDescription>
                  Configure default settings for department exams
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="defaultExamDuration">Default Exam Duration (minutes)</Label>
                    <Input
                      id="defaultExamDuration"
                      type="number"
                      value={settings.defaultExamDuration}
                      onChange={(e) => handleSettingChange('defaultExamDuration', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultMaxViolations">Max Violations Allowed</Label>
                    <Input
                      id="defaultMaxViolations"
                      type="number"
                      value={settings.defaultMaxViolations}
                      onChange={(e) => handleSettingChange('defaultMaxViolations', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gracePeriod">Grace Period (minutes)</Label>
                    <Input
                      id="gracePeriod"
                      type="number"
                      value={settings.gracePeriod}
                      onChange={(e) => handleSettingChange('gracePeriod', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Allow Self Enrollment</Label>
                      <p className="text-sm text-muted-foreground">Students can enroll in exams without approval</p>
                    </div>
                    <Switch
                      checked={settings.allowSelfEnrollment}
                      onCheckedChange={(checked) => handleSettingChange('allowSelfEnrollment', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Require Approval</Label>
                      <p className="text-sm text-muted-foreground">Require approval for exam enrollments</p>
                    </div>
                    <Switch
                      checked={settings.requireApproval}
                      onCheckedChange={(checked) => handleSettingChange('requireApproval', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto Publish Results</Label>
                      <p className="text-sm text-muted-foreground">Automatically publish results after exam completion</p>
                    </div>
                    <Switch
                      checked={settings.autoPublishResults}
                      onCheckedChange={(checked) => handleSettingChange('autoPublishResults', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Enable Proctoring</Label>
                      <p className="text-sm text-muted-foreground">Enable AI proctoring for exams</p>
                    </div>
                    <Switch
                      checked={settings.enableProctoring}
                      onCheckedChange={(checked) => handleSettingChange('enableProctoring', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Allow Late Submission</Label>
                      <p className="text-sm text-muted-foreground">Allow submissions after exam time</p>
                    </div>
                    <Switch
                      checked={settings.allowLateSubmission}
                      onCheckedChange={(checked) => handleSettingChange('allowLateSubmission', checked)}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('exams')} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Exam Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Department Policies */}
          <TabsContent value="policies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Department Policies
                </CardTitle>
                <CardDescription>
                  Set department-wide policies and standards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="minimumGrade">Minimum Passing Grade (%)</Label>
                    <Input
                      id="minimumGrade"
                      type="number"
                      value={settings.minimumGrade}
                      onChange={(e) => handleSettingChange('minimumGrade', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxExamAttempts">Max Exam Attempts</Label>
                    <Input
                      id="maxExamAttempts"
                      type="number"
                      value={settings.maxExamAttempts}
                      onChange={(e) => handleSettingChange('maxExamAttempts', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataRetention">Data Retention (days)</Label>
                    <Input
                      id="dataRetention"
                      type="number"
                      value={settings.dataRetention}
                      onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <Select
                      value={settings.backupFrequency}
                      onValueChange={(value) => handleSettingChange('backupFrequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Attendance Required</Label>
                      <p className="text-sm text-muted-foreground">Require attendance for exam eligibility</p>
                    </div>
                    <Switch
                      checked={settings.attendanceRequired}
                      onCheckedChange={(checked) => handleSettingChange('attendanceRequired', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Plagiarism Check</Label>
                      <p className="text-sm text-muted-foreground">Enable automatic plagiarism detection</p>
                    </div>
                    <Switch
                      checked={settings.plagiarismCheck}
                      onCheckedChange={(checked) => handleSettingChange('plagiarismCheck', checked)}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('policies')} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Policy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Data Management
                  </CardTitle>
                  <CardDescription>
                    Export and import department data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Department Data
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Department Data
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Exam Results
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>
                    Irreversible and destructive actions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      These actions cannot be undone. Please proceed with caution.
                    </AlertDescription>
                  </Alert>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Exam Data
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Reset All Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DepartmentLayout>
  );
}