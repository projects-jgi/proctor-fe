// Department and Course data structure
export const DEPARTMENTS = {
  "computer-science-it": {
    name: "School of CS & IT",
    courses: {
      // Bachelor programs
      "bca": "Bachelors of Computer Applications",
      "bsc": "Bachelors of Science",

      // Master programs
      "mca": "Masters of Computer Applications",
      "msc": "Masters of Science",

      // Post Graduate Diploma
      "pgd-it": "Post Graduate Diploma in IT"
    }
  },
  "design-media-arts": {
    name: "School of Design",
    courses: {
      // Bachelor programs
      "bdes": "Bachelors of Design",
      "ba": "Bachelors of Arts",
      "bfa": "Bachelors of Fine Arts",

      // Master programs
      "mdes": "Masters of Design",
      "ma": "Masters of Arts",
      "mfa": "Masters of Fine Arts",
      "msc-interior": "Masters of Interior Design"
    }
  }
};

// BSc Programs
export const BSC_PROGRAMS = {
  "animation": "Animation",
  "digital-film": "Digital Film Making",
  "gaming": "Gaming",
  "visual-communication": "Visual Communication"
};

// Helper functions
export const getDepartmentName = (departmentId: string): string => {
  return DEPARTMENTS[departmentId as keyof typeof DEPARTMENTS]?.name || departmentId;
};

export const getCourseName = (departmentId: string, courseId: string): string => {
  const department = DEPARTMENTS[departmentId as keyof typeof DEPARTMENTS];
  return department?.courses[courseId as keyof typeof department.courses] || courseId;
};

export const getAllDepartments = () => {
  return Object.entries(DEPARTMENTS).map(([id, dept]) => ({
    id,
    name: dept.name,
    courseCount: Object.keys(dept.courses).length
  }));
};

export const getCoursesForDepartment = (departmentId: string) => {
  const department = DEPARTMENTS[departmentId as keyof typeof DEPARTMENTS];
  if (!department) return [];

  return Object.entries(department.courses).map(([id, name]) => ({
    id,
    name
  }));
};