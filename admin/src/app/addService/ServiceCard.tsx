import React, { useState } from "react";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight, FaSave, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

type Service = {
  id: number;
  title: string;
  description: string;
  content: string;
  images: string[];
  technologies: string[];
};

type Props = {
  service: Service;
  onUpdate: (id: number, updatedData: Service) => void;
  onDelete: (id: number) => void;
};

const ServiceCard: React.FC<Props> = ({ service, onUpdate, onDelete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    title: false,
    description: false,
    technologies: false,
  });
  const [updatedData, setUpdatedData] = useState<Service>(service);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      service.images && service.images.length > 0
        ? prevIndex === 0
          ? service.images.length - 1
          : prevIndex - 1
        : 0
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      service.images && service.images.length > 0
        ? prevIndex === service.images.length - 1
          ? 0
          : prevIndex + 1
        : 0
    );
  };

  const handleSave = () => {
    onUpdate(service.id, updatedData);
    setIsEditing({
      title: false,
      description: false,
      technologies: false,
    });
  };

  const handleCancel = () => {
    setUpdatedData(service);
    setIsEditing({
      title: false,
      description: false,
      technologies: false,
    });
  };

  const handleFieldEdit = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleAddTechnology = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTech = e.target.value.trim();
    if (newTech && !updatedData.technologies.includes(newTech)) {
      setUpdatedData({
        ...updatedData,
        technologies: [...updatedData.technologies, newTech],
      });
      e.target.value = ""; 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -65 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25 }}
      className="bg-teal-800 bg-opacity-20 p-6 rounded-lg shadow-lg flex flex-col space-y-4 mx-auto min-h-[400px] w-[900px] overflow-hidden"
    >
      {/* Title Section */}
      <div className="flex justify-between items-center ">
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
            <h2 className="text-2xl font-bold border-b border-gray-700 pb-2 text-teal-400 flex ">
              {updatedData.title.toUpperCase()}
            </h2>
            <FaEdit size={20} onClick={() => handleFieldEdit("title")} style={{ flexShrink: 0 }}  className="cursor-pointer text-white" />
          </>
        )}
      </div>

      {/* Main Content Section */}
      <div className="flex items-start justify-between space-x-4">
        {/* Image Section (on the left) */}
        {service.images && service.images.length > 0 && (
          <div className="flex-shrink-0 w-[40%] relative">
            <img
              src={service.images[currentImageIndex]}
              alt="Service Image"
              className="w-full h-[200px] object-cover rounded-lg"
            />
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
              <FaArrowLeft
                size={28}
                onClick={handlePrev}
                className="cursor-pointer text-white bg-gray-700 rounded-full p-1"
              />
              <FaArrowRight
                size={28}
                onClick={handleNext}
                className="cursor-pointer text-white bg-gray-700 rounded-full p-1"
              />
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
                <FaEdit size={20} onClick={() => handleFieldEdit("description")} style={{ flexShrink: 0 }}  className="cursor-pointer text-white" />
              </>
            )}
          </div>

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
                <FaEdit size={20} onClick={() => handleFieldEdit("content")} style={{ flexShrink: 0 }}  className="cursor-pointer text-white" />
              </>
            )}
          </div>

          {/* Technologies Section */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-teal-500">Technologies:</h3>
            <div className="flex flex-wrap space-x-2 mb-2 gap-2">
              {updatedData.technologies.map((tech, index) => (
                <span key={index} className="bg-teal-800 text-white px-4 py-2 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
            {isEditing.technologies ? (
              <>
                <input
                  type="text"
                  onChange={handleAddTechnology}
                  className="border p-2 rounded mb-2 w-full"
                  placeholder="Add Technology"
                />
                <div className="flex space-x-2">
                  <FaSave size={20} onClick={handleSave} className="cursor-pointer text-green-500" />
                  <FaTimes size={20} onClick={handleCancel} className="cursor-pointer text-red-500" />
                </div>
              </>
            ) : (
              <FaEdit
                size={20}
                onClick={() => handleFieldEdit("technologies")}
                className="cursor-pointer text-white"
                style={{ flexShrink: 0 }} 
              />
            )}
          </div>

          {/* Delete Button */}
          <div className="flex justify-end">
            <FaTrash size={20} onClick={() => onDelete(service.id)} className="cursor-pointer text-red-500" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
