"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PhotosUploader from "@/components/Uploader";
import { PlusIcon } from "@heroicons/react/20/solid";
import DefaultLayout from "../../components/Layouts/DefaultLayout";

const AddProjectForm: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [clientReview, setClientReview] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTechnology, setNewTechnology] = useState("");

  const handleAddTechnology = () => {
    if (newTechnology) {
      setTechnologies([...technologies, newTechnology]);
      setNewTechnology("");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      content,
      client_review: clientReview,
      site_url: siteUrl,
      images,
      technologies,
    };

    try {
      const response = await fetch("http://localhost:8000/portfolio_projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Project added successfully!");
        setTitle("");
        setDescription("");
        setContent("");
        setClientReview("");
        setSiteUrl("");
        setImages([]);
        setTechnologies([]);
        router.push("/addProject");
      } else {
        alert(`Error: ${result.detail || "Failed to add project"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while adding the project.");
    }
  };

  return (
    <DefaultLayout>
      <div
        className="relative flex justify-center items-center min-h-screen w-full p-4 mt-16 mb-10 dark:bg-boxdark-2"
        style={{ background: "linear-gradient(90deg, #011111, #031010, #011111)" }}
      >
          <div
            className="w-[90vw] sm:w-[50%] max-w-6xl h-auto bg-white flex flex-col items-center
            bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg transform transition duration-200
            hover:scale-105 cursor-pointer"
            style={{
              boxShadow: "0 0 2px 2px rgba(56, 229, 232, 0.7), 0 0 10px 10px rgba(56, 229, 232, 0.4)",
            }}
          >

          <h2 className="text-[#38E5E8] text-3xl font-bold tracking-wide uppercase mb-6">
            Add New Project
          </h2>
          <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project Title"
              className="w-full bg-gray-800 text-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#38E5E8]"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full bg-gray-800 text-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#38E5E8]"
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              className="w-full bg-gray-800 text-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#38E5E8]"
              required
            />
            <textarea
              value={clientReview}
              onChange={(e) => setClientReview(e.target.value)}
              placeholder="Client Review"
              className="w-full bg-gray-800 text-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#38E5E8]"
              required
            />
            <input
              type="url"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              placeholder="Project URL"
              className="w-full bg-gray-800 text-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#38E5E8]"
              required
            />
            <div className="p-2">
            <label className="text-gray-300">Image</label>
            <PhotosUploader
              onChange={(images) => setImages(images)}
              maxPhotos={5}
              addedPhotos={images}
            />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="Add a Technology"
                className="flex-1 bg-gray-800 text-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#38E5E8]"
              />
              <button
                type="button"
                onClick={handleAddTechnology}
                className="bg-[#38E5E8] text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-[#2ACBCC] transition duration-300"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            <ul className="text-white mt-4 list-disc pl-6 space-y-2">
              {technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
            <button
              type="submit"
              className="w-full py-3 bg-[#38E5E8] text-gray-900 font-bold rounded-lg hover:bg-[#2ACBCC] transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddProjectForm;
