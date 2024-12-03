// projects.ts

// Define the Project type interface
export interface Project {
  id: string | number;       // Unique identifier for the project (can be a string or number)
  name: string;              // Name of the project (e.g., "Website Redesign")
  status: string;            // Current status of the project (e.g., "In Progress", "Completed")
  progress: number;          // Progress of the project as a percentage (0 to 100)
  budget: number;            // The total budget allocated for the project
  deadline: string;          // Deadline of the project in "YYYY-MM-DD" format
  tasksCompleted: number;    // Number of tasks that have been completed for this project
  totalTasks: number;        // Total number of tasks in the project (including completed and pending)
}

// Example project data for testing purposes
export const exampleProjects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    progress: 60,            // 60% progress based on task completion
    budget: 15000,           // Total budget of $15,000
    deadline: "2024-12-15",  // Deadline is December 15, 2024
    tasksCompleted: 12,      // 12 tasks have been completed out of 20
    totalTasks: 20,          // The project has a total of 20 tasks
  },
  {
    id: 2,
    name: "Mobile App Development",
    status: "Completed",
    progress: 100,           // Project is fully completed
    budget: 50000,           // Total budget of $50,000
    deadline: "2024-10-30",  // Deadline was October 30, 2024
    tasksCompleted: 25,      // All 25 tasks have been completed
    totalTasks: 25,          // The project had 25 tasks
  },
  {
    id: 3,
    name: "Marketing Campaign",
    status: "Not Started",
    progress: 0,             // No tasks have been started yet (0% progress)
    budget: 10000,           // Total budget of $10,000
    deadline: "2025-01-10",  // Deadline is January 10, 2025
    tasksCompleted: 0,       // No tasks have been completed
    totalTasks: 10,          // The project has 10 tasks in total
  },
  {
    id: 4,
    name: "Cloud Migration",
    status: "In Progress",
    progress: 45,            // 45% progress (calculated from task completion)
    budget: 30000,           // Budget of $30,000
    deadline: "2024-11-30",  // Deadline was November 30, 2024
    tasksCompleted: 9,       // 9 tasks completed out of 20
    totalTasks: 20,          // The project has 20 tasks
  },
  {
    id: 5,
    name: "Cybersecurity Audit",
    status: "On Hold",
    progress: 20,            // 20% progress (based on task completion)
    budget: 12000,           // Total budget of $12,000
    deadline: "2025-02-20",  // Deadline is February 20, 2025
    tasksCompleted: 2,       // 2 tasks have been completed out of 10
    totalTasks: 10,          // The project has 10 tasks
  },
];

