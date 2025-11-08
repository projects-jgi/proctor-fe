"use client";

import { DepartmentLayout } from "@/components/DepartmentLayout";
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

export default function DepartmentProfilePage() {
  const { currentUser, departments, exams, results, faculties, students } = useProctor();

  // Find current department
  const currentDepartment = departments.find(d => d.userId === currentUser?.id);

  // Get department-related data
  const departmentFaculties = faculties.filter(f => f.department === currentDepartment?.name);
  const departmentStudents = students.filter(s => s.department === currentDepartment?.name);
  const departmentExams = exams.filter(exam =>
    departmentFaculties.some(faculty => faculty.id === exam.facultyId)
  );
  const departmentResults = results.filter(result =>
    departmentExams.some(exam => exam.id === result.examId)
  );

  // Profile stats
  const stats = {
    totalFaculties: departmentFaculties.length,
    totalStudents: departmentStudents.length,
    totalExams: departmentExams.length,
    activeExams: departmentExams.filter(e => e.status === 'active').length,
    completedExams: departmentExams.filter(e => e.status === 'completed').length,
    totalResults: departmentResults.length,
    averageScore: departmentResults.length > 0
      ? Math.round(departmentResults.reduce((sum, r) => sum + r.percentage, 0) / departmentResults.length)
      : 0
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentDepartment?.phone || '',
    departmentName: currentDepartment?.name || '',
    hodName: currentDepartment?.hodName || '',
    location: currentDepartment?.location || '',
    bio: currentDepartment?.bio || '',
    establishedYear: currentDepartment?.establishedYear || '',
    website: currentDepartment?.website || ''
  });

  const handleSaveProfile = () => {
    // Here you would typically save to backend
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  return (
    <DepartmentLayout title="Profile" subtitle="Manage your department information and preferences">
      <div className="space-y-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={undefined} alt={currentUser?.name} />
                  <AvatarFallback className="text-2xl">
                    {currentUser?.name?.split(' ').map((n: string) => n[0]).join('') || 'D'}
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
                    <h1 className="text-3xl font-bold">{currentUser?.name || 'Department Name'}</h1>
                    <p className="text-lg text-muted-foreground">{currentDepartment?.hodName || 'Head of Department'}</p>
                    <p className="text-sm text-muted-foreground">{currentDepartment?.name || 'Department'}</p>
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
                  {currentDepartment?.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{currentDepartment.phone}</span>
                    </div>
                  )}
                  {currentDepartment?.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{currentDepartment.location}</span>
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
              <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFaculties}</div>
              <p className="text-xs text-muted-foreground">Active faculty</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Enrolled students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalExams}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeExams} active, {stats.completedExams} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">Department average</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Department Info</TabsTrigger>
            <TabsTrigger value="academic">Academic Details</TabsTrigger>
            <TabsTrigger value="activity">Activity Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Department Information
                </CardTitle>
                <CardDescription>
                  Update your department details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Department Head Name</Label>
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
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Department Description</Label>
                  <Textarea
                    id="bio"
                    placeholder="Describe your department..."
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
                  Department academic details and establishment information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="departmentName">Department Name</Label>
                    <Input
                      id="departmentName"
                      value={profileData.departmentName}
                      onChange={(e) => setProfileData({...profileData, departmentName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hodName">Head of Department</Label>
                    <Input
                      id="hodName"
                      value={profileData.hodName}
                      onChange={(e) => setProfileData({...profileData, hodName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="establishedYear">Established Year</Label>
                    <Input
                      id="establishedYear"
                      type="number"
                      value={profileData.establishedYear}
                      onChange={(e) => setProfileData({...profileData, establishedYear: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Department Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
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

            {/* Department Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Department Achievements
                </CardTitle>
                <CardDescription>
                  Key achievements and statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Faculty Excellence</h4>
                      <p className="text-sm text-muted-foreground">Qualified faculty members</p>
                    </div>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {stats.totalFaculties}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Student Success</h4>
                      <p className="text-sm text-muted-foreground">Total enrolled students</p>
                    </div>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {stats.totalStudents}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Academic Performance</h4>
                      <p className="text-sm text-muted-foreground">Average department score</p>
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
                  Recent exams and activities in your department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentExams.slice(0, 5).map((exam) => (
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

                  {departmentExams.length === 0 && (
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
    </DepartmentLayout>
  );
}