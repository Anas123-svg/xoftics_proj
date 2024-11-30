"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import SingleBlogCard from "./blog";
import { useRouter } from "next/navigation";

type Blog = {
  id: string;         
  title: string;      
  images: string[];      
  description: string;
};

const Blogs = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState<Blog[]>([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8000/blogs/"); 
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Blogs:", data);
          setBlogData(data); 
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleCardClick = (id: string) => {
    router.push(`/blogs/${id}`);
  };

  return (
    <div className="container mx-auto py-12 px-4 my-20" id="services">
      <motion.div
        initial={{ opacity: 0, y: -65 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="flex flex-col justify-center items-center gap-3"
      >
        <div className="text-primary active relative">
          Read Our Articles <BorderBeam size={70} duration={20} />
        </div>
        <h2 className="heading-2 text-white text-center mb-8 font-medium">
          Latest Blogs
        </h2>
      </motion.div>
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <div className="flex flex-row flex-wrap gap-10 justify-center items-center">
          {blogData.map((blog) => (
            <SingleBlogCard
              key={blog.id}
              title={blog.title}
              description={blog.description}
              image={blog.images?.[0]}
              onClick={() => handleCardClick(blog.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
