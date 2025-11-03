interface Department {
  id: string;
  name: string;
}

interface Course {
  id: string;
  name: string;
  departmentId: string;
}

// Sample departments data (replace with actual data source as needed)
const departments: Department[] = [
  { id: 'cs', name: 'Computer Science' },
  { id: 'ee', name: 'Electrical Engineering' },
  { id: 'me', name: 'Mechanical Engineering' },
  { id: 'ce', name: 'Civil Engineering' },
  { id: 'math', name: 'Mathematics' },
];

// Sample courses data (replace with actual data source as needed)
const courses: Course[] = [
  { id: 'cs101', name: 'Introduction to Programming', departmentId: 'cs' },
  { id: 'cs201', name: 'Data Structures', departmentId: 'cs' },
  { id: 'ee101', name: 'Circuit Analysis', departmentId: 'ee' },
  { id: 'ee201', name: 'Electromagnetic Fields', departmentId: 'ee' },
  { id: 'me101', name: 'Thermodynamics', departmentId: 'me' },
  { id: 'me201', name: 'Fluid Mechanics', departmentId: 'me' },
  { id: 'ce101', name: 'Structural Analysis', departmentId: 'ce' },
  { id: 'ce201', name: 'Geotechnical Engineering', departmentId: 'ce' },
  { id: 'math101', name: 'Calculus I', departmentId: 'math' },
  { id: 'math201', name: 'Linear Algebra', departmentId: 'math' },
];

export function getAllDepartments(): Department[] {
  return departments;
}

export function getCoursesForDepartment(departmentId: string): Course[] {
  return courses.filter(course => course.departmentId === departmentId);
}

export function getDepartmentName(departmentId: string): string {
  const department = departments.find(dept => dept.id === departmentId);
  return department ? department.name : 'Unknown Department';
}
