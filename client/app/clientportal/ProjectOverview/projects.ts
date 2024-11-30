// projects.ts

// Define the Project type
export interface Project {
  id: string | number; // Unique identifier for the project
  name: string;        // Name of the project
  status: string;      // Status of the project (e.g., "In Progress", "Completed")
  progress: number;    // Progress percentage (0-100)
  budget: number;      // Budget of the project
  deadline: string;    // Deadline of the project (e.g., in "YYYY-MM-DD" format)
  tasksCompleted: number; // Number of completed tasks
  totalTasks: number;     // Total number of tasks in the project
}

// Example projects for testing
export const exampleProjects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    progress: 60,
    budget: 15000,
    deadline: "2024-12-15",
    tasksCompleted: 12,
    totalTasks: 20,
  },
  {
    id: 2,
    name: "Mobile App Development",
    status: "Completed",
    progress: 100,
    budget: 50000,
    deadline: "2024-10-30",
    tasksCompleted: 25,
    totalTasks: 25,
  },
  {
    id: 3,
    name: "Marketing Campaign",
    status: "Not Started",
    progress: 0,
    budget: 10000,
    deadline: "2025-01-10",
    tasksCompleted: 0,
    totalTasks: 10,
  },
  {
    id: 4,
    name: "Cloud Migration",
    status: "In Progress",
    progress: 45,
    budget: 30000,
    deadline: "2024-11-30",
    tasksCompleted: 9,
    totalTasks: 20,
  },
  {
    id: 5,
    name: "Cybersecurity Audit",
    status: "On Hold",
    progress: 20,
    budget: 12000,
    deadline: "2025-02-20",
    tasksCompleted: 2,
    totalTasks: 10,
  },
];
