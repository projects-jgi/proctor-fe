"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProctor } from '@/contexts/ProctorContext';
import {
    Bell,
    Eye,
    Lock,
    Palette,
    Settings,
    Shield,
    User,
    Volume2
} from 'lucide-react';
import { useState } from 'react';

export default function StudentSettingsPage() {
  const { currentUser } = useProctor();

  const [settings, setSettings] = useState({
    // General Settings
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    theme: 'system',

    // Notifications
    emailNotifications: true,
    examReminders: true,
    resultNotifications: true,
    systemUpdates: false,
    marketingEmails: false,

    // Privacy
    profileVisibility: 'private',
    showResults: true,
    showActivity: false,
    dataSharing: false,

    // Security
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginAlerts: true,

    // Appearance
    fontSize: 'medium',
    compactMode: false,
    animations: true,
    highContrast: false,

    // Proctoring
    cameraPermission: true,
    microphonePermission: true,
    screenSharePermission: true,
    autoSubmitOnViolation: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save to backend
    console.log('Saving settings:', settings);
    // Show success message
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Customize your account preferences and privacy settings</p>
        </div>
        <Button onClick={handleSaveSettings}>
          Save Changes
        </Button>
      </div>

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
                Configure your basic account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
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
                  <Select value={settings.dateFormat} onValueChange={(value) => handleSettingChange('dateFormat', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Proctoring Preferences
              </CardTitle>
              <CardDescription>
                Configure your exam proctoring settings and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Camera Permission</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow camera access during exams
                    </p>
                  </div>
                  <Switch
                    checked={settings.cameraPermission}
                    onCheckedChange={(checked) => handleSettingChange('cameraPermission', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Microphone Permission</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow microphone access during exams
                    </p>
                  </div>
                  <Switch
                    checked={settings.microphonePermission}
                    onCheckedChange={(checked) => handleSettingChange('microphonePermission', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Screen Share Permission</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow screen sharing during exams
                    </p>
                  </div>
                  <Switch
                    checked={settings.screenSharePermission}
                    onCheckedChange={(checked) => handleSettingChange('screenSharePermission', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-submit on Violation</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically submit exam if violation is detected
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoSubmitOnViolation}
                    onCheckedChange={(checked) => handleSettingChange('autoSubmitOnViolation', checked)}
                  />
                </div>
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
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Exam Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminded about upcoming exams
                    </p>
                  </div>
                  <Switch
                    checked={settings.examReminders}
                    onCheckedChange={(checked) => handleSettingChange('examReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Result Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when results are published
                    </p>
                  </div>
                  <Switch
                    checked={settings.resultNotifications}
                    onCheckedChange={(checked) => handleSettingChange('resultNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about system maintenance
                    </p>
                  </div>
                  <Switch
                    checked={settings.systemUpdates}
                    onCheckedChange={(checked) => handleSettingChange('systemUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional emails and updates
                    </p>
                  </div>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Privacy Settings
              </CardTitle>
              <CardDescription>
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <Select value={settings.profileVisibility} onValueChange={(value) => handleSettingChange('profileVisibility', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="faculty-only">Faculty Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Exam Results</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to see your exam results
                    </p>
                  </div>
                  <Switch
                    checked={settings.showResults}
                    onCheckedChange={(checked) => handleSettingChange('showResults', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Activity Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Show when you're active on the platform
                    </p>
                  </div>
                  <Switch
                    checked={settings.showActivity}
                    onCheckedChange={(checked) => handleSettingChange('showActivity', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Share anonymized data for research purposes
                    </p>
                  </div>
                  <Switch
                    checked={settings.dataSharing}
                    onCheckedChange={(checked) => handleSettingChange('dataSharing', checked)}
                  />
                </div>
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
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Select value={settings.sessionTimeout} onValueChange={(value) => handleSettingChange('sessionTimeout', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified of new login attempts
                    </p>
                  </div>
                  <Switch
                    checked={settings.loginAlerts}
                    onCheckedChange={(checked) => handleSettingChange('loginAlerts', checked)}
                  />
                </div>
              </div>

              <div className="pt-6 border-t">
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
                  <Button variant="outline">Update Password</Button>
                </div>
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Select value={settings.fontSize} onValueChange={(value) => handleSettingChange('fontSize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use a more compact layout to fit more content
                    </p>
                  </div>
                  <Switch
                    checked={settings.compactMode}
                    onCheckedChange={(checked) => handleSettingChange('compactMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Show smooth transitions and animations
                    </p>
                  </div>
                  <Switch
                    checked={settings.animations}
                    onCheckedChange={(checked) => handleSettingChange('animations', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High Contrast Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase contrast for better visibility
                    </p>
                  </div>
                  <Switch
                    checked={settings.highContrast}
                    onCheckedChange={(checked) => handleSettingChange('highContrast', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}