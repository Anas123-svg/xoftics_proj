"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";

const AdminEditProfile: React.FC = () => {
  const [adminDetails, setAdminDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
  });

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
          setFormData({
            name: result.name,
            email: result.email,
            phone: result.phone,
            address: result.address,
            role: result.role,
          });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("You are not logged in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/admins/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Profile updated successfully");
        setIsEditing(false);
        setAdminDetails(formData);
      } else {
        alert(result.message || "Failed to update profile");
      }
    } catch (error) {
      alert("An error occurred while updating the profile");
    }
  };

  if (loading) return <p className="text-center text-primary">Loading...</p>;

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-teal-900 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
        {adminDetails ? (
          <div>
            <h2 className="text-3xl font-semibold text-center mb-6">Edit Your Profile</h2>
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
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-teal-800 text-teal-200 rounded-lg"
                      />
                    ) : (
                      <span className="text-teal-200">{adminDetails.name}</span>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 font-medium text-gray-300">Email</td>
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-teal-800 text-teal-200 rounded-lg"
                      />
                    ) : (
                      <span className="text-teal-200">{adminDetails.email}</span>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 font-medium text-gray-300">Phone</td>
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-teal-800 text-teal-200 rounded-lg"
                      />
                    ) : (
                      <span className="text-teal-200">{adminDetails.phone}</span>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 font-medium text-gray-300">Address</td>
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-teal-800 text-teal-200 rounded-lg"
                      />
                    ) : (
                      <span className="text-teal-200">{adminDetails.address}</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-300">Role</td>
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-teal-800 text-teal-200 rounded-lg"
                      />
                    ) : (
                      <span className="text-teal-200">{adminDetails.role}</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 text-center">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-500"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-500"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-xl text-gray-500">No admin details found</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default AdminEditProfile;
