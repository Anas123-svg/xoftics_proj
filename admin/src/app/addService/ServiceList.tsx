import React from "react";
import ServiceCard from "./ServiceCard";

interface Service {
  id: number;
  title: string;
  description: string;
  content: string;
  technologies: string[];
  images: string[];
}

interface ServiceListProps {
  services: Service[];
  onUpdate: (id: number, updatedData: Service) => void;
  onDelete: (id: number) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, onUpdate, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ServiceList;
