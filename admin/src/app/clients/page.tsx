"use client"
import React, { useEffect, useState } from 'react';
import DefaultLayout from "../../components/Layouts/DefaultLayout";

interface Client {
  id: number;
  name: string;
  email: string;
  company_name: string | null;
  phone: string;
  address: string | null;
}

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    fetch('http://localhost:8000/clients/') 
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching client data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DefaultLayout>
    <div className="text-white">
      <h1 className="flex justify-center font-bold text-2xl">CLIENTS</h1><br></br>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr className="bg-teal-950">
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Company Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Address</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="bg-teal-900">
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {client.company_name || 'N/A'}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.phone}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {client.address || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </DefaultLayout>
  );
};

export default Clients;
