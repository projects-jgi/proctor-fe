"use client";

import { StudentLayout } from "@/components/StudentLayout";
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
    CheckCircle,
    Clock,
    FileText,
    GraduationCap,
    Mail,
    Phone,
    Shield,
    Target,
    TrendingUp,
    User
} from 'lucide-react';
import { useState } from 'react';


export default function StudentProfilePage() {
  const { currentUser, students, exams, results, departments } = useProctor();

  // Find current student
  const currentStudent = students.find(s => s.userId === currentUser?.id);
  const studentDepartment = departments.find(d => d.id === currentStudent?.departmentId);

  // Get student stats
  const studentExams = exams.filter(e => e.enrolledStudents.includes(currentStudent?.id || ''));
  const studentResults = results.filter(r => r.studentId === currentStudent?.id);

  // Profile stats
  const stats = {
    totalExams: studentExams.length,
    completedExams: studentResults.length,
    averageScore: studentResults.length > 0
      ? Math.round(studentResults.reduce((sum, r) => sum + r.percentage, 0) / studentResults.length)
      : 0,
    passRate: studentResults.length > 0
      ? Math.round((studentResults.filter(r => r.status === 'passed').length / studentResults.length) * 100)
      : 0,
    upcomingExams: studentExams.filter(e => new Date(e.startTime) > new Date()).length,
    semester: currentStudent?.semester || 1,
    enrollmentYear: currentStudent?.enrollmentYear || 2022
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    rollNumber: currentStudent?.rollNumber || '',
    bio: 'A dedicated student pursuing excellence in academics.'
  });

  const handleSave = () => {
    // Mock save - in real app this would call API
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  return (
    <StudentLayout title="Student Profile" subtitle="Manage your personal information and view your academic progress">
      <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={undefined} alt={currentUser?.name} />
                    <AvatarFallback className="text-lg">
                      {currentUser?.name?.split(' ').map(n => n[0]).join('') || 'ST'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{currentUser?.name}</CardTitle>
                    <CardDescription className="text-lg">
                      {currentStudent?.rollNumber} • Semester {stats.semester}
                    </CardDescription>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant="secondary">
                        <GraduationCap className="w-3 h-3 mr-1" />
                        Student
                      </Badge>
                      <Badge variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        Enrolled {stats.enrollmentYear}
                      </Badge>
                      <Badge variant={currentStudent?.isActive ? "default" : "secondary"}>
                        {currentStudent?.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input
                        id="rollNumber"
                        value={profileData.rollNumber}
                        onChange={(e) => setProfileData({...profileData, rollNumber: e.target.value})}
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
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
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
                        <User className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Full Name</p>
                          <p className="text-sm text-muted-foreground">{currentUser?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{currentUser?.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Roll Number</p>
                          <p className="text-sm text-muted-foreground">{currentStudent?.rollNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Building className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Department</p>
                          <p className="text-sm text-muted-foreground">{studentDepartment?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Bio</p>
                          <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            {/* Academic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Semester</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.semester}</div>
                  <p className="text-xs text-muted-foreground">
                    Academic year
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
                    Overall performance
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
                    Exams passed
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
                    {stats.completedExams} completed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Academic Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Progress</CardTitle>
                <CardDescription>
                  Your performance across different subjects and semesters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Data Structures</p>
                        <p className="text-sm text-muted-foreground">Semester {stats.semester}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">85%</p>
                      <p className="text-sm text-muted-foreground">Grade: A</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Target className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Algorithms</p>
                        <p className="text-sm text-muted-foreground">Semester {stats.semester}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">78%</p>
                      <p className="text-sm text-muted-foreground">Grade: B+</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">Database Systems</p>
                        <p className="text-sm text-muted-foreground">Semester {stats.semester - 1}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">92%</p>
                      <p className="text-sm text-muted-foreground">Grade: A+</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exams" className="space-y-6">
            {/* Exam History */}
            <Card>
              <CardHeader>
                <CardTitle>Exam History</CardTitle>
                <CardDescription>
                  Your performance in completed exams
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentResults.map((result) => {
                    const exam = exams.find(e => e.id === result.examId);
                    return (
                      <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            result.status === 'passed' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {result.status === 'passed' ? (
                              <CheckCircle className={`w-6 h-6 ${
                                result.status === 'passed' ? 'text-green-600' : 'text-red-600'
                              }`} />
                            ) : (
                              <FileText className="w-6 h-6 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{exam?.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(result.generatedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{result.percentage}%</p>
                          <Badge variant={result.status === 'passed' ? 'default' : 'destructive'}>
                            {result.grade}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                  {studentResults.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No exam results available yet.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Exams */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Exams</CardTitle>
                <CardDescription>
                  Exams you are enrolled in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentExams
                    .filter(e => new Date(e.startTime) > new Date())
                    .slice(0, 3)
                    .map((exam) => (
                    <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{exam.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(exam.startTime).toLocaleDateString()} at {new Date(exam.startTime).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{exam.duration} min</p>
                        <Badge variant="outline">
                          {exam.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {stats.upcomingExams === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No upcoming exams scheduled.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Certificates</CardTitle>
                <CardDescription>
                  Your academic achievements and certifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <Award className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                    <h3 className="font-medium">Top Performer</h3>
                    <p className="text-sm text-muted-foreground">Semester {stats.semester}</p>
                  </div>

                  <div className="p-4 border rounded-lg text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <h3 className="font-medium">Perfect Attendance</h3>
                    <p className="text-sm text-muted-foreground">3 consecutive months</p>
                  </div>

                  <div className="p-4 border rounded-lg text-center">
                    <Target className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                    <h3 className="font-medium">Subject Expert</h3>
                    <p className="text-sm text-muted-foreground">Data Structures</p>
                  </div>

                  <div className="p-4 border rounded-lg text-center">
                    <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                    <h3 className="font-medium">Improvement Award</h3>
                    <p className="text-sm text-muted-foreground">Grade jump from C to A</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
    </StudentLayout>
  );
}