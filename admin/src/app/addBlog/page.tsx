"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import BlogList from "./BlogList"; 
import { useRouter } from 'next/navigation';
import deleteBlog from "./deleteBlog"; 
import updateBlog from "./updateBlog"; 

const CreateBlog: React.FC = () => {
  const [blogsList, setBlogsList] = useState<any[]>([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8000/blogs/");
        const data = await response.json();
        console.log(data);
        setBlogsList(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleUpdateBlog = async (id: number, updatedData: any) => {
    console.log("Updating blog:", id, updatedData);
    const result = await updateBlog(id, updatedData);
    console.log("Update result:", result);
    if (result.success) {
      alert("Blog updated successfully!");
      setBlogsList((prevList) =>
        prevList.map((blog) =>
          blog.id === id ? { ...blog, ...updatedData } : blog
        )
      );
    } else {
      alert(result.error);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    console.log("Deleting blog:", id);
    const result = await deleteBlog(id);
    console.log("Delete result:", result);
    if (result.success) {
      alert("Blog deleted successfully!");
      setBlogsList((prevList) =>
        prevList.filter((blog) => blog.id !== id)
      );
    } else {
      alert(result.error);
    }
  };

  const handleAddBlog = () => {
    router.push('/blog'); 
  };

  return (
    <DefaultLayout>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="container mx-auto p-4 mt-10 dark:bg-boxdark-2"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl text-white font-bold">Blogs</h1>
          <button
            className="bg-green-500 text-white p-2 rounded-full flex items-center justify-center"
            onClick={handleAddBlog} 
          >
            <FaPlus size={20} />
          </button>
        </div>

        <BlogList
          blogs={blogsList}
          onUpdate={handleUpdateBlog}
          onDelete={handleDeleteBlog}
        />
      </motion.div>
    </DefaultLayout>
  );
};

export default CreateBlog;
