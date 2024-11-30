import React from "react";
import { Invoice } from "./invoice";

interface InvoiceOverviewProps {
  filteredInvoices: Invoice[];
  downloadReport: (type: string) => void;
}

const InvoiceOverview: React.FC<InvoiceOverviewProps> = ({ filteredInvoices, downloadReport }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-300 mb-4 m-10">Invoices Overview</h2>
      <div className="grid grid-cols-3 gap-6 m-10">
        {filteredInvoices.map((invoice) => (
          <div key={invoice.id} className="bg-teal-900 p-4 rounded-md shadow-lg">
            <h3 className="text-xl font-semibold">Invoice #{invoice.id}</h3>
            <p>Amount: ${invoice.amount}</p>
            <p>Status: {invoice.status}</p>
            <p>Due Date: {invoice.dueDate}</p><br></br>
            <div className="flex justify-between">
              <button onClick={() => alert('Pay Invoice')} className="mr-4 p-3 bg-teal-700 text-white rounded-md">Pay Now</button>
              <button onClick={() => downloadReport('invoice')} className="mr-4 p-2 bg-teal-700 text-white rounded-md">Download PDF</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceOverview;
