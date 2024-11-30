import React, { useState } from "react";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight, FaSave, FaTimes } from "react-icons/fa";

type Blog = {
  id: number;
  title: string;
  description: string;
  content: string;
  images: string[]; 
};

type Props = {
  blog: Blog;
  onUpdate: (id: number, updatedData: Blog) => void;
  onDelete: (id: number) => void;
};

const BlogCard: React.FC<Props> = ({ blog, onUpdate, onDelete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    title: false,
    description: false,
    content: false,
  });
  const [updatedData, setUpdatedData] = useState<Blog>(blog);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? blog.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === blog.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSave = () => {
    onUpdate(blog.id, updatedData);
    setIsEditing({
      title: false,
      description: false,
      content: false,
    });
  };

  const handleCancel = () => {
    setUpdatedData(blog);
    setIsEditing({
      title: false,
      description: false,
      content: false,
    });
  };

  const handleFieldEdit = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="bg-teal-800 bg-opacity-20 p-6 rounded-lg shadow-lg flex flex-col space-y-4 mx-auto min-h-[300px] w-[900px] overflow-hidden">
      {/* Title Section */}
      <div className="flex justify-between items-center">
        {isEditing.title ? (
          <>
            <input
              type="text"
              value={updatedData.title}
              onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
              placeholder="Title"
              className="border p-2 rounded mb-2 w-full"
            />
            <div className="flex space-x-2">
              <FaSave size={20} onClick={handleSave} className="cursor-pointer text-green-500" />
              <FaTimes size={20} onClick={handleCancel} className="cursor-pointer text-red-500" />
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold border-b border-gray-700 pb-2 text-teal-400 flex">
              {updatedData.title.toUpperCase()}
            </h2>
            <div className="icon-container">
              <FaEdit
                size={20}
                onClick={() => handleFieldEdit("title")}
                className="cursor-pointer text-white"
                style={{ flexShrink: 0 }} 
              />
            </div>
          </>
        )}
      </div>

      {/* Main Content Section */}
      <div className="flex items-start justify-between space-x-4">
        {/* Image Section (on the left) */}
        {blog.images.length > 0 && (
          <div className="flex-shrink-0 w-[40%] relative">
            <img
              src={blog.images[currentImageIndex]}
              alt="Blog Image"
              className="w-full h-[200px] object-cover rounded-lg"
            />
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer">
              <FaArrowLeft size={30} onClick={handlePrev} className="text-white" />
            </div>
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer">
              <FaArrowRight size={30} onClick={handleNext} className="text-white" />
            </div>
          </div>
        )}

        {/* Text Section (on the right) */}
        <div className="flex flex-col w-[60%] space-y-4">
          {/* Description Section */}
          <div className="flex items-start justify-between">
            {isEditing.description ? (
              <>
                <textarea
                  value={updatedData.description}
                  onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
                  placeholder="Description"
                  className="border p-2 rounded mb-2 w-full"
                />
                <div className="flex space-x-2">
                  <FaSave size={20} onClick={handleSave} className="cursor-pointer text-green-500" />
                  <FaTimes size={20} onClick={handleCancel} className="cursor-pointer text-red-500" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-xl font-semibold text-teal-500">Description:</h3>
                  <p className="text-gray-300">{updatedData.description}</p>
                </div>
                <div className="icon-container">
                  <FaEdit
                    size={20}
                    onClick={() => handleFieldEdit("description")}
                    className="cursor-pointer text-white"
                    style={{ flexShrink: 0 }} // Prevent icon from shrinking
                  />
                </div>
              </>
            )}
          </div>

          {/* Content Section */}
          <div className="flex items-start justify-between">
            {isEditing.content ? (
              <>
                <textarea
                  value={updatedData.content}
                  onChange={(e) => setUpdatedData({ ...updatedData, content: e.target.value })}
                  placeholder="Content"
                  className="border p-2 rounded mb-2 w-full"
                />
                <div className="flex space-x-2">
                  <FaSave size={20} onClick={handleSave} className="cursor-pointer text-green-500" />
                  <FaTimes size={20} onClick={handleCancel} className="cursor-pointer text-red-500" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-xl font-semibold text-teal-500">Content:</h3>
                  <p className="text-gray-300">{updatedData.content}</p>
                </div>
                <div className="icon-container">
                  <FaEdit
                    size={20}
                    onClick={() => handleFieldEdit("content")}
                    className="cursor-pointer text-white"
                    style={{ flexShrink: 0 }} // Prevent icon from shrinking
                  />
                </div>
              </>
            )}
          </div>

          {/* Delete Button */}
          <div className="flex justify-end">
            <FaTrash size={20} onClick={() => onDelete(blog.id)} className="cursor-pointer text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
