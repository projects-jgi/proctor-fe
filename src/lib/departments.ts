export interface Department {
  id: string;
  name: string;
  code: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  departmentId: string;
}

// Mock data for departments
const departments: Department[] = [
  {
    id: 'computer-science-it',
    name: 'Computer Science & Information Technology',
    code: 'CSIT'
  },
  {
    id: 'electrical-engineering',
    name: 'Electrical Engineering',
    code: 'EE'
  },
  {
    id: 'mechanical-engineering',
    name: 'Mechanical Engineering',
    code: 'ME'
  },
  {
    id: 'civil-engineering',
    name: 'Civil Engineering',
    code: 'CE'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    code: 'MATH'
  },
  {
    id: 'physics',
    name: 'Physics',
    code: 'PHYS'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    code: 'CHEM'
  },
  {
    id: 'biology',
    name: 'Biology',
    code: 'BIO'
  }
];

// Mock data for courses
const courses: Course[] = [
  // Computer Science & IT courses
  { id: 'cs101', name: 'Introduction to Programming', code: 'CS101', departmentId: 'computer-science-it' },
  { id: 'cs201', name: 'Data Structures', code: 'CS201', departmentId: 'computer-science-it' },
  { id: 'cs301', name: 'Database Management Systems', code: 'CS301', departmentId: 'computer-science-it' },
  { id: 'cs401', name: 'Web Development', code: 'CS401', departmentId: 'computer-science-it' },
  { id: 'cs501', name: 'Computer Networks', code: 'CS501', departmentId: 'computer-science-it' },

  // Electrical Engineering courses
  { id: 'ee101', name: 'Circuit Analysis', code: 'EE101', departmentId: 'electrical-engineering' },
  { id: 'ee201', name: 'Power Systems', code: 'EE201', departmentId: 'electrical-engineering' },
  { id: 'ee301', name: 'Control Systems', code: 'EE301', departmentId: 'electrical-engineering' },

  // Mechanical Engineering courses
  { id: 'me101', name: 'Thermodynamics', code: 'ME101', departmentId: 'mechanical-engineering' },
  { id: 'me201', name: 'Fluid Mechanics', code: 'ME201', departmentId: 'mechanical-engineering' },
  { id: 'me301', name: 'Heat Transfer', code: 'ME301', departmentId: 'mechanical-engineering' },

  // Mathematics courses
  { id: 'math101', name: 'Calculus I', code: 'MATH101', departmentId: 'mathematics' },
  { id: 'math201', name: 'Linear Algebra', code: 'MATH201', departmentId: 'mathematics' },
  { id: 'math301', name: 'Differential Equations', code: 'MATH301', departmentId: 'mathematics' },

  // Physics courses
  { id: 'phys101', name: 'Mechanics', code: 'PHYS101', departmentId: 'physics' },
  { id: 'phys201', name: 'Electromagnetism', code: 'PHYS201', departmentId: 'physics' },
  { id: 'phys301', name: 'Quantum Physics', code: 'PHYS301', departmentId: 'physics' },

  // Chemistry courses
  { id: 'chem101', name: 'General Chemistry', code: 'CHEM101', departmentId: 'chemistry' },
  { id: 'chem201', name: 'Organic Chemistry', code: 'CHEM201', departmentId: 'chemistry' },
  { id: 'chem301', name: 'Physical Chemistry', code: 'CHEM301', departmentId: 'chemistry' },

  // Biology courses
  { id: 'bio101', name: 'Cell Biology', code: 'BIO101', departmentId: 'biology' },
  { id: 'bio201', name: 'Genetics', code: 'BIO201', departmentId: 'biology' },
  { id: 'bio301', name: 'Molecular Biology', code: 'BIO301', departmentId: 'biology' }
];

export function getAllDepartments(): Department[] {
  return departments;
}

export function getDepartmentName(departmentId: string): string {
  const department = departments.find(d => d.id === departmentId);
  return department ? department.name : 'Unknown Department';
}

export function getCoursesForDepartment(departmentId: string): Course[] {
  return courses.filter(course => course.departmentId === departmentId);
}

export function getDepartmentById(departmentId: string): Department | undefined {
  return departments.find(d => d.id === departmentId);
}

export function getCourseById(courseId: string): Course | undefined {
  return courses.find(c => c.id === courseId);
}