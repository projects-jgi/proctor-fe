"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useProctor } from '@/contexts/ProctorContext';
import {
    Award,
    BookOpen,
    Calendar,
    Camera,
    Edit,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    TrendingUp,
    User,
    Users
} from 'lucide-react';
import { useState } from 'react';

export default function StudentProfilePage() {
  const { currentUser, exams, results, students } = useProctor();

  // Find current student
  const currentStudent = students.find(s => s.userId === currentUser?.id);

  // Get student-related data
  const studentResults = results.filter(result => result.studentId === currentStudent?.id);
  const studentExams = exams.filter(exam =>
    exam.enrolledStudents.includes(currentStudent?.id || '')
  );

  // Profile stats
  const stats = {
    totalExams: studentExams.length,
    completedExams: studentResults.length,
    averageScore: studentResults.length > 0
      ? Math.round(studentResults.reduce((sum, r) => sum + r.percentage, 0) / studentResults.length)
      : 0,
    passedExams: studentResults.filter(r => r.status === 'passed').length,
    failedExams: studentResults.filter(r => r.status === 'failed').length,
    upcomingExams: studentExams.filter(exam =>
      new Date(exam.startTime) > new Date()
    ).length
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentStudent?.phone || '',
    rollNumber: currentStudent?.rollNumber || '',
    department: currentStudent?.departmentId || '',
    semester: currentStudent?.semester || 1,
    enrollmentYear: currentStudent?.enrollmentYear || new Date().getFullYear(),
    bio: 'Dedicated computer science student with passion for learning.',
    address: 'Bangalore, Karnataka',
    emergencyContact: '',
    bloodGroup: 'O+'
  });

  const handleSaveProfile = () => {
    // Here you would typically save to backend
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </div>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={undefined} alt={currentUser?.name} />
                <AvatarFallback className="text-2xl">
                  {currentUser?.name?.split(' ').map((n: string) => n[0]).join('') || 'S'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{currentUser?.name || 'Student Name'}</h1>
                  <p className="text-lg text-muted-foreground">{currentStudent?.rollNumber || 'Roll Number'}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentStudent?.departmentId || 'Department'} • Semester {currentStudent?.semester || 'N/A'}
                  </p>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{currentUser?.email || 'email@example.com'}</span>
                </div>
                {currentStudent?.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{currentStudent.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{profileData.address}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalExams}</div>
            <p className="text-xs text-muted-foreground">
              {stats.upcomingExams} upcoming
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedExams}</div>
            <p className="text-xs text-muted-foreground">
              {stats.passedExams} passed, {stats.failedExams} failed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Semester</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStudent?.semester || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">Academic year</p>
          </CardContent>
        </Card>
      </div>

      {/* Profile Details Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="academic">Academic Details</TabsTrigger>
          <TabsTrigger value="activity">Activity Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    value={profileData.rollNumber}
                    onChange={(e) => setProfileData({...profileData, rollNumber: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={profileData.emergencyContact}
                    onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Input
                    id="bloodGroup"
                    value={profileData.bloodGroup}
                    onChange={(e) => setProfileData({...profileData, bloodGroup: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Academic Information
              </CardTitle>
              <CardDescription>
                Your academic details and enrollment information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={profileData.department}
                    onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="semester">Current Semester</Label>
                  <Input
                    id="semester"
                    type="number"
                    value={profileData.semester}
                    onChange={(e) => setProfileData({...profileData, semester: parseInt(e.target.value)})}
                    disabled={!isEditing}
                    min="1"
                    max="8"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="enrollmentYear">Enrollment Year</Label>
                  <Input
                    id="enrollmentYear"
                    type="number"
                    value={profileData.enrollmentYear}
                    onChange={(e) => setProfileData({...profileData, enrollmentYear: parseInt(e.target.value)})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Academic Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Academic Achievements
              </CardTitle>
              <CardDescription>
                Your academic performance and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Exam Participation</h4>
                    <p className="text-sm text-muted-foreground">Total exams taken</p>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {stats.totalExams}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Success Rate</h4>
                    <p className="text-sm text-muted-foreground">Exams passed</p>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {stats.completedExams > 0 ? Math.round((stats.passedExams / stats.completedExams) * 100) : 0}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Academic Standing</h4>
                    <p className="text-sm text-muted-foreground">Current semester</p>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    Semester {currentStudent?.semester || 'N/A'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your recent exam activities and results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentResults.slice(0, 5).map((result) => {
                  const exam = exams.find(e => e.id === result.examId);
                  return (
                    <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          result.status === 'passed' ? 'bg-green-500' :
                          result.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></div>
                        <div>
                          <p className="font-medium">{exam?.title || 'Unknown Exam'}</p>
                          <p className="text-sm text-muted-foreground">
                            Score: {result.score}/{result.totalMarks} • Grade: {result.grade}
                          </p>
                        </div>
                      </div>
                      <Badge variant={
                        result.status === 'passed' ? 'default' :
                        result.status === 'failed' ? 'destructive' : 'secondary'
                      }>
                        {result.status}
                      </Badge>
                    </div>
                  );
                })}

                {studentResults.length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No exam results yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}