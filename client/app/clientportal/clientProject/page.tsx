"use client";
import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/page";
import { useRouter } from "next/navigation";

// Define the interface for the form data structure
interface ClientProjectForm {
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: string;
  update_by_admin: string;
  progress: number;
  details: string;
}

const ClientProjects: React.FC = () => {
  // State to handle form data
  const [formData, setFormData] = useState<ClientProjectForm>({
    title: "",
    description: "",
    budget: 0,
    deadline: "",
    status: "",
    update_by_admin: "No",
    progress: 0,
    details: "",
  });

  // States to manage error and success messages
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); 

  // Hook for navigation
  const router = useRouter();  

  // Handle input changes for text and number fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox changes (update_by_admin)
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      update_by_admin: checked ? "Yes" : "No",
    }));
  };

  // Handle form submission and make an API request
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("No authentication token found.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/client_projects/create",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Response:", response);
      alert("Client project created successfully!");
      setFormData({
        title: "",
        description: "",
        budget: 0,
        deadline: "",
        status: "",
        update_by_admin: "No",
        progress: 0,
        details: "",
      });

      // Redirect to /clientportal/CreateProject upon success
      router.push("/clientportal/CreateProject");

    } catch (err) {
      console.error("Error submitting project:", err);
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error response:", err.response.data);
      }
      setError("Error creating client project. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen w-full p-4 mt-20 mb-10"
      style={{ background: "linear-gradient(90deg, #011111, #031010, #011111)" }}
    >
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="flex-1 ml-64 flex justify-center items-center"
        style={{
          background: "linear-gradient(90deg, #011111, #031010, #011111)",
        }}
      >
        {/* Form Card */}
        <div
          className="w-[90vw] sm:w-[50%] max-w-6xl bg-white flex flex-col items-center bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg transform transition duration-200 hover:scale-105 cursor-pointer"
          style={{
            boxShadow: "0 0 2px 2px rgba(56, 229, 232, 0.7), 0 0 10px 10px rgba(56, 229, 232, 0.4)",
          }}
        >
          <h1 className="text-3xl font-bold tracking-wide uppercase mb-6 text-[#38E5E8]">Add Client Project</h1>
          
          {/* Form for adding project */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            {/* Project Title */}
            <div className="w-full">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Project Title"
                className="w-full bg-gray-800 text-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#38E5E8]"
                required
              />
            </div>

            {/* Budget */}
            <div className="w-full">
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Project Budget"
                className="w-full bg-gray-800 text-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#38E5E8]"
                required
              />
            </div>

            {/* Description */}
            <div className="w-full">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Project Description"
                className="w-full bg-gray-800 text-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#38E5E8]"
                required
              />
            </div>

            {/* Details */}
            <div className="w-full">
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="Project Details"
                className="w-full bg-gray-800 text-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#38E5E8]"
                required
              />
            </div>

            {/* Deadline */}
            <div className="w-full">
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#38E5E8]"
                required
              />
            </div>

            {/* Status */}
            <div className="w-full">
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#38E5E8]"
                required
              >
                <option value="">Select Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* Project Progress */}
            <div className="w-full">
              <input
                type="number"
                name="progress"
                value={formData.progress}
                onChange={handleInputChange}
                placeholder="Project Progress (%)"
                className="w-full bg-gray-800 text-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#38E5E8]"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#38E5E8] text-gray-900 font-bold rounded-lg hover:bg-[#2ACBCC] transition duration-300"
            >
              Submit
            </button>
          </form>

          {/* Display error message if any */}
          {error && <div className="text-red-500 mt-4">{error}</div>}

          {/* Display success message if any */}
          {success && <div className="text-green-500 mt-4">{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default ClientProjects;

