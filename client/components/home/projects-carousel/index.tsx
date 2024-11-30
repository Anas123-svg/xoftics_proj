"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SquareArrowOutUpRight } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import { GridPattern } from "../../ui/animated-grid-pattern";
import { useRouter } from "next/navigation";

interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  data: string[];
  technologies: string[]; 
}

export function ProjectsCarousel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/portfolio_projects/");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProjects(data);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleNavigation = (projectId: number) => {
    console.log("Navigating to project ID:", projectId);
    router.push(`/projects/${projectId}`);
  };
  
  return (
    <div className="container py-12 px-4 my-12 w-full">
      <div className="bg-black bg-opacity-50 blog-card-shadow backdrop-blur-lg border-1 border-primary box_shadow p-2 md:p-6 py-16 rounded-3xl shadow-md w-full relative overflow-hidden">
        <GridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={20}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] skew-y-12"
          )}
        />
        <motion.div
          initial={{ opacity: 0, y: -65 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="flex flex-col justify-center items-center gap-3 mb-7"
        >
          <div className="text-primary active relative">
            Top Notch Technologies
            <BorderBeam size={70} duration={20} />
          </div>
          <h2 className="heading-2 text-white text-center mb-8 font-medium">
            Explore Our Recent Projects!
          </h2>
        </motion.div>
        <Carousel
          className="relative px-3"
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent>
            {projects.map((project) => (
              <CarouselItem
                key={project.id}
                className="pl-1 lg:basis-1/2 p-3"
                onClick={() => handleNavigation(project.id)} 
              >
                <div className="ml-2 p-3 h-full bg-white card_shadow bg-opacity-10 rounded-xl shadow-lg backdrop-blur-lg transform transition hover:scale-[1.02] hover:cursor-pointer flex flex-col sm:flex-row sm:justify-start sm:items-start gap-3 md:max-h-[300px]">
                  <div className="w-full sm:w-[350px]">
                    <img
                      src={project.images && project.images.length > 0 ? project.images[0] : '/'}
                      alt={project.title}
                      className="rounded-xl"
                      width={300}
                      height={100}
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-start items-start w-full h-full">
                    <h6 className="heading-6 text-white font-medium">
                      {project.title}
                    </h6>
                    <p className="text-para">{project.description}</p><br />
                    <div className="flex justify-between items-center w-full mt-auto">
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.length > 0 && (
                          project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="text-[13px] md:text-[15px] bg-[#084c61] text-white rounded-md px-2 py-1 hover:scale-105 cursor-pointer"
                            >
                              {tech}
                            </span>
                          ))
                        )}
                      </div>

                      {/* Arrow and additional data */}
                      <div className="flex items-center gap-2">
                        {project.data?.map((data, index) => (
                          <p
                            key={index}
                            className="text-[13px] md:text-[15px] bg-[#166a66] text-white rounded-md p-1 hover:scale-105 cursor-pointer"
                          >
                            {data}
                          </p>
                        ))}
                        <SquareArrowOutUpRight
                          size={25}
                          className="text-[#166a66] hover:scale-110 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-primary bg-opacity-50 rounded-full hover:bg-opacity-70 border-primary text-white font-bold" />
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-primary bg-opacity-50 rounded-full hover:bg-opacity-70 border-primary text-white font-bold" />
        </Carousel>
      </div>
    </div>
  );
}
