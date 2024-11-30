"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "../card";
import { BorderBeam } from "@/components/ui/border-beam";

type Service = {
  id: number;
  images: string[];
  description: string;
  title: string;
  category: string;
};

const Services = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:8000/services/"); 
        const data = await response.json();
        console.log("Fetched services:", data);
        setServicesList(data);

        if (data.length > 0) {
          setActiveCategory(data[0].category);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = servicesList.filter(
    (service) => service.category === activeCategory
  );

  const handleCardClick = (id: number) => {
    router.push(`/servicesDetails/${id}`);
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
          Find the best services in the town{" "}
          <BorderBeam size={70} duration={20} />
        </div>
        <h2 className="heading-2 text-white text-center mb-8 font-medium">
          The best Solutions For Your Business!
        </h2>
      </motion.div>

      <div className="flex flex-col sm:flex-row justify-start sm:flex-wrap gap-5 ">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            image={service.images[0]}
            serviceName={service.title}
            description={service.description}
            onClick={() => handleCardClick(service.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
