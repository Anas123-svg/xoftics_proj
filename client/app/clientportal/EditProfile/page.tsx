"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Sidebar from "../Sidebar/page";

type FormDataType = {
  id: number;
  name: string;
  email: string;
  companyName: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
};

const EditProfile = () => {
  const [formData, setFormData] = useState<FormDataType>({
    id: 0,
    name: "",
    email: "",
    companyName: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [editableField, setEditableField] = useState<string | null>(null);
  const [originalValues, setOriginalValues] = useState<FormDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("You are not logged in.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/clients/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();

        setFormData({
          id: data.id,
          name: data.name,
          email: data.email,
          companyName: data.company_name,
          phone: data.phone,
          address: data.address,
          password: "********",
          confirmPassword: "********",
        });

        setOriginalValues({
          id: data.id,
          name: data.name,
          email: data.email,
          companyName: data.company_name,
          phone: data.phone,
          address: data.address,
          password: "********",
          confirmPassword: "********",
        });

        setIsLoading(false);
      } catch (error: any) {
        setError("Failed to fetch user data.");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name in formData) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const toggleEditField = (field: string) => {
    if (editableField === field) {
      setEditableField(null);
    } else {
      setEditableField(field);
    }
  };

  const saveField = async (field: string) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("You are not logged in.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/clients/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company_name: formData.companyName,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert(`${field} updated successfully!`);
      setEditableField(null);
    } catch (error: any) {
      setError("Failed to update profile.");
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editableField) {
      saveField(editableField);
    }
  };

  const handleReset = (field: string) => {
    if (originalValues) {
      setFormData((prev) => ({
        ...prev,
        [field]: originalValues[field as keyof FormDataType],
      }));
      setEditableField(null);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="bg-teal-800/10 text-white p-4 h-20"></div>

      <div className="mt-8 min-h-screen flex items-center justify-center">
        <div className="w-full sm:w-[31%] h-auto bg-white flex flex-col items-center bg-opacity-10 backdrop-blur-lg p-5 rounded-lg shadow-md transform transition duration-300 hover:scale-105 cursor-pointer">
          <h1 className="text-3xl font-bold text-teal-200 mb-4">Edit Profile</h1>
          <form onSubmit={handleSave} className="flex flex-col w-full space-y-4">
            {Object.entries(formData).map(([key, value]) => {
              if (key === "id") return null;
              return (
                <div className="flex justify-between items-center" key={key}>
                  <div className="flex-1">
                    <label className="block text-lg font-medium text-teal-500">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <div className="flex items-center justify-between">
                      {editableField === key ? (
                        <input
                          type={key.includes("password") ? "password" : "text"}
                          name={key}
                          value={value}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-4 py-2 text-lg border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        />
                      ) : (
                        <p className="text-gray-500 text-lg">{value}</p>
                      )}
                      {editableField === key ? (
                        <>
                          <FaSave
                            size={24}
                            onClick={() => saveField(key)}
                            className="cursor-pointer text-green-500 ml-2"
                          />
                          <FaTimes
                            size={24}
                            onClick={() => handleReset(key)}
                            className="cursor-pointer text-red-500 ml-2"
                          />
                        </>
                      ) : (
                        <FaEdit
                          className="cursor-pointer text-teal-400 ml-2 text-xl"
                          onClick={() => toggleEditField(key)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
