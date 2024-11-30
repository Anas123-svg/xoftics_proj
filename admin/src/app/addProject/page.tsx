"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import deletePortfolioProject from "./deleteProject";
import { useRouter } from "next/navigation";
import ProjectList from "./ProjectList";
import updateProject  from "./updateProject";

const CreatePortfolioProject = () => {
  const [portfolioProjects, setPortfolioProjects] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/portfolio_projects/");
        const data = await response.json();
        console.log(data);
        setPortfolioProjects(data);
      } catch (error) {
        console.error("Error fetching portfolio projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleDeleteProject = async (id: number) => {
    const result = await deletePortfolioProject(id);
    if (result.success) {
      setPortfolioProjects((prev) => prev.filter((project) => project.id !== id));
      alert("Portfolio project deleted successfully!");
    } else {
      alert(result.error);
    }
  };

  const handleAddProject = () => {
    router.push("/project"); 
  };

  
  const handleUpdateProject = async (id: number, updatedData: any) => {
    console.log("Updating project:", id, updatedData);
    const result = await updateProject(id, updatedData);
    console.log("Update result:", result);
    if (result.success) {
      alert("Project updated successfully!");
      setPortfolioProjects((prevList) =>
        prevList.map((project) =>
          project.id === id ? { ...project, ...updatedData } : project
        )
      );
    } else {
      alert(result.error);
    }
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
          <h1 className="text-2xl text-white font-bold">Portfolio Projects</h1>
          <button
            className="bg-green-500 text-white p-2 rounded-full flex items-center justify-center"
            onClick={handleAddProject}
          >
            <FaPlus size={20} />
          </button>
        </div>

        <ProjectList
          projects={portfolioProjects}
          onDelete={handleDeleteProject}
          onUpdate={handleUpdateProject}
        />
      </motion.div>
    </DefaultLayout>
  );
};

export default CreatePortfolioProject;
