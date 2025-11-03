"use client";

import { FacultyLayout } from "@/components/FacultyLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProctor } from '@/contexts/ProctorContext';
import {
    GraduationCap,
    Mail,
    Phone,
    Search,
    Upload,
    UserCheck,
    Users
} from 'lucide-react';
import { useState } from 'react';

export default function FacultyStudentsPage() {
  const {
    currentUser,
    faculties,
    students,
    addStudent,
    updateStudent,
    deleteStudent
  } = useProctor();

  // Find current faculty
  const currentFaculty = faculties.find(f => f.userId === currentUser?.id);
  const departmentStudents = students.filter(s => s.departmentId === currentFaculty?.departmentId);

  const [searchQuery, setSearchQuery] = useState('');
  const [isImportOpen, setIsImportOpen] = useState(false);

  // Filter students
  const filteredStudents = departmentStudents.filter(student => {
    const matchesSearch = searchQuery === '' ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleImportStudents = () => {
    // This would handle CSV import from department
    // For now, just show a placeholder
    alert('Import functionality would be implemented here to import students from department CSV');
    setIsImportOpen(false);
  };

  const stats = {
    totalStudents: departmentStudents.length,
    activeStudents: departmentStudents.filter(s => s.isActive).length,
    enrolledStudents: departmentStudents.filter(s => s.enrolledExams && s.enrolledExams.length > 0).length
  };

  return (
    <FacultyLayout
      title="Student Management"
      subtitle="Manage students in your department"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">In department</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeStudents}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.enrolledStudents}</div>
            <p className="text-xs text-muted-foreground">Enrolled in exams</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Department Students</h2>
        <div className="flex space-x-2">
          <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import from Department
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Students from Department</DialogTitle>
                <DialogDescription>
                  Import student data from your department's CSV file
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="csv-file">Select CSV File</Label>
                  <Input
                    id="csv-file"
                    type="file"
                    accept=".csv"
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    CSV should contain columns: name, email, rollNumber, phone, year, semester
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsImportOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleImportStudents}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Students
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search students by name, email, or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="grid gap-4">
        {filteredStudents.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">No students found</CardTitle>
              <CardDescription>
                {searchQuery
                  ? 'Try adjusting your search criteria.'
                  : 'Add students to your department to get started.'}
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{student.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{student.rollNumber}</Badge>
                          <Badge variant={student.isActive ? 'default' : 'secondary'}>
                            {student.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2" />
                        {student.email}
                      </div>
                      {student.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2" />
                          {student.phone}
                        </div>
                      )}
                      <div className="flex items-center text-sm">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Year {student.year} • Semester {student.semester}
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </FacultyLayout>
  );
}