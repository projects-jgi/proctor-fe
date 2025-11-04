"use client";

import { StudentLayout } from "@/components/StudentLayout";
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
    BookOpen,
    CheckCircle,
    Lock,
    Save,
    Settings,
    Shield,
    User
} from 'lucide-react';
import { useState } from 'react';

export default function StudentSettingsPage() {
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    examReminders: true,
    resultNotifications: true,
    systemUpdates: false,
    assignmentReminders: true,

    // Privacy Settings
    profileVisibility: 'department' as 'public' | 'department' | 'private',
    showEmail: false,
    showPhone: false,
    allowPeerMessages: false,

    // Study Settings
    studyReminders: true,
    autoSaveProgress: true,
    showHints: true,
    nightMode: false,

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,

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
    <StudentLayout
      title="Student Settings"
      subtitle="Customize your learning experience and account preferences"
    >
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="study">Study</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Basic preferences and display options
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
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
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
                        Get reminded about upcoming exams
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
                        Notifications when exam results are published
                      </p>
                    </div>
                    <Switch
                      checked={settings.resultNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, resultNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Assignment Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Reminders for assignment deadlines
                      </p>
                    </div>
                    <Switch
                      checked={settings.assignmentReminders}
                      onCheckedChange={(checked) => setSettings({...settings, assignmentReminders: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Important system updates and maintenance
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
                  Control your privacy and data sharing preferences
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
                        <SelectItem value="department">Department Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Show Email Address</Label>
                      <p className="text-sm text-muted-foreground">
                        Make your email visible to others
                      </p>
                    </div>
                    <Switch
                      checked={settings.showEmail}
                      onCheckedChange={(checked) => setSettings({...settings, showEmail: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Show Phone Number</Label>
                      <p className="text-sm text-muted-foreground">
                        Make your phone number visible to others
                      </p>
                    </div>
                    <Switch
                      checked={settings.showPhone}
                      onCheckedChange={(checked) => setSettings({...settings, showPhone: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Allow Peer Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow other students to send you messages
                      </p>
                    </div>
                    <Switch
                      checked={settings.allowPeerMessages}
                      onCheckedChange={(checked) => setSettings({...settings, allowPeerMessages: checked})}
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

          <TabsContent value="study" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Study Preferences
                </CardTitle>
                <CardDescription>
                  Customize your learning and study experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Study Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get reminders to study regularly
                      </p>
                    </div>
                    <Switch
                      checked={settings.studyReminders}
                      onCheckedChange={(checked) => setSettings({...settings, studyReminders: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto-save Progress</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically save your progress in exams
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoSaveProgress}
                      onCheckedChange={(checked) => setSettings({...settings, autoSaveProgress: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Show Hints</Label>
                      <p className="text-sm text-muted-foreground">
                        Display helpful hints during exams
                      </p>
                    </div>
                    <Switch
                      checked={settings.showHints}
                      onCheckedChange={(checked) => setSettings({...settings, showHints: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Night Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable dark mode for better focus during study
                      </p>
                    </div>
                    <Switch
                      checked={settings.nightMode}
                      onCheckedChange={(checked) => setSettings({...settings, nightMode: checked})}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Study Goals</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dailyStudyHours">Daily Study Hours Goal</Label>
                      <Input
                        id="dailyStudyHours"
                        type="number"
                        placeholder="2"
                        min="1"
                        max="12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weeklyExams">Weekly Exam Target</Label>
                      <Input
                        id="weeklyExams"
                        type="number"
                        placeholder="3"
                        min="1"
                        max="10"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => handleReset('study')}>
                    Reset to Defaults
                  </Button>
                  <Button onClick={() => handleSave('study')}>
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
                  Manage your account security and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security
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
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      value={settings.passwordExpiry}
                      onChange={(e) => setSettings({...settings, passwordExpiry: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full md:w-auto">
                    Update Password
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Account Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full md:w-auto text-orange-600 border-orange-200 hover:bg-orange-50">
                      <User className="w-4 h-4 mr-2" />
                      Request Account Deactivation
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      This will temporarily deactivate your account. You can reactivate it anytime.
                    </p>
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
        </Tabs>
      </div>
    </StudentLayout>
  );
}