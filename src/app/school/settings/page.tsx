"use client";

import { SchoolLayout } from "@/components/SchoolLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertTriangle,
    Bell,
    CheckCircle,
    FileText,
    Lock,
    Monitor,
    Save,
    Settings,
    Shield
} from 'lucide-react';
import { useState } from 'react';

export default function SchoolSettingsPage() {
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    examReminders: true,
    resultNotifications: true,
    systemUpdates: true,
    departmentMessages: true,
    facultyMessages: true,

    // Privacy Settings
    profileVisibility: 'public' as 'public' | 'private',
    showContactInfo: true,
    allowPublicAccess: true,
    dataSharing: false,

    // System Settings
    defaultExamDuration: 120,
    defaultMaxViolations: 3,
    autoPublishResults: false,
    requireDepartmentApproval: true,
    enableProctoring: true,

    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 60,
    passwordPolicy: 'strong',
    auditLogging: true,

    // Display Settings
    theme: 'system' as 'light' | 'dark' | 'system',
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY'
  });

  const [notifications, setNotifications] = useState({
    success: '',
    error: ''
  });

  const handleSave = (section: string) => {
    // Mock save - in real app this would call API
    console.log(`Saving ${section} settings:`, settings);
    setNotifications({
      success: `${section} settings saved successfully!`,
      error: ''
    });
    setTimeout(() => setNotifications({ success: '', error: '' }), 3000);
  };

  const handleReset = (section: string) => {
    // Mock reset - in real app this would reset to defaults
    console.log(`Resetting ${section} settings`);
    setNotifications({
      success: `${section} settings reset to defaults.`,
      error: ''
    });
    setTimeout(() => setNotifications({ success: '', error: '' }), 3000);
  };

  return (
    <SchoolLayout title="School Settings" subtitle="Configure institution-wide preferences and system settings">
      <div className="container mx-auto p-6 space-y-6">

        {/* Notifications */}
        {notifications.success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {notifications.success}
            </AlertDescription>
          </Alert>
        )}

        {notifications.error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {notifications.error}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="exam">Exam Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Basic institution configuration and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value: any) => setSettings({...settings, theme: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="kn">Kannada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                        <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select value={settings.dateFormat} onValueChange={(value) => setSettings({...settings, dateFormat: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => handleReset('general')}>
                    Reset to Defaults
                  </Button>
                  <Button onClick={() => handleSave('general')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose what notifications to send across the institution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send notifications via email to all users
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Exam Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Send reminders for upcoming exams
                      </p>
                    </div>
                    <Switch
                      checked={settings.examReminders}
                      onCheckedChange={(checked) => setSettings({...settings, examReminders: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Result Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when exam results are published
                      </p>
                    </div>
                    <Switch
                      checked={settings.resultNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, resultNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Department Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow inter-departmental messaging
                      </p>
                    </div>
                    <Switch
                      checked={settings.departmentMessages}
                      onCheckedChange={(checked) => setSettings({...settings, departmentMessages: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Faculty Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable faculty-to-administration messaging
                      </p>
                    </div>
                    <Switch
                      checked={settings.facultyMessages}
                      onCheckedChange={(checked) => setSettings({...settings, facultyMessages: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Send important system updates and maintenance notifications
                      </p>
                    </div>
                    <Switch
                      checked={settings.systemUpdates}
                      onCheckedChange={(checked) => setSettings({...settings, systemUpdates: checked})}
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => handleReset('notifications')}>
                    Reset to Defaults
                  </Button>
                  <Button onClick={() => handleSave('notifications')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control institution privacy and data sharing policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select value={settings.profileVisibility} onValueChange={(value: any) => setSettings({...settings, profileVisibility: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Show Contact Information</Label>
                      <p className="text-sm text-muted-foreground">
                        Display school contact details publicly
                      </p>
                    </div>
                    <Switch
                      checked={settings.showContactInfo}
                      onCheckedChange={(checked) => setSettings({...settings, showContactInfo: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Allow Public Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow public access to general information
                      </p>
                    </div>
                    <Switch
                      checked={settings.allowPublicAccess}
                      onCheckedChange={(checked) => setSettings({...settings, allowPublicAccess: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Share anonymized data for research purposes
                      </p>
                    </div>
                    <Switch
                      checked={settings.dataSharing}
                      onCheckedChange={(checked) => setSettings({...settings, dataSharing: checked})}
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => handleReset('privacy')}>
                    Reset to Defaults
                  </Button>
                  <Button onClick={() => handleSave('privacy')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage institution-wide security and authentication policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all administrative accounts
                      </p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordPolicy">Password Policy</Label>
                    <Select value={settings.passwordPolicy} onValueChange={(value) => setSettings({...settings, passwordPolicy: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                        <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                        <SelectItem value="complex">Complex (16+ chars, special chars)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Audit Logging</Label>
                      <p className="text-sm text-muted-foreground">
                        Log all administrative actions
                      </p>
                    </div>
                    <Switch
                      checked={settings.auditLogging}
                      onCheckedChange={(checked) => setSettings({...settings, auditLogging: checked})}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Security Policies</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">IP Whitelisting</Label>
                        <p className="text-sm text-muted-foreground">
                          Restrict access to specific IP addresses
                        </p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Brute Force Protection</Label>
                        <p className="text-sm text-muted-foreground">
                          Prevent automated login attempts
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => handleReset('security')}>
                    Reset to Defaults
                  </Button>
                  <Button onClick={() => handleSave('security')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="w-5 h-5 mr-2" />
                  System Settings
                </CardTitle>
                <CardDescription>
                  Configure system-wide settings and integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Enable Proctoring</Label>
                      <p className="text-sm text-muted-foreground">
                        Activate AI-powered exam proctoring system
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableProctoring}
                      onCheckedChange={(checked) => setSettings({...settings, enableProctoring: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto Publish Results</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically publish results after exam completion
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoPublishResults}
                      onCheckedChange={(checked) => setSettings({...settings, autoPublishResults: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Require Department Approval</Label>
                      <p className="text-sm text-muted-foreground">
                        Require department head approval for exam creation
                      </p>
                    </div>
                    <Switch
                      checked={settings.requireDepartmentApproval}
                      onCheckedChange={(checked) => setSettings({...settings, requireDepartmentApproval: checked})}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Integration Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emailProvider">Email Provider</Label>
                      <Select defaultValue="smtp">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="smtp">SMTP</SelectItem>
                          <SelectItem value="sendgrid">SendGrid</SelectItem>
                          <SelectItem value="mailgun">Mailgun</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storageProvider">File Storage</Label>
                      <Select defaultValue="local">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local Storage</SelectItem>
                          <SelectItem value="aws">AWS S3</SelectItem>
                          <SelectItem value="azure">Azure Blob</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => handleReset('system')}>
                    Reset to Defaults
                  </Button>
                  <Button onClick={() => handleSave('system')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exam" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Default Exam Settings
                </CardTitle>
                <CardDescription>
                  Set default configurations for all exams in the institution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="defaultDuration">Default Exam Duration (minutes)</Label>
                    <Input
                      id="defaultDuration"
                      type="number"
                      value={settings.defaultExamDuration}
                      onChange={(e) => setSettings({...settings, defaultExamDuration: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxViolations">Default Max Violations</Label>
                    <Input
                      id="maxViolations"
                      type="number"
                      value={settings.defaultMaxViolations}
                      onChange={(e) => setSettings({...settings, defaultMaxViolations: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Exam Policies</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Allow Tab Switching</Label>
                        <p className="text-sm text-muted-foreground">
                          Permit students to switch browser tabs during exam
                        </p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Allow Copy/Paste</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable copy and paste functionality
                        </p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Show Results Immediately</Label>
                        <p className="text-sm text-muted-foreground">
                          Display results right after exam completion
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Record Screen</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable screen recording during exams
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => handleReset('exam')}>
                    Reset to Defaults
                  </Button>
                  <Button onClick={() => handleSave('exam')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SchoolLayout>
  );
}