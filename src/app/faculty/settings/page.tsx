"use client";

import { FacultyLayout } from "@/components/FacultyLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
    Eye,
    EyeOff,
    Lock,
    Palette,
    Save,
    Settings,
    Shield
} from 'lucide-react';
import { useState } from 'react';

export default function FacultySettingsPage() {
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    examReminders: true,
    resultNotifications: true,
    systemUpdates: false,
    studentMessages: true,

    // Privacy Settings
    profileVisibility: 'department' as 'public' | 'department' | 'private',
    showEmail: false,
    showPhone: false,
    allowStudentMessages: true,

    // Exam Settings
    defaultExamDuration: 90,
    defaultMaxViolations: 3,
    autoPublishResults: false,
    requireEligibilityTest: true,

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,

    // Appearance Settings
    theme: 'system' as 'light' | 'dark' | 'system',
    language: 'en',
    timezone: 'UTC+5:30',
    dateFormat: 'DD/MM/YYYY'
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);

  const handleSaveSettings = (section: string) => {
    console.log(`Saving ${section} settings:`, settings);
    // Here you would typically save to backend
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    console.log('Changing password...');
    // Here you would typically change password via API
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <FacultyLayout title="Settings" subtitle="Customize your account preferences and system settings">
      <div className="space-y-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  General Preferences
                </CardTitle>
                <CardDescription>
                  Configure your general account and system preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-duration">Default Exam Duration (minutes)</Label>
                    <Input
                      id="default-duration"
                      type="number"
                      value={settings.defaultExamDuration}
                      onChange={(e) => setSettings({...settings, defaultExamDuration: parseInt(e.target.value)})}
                      min="15"
                      max="480"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-violations">Default Max Violations</Label>
                    <Input
                      id="max-violations"
                      type="number"
                      value={settings.defaultMaxViolations}
                      onChange={(e) => setSettings({...settings, defaultMaxViolations: parseInt(e.target.value)})}
                      min="1"
                      max="10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) => setSettings({...settings, timezone: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC+5:30">IST (UTC+5:30)</SelectItem>
                        <SelectItem value="UTC+5:45">NPT (UTC+5:45)</SelectItem>
                        <SelectItem value="UTC+8">CST (UTC+8)</SelectItem>
                        <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select
                      value={settings.dateFormat}
                      onValueChange={(value) => setSettings({...settings, dateFormat: value})}
                    >
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

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-publish Results</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically publish exam results when all students complete the exam
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoPublishResults}
                      onCheckedChange={(checked) => setSettings({...settings, autoPublishResults: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Eligibility Test</Label>
                      <p className="text-sm text-muted-foreground">
                        Students must pass system compatibility test before taking exams
                      </p>
                    </div>
                    <Switch
                      checked={settings.requireEligibilityTest}
                      onCheckedChange={(checked) => setSettings({...settings, requireEligibilityTest: checked})}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSaveSettings('general')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save General Settings
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
                  Choose how you want to be notified about important events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Exam Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get reminded about upcoming exam deadlines
                      </p>
                    </div>
                    <Switch
                      checked={settings.examReminders}
                      onCheckedChange={(checked) => setSettings({...settings, examReminders: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Result Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications when exam results are ready
                      </p>
                    </div>
                    <Switch
                      checked={settings.resultNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, resultNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Student Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications for student inquiries and messages
                      </p>
                    </div>
                    <Switch
                      checked={settings.studentMessages}
                      onCheckedChange={(checked) => setSettings({...settings, studentMessages: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications about system maintenance and updates
                      </p>
                    </div>
                    <Switch
                      checked={settings.systemUpdates}
                      onCheckedChange={(checked) => setSettings({...settings, systemUpdates: checked})}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSaveSettings('notifications')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Notification Settings
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
                  Control your privacy and data sharing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select
                      value={settings.profileVisibility}
                      onValueChange={(value) =>
                        setSettings({...settings, profileVisibility: value as 'public' | 'department' | 'private'})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Visible to all users</SelectItem>
                        <SelectItem value="department">Department - Visible to department members</SelectItem>
                        <SelectItem value="private">Private - Visible only to you</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Email Address</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow others to see your email address
                      </p>
                    </div>
                    <Switch
                      checked={settings.showEmail}
                      onCheckedChange={(checked) => setSettings({...settings, showEmail: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Phone Number</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow others to see your phone number
                      </p>
                    </div>
                    <Switch
                      checked={settings.showPhone}
                      onCheckedChange={(checked) => setSettings({...settings, showPhone: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Student Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow students to send you direct messages
                      </p>
                    </div>
                    <Switch
                      checked={settings.allowStudentMessages}
                      onCheckedChange={(checked) => setSettings({...settings, allowStudentMessages: checked})}
                    />
                  </div>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Privacy settings changes may take up to 24 hours to reflect across the system.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-end">
                  <Button onClick={() => handleSaveSettings('privacy')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Privacy Settings
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
                  Manage your account security and authentication preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Change Password */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Change Password</h4>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPasswords ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPasswords(!showPasswords)}
                        >
                          {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type={showPasswords ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type={showPasswords ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button onClick={handleChangePassword} className="w-full md:w-auto">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Security Options */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Security Options</h4>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {settings.twoFactorAuth && <Badge variant="secondary">Enabled</Badge>}
                        <Switch
                          checked={settings.twoFactorAuth}
                          onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Select
                        value={settings.sessionTimeout.toString()}
                        onValueChange={(value) => setSettings({...settings, sessionTimeout: parseInt(value)})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                      <Select
                        value={settings.passwordExpiry.toString()}
                        onValueChange={(value) => setSettings({...settings, passwordExpiry: parseInt(value)})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="180">180 days</SelectItem>
                          <SelectItem value="0">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSaveSettings('security')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of your interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select
                      value={settings.theme}
                      onValueChange={(value) =>
                        setSettings({...settings, theme: value as 'light' | 'dark' | 'system'})
                      }
                    >
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
                    <Label>Language</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => setSettings({...settings, language: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="te">Telugu</SelectItem>
                        <SelectItem value="ta">Tamil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Theme changes are applied immediately. Language changes may require a page refresh.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-end">
                  <Button onClick={() => handleSaveSettings('appearance')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Appearance Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FacultyLayout>
  );
}