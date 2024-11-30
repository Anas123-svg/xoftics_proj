"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import PhotosUploader from "@/components/Uploader"; 
import { PaperClipIcon } from '@heroicons/react/20/solid'; 
import DefaultLayout from "../../components/Layouts/DefaultLayout";

type Props = {
  onSubmit: (payload: {
    title: string;
    description: string;
    content: string;
    images: string[];
  }) => void;
};

const AddBlogForm: React.FC<Props> = ({ onSubmit }) => {
  const router = useRouter(); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      title,
      description,
      content,
      images
    };
  
    try {
      const response = await fetch("http://localhost:8000/blogs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Blog added successfully!");
        
        setTitle("");
        setDescription("");
        setContent("");
        setImages([]);
        router.push('/addBlog'); 
      } else {
        alert(`Error: ${result.detail || "Failed to add blog"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while adding the blog.");
    }
  };
  

  return (
    <DefaultLayout>
      <div
        className="relative flex justify-center items-center min-h-screen w-full p-4 mt-16 mb-10 "
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
            Add New Blog
          </h2>
          <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog Title"
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
            <div className="p-2">
              <label className="text-gray-300">Images</label>
              <PhotosUploader 
                onChange={(images) => setImages(images)}
                maxPhotos={5}
                addedPhotos={images}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#38E5E8] text-gray-900 font-bold rounded-lg hover:bg-[#2ACBCC] transition duration-300 flex items-center justify-center space-x-2"
            >
              <PaperClipIcon className="h-5 w-5" />
              <span>Submit</span>
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddBlogForm;
