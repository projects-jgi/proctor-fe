"use client";

import { SchoolLayout } from "@/components/SchoolLayout";
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
    BookOpen,
    Building,
    Calendar,
    CheckCircle,
    Edit,
    FileText,
    Globe,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    TrendingUp,
    Users
} from 'lucide-react';
import { useState } from 'react';

export default function SchoolProfilePage() {
  const { currentUser, departments, faculties, exams, results, students } = useProctor();

  // School stats
  const stats = {
    totalDepartments: departments.length,
    totalFaculties: faculties.length,
    totalStudents: students.length,
    totalExams: exams.length,
    publishedExams: exams.filter(e => e.status === 'published').length,
    activeExams: exams.filter(e => e.status === 'active').length,
    completedExams: exams.filter(e => e.status === 'completed').length,
    totalResults: results.length,
    averageScore: results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length)
      : 0,
    passRate: results.length > 0
      ? Math.round((results.filter(r => r.percentage >= 50).length / results.length) * 100)
      : 0
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Jain University',
    description: 'A premier educational institution committed to excellence in teaching, learning, and research.',
    address: 'Jayanagar, Bangalore - 560011',
    phone: '+91 80 1234 5678',
    email: 'info@jainuniversity.ac.in',
    website: 'https://www.jainuniversity.ac.in',
    established: '1990'
  });

  const handleSave = () => {
    // Mock save - in real app this would call API
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  return (
    <SchoolLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">School Profile</h1>
            <p className="text-muted-foreground">Manage your school information and view institution statistics</p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={undefined} alt="Jain University" />
                    <AvatarFallback className="text-lg">
                      JU
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{profileData.name}</CardTitle>
                    <CardDescription className="text-lg">
                      Premier Educational Institution
                    </CardDescription>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant="secondary">
                        <Building className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                      <Badge variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        Est. {profileData.established}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">School Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="established">Established Year</Label>
                      <Input
                        id="established"
                        value={profileData.established}
                        onChange={(e) => setProfileData({...profileData, established: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={profileData.description}
                        onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                        rows={3}
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
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{profileData.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{profileData.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Website</p>
                          <p className="text-sm text-muted-foreground">{profileData.website}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-sm text-muted-foreground">{profileData.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Established</p>
                          <p className="text-sm text-muted-foreground">{profileData.established}</p>
                        </div>
                      </div>
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
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalDepartments}</div>
                  <p className="text-xs text-muted-foreground">
                    Academic departments
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalFaculties}</div>
                  <p className="text-xs text-muted-foreground">
                    Teaching staff
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">
                    Enrolled students
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
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
                  <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.passRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    Overall performance
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
                  <p className="text-xs text-muted-foreground">
                    Institution average
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            {/* Departments List */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Departments</CardTitle>
                <CardDescription>
                  All departments in {profileData.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((department) => (
                    <div key={department.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {department.code}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{department.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Code: {department.code} • Head: {department.headOfDepartment}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {department.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant={department.isActive ? "default" : "secondary"}>
                        {department.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                  {departments.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No departments found.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faculty" className="space-y-6">
            {/* Faculty Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Faculty Overview</CardTitle>
                <CardDescription>
                  Teaching staff across all departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{faculties.length}</div>
                    <p className="text-sm text-muted-foreground">Total Faculty</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {faculties.filter(f => f.designation.includes('Professor')).length}
                    </div>
                    <p className="text-sm text-muted-foreground">Professors</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {faculties.filter(f => f.designation.includes('Assistant')).length}
                    </div>
                    <p className="text-sm text-muted-foreground">Assistant Professors</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Recent Faculty</h4>
                  {faculties.slice(0, 5).map((faculty) => (
                    <div key={faculty.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {faculty.employeeId.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{faculty.designation}</p>
                          <p className="text-xs text-muted-foreground">
                            {faculty.employeeId} • {faculty.experience} years experience
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {faculty.qualification}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SchoolLayout>
  );
}