"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import ServiceList from "./ServiceList";
import { useRouter } from 'next/navigation';
import deleteService from "./deleteService";
import updateService from "./updateService";

const CreateService: React.FC = () => {
  const [servicesList, setServicesList] = useState<any[]>([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:8000/services/");
        const data = await response.json();
        setServicesList(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleUpdateService = async (id: number, updatedData: any) => {
    console.log("Updating service:", id, updatedData);
    const result = await updateService(id, updatedData);
    console.log("Update result:", result);
    if (result.success) {
      alert("Service updated successfully!");
      setServicesList((prevList) =>
        prevList.map((service) =>
          service.id === id ? { ...service, ...updatedData } : service
        )
      );
    } else {
      alert(result.error);
    }
  };
  

  const handleDeleteService = async (id: number) => {
    console.log("Deleting service:", id);
    const result = await deleteService(id);
    console.log("Delete result:", result);
    if (result.success) {
      alert("Service deleted successfully!");
      setServicesList((prevList) =>
        prevList.filter((service) => service.id !== id)
      );
    } else {
      alert(result.error);
    }
  };

  const handleAddService = () => {
    router.push('/service');
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
          <h1 className="text-2xl text-white font-bold">Services</h1>
          <button
            className="bg-green-500 text-white p-2 rounded-full flex items-center justify-center"
            onClick={handleAddService} 
          >
            <FaPlus size={20} />
          </button>
        </div>

        <ServiceList
          services={servicesList}
          onUpdate={handleUpdateService}
          onDelete={handleDeleteService}
        />
      </motion.div>
    </DefaultLayout>
  );
};

export default CreateService;
