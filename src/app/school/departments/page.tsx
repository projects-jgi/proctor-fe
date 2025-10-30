"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SchoolLayout } from "@/components/SchoolLayout";
import { useProctor } from '@/contexts/ProctorContext';
import {
    Building2,
    Users,
    Plus,
    CheckCircle,
    Loader2,
    Eye,
    Edit,
    Trash2
} from 'lucide-react';
import { useState } from "react";

interface Department {
  id: string;
  name: string;
  code: string;
  schoolId: string;
  headOfDepartment: string;
  description: string;
  isActive: boolean;
}

interface Faculty {
  id: string;
  employeeId: string;
  departmentId: string;
  specializationId?: string;
  designation: string;
  qualification: string;
  experience: number;
  userId: string;
  isActive: boolean;
  createdAt: string;
}

function SchoolDepartments() {
  const { currentUser, departments, faculties, addDepartment } = useProctor();

  // Department creation modal state
  const [isCreateDeptModalOpen, setIsCreateDeptModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [departmentForm, setDepartmentForm] = useState({
    name: '',
    code: '',
    headOfDepartment: '',
    description: ''
  });

  // Department creation functions
  const resetDepartmentForm = () => {
    setDepartmentForm({
      name: '',
      code: '',
      headOfDepartment: '',
      description: ''
    });
    setErrors({});
    setIsSubmitting(false);
    setShowSuccess(false);
    setIsCreateDeptModalOpen(false);
  };

  const validateDepartmentForm = () => {
    const newErrors: Record<string, string> = {};

    if (!departmentForm.name.trim()) {
      newErrors.name = 'Department name is required';
    }

    if (!departmentForm.code.trim()) {
      newErrors.code = 'Department code is required';
    } else if (departments.some(dept => dept.code.toLowerCase() === departmentForm.code.toLowerCase())) {
      newErrors.code = 'Department code already exists';
    }

    if (!departmentForm.headOfDepartment.trim()) {
      newErrors.headOfDepartment = 'Head of Department is required';
    }

    if (!departmentForm.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateDepartment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateDepartmentForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new department
      const newDepartment: Department = {
        id: `dept_${Date.now()}`,
        name: departmentForm.name.trim(),
        code: departmentForm.code.trim().toUpperCase(),
        schoolId: 'school-of-csit', // School of CS&IT
        headOfDepartment: departmentForm.headOfDepartment.trim(),
        description: departmentForm.description.trim(),
        isActive: true
      };

      addDepartment(newDepartment);
      setShowSuccess(true);

      // Auto-close modal after success
      setTimeout(() => {
        resetDepartmentForm();
      }, 1500);

    } catch (error) {
      console.error('Error creating department:', error);
      setErrors({ submit: 'Failed to create department. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get faculty by department
  const getFacultyByDepartment = (departmentId: string) => {
    return faculties.filter(faculty => faculty.departmentId === departmentId);
  };

  // Get department stats
  const getDepartmentStats = (departmentId: string) => {
    const deptFaculty = getFacultyByDepartment(departmentId);
    return {
      facultyCount: deptFaculty.length,
      activeFaculty: deptFaculty.filter(f => f.isActive).length
    };
  };

  return (
    <SchoolLayout
      title="Departments Management"
      subtitle="School of CS&IT - Manage academic departments and faculty"
    >
      {/* Header with Create Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Academic Departments</h2>
          <p className="text-muted-foreground">MCA, MSC, BCA departments in School of CS&IT</p>
        </div>
        <Button onClick={() => setIsCreateDeptModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Department
        </Button>
      </div>

      {/* Departments Grid */}
      <div className="grid gap-6">
        {departments.map((dept) => {
          const deptStats = getDepartmentStats(dept.id);
          const deptFaculty = getFacultyByDepartment(dept.id);

          return (
            <Card key={dept.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{dept.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <span>School of CS&IT</span>
                          <span>•</span>
                          <span>Code: {dept.code}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{dept.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Head: {dept.headOfDepartment}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={dept.isActive ? "default" : "secondary"}>
                      {dept.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Department Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {deptStats.facultyCount}
                    </div>
                    <div className="text-xs text-muted-foreground">Faculty Members</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {deptStats.activeFaculty}
                    </div>
                    <div className="text-xs text-muted-foreground">Active Faculty</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {dept.code}
                    </div>
                    <div className="text-xs text-muted-foreground">Department Code</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {dept.isActive ? '✓' : '✗'}
                    </div>
                    <div className="text-xs text-muted-foreground">Status</div>
                  </div>
                </div>

                {/* Faculty List */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Faculty Members ({deptFaculty.length})
                    </h3>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Faculty
                    </Button>
                  </div>

                  {deptFaculty.length > 0 ? (
                    <div className="grid gap-3">
                      {deptFaculty.map((faculty) => (
                        <div key={faculty.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {faculty.employeeId.slice(-2)}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{faculty.employeeId}</span>
                                <Badge variant="outline" className="text-xs">
                                  {faculty.designation}
                                </Badge>
                                <Badge variant={faculty.isActive ? "default" : "secondary"} className="text-xs">
                                  {faculty.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {faculty.qualification} • {faculty.experience} years experience
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
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">No Faculty Members</h3>
                      <p className="text-xs text-muted-foreground mb-4">
                        This department doesn't have any faculty members yet.
                      </p>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Faculty
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Create Department Modal */}
      <Dialog open={isCreateDeptModalOpen} onOpenChange={setIsCreateDeptModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Create New Department
            </DialogTitle>
            <DialogDescription>
              Add a new academic department to the School of CS&IT. This will allow you to organize faculty and courses under this department.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateDepartment}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dept-name" className="text-right">
                  Name *
                </Label>
                <div className="col-span-3">
                  <Input
                    id="dept-name"
                    value={departmentForm.name}
                    onChange={(e) => setDepartmentForm({ ...departmentForm, name: e.target.value })}
                    className={errors.name ? "border-red-500" : ""}
                    placeholder="e.g., Department of Computer Science"
                    required
                  />
                  {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dept-code" className="text-right">
                  Code *
                </Label>
                <div className="col-span-3">
                  <Input
                    id="dept-code"
                    value={departmentForm.code}
                    onChange={(e) => setDepartmentForm({ ...departmentForm, code: e.target.value })}
                    className={errors.code ? "border-red-500" : ""}
                    placeholder="e.g., CSIT"
                    required
                  />
                  {errors.code && <p className="text-sm text-red-500 mt-1">{errors.code}</p>}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dept-head" className="text-right">
                  Head *
                </Label>
                <div className="col-span-3">
                  <Input
                    id="dept-head"
                    value={departmentForm.headOfDepartment}
                    onChange={(e) => setDepartmentForm({ ...departmentForm, headOfDepartment: e.target.value })}
                    className={errors.headOfDepartment ? "border-red-500" : ""}
                    placeholder="e.g., Dr. John Smith"
                    required
                  />
                  {errors.headOfDepartment && <p className="text-sm text-red-500 mt-1">{errors.headOfDepartment}</p>}
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="dept-desc" className="text-right pt-2">
                  Description *
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="dept-desc"
                    value={departmentForm.description}
                    onChange={(e) => setDepartmentForm({ ...departmentForm, description: e.target.value })}
                    className={errors.description ? "border-red-500" : ""}
                    placeholder="Brief description of the department's focus and objectives..."
                    rows={3}
                    required
                  />
                  {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col gap-2">
              {errors.submit && (
                <div className="w-full text-left">
                  <p className="text-sm text-red-500">{errors.submit}</p>
                </div>
              )}
              {showSuccess && (
                <div className="w-full text-left">
                  <p className="text-sm text-green-600 flex items-center gap-2">
                    <CheckCircle size={16} />
                    Department created successfully!
                  </p>
                </div>
              )}
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetDepartmentForm}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={16} className="mr-2" />
                      Create Department
                    </>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SchoolLayout>
  );
}

export default SchoolDepartments;