import React from "react";
import ClientProjectCard from "./ProjectCard";

interface ClientProject  {
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

interface Props  {
  clientProjects: ClientProject[];
  onUpdate: (id: number, updatedData: ClientProject) => void;
  onDelete: (id: number) => void;
};

const ClientProjectList: React.FC<Props> = ({ clientProjects, onUpdate, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {clientProjects.map((clientProjects) => (
        < ClientProjectCard
          key={clientProjects.id}
          project={clientProjects}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ClientProjectList;
