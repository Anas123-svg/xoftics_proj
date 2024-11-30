"use client";
import React, { useState } from "react";
import { FiMail, FiLock, FiPhone } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GridPattern } from "../../../components/ui/animated-grid-pattern";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "admin"
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      password: formData.password,
      role: formData.role
    };

    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/admins/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", result.access_token);
        alert("Registration successful!");
        router.push("/auth/signin");
      } else {
        alert(result.message || "Registration failed");
      }
    } catch (error) {
      alert("An error occurred while registering");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen w-full p-4 mt-16 mb-10"
      style={{ background: 'linear-gradient(90deg, #011111, #031010, #011111)' }}>
      
      <GridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={20}
          repeatDelay={1}
          className={cn(
            "absolute inset-0 w-full h-[120vh] z-0", 
            "skew-y-0", 
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          )}
        />

      <div className="w-full sm:w-[31%] max-w-sm h-auto bg-white flex flex-col items-center 
        bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg 
        transform transition duration-200 hover:scale-105 cursor-pointer"
        style={{
          boxShadow: '0 0 2px 2px rgba(56, 229, 232, 0.7), 0 0 10px 10px rgba(56, 229, 232, 0.4)',
        }}>
        
        <div className="left-4 top-8" style={{ width: "150px", height: "auto" }}>
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="w-full h-auto"
          />
        </div><br />
        
        <h2 className="text-[#38E5E8] text-3xl font-bold tracking-wide uppercase mb-4">
          Sign Up
        </h2>
        
        <p className="text-[#8CA8B3] text-base font-medium mb-6 text-center">
          Create an account to get started.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiMail className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
              required
            />
          </div>

          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiPhone className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
              required
            />
          </div>

          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiLock className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
              required
            />
          </div>

          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiLock className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
              required
            />
          </div>

          <div className="mb-4 rounded-lg bg-gray-800 border border-gray-600">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg bg-transparent  bg-opacity-10 backdrop-blur-lg px-3 py-2 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="admin" className="bg-black">Admin</option>
              <option value="manager" className="bg-black">Manager</option>
              <option value="moderator" className="bg-black">Moderator</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#38E5E8] text-gray-900 font-bold rounded-lg hover:bg-[#2ACBCC] transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-sm text-[#8CA8B3]">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-[#38E5E8] cursor-pointer hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
