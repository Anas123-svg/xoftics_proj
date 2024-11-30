"use client";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "../Sidebar/page";
import ProjectOverview from "../ProjectOverview/page";
import { exampleProjects } from "../ProjectOverview/projects";


ChartJS.register(LineElement, LinearScale, CategoryScale, PointElement, Tooltip, Legend);

const ClientPortal: React.FC = () => {
  const [filteredProjects, setFilteredProjects] = useState(exampleProjects);



  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 mt-20 w-full">
        
        <ProjectOverview />
        
      </div>
    </div>
  );
};

export default ClientPortal;
