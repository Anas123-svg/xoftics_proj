"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/ui/border-beam";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GridPattern } from "../../../components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const ServiceDetails = () => {
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const pathname = usePathname();
  const id = Number(pathname.split("/").pop());

  useEffect(() => {
    if (isNaN(id)) return;

    const fetchServiceData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/services/${id}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Service not found");
        }
        const data = await response.json();
        setService(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [id]);

  const handleNextImage = () => {
    if (service && service.images && service.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === service.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (service && service.images && service.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? service.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) return <div className="text-center text-white py-8">Loading...</div>;

  if (!service) return <div className="text-center text-white py-8 mt-20">Service not found</div>;

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
            <h1 className="text-4xl font-extrabold text-white text-center p-5">
              {service.title.toUpperCase()}
            </h1>
            <BorderBeam size={70} duration={20} />
          </div>

          <div className="w-full max-w-4xl mx-auto text-center text-white">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-primary">Service Overview</h2>
              <p className="text-lg">{service.description}</p>
            </div>

            {/* Image Carousel */}
            {service.images && service.images.length > 0 && (
              <div className="w-full md:w-[50%] relative rounded-lg overflow-hidden shadow-lg mb-12 mx-auto">
                <img
                  src={service.images[currentImageIndex]}
                  alt={service.title}
                  className="w-full h-[400px] object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
                {service.images.length > 1 && (
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

            <div className="w-full max-w-4xl mx-auto text-left text-white mt-6">
              <h2 className="text-2xl font-semibold text-primary mb-4">Service Content</h2>
              <p className="text-xl mb-4">{service.content}</p>
            </div>

            <div className="w-full max-w-4xl mx-auto text-left text-white mt-6">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Client Review</h2>
              <p className="text-lg">{service?.client_review || "No client review available."}</p>
            </div>

            <div className="w-full max-w-4xl mx-auto text-left text-white mt-6">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Technologies Used</h2>
              {service.technologies && service.technologies.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-center mt-6">
                  {service.technologies.map((tech: string, index: number) => (
                    <motion.span
                      key={index}
                      className="bg-[#166a66] text-white rounded-md px-4 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#125b4c]"
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetails;
