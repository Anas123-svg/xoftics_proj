"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";

const AdminProfile: React.FC = () => {
  const [adminDetails, setAdminDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("You are not logged in.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/admins/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setAdminDetails(result);
        } else {
          alert(result.message || "Failed to fetch admin details");
        }
      } catch (error) {
        alert("An error occurred while fetching admin details");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  if (loading) return <p className="text-center text-primary">Loading...</p>;

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-teal-900 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
        {adminDetails ? (
          <div>
            <h2 className="text-3xl font-semibold text-center mb-6">Admin Profile</h2>
            <table className="min-w-full table-auto border-collapse text-white text-center">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-4 text-lg font-medium">Field</th>
                  <th className="px-6 py-4 text-lg font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 font-medium text-gray-300">Name</td>
                  <td className="px-6 py-4 text-teal-200">{adminDetails.name}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 font-medium text-gray-300">Email</td>
                  <td className="px-6 py-4 text-teal-200">{adminDetails.email}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 font-medium text-gray-300">Phone</td>
                  <td className="px-6 py-4 text-teal-200">{adminDetails.phone}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 font-medium text-gray-300">Address</td>
                  <td className="px-6 py-4 text-teal-200">{adminDetails.address}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-300">Role</td>
                  <td className="px-6 py-4 text-teal-200">{adminDetails.role}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-xl text-gray-500">No admin details found</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default AdminProfile;
