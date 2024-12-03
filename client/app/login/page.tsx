"use client";
import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { GridPattern } from "../../components/ui/animated-grid-pattern";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect to signup page
  const handleSignUp = () => {
    router.push("/signup");
  };

  // Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent form submission from reloading the page

    // Perform login API call
    try {
      const response = await fetch("http://localhost:8000/clients/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),  // Send the email and password as JSON
      });

      const data = await response.json();

      if (response.ok) {
        // On successful login, store the access token and redirect
        localStorage.setItem("access_token", data.access_token);
        console.log("Login successful", data);
        router.push("/clientportal/Dashboard");  // Redirect to Dashboard
      } else {
        // Handle errors, such as invalid credentials
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");  // General error message
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen w-full p-4 mt-16 mb-10"
      style={{ background: "linear-gradient(90deg, #011111, #031010, #011111)" }}
    >
      {/* Animated Grid Background */}
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

      {/* Login Form */}
      <div
        className="w-full sm:w-[31%] max-w-sm h-auto bg-white flex flex-col items-center 
          bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg 
          transform transition duration-300 hover:scale-105 cursor-pointer"
        style={{
          boxShadow: "0 0 2px 2px rgba(56, 229, 232, 0.7), 0 0 10px 10px rgba(56, 229, 232, 0.4)",
          animation: "pulse 1s infinite",
        }}
      >
        {/* Heading */}
        <h2 className="text-[#38E5E8] text-3xl font-bold tracking-wide uppercase mb-4">
          Login
        </h2>
        <p className="text-[#8CA8B3] text-base font-medium mb-6 text-center">
          Enter your credentials to access your account.
        </p>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm mb-4">{error}</div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiMail className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#38E5E8]">
            <FiLock className="text-xl text-[#38E5E8] mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-[#8CA8B3] outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#38E5E8] text-gray-900 font-bold rounded-lg hover:bg-[#2ACBCC] transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-sm text-[#8CA8B3]">
          Don’t have an account?{" "}
          <span
            className="text-[#38E5E8] cursor-pointer hover:underline"
            onClick={handleSignUp}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;

