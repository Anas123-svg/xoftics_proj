"use client";
import React, { useState } from "react";
import { FiMail, FiLock, FiUser, FiHome, FiPhone } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { GridPattern } from "../../components/ui/animated-grid-pattern"

interface FormData {
  name: string;
  email: string;
  companyName: string;
  location: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
}

function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    companyName: "",
    location: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const router = useRouter();

  const validateInputs = () => {
    if (!formData.email.includes("@")) {
      alert("Invalid email format.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
    if (isNaN(Number(formData.phone)) || formData.phone.length < 10) {
      alert("Invalid phone number.");
      return false;
    }
    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const payload = {
      name: formData.name,
      email: formData.email,
      company_name: formData.companyName,
      phone: formData.phone,
      address: formData.address,
      password: formData.password,
    };
    
  
    try {
      const response = await fetch("http://localhost:8000/clients/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("User registered successfully!");
        router.push("/login");
      } else {
        console.error(result);
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again later.");
    }
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <div
      className="flex justify-center items-center min-h-screen w-full p-4 mt-20 mb-10"
      style={{ background: 'linear-gradient(90deg, #011111, #031010, #011111)' }}
    >
       <GridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={20}
          repeatDelay={1}
          className={cn(
            "absolute inset-0 w-full h-[120vh] z-0 mt-20", 
            "skew-y-0", 
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          )}
        />

      <div
        className="w-full sm:w-[31%] max-w-sm h-auto bg-white flex flex-col items-center 
        bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg 
        transform transition duration-300 hover:scale-105 cursor-pointer"
        style={{
          boxShadow: '0 0 2px 2px rgba(56, 229, 232, 0.7), 0 0 10px 10px rgba(56, 229, 232, 0.4)',
          animation: 'pulse 1s infinite'
        }}
      >
        <h2 className="text-[#38E5E8] text-3xl font-bold tracking-wide uppercase mb-4">
          Sign Up
        </h2>
        <p className="text-[#8CA8B3] text-base font-medium mb-6 text-center">
          Enter your details to create an account.
        </p>

        <form
          className="w-full flex flex-col gap-4"
          onSubmit={handleSignUp}
        >
          {/* Name Input */}
          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiUser className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiMail className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
              required
            />
          </div>

          {/* Company Name Input */}
          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiUser className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
              required
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiHome className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
              required
            />
          </div>

          {/* Phone Input */}
          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiPhone className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
              required
            />
          </div>

          {/* Address Input */}
          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiHome className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
              required
            />
          </div>

          {/* Profile Image Input */}
          {/* <div className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <label
              htmlFor="profileImage"
              className="flex items-center cursor-pointer text-white font-medium"
            >
              <FiImage className="text-xl text-[#38E5E8] mr-2" />
              <span className="text-[#8CA8B3]">Upload Profile Image</span>
            </label>
            <input
              type="file"
              id="profileImage"
              onChange={handleImageChange}
              className="hidden"
            />
          </div> */}

          {/* Password Input */}
          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiLock className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiLock className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#38E5E8] text-white text-lg py-2 rounded-lg mt-6"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
