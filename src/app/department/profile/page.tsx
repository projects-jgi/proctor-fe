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
  Building,
  Calendar,
  Edit,
  GraduationCap,
  Save,
  Users
} from 'lucide-react';
import { useState } from 'react';

export default function DepartmentProfilePage() {
  const { currentUser, departments, faculties, exams, results, students } = useProctor();
  const [isEditing, setIsEditing] = useState(false);

  // Find current department
  const currentDepartment = departments.find(d => d.id === currentUser?.id) || {
    id: '1',
    name: 'Computer Science',
    code: 'CS',
    hod: 'Dr. Sarah Johnson',
    email: 'hod.cs@jainuniversity.ac.in',
    phone: '+91-9876543210',
    description: 'Department of Computer Science and Engineering',
    established: '2005',
    totalFaculty: 25,
    totalStudents: 450
  };

  // Get department stats
  const departmentFaculties = faculties.filter(f => f.departmentId === currentDepartment?.id);
  const departmentStudents = students.filter(s => s.departmentId === currentDepartment?.id);
  const departmentExams = exams.filter(e => e.departmentId === currentDepartment?.id);
  const departmentResults = results.filter(r => departmentExams.some(exam => exam.id === r.examId));

  // Profile stats
  const stats = {
    totalFaculties: departmentFaculties.length,
    totalStudents: departmentStudents.length,
    totalExams: departmentExams.length,
    publishedExams: departmentExams.filter(e => e.status === 'published').length,
    activeExams: departmentExams.filter(e => e.status === 'active').length,
    completedExams: departmentExams.filter(e => e.status === 'completed').length,
    totalResults: departmentResults.length,
    averageScore: departmentResults.length > 0
      ? Math.round(departmentResults.reduce((sum, r) => sum + (r.score || 0), 0) / departmentResults.length)
      : 0
  };

  const [profileData, setProfileData] = useState({
    name: currentDepartment.name,
    code: currentDepartment.code,
    hod: currentDepartment.hod,
    email: currentDepartment.email,
    phone: currentDepartment.phone,
    description: currentDepartment.description,
    established: currentDepartment.established
  });

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  return (
    <DepartmentLayout title="Department Profile" subtitle="Manage your department information and view statistics">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Profile Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={`/api/department-avatar/${currentDepartment.id}`} />
                    <AvatarFallback className="text-lg">
                      {currentDepartment.code}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold">{currentDepartment.name}</h2>
                      <Badge variant="secondary">{currentDepartment.code}</Badge>
                    </div>
                    <p className="text-muted-foreground">{currentDepartment.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{stats.totalFaculties} Faculty</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>{stats.totalStudents} Students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Est. {currentDepartment.established}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Faculty</p>
                      <p className="text-2xl font-bold">{stats.totalFaculties}</p>
                      <p className="text-xs text-muted-foreground">Active members</p>
                    </div>
                    <Users className="h-12 w-12 text-primary/10" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                      <p className="text-2xl font-bold">{stats.totalStudents}</p>
                      <p className="text-xs text-muted-foreground">Enrolled</p>
                    </div>
                    <GraduationCap className="h-12 w-12 text-primary/10" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Exams</p>
                      <p className="text-2xl font-bold">{stats.totalExams}</p>
                      <p className="text-xs text-muted-foreground">{stats.publishedExams} published</p>
                    </div>
                    <BookOpen className="h-12 w-12 text-primary/10" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg. Score</p>
                      <p className="text-2xl font-bold">{stats.averageScore}%</p>
                      <p className="text-xs text-muted-foreground">Department average</p>
                    </div>
                    <Award className="h-12 w-12 text-primary/10" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Information</CardTitle>
                <CardDescription>
                  Update your department details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Department Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Department Code</Label>
                      <Input
                        id="code"
                        value={profileData.code}
                        onChange={(e) => setProfileData(prev => ({ ...prev, code: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hod">Head of Department</Label>
                      <Input
                        id="hod"
                        value={profileData.hod}
                        onChange={(e) => setProfileData(prev => ({ ...prev, hod: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="established">Established Year</Label>
                      <Input
                        id="established"
                        value={profileData.established}
                        onChange={(e) => setProfileData(prev => ({ ...prev, established: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={profileData.description}
                        onChange={(e) => setProfileData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Building className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Department Name</p>
                          <p className="text-sm text-muted-foreground">{profileData.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Department Code</p>
                          <p className="text-sm text-muted-foreground">{profileData.code}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Head of Department</p>
                          <p className="text-sm text-muted-foreground">{profileData.hod}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Established</p>
                          <p className="text-sm text-muted-foreground">{profileData.established}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Description</p>
                          <p className="text-sm text-muted-foreground">{profileData.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Exam Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Published</span>
                    <Badge variant="secondary">{stats.publishedExams}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active</span>
                    <Badge variant="outline">{stats.activeExams}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completed</span>
                    <Badge variant="secondary">{stats.completedExams}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Performance Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Results</span>
                    <span className="font-semibold">{stats.totalResults}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Score</span>
                    <span className="font-semibold">{stats.averageScore}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pass Rate</span>
                    <span className="font-semibold text-green-600">
                      {stats.totalResults > 0 ? Math.round((departmentResults.filter(r => (r.score || 0) >= 40).length / stats.totalResults) * 100) : 0}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Department Growth</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Faculty Growth</span>
                    <span className="font-semibold text-green-600">+12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Student Growth</span>
                    <span className="font-semibold text-green-600">+8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Exam Creation</span>
                    <span className="font-semibold text-blue-600">+15%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DepartmentLayout>
  );
}