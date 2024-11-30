"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GridPattern } from "../../../components/ui/animated-grid-pattern";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8000/admins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid credentials");
      }

      window.location.href = "/dashboard";
    } catch (error: any) {
      if (error.message === "Invalid credentials") {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        setErrorMessage("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen w-full p-4 mt-16 mb-10 "
      style={{ background: "linear-gradient(90deg, #011111, #031010, #011111)" }}
    >
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

      <div
        className="w-full sm:w-[31%] max-w-sm h-auto bg-white flex flex-col items-center 
        bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg transform transition duration-200 hover:scale-105 cursor-pointer"
        style={{
          boxShadow: "0 0 2px 2px rgba(56, 229, 232, 0.7), 0 0 10px 10px rgba(56, 229, 232, 0.4)",
        }}
      >
        <div
          className="left-4 top-8"
          style={{ width: "150px", height: "auto" }}
        >
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="w-full h-auto"
          />
        </div><br/>
        <h2 className="text-[#38E5E8] text-3xl font-bold tracking-wide uppercase mb-4">
          Sign In
        </h2>
        <p className="text-[#8CA8B3] text-base font-medium mb-6 text-center">
          Sign in to your account.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiMail className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
            />
          </div>

          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiLock className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
            />
          </div>

          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#38E5E8] text-gray-900 font-bold rounded-lg hover:bg-[#2ACBCC] transition duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-sm text-[#8CA8B3]">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-[#38E5E8] cursor-pointer hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
