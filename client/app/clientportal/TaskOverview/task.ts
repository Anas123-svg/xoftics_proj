// task.ts

export interface Task {
    id: number;
    name: string;
    status: string;
    dueDate: string;
    // Add more fields as needed for tasks
  }
  
  // Example tasks
  export const exampleTasks: Task[] = [
    {
      id: 1,
      name: "Project Setup",
      status: "In Progress",
      dueDate: "2024-11-25",
    },
    {
      id: 2,
      name: "UI Design",
      status: "Completed",
      dueDate: "2024-11-15",
    },
    {
      id: 3,
      name: "Backend API Development",
      status: "Not Started",
      dueDate: "2024-12-05",
    },
    {
      id: 4,
      name: "Testing & QA",
      status: "In Progress",
      dueDate: "2024-11-30",
    },
  ];
  