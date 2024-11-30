// invoice.ts

// Define the Invoice interface
export interface Invoice {
    id: number;
    amount: number;
    status: 'Paid' | 'Pending' | 'Overdue'; // Define possible statuses for the invoice
    dueDate: string; // Due date in string format (e.g., '2024-12-31')
  }
  
  // Example invoice data
  export const exampleInvoices: Invoice[] = [
    {
      id: 1,
      amount: 1500,
      status: 'Pending',
      dueDate: '2024-12-15',
    },
    {
      id: 2,
      amount: 2450,
      status: 'Paid',
      dueDate: '2024-11-05',
    },
    {
      id: 3,
      amount: 3000,
      status: 'Overdue',
      dueDate: '2024-10-30',
    },
    {
      id: 4,
      amount: 1200,
      status: 'Pending',
      dueDate: '2024-12-20',
    },
  ];
  