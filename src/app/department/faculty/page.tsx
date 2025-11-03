"use client";

import { Award, CheckCircle, Clock, GraduationCap, Loader2, Search, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import { DepartmentLayout } from '../../../components/DepartmentLayout';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { useProctor } from '../../../contexts/ProctorContext';
import { getAllDepartments, getCoursesForDepartment, getDepartmentName } from '../../../lib/departments';

function FacultyPage() {
    const { faculties, users, addFaculty, updateFaculty, deleteFaculty, exams, questions } = useProctor();

    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingFaculty, setEditingFaculty] = useState<any>(null);
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        employeeId: '',
        department: '',
        course: '',
        designation: '',
        qualification: '',
        experience: '0',
        bio: ''
    });

    const departments = getAllDepartments();

    // Helper functions
    const availableCourses = selectedDepartment !== 'all' ? getCoursesForDepartment(selectedDepartment) : [];

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            employeeId: '',
            department: '',
            course: '',
            designation: '',
            qualification: '',
            experience: '0',
            bio: ''
        });
        setErrors({});
        setIsSubmitting(false);
        setShowSuccess(false);
        setEditingFaculty(null);
        setIsAddModalOpen(false);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.department) {
            newErrors.department = 'Department is required';
        }

        if (!formData.designation) {
            newErrors.designation = 'Designation is required';
        }

        if (!formData.qualification.trim()) {
            newErrors.qualification = 'Qualification is required';
        }

        // Check for duplicate email
        const existingUser = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());
        if (existingUser && (!editingFaculty || existingUser.id !== editingFaculty.userId)) {
            newErrors.email = 'Email already exists';
        }

        // Check for duplicate employee ID
        const existingFaculty = faculties.find(f =>
            f.employeeId === formData.employeeId &&
            (!editingFaculty || f.id !== editingFaculty.id)
        );
        if (formData.employeeId && existingFaculty) {
            newErrors.employeeId = 'Employee ID already exists';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Create a user first
            const newUser = {
                id: `user_${Date.now()}`,
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                role: 'faculty' as const,
                phone: formData.phone.trim(),
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            // Create faculty record
            const newFaculty = {
                userId: newUser.id,
                employeeId: formData.employeeId.trim() || `FAC${Date.now()}`,
                departmentId: formData.department,
                designation: formData.designation,
                qualification: formData.qualification.trim(),
                experience: parseInt(formData.experience) || 0,
                phone: formData.phone.trim(),
                bio: formData.bio.trim(),
                isActive: true,
                userData: newUser // Pass user data to be added to users array
            };

            addFaculty(newFaculty);
            setShowSuccess(true);

            // Auto-close modal after success
            setTimeout(() => {
                resetForm();
            }, 1500);

        } catch (error) {
            console.error('Error adding faculty:', error);
            setErrors({ submit: 'Failed to add faculty member. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const updates: any = {
                employeeId: formData.employeeId.trim(),
                departmentId: formData.department,
                designation: formData.designation,
                qualification: formData.qualification.trim(),
                experience: parseInt(formData.experience) || 0,
                phone: formData.phone.trim(),
                bio: formData.bio.trim()
            };

            updateFaculty(editingFaculty.id, updates);
            setShowSuccess(true);

            // Auto-close modal after success
            setTimeout(() => {
                resetForm();
            }, 1500);

        } catch (error) {
            console.error('Error updating faculty:', error);
            setErrors({ submit: 'Failed to update faculty member. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (faculty: any) => {
        setEditingFaculty(faculty);

        setFormData({
            name: users.find(u => u.id === faculty.userId)?.name || '',
            email: users.find(u => u.id === faculty.userId)?.email || '',
            phone: faculty.phone || '',
            employeeId: faculty.employeeId,
            department: faculty.departmentId,
            course: '',
            designation: faculty.designation,
            qualification: faculty.qualification,
            experience: faculty.experience.toString(),
            bio: faculty.bio || ''
        });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this faculty member?')) {
            deleteFaculty(id);
        }
    };

    // Map faculties to include user information and filter by selections
    const mappedFaculties = faculties
        .filter(faculty => {
            // Filter by selected department
            if (selectedDepartment !== 'all' && faculty.departmentId !== selectedDepartment) {
                return false;
            }
            // Filter by selected course
            if (selectedCourse !== 'all' && faculty.departmentId !== selectedCourse) {
                return false;
            }
            return true;
        })
        .map(faculty => {
            const user = users.find(u => u.id === faculty.userId);
            const facultyExams = exams.filter(exam => exam.facultyId === faculty.id);
            const facultyQuestions = questions.filter(q => q.facultyId === faculty.id);

            return {
                id: faculty.id,
                name: user?.name || 'Unknown',
                email: user?.email || 'Unknown',
                phone: faculty.phone || 'N/A',
                employeeId: faculty.employeeId,
                department: getDepartmentName(faculty.departmentId),
                departmentId: faculty.departmentId,
                designation: faculty.designation,
                qualification: faculty.qualification,
                experience: faculty.experience,
                bio: faculty.bio || '',
                examsCreated: facultyExams.length,
                questionsCreated: facultyQuestions.length,
                isActive: faculty.isActive
            };
        });

    const filteredFaculties = mappedFaculties.filter(faculty =>
        faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Statistics
    const totalFaculties = mappedFaculties.length;
    const activeFaculties = mappedFaculties.filter(f => f.isActive).length;
    const avgExperience = totalFaculties > 0 ? Math.round(mappedFaculties.reduce((sum, f) => sum + f.experience, 0) / totalFaculties) : 0;
    const totalExams = mappedFaculties.reduce((sum, f) => sum + f.examsCreated, 0);

    return (
        <DepartmentLayout
            title="Faculty Management"
            subtitle="Manage department faculty members and their academic activities"
        >
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalFaculties}</div>
                        <p className="text-xs text-muted-foreground">
                            {activeFaculties} active members
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Experience</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{avgExperience}</div>
                        <p className="text-xs text-muted-foreground">
                            years of experience
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalExams}</div>
                        <p className="text-xs text-muted-foreground">
                            exams created
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Departments</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{departments.length}</div>
                        <p className="text-xs text-muted-foreground">
                            academic departments
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Hierarchical Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="text-sm font-medium mb-2 block">Department</label>
                    <Select value={selectedDepartment} onValueChange={(value) => {
                        setSelectedDepartment(value);
                        setSelectedCourse('all');
                    }}>
                        <SelectTrigger>
                            <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            {departments.map((dept: any) => (
                                <SelectItem key={dept.id} value={dept.id}>
                                    {dept.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="text-sm font-medium mb-2 block">Course</label>
                    <Select
                        value={selectedCourse}
                        onValueChange={(value) => {
                            setSelectedCourse(value);
                        }}
                        disabled={selectedDepartment === 'all'}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All Courses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Courses</SelectItem>
                            {availableCourses.map((course: any) => (
                                <SelectItem key={course.id} value={course.id}>
                                    {course.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-end">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSelectedDepartment('all');
                            setSelectedCourse('all');
                        }}
                        className="w-full"
                    >
                        Clear Filters
                    </Button>
                </div>
            </div>

            {/* Search and Add Faculty */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        placeholder="Search faculty by name, email, or employee ID..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <UserPlus size={16} className="mr-2" />
                    Add Faculty
                </Button>
            </div>

            {/* Faculty Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Faculty Members</CardTitle>
                    <CardDescription>
                        Department faculty with their qualifications and contributions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredFaculties.map((faculty) => (
                            <Card key={faculty.id} className="p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={undefined} />
                                            <AvatarFallback>
                                                {faculty.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg font-semibold">{faculty.name}</h3>
                                                <Badge variant={faculty.isActive ? "default" : "secondary"}>
                                                    {faculty.isActive ? "Active" : "Inactive"}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {faculty.designation} • {faculty.employeeId}
                                            </p>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="font-medium">Department:</span>
                                                    <p className="text-muted-foreground">{faculty.department}</p>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Qualification:</span>
                                                    <p className="text-muted-foreground">{faculty.qualification}</p>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Experience:</span>
                                                    <p className="text-muted-foreground">{faculty.experience} years</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                                                <span>{faculty.examsCreated} exams created</span>
                                                <span>{faculty.questionsCreated} questions created</span>
                                                <span>{faculty.email}</span>
                                            </div>
                                            {faculty.bio && (
                                                <p className="text-sm text-muted-foreground mt-2">{faculty.bio}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(faculty)}>
                                            Edit
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(faculty.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {filteredFaculties.length === 0 && (
                        <div className="text-center py-8">
                            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-sm font-semibold">No faculty members found</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {searchTerm || selectedDepartment !== 'all' || selectedCourse !== 'all'
                                    ? "Try adjusting your search or filters."
                                    : "Get started by adding your first faculty member."}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add Faculty Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Faculty Member</DialogTitle>
                        <DialogDescription>
                            Enter the details for the new faculty member.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name *
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={errors.name ? "border-red-500" : ""}
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email *
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={errors.email ? "border-red-500" : ""}
                                        required
                                    />
                                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                    Phone
                                </Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="employeeId" className="text-right">
                                    Employee ID
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="employeeId"
                                        value={formData.employeeId}
                                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                        className={errors.employeeId ? "border-red-500" : ""}
                                        placeholder="Auto-generated if empty"
                                    />
                                    {errors.employeeId && <p className="text-sm text-red-500 mt-1">{errors.employeeId}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="department" className="text-right">
                                    Department *
                                </Label>
                                <div className="col-span-3">
                                    <Select
                                        value={formData.department}
                                        onValueChange={(value: string) => setFormData({ ...formData, department: value, course: '' })}
                                    >
                                        <SelectTrigger className={errors.department ? "border-red-500" : ""}>
                                            <SelectValue placeholder="Select department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {departments.map((dept: any) => (
                                                <SelectItem key={dept.id} value={dept.id}>
                                                    {dept.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.department && <p className="text-sm text-red-500 mt-1">{errors.department}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="course" className="text-right">
                                    Course
                                </Label>
                                <Select
                                    value={formData.course}
                                    onValueChange={(value: string) => setFormData({ ...formData, course: value })}
                                    disabled={!formData.department}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select course (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">No course</SelectItem>
                                        {getCoursesForDepartment(formData.department).map((course: any) => (
                                            <SelectItem key={course.id} value={course.id}>
                                                {course.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="designation" className="text-right">
                                    Designation *
                                </Label>
                                <div className="col-span-3">
                                    <Select value={formData.designation} onValueChange={(value: string) => setFormData({ ...formData, designation: value })}>
                                        <SelectTrigger className={errors.designation ? "border-red-500" : ""}>
                                            <SelectValue placeholder="Select designation" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                                            <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                                            <SelectItem value="Professor">Professor</SelectItem>
                                            <SelectItem value="Head of Department">Head of Department</SelectItem>
                                            <SelectItem value="Lecturer">Lecturer</SelectItem>
                                            <SelectItem value="Senior Lecturer">Senior Lecturer</SelectItem>
                                            <SelectItem value="Visiting Faculty">Visiting Faculty</SelectItem>
                                            <SelectItem value="Adjunct Faculty">Adjunct Faculty</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.designation && <p className="text-sm text-red-500 mt-1">{errors.designation}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="qualification" className="text-right">
                                    Qualification *
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="qualification"
                                        value={formData.qualification}
                                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                                        className={errors.qualification ? "border-red-500" : ""}
                                        placeholder="e.g., PhD in Computer Science"
                                        required
                                    />
                                    {errors.qualification && <p className="text-sm text-red-500 mt-1">{errors.qualification}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="experience" className="text-right">
                                    Experience (years)
                                </Label>
                                <Input
                                    id="experience"
                                    type="number"
                                    min="0"
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="bio" className="text-right pt-2">
                                    Bio
                                </Label>
                                <textarea
                                    id="bio"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="col-span-3 min-h-[80px] px-3 py-2 text-sm border border-input bg-background rounded-md resize-none"
                                    placeholder="Brief biography or research interests (optional)"
                                />
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
                                        Faculty member {editingFaculty ? 'updated' : 'added'} successfully!
                                    </p>
                                </div>
                            )}
                            <div className="flex gap-2 justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="min-w-[140px]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className="mr-2 animate-spin" />
                                            {editingFaculty ? 'Updating...' : 'Adding...'}
                                        </>
                                    ) : (
                                        editingFaculty ? 'Update Faculty Member' : 'Add Faculty Member'
                                    )}
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Faculty Modal */}
            <Dialog open={!!editingFaculty} onOpenChange={() => setEditingFaculty(null)}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Faculty Member</DialogTitle>
                        <DialogDescription>
                            Update faculty member details.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="edit-name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="edit-email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-phone" className="text-right">
                                    Phone
                                </Label>
                                <Input
                                    id="edit-phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-employeeId" className="text-right">
                                    Employee ID
                                </Label>
                                <Input
                                    id="edit-employeeId"
                                    value={formData.employeeId}
                                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-department" className="text-right">
                                    Department
                                </Label>
                                <Select
                                    value={formData.department}
                                    onValueChange={(value: string) => setFormData({ ...formData, department: value, course: '' })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map((dept: any) => (
                                            <SelectItem key={dept.id} value={dept.id}>
                                                {dept.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-course" className="text-right">
                                    Course
                                </Label>
                                <Select
                                    value={formData.course}
                                    onValueChange={(value: string) => setFormData({ ...formData, course: value })}
                                    disabled={!formData.department}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select course (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">No course</SelectItem>
                                        {getCoursesForDepartment(formData.department).map((course: any) => (
                                            <SelectItem key={course.id} value={course.id}>
                                                {course.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-designation" className="text-right">
                                    Designation
                                </Label>
                                <Select value={formData.designation} onValueChange={(value: string) => setFormData({ ...formData, designation: value })}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select designation" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                                        <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                                        <SelectItem value="Professor">Professor</SelectItem>
                                        <SelectItem value="Head of Department">Head of Department</SelectItem>
                                        <SelectItem value="Lecturer">Lecturer</SelectItem>
                                        <SelectItem value="Senior Lecturer">Senior Lecturer</SelectItem>
                                        <SelectItem value="Visiting Faculty">Visiting Faculty</SelectItem>
                                        <SelectItem value="Adjunct Faculty">Adjunct Faculty</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-qualification" className="text-right">
                                    Qualification
                                </Label>
                                <Input
                                    id="edit-qualification"
                                    value={formData.qualification}
                                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                                    className="col-span-3"
                                    placeholder="e.g., PhD in Computer Science"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-experience" className="text-right">
                                    Experience (years)
                                </Label>
                                <Input
                                    id="edit-experience"
                                    type="number"
                                    min="0"
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="edit-bio" className="text-right pt-2">
                                    Bio
                                </Label>
                                <textarea
                                    id="edit-bio"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="col-span-3 min-h-[80px] px-3 py-2 text-sm border border-input bg-background rounded-md resize-none"
                                    placeholder="Brief biography or research interests (optional)"
                                />
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
                                        Faculty member updated successfully!
                                    </p>
                                </div>
                            )}
                            <div className="flex gap-2 justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="min-w-[140px]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className="mr-2 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Faculty Member'
                                    )}
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </DepartmentLayout>
    );
}

export default FacultyPage;