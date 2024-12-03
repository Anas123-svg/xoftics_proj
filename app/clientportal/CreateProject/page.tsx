"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import ClientProjectList from "./ProjectList";
import { useRouter } from 'next/navigation';
import deleteProject from "./deleteProject";
import updateClientProject from "./updateProject";
import Sidebar from "../Sidebar/page"; 

const CreateProject: React.FC = () => {
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/client_projects/projects");
        const data = await response.json();
        setProjectsList(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleUpdateProject = async (id: number, updatedData: any) => {
    console.log("Updating project:", id, updatedData);
    const result = await updateClientProject(id, updatedData);
    console.log("Update result:", result);
    if (result.success) {
      alert("Project updated successfully!");
      setProjectsList((prevList) =>
        prevList.map((project) =>
          project.id === id ? { ...project, ...updatedData } : project
        )
      );
    } else {
      alert(result.error);
    }
  };

  const handleDeleteProject = async (id: number) => {
    console.log("Deleting project:", id);
    const result = await deleteProject(id);
    console.log("Delete result:", result);
    if (result.success) {
      alert("Project deleted successfully!");
      setProjectsList((prevList) =>
        prevList.filter((project) => project.id !== id)
      );
    } else {
      alert(result.error);
    }
  };

  const handleAddProject = () => {
    router.push('/clientportal/clientProject');
  };

  return (

    <div
    className="flex justify-center mt-10 min-h-screen w-full p-4  mb-10"
    style={{ background: 'linear-gradient(90deg, #011111, #031010, #011111)' }}
    >
      
      <Sidebar />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="container mx-auto p-4 mt-10 flex-1 ml-64"  
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl text-white font-bold">Projects</h1>
          <button
            className="bg-green-500 text-white p-2 rounded-full flex items-center justify-center"
            onClick={handleAddProject} 
          >
            <FaPlus size={20} />
          </button>
        </div>

        <ClientProjectList
          clientProjects={projectsList}
          onUpdate={handleUpdateProject}
          onDelete={handleDeleteProject}
        />
      </motion.div>
    </div>
  );
};

export default CreateProject;
