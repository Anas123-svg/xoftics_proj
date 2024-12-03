"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/ui/border-beam";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const BlogDetail = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch(`http://localhost:8000/blogs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Blog not found or failed to load.");
        }
        return response.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleNextImage = () => {
    if (blog.images && blog.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === blog.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (blog.images && blog.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? blog.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) return <div className="text-center text-white py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="container py-12 px-4 my-20 w-full">
      <div className="bg-black bg-opacity-50 backdrop-blur-lg border-1 border-primary box_shadow p-6 py-16 rounded-3xl shadow-md w-full relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -65 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="flex flex-col justify-center items-center gap-3 mb-12"
        >
          <GridPattern
            numSquares={40}
            maxOpacity={0.05}
            duration={20}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
              "absolute inset-0 z-0"
            )}
          />

          <div className="text-primary relative mb-8">
            <h1 className="text-4xl font-extrabold text-white text-center p-5">{blog.title.toUpperCase()}</h1>
            <BorderBeam size={70} duration={20} />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            {blog.images && blog.images.length > 0 && (
              <div className="w-full md:w-[50%] relative rounded-lg overflow-hidden shadow-lg mb-12">
                <img
                  src={blog.images[currentImageIndex]}
                  alt={blog.title}
                  className="w-full h-[400px] object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
                {blog.images.length > 1 && (
                  <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
                    <FaArrowLeft
                      size={28}
                      onClick={handlePrevImage}
                      className="cursor-pointer text-white bg-gray-700 rounded-full p-2 hover:bg-gray-800"
                    />
                    <FaArrowRight
                      size={28}
                      onClick={handleNextImage}
                      className="cursor-pointer text-white bg-gray-700 rounded-full p-2 hover:bg-gray-800"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="w-full md:w-[50%] text-left text-white">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Blog Description:</h2>
              <p className="text-lg sm:text-xl mb-6">{blog.description}</p>
              <h2 className="text-2xl font-semibold mb-4 text-primary">Blog Content:</h2>
              <p className="text-lg sm:text-xl">{blog.content}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
