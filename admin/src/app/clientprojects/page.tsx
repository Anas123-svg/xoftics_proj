"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import ClientProjectList from "./ProjectList";
import { useRouter } from 'next/navigation';
import DefaultLayout from "../../components/Layouts/DefaultLayout";

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


  return (
    <DefaultLayout>

    <div
    className="flex justify-center mt-10 min-h-screen w-full p-4  mb-10"
    style={{ background: 'linear-gradient(90deg, #011111, #031010, #011111)' }}
    >
      
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="container mx-auto p-4 mt-10 flex-1 "  
      >
      
        <ClientProjectList
          clientProjects={projectsList}
        />
      </motion.div>
    </div>
    </DefaultLayout>
  );
};

export default CreateProject;
