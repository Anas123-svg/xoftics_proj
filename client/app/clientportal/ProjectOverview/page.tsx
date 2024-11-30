import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

interface Project {
  id: number;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: string;
  update_by_admin: string;
  progress: number;
  details: string;
}

const ProjectOverview: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/client_projects/projects");
        setProjects(response.data);
      } catch (err: any) {
        setError("Failed to fetch projects.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-300 mb-4 m-10">Projects Overview</h2>
      <div className="grid grid-cols-3 gap-6 m-10">
        {projects.map((project) => (
          <div key={project.id} className="bg-teal-900 p-4 rounded-md shadow-lg">
            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
            <p className="text-teal-200">Status: {project.status}</p>
            <p className="text-teal-200">Progress: {project.progress}%</p>
            <div className="my-2">
              <Line
                data={{
                  labels: ["Progress"],
                  datasets: [
                    {
                      label: "Project Progress",
                      data: [project.progress],
                      backgroundColor: "rgba(38, 198, 218, 0.2)",
                      borderColor: "rgba(38, 198, 218, 1)",
                      borderWidth: 1,
                      fill: true,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        color: "white",
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: {
                        color: "white",
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="text-xs text-teal-200">Budget: ${project.budget}</div>
            <div className="text-xs text-teal-200">Deadline: {project.deadline}</div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectOverview;
