"use client";

import { FacultyLayout } from "@/components/FacultyLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function FacultyProfilePage() {
  const { currentUser, faculties, exams, results, students, getExamsForFaculty } = useProctor();

  // Find current faculty
  const currentFaculty = faculties.find(f => f.userId === currentUser?.id);
  const facultyExams = currentFaculty ? getExamsForFaculty(currentFaculty.id) : [];

  const facultyResults = currentFaculty ? results
    .filter(result => facultyExams.some(exam => exam.id === result.examId)) : [];

  // Profile stats
  const stats = {
    totalExams: facultyExams.length,
    publishedExams: facultyExams.filter(e => e.status === 'published').length,
    activeExams: facultyExams.filter(e => e.status === 'active').length,
    completedExams: facultyExams.filter(e => e.status === 'completed').length,
    totalStudents: new Set(facultyExams.flatMap(exam => exam.enrolledStudents)).size,
    totalResults: facultyResults.length,
    averageScore: facultyResults.length > 0
      ? Math.round(facultyResults.reduce((sum, r) => sum + r.percentage, 0) / facultyResults.length)
      : 0
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentFaculty?.phone || '',
    department: currentFaculty?.department || '',
    designation: currentFaculty?.designation || '',
    specialization: currentFaculty?.specialization || '',
    bio: currentFaculty?.bio || '',
    officeLocation: currentFaculty?.officeLocation || '',
    joinDate: currentFaculty?.joinDate || ''
  });

  const handleSaveProfile = () => {
    // Here you would typically save to backend
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  return (
    <FacultyLayout title="Profile" subtitle="Manage your account information and preferences">
      <div className="space-y-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={undefined} alt={currentUser?.name} />
                  <AvatarFallback className="text-2xl">
                    {currentUser?.name?.split(' ').map(n => n[0]).join('') || 'F'}
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
                    <h1 className="text-3xl font-bold">{currentUser?.name || 'Faculty Name'}</h1>
                    <p className="text-lg text-muted-foreground">{currentFaculty?.designation || 'Professor'}</p>
                    <p className="text-sm text-muted-foreground">{currentFaculty?.department || 'Department'}</p>
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
                  {currentFaculty?.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{currentFaculty.phone}</span>
                    </div>
                  )}
                  {currentFaculty?.officeLocation && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{currentFaculty.officeLocation}</span>
                    </div>
                  )}
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
                {stats.publishedExams} published, {stats.activeExams} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students Taught</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Unique students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Results Processed</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalResults}</div>
              <p className="text-xs text-muted-foreground">Total submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">Class average</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
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
                    <Label htmlFor="office">Office Location</Label>
                    <Input
                      id="office"
                      value={profileData.officeLocation}
                      onChange={(e) => setProfileData({...profileData, officeLocation: e.target.value})}
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
                  Academic Details
                </CardTitle>
                <CardDescription>
                  Your academic qualifications and departmental information
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
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={profileData.designation}
                      onChange={(e) => setProfileData({...profileData, designation: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={profileData.specialization}
                      onChange={(e) => setProfileData({...profileData, specialization: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Joining Date</Label>
                    <Input
                      id="joinDate"
                      type="date"
                      value={profileData.joinDate}
                      onChange={(e) => setProfileData({...profileData, joinDate: e.target.value})}
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
                  Your academic contributions and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Exams Created</h4>
                      <p className="text-sm text-muted-foreground">Total examinations authored</p>
                    </div>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {stats.totalExams}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Students Impacted</h4>
                      <p className="text-sm text-muted-foreground">Total students taught</p>
                    </div>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {stats.totalStudents}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Assessment Quality</h4>
                      <p className="text-sm text-muted-foreground">Average student performance</p>
                    </div>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {stats.averageScore}%
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
                  Your recent teaching activities and system interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {facultyExams.slice(0, 5).map((exam) => (
                    <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">{exam.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {exam.status} • {exam.questions.length} questions • {exam.enrolledStudents.length} students
                          </p>
                        </div>
                      </div>
                      <Badge variant={
                        exam.status === 'published' ? 'default' :
                        exam.status === 'active' ? 'secondary' :
                        exam.status === 'completed' ? 'outline' : 'destructive'
                      }>
                        {exam.status}
                      </Badge>
                    </div>
                  ))}

                  {facultyExams.length === 0 && (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No recent activity</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FacultyLayout>
  );
}
