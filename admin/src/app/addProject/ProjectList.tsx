import React from "react";
import ProjectCard from "./projectCard";

interface Project {
  id: number;
  title: string;
  description: string;
  content: string;
  client_review: string;
  site_url: string;
  technologies: string[];
  images?: string[];
}

interface ProjectListProps {
  projects: Project[];
  onUpdate?: (id: number, updatedData: Project) => void; 
  onDelete: (id: number) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onUpdate, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 ">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onUpdate={onUpdate || (() => {})} 
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProjectList;
