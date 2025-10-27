// Department and Course data structure
export const DEPARTMENTS = {
  "computer-science-it": {
    name: "School of CS & IT",
    courses: {
      // Bachelor programs
      "bca": "BCA",
      "bsc": "BSc",

      // Master programs
      "mca": "MCA",
      "msc": "MSc",

      // Post Graduate Diploma
      "pgd-it": "PGD IT"
    }
  },
  "design-media-arts": {
    name: "School of Design",
    courses: {
      // Bachelor programs
      "bdes": "B.Des",
      "ba": "BA",
      "bfa": "BFA",

      // Master programs
      "mdes": "M.Des",
      "ma": "MA",
      "mfa": "MFA",
      "msc-interior": "MSc Interior Design"
    }
  }
};

// Course Specializations
export const COURSE_SPECIALIZATIONS = {
  // BCA Specializations
  "bca": {
    "ai": "AI",
    "isms": "ISMS",
    "sct": "SCT",
    "cyber-security": "CS",
    "data-analytics": "DA",
    "mobile-app-dev": "MAD",
    "cloud-computing": "CC",
    "iot": "IoT",
    "blockchain": "BC",
    "machine-learning": "ML"
  },
  // BSc Specializations
  "bsc": {
    "data-science": "DS",
    "ai-ml": "AIML",
    "cyber-security": "CS",
    "cloud-computing": "CC",
    "iot": "IoT",
    "blockchain": "BC"
  },
  // MCA Specializations
  "mca": {
    "ai": "AI",
    "cyber-security": "CS",
    "cloud-computing": "CC",
    "data-analytics": "DA",
    "mobile-app-dev": "MAD",
    "blockchain": "BC"
  },
  // MSc Specializations
  "msc": {
    "computer-science": "CS",
    "data-science": "DS",
    "ai-ml": "AIML",
    "cyber-security": "CS",
    "cloud-computing": "CC"
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

export const getSpecializationsForCourse = (courseId: string) => {
  // Extract the base course type (bca, bsc, mca, msc, etc.)
  const baseCourse = courseId.split('-')[0]; // Gets 'bca' from 'bca-ai', 'bsc' from 'bsc-data-science', etc.

  const specializations = COURSE_SPECIALIZATIONS[baseCourse as keyof typeof COURSE_SPECIALIZATIONS];
  if (!specializations) return [];

  return Object.entries(specializations).map(([id, name]) => ({
    id,
    name
  }));
};