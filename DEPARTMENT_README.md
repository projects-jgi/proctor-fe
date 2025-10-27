# Proctor FE - Department Side

This is the department/admin interface for the Proctor FE application, built with Next.js and Shadcn UI components.

## Features

### Dashboard (`/department/dashboard`)
- Overview of key metrics: total exams, active students, pending results, pass rate
- Quick access to exam management, student management, and results

### Exam Management (`/department/exams`)
- View all exams with status (active, upcoming, completed)
- Create new exams
- Edit and delete existing exams
- Search and filter exams

### Student Management (`/department/students`)
- View student list with details (name, email, course, exams taken, average score)
- Add new students
- Search students

### Results (`/department/results`)
- View exam results for all students
- Export results
- Analytics and charts (placeholder for future implementation)

## Components

### Containers
- `DepartmentExams`: Displays exam cards with actions
- `DepartmentStudents`: Student table with management options
- `DepartmentResults`: Results table with export functionality

### UI Components
- Uses Shadcn UI components: Button, Card, Table, Badge, Input
- Icons from Lucide React

## Routes

- `/department/dashboard` - Main dashboard
- `/department/exams` - Exam management
- `/department/students` - Student management
- `/department/results` - Results view

## Getting Started

1. Ensure you have the required dependencies installed (Shadcn UI, Lucide React)
2. Navigate to the department routes in your browser
3. Use the interface to manage exams, students, and view results

## Data

Currently uses static mock data. In a real application, this would connect to a backend API for:
- Fetching exam data
- Managing students
- Retrieving results
- Creating/updating exams

## Future Enhancements

- Real-time updates
- Advanced filtering and search
- Analytics dashboard with charts
- Bulk operations
- Notifications system
- Integration with student portal