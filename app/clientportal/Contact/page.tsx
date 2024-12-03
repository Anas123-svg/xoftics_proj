"use client";
import React, { useState } from "react";

const ContactSupport = () => {
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit the message (e.g., API call)
    console.log("Support message submitted:", message);
    alert("Your message has been sent. Our team will contact you soon.");
    setMessage(""); // Clear the form
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
         <div className="h-20 bg-teal-950 shadow-md fixed top-0 w-full flex items-center px-10">

</div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Contact Support</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Message</label>
            <textarea
              name="message"
              value={message}
              onChange={handleInputChange}
              rows={5}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSupport;
