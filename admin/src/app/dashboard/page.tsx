"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import { FaChartBar, FaUsers, FaBoxes, FaClipboardList } from "react-icons/fa";

interface ClientProjectForm {
  id: number;
  client_id: number;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  status: string;
  update_by_admin: string;
  progress: number;
  details: string;
}

const Dashboard: React.FC = () => {
  const [clientProjects, setClientProjects] = useState<ClientProjectForm[]>([]); 
  const [totalSales, setTotalSales] = useState(0); 
  const [ongoingProjects, setOngoingProjects] = useState(0); 
  const [users, setUsers] = useState(0);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/client_projects/projects"
        );
        const projects: ClientProjectForm[] = await response.json();
        setClientProjects(projects);

        const total = projects
          .filter((project) => project.update_by_admin.toLowerCase() === "yes")
          .reduce((sum, project) => sum + parseFloat(project.budget), 0);
        setTotalSales(total);

        const ongoingCount = projects.filter(
          (project) => project.status.toLowerCase() === "in progress"
        ).length;
        setOngoingProjects(ongoingCount);

        const uniqueClients = new Set(projects.map((project) => project.client_id));
        setUsers(uniqueClients.size);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-white text-lg">Loading...</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      {/* Page Background */}
      <div className="bg-gradient-to-r from-[#011111] via-[#031010] to-[#011111] min-h-screen">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Total Sales Card */}
          <div className="flex items-center justify-between p-6 bg-teal-950 shadow rounded-lg">
            <div className="flex items-center">
              <div className="bg-blue-500 p-4 rounded-full text-white">
                <FaChartBar size={24} />
              </div>
              <div className="ml-4">
                <p className="text-xl font-semibold text-gray-300">Total Sales</p>
                <p className="text-2xl font-bold text-yellow-600">${totalSales}</p>
              </div>
            </div>
          </div>

          {/* Ongoing Projects Card */}
          <div className="flex items-center justify-between p-6 bg-teal-950 shadow rounded-lg">
            <div className="flex items-center">
              <div className="bg-purple-500 p-4 rounded-full text-white">
                <FaClipboardList size={24} />
              </div>
              <div className="ml-4">
                <p className="text-xl font-semibold text-gray-300">Ongoing Projects</p>
                <p className="text-2xl font-bold text-gray-200">{ongoingProjects}</p>
              </div>
            </div>
          </div>

          {/* Users Card */}
          <div className="flex items-center justify-between p-6 bg-teal-950 shadow rounded-lg">
            <div className="flex items-center">
              <div className="bg-green-500 p-4 rounded-full text-white">
                <FaUsers size={24} />
              </div>
              <div className="ml-4">
                <p className="text-xl font-semibold text-gray-300">Users</p>
                <p className="text-2xl font-bold text-gray-200">{users}</p>
              </div>
            </div>
          </div>

          {/* Products Card */}
          <div className="flex items-center justify-between p-6 bg-teal-950 shadow rounded-lg">
            <div className="flex items-center">
              <div className="bg-yellow-500 p-4 rounded-full text-white">
                <FaBoxes size={24} />
              </div>
              <div className="ml-4">
                <p className="text-xl font-semibold text-gray-300">Products</p>
                <p className="text-2xl font-bold text-gray-200">50</p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Overview */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-teal-300">Projects Overview</h2>
          <div className="mt-4 bg-teal-950 shadow rounded-lg p-6">
            {clientProjects.length > 0 ? (
              clientProjects.map((project) => (
                <div key={project.id} className="flex justify-between items-center mb-4">
                  <p className="font-semibold text-gray-200">{project.title}</p>
                  <p className="text-sm text-gray-400">{project.status}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No projects available.</p>
            )}
          </div>
        </div>

        {/* Financial Overview */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-teal-300 ">Financial Overview</h2>
          <div className="mt-4 bg-teal-950 shadow rounded-lg p-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-200 font-semibold">Total Revenue</p>
              <p className="text-lg font-bold text-yellow-600">${totalSales}</p>
            </div>
          </div>
        </div>

        {/* Latest Orders */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-teal-300">Latest Orders</h2>
          <div className="mt-4 bg-teal-950 shadow rounded-lg p-6">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b border-stroke">
                  <th className="py-2 text-left text-sm text-white font-semibold">Order ID</th>
                  <th className="py-2 text-left text-sm text-white font-semibold">Customer ID</th>
                  <th className="py-2 text-left text-sm text-white font-semibold">Title</th>
                  <th className="py-2 text-left text-sm text-white font-semibold">Budget</th>
                  <th className="py-2 text-left text-sm text-white font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {clientProjects.length > 0 ? (
                  clientProjects.map((project) => (
                    <tr key={project.id} className="border-b border-stroke">
                      <td className="py-2 text-sm text-gray-400">{project.id}</td>
                      <td className="py-2 text-sm text-gray-400">{project.client_id}</td>
                      <td className="py-2 text-sm text-gray-400">{project.title}</td>
                      <td className="py-2 text-sm text-yellow-600">${project.budget}</td>
                      <td className="py-2 text-sm text-gray-400">{project.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400">No orders available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
