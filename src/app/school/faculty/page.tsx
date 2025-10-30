"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SchoolLayout } from "@/components/SchoolLayout";
import { useProctor } from '@/contexts/ProctorContext';
import {
    Users,
    Eye,
    Edit,
    Search,
    Filter
} from 'lucide-react';
import { useState } from "react";

interface Faculty {
  id: string;
  employeeId: string;
  departmentId: string;
  designation: string;
  qualification: string;
  experience: number;
  userId: string;
  isActive: boolean;
  createdAt: string;
}

function SchoolFaculty() {
  const { currentUser, faculties, departments } = useProctor();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  // Filter faculties based on search and department
  const filteredFaculties = faculties.filter(faculty => {
    const matchesSearch = faculty.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.qualification.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = selectedDepartment === "all" || faculty.departmentId === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  // Get department name by ID
  const getDepartmentName = (departmentId: string) => {
    const dept = departments.find(d => d.id === departmentId);
    return dept ? dept.name : 'Unknown Department';
  };

  // Get department code by ID
  const getDepartmentCode = (departmentId: string) => {
    const dept = departments.find(d => d.id === departmentId);
    return dept ? dept.code : 'N/A';
  };

  return (
    <SchoolLayout
      title="Faculty Management"
      subtitle="School of CS&IT - View and manage all faculty members"
    >
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Faculty Members</h2>
          <p className="text-muted-foreground">All faculty across School of CS&IT departments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faculties.length}</div>
            <p className="text-xs text-muted-foreground">All departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MCA Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {faculties.filter(f => f.departmentId === 'mca-dept').length}
            </div>
            <p className="text-xs text-muted-foreground">MCA Department</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MSC Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {faculties.filter(f => f.departmentId === 'msc-dept').length}
            </div>
            <p className="text-xs text-muted-foreground">MSC Department</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BCA Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {faculties.filter(f => f.departmentId === 'bca-dept').length}
            </div>
            <p className="text-xs text-muted-foreground">BCA Department</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search faculty by ID, designation, or qualification..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background"
                />
              </div>
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.code} - {dept.name}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Faculty List */}
      <div className="grid gap-4">
        {filteredFaculties.length > 0 ? (
          filteredFaculties.map((faculty) => (
            <Card key={faculty.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {faculty.employeeId.slice(-2)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-lg">{faculty.employeeId}</h3>
                        <Badge variant="outline" className="text-xs">
                          {faculty.designation}
                        </Badge>
                        <Badge variant={faculty.isActive ? "default" : "secondary"} className="text-xs">
                          {faculty.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{faculty.qualification}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Experience: {faculty.experience} years</span>
                        <span>•</span>
                        <span>Department: {getDepartmentCode(faculty.departmentId)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No faculty found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || selectedDepartment !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "No faculty members have been added yet."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SchoolLayout>
  );
}

export default SchoolFaculty;