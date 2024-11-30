import React from "react";
import ClientProjectCard from "./ProjectCard";

interface ClientProject {
  id: number;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: string;
  update_by_admin: string; 
  progress: number;
  details: string;
};

interface Props {
  clientProjects: ClientProject[];
};

const ClientProjectList: React.FC<Props> = ({ clientProjects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {clientProjects.map((clientProject) => (
        <ClientProjectCard
          key={clientProject.id}
          project={clientProject} 
        />
      ))}
    </div>
  );
};

export default ClientProjectList;
