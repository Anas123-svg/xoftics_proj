import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

interface ClientProjectForm {
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

type Props = {
  project: ClientProjectForm;
};

const ClientProjectCard: React.FC<Props> = ({ project }) => {
  const [updatedData, setUpdatedData] = useState<ClientProjectForm>({
    ...project,
    update_by_admin: project.update_by_admin || "No", 
  });

  const handleCheckboxChange = async () => {
    
    const updatedProject = {
      ...updatedData,
      update_by_admin: updatedData.update_by_admin === "Yes" ? "No" : "Yes",
    };

    setUpdatedData(updatedProject);

    try {
      const response = await fetch(`http://localhost:8000/client_projects/${updatedData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      });

      if (response.ok) {
        console.log("Project updated successfully");
      } else {
        console.error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className="bg-teal-800/10 p-6 rounded-lg shadow-lg flex flex-col space-y-6 mx-auto min-h-[450px] max-w-lg w-full border border-teal-400">
      {/* Title Section */}
      <div className="flex justify-between items-center">
        <div className="w-full flex justify-between">
          <h2 className="text-2xl font-bold border-b border-teal-400 pb-2 text-teal-200 whitespace-normal break-words">
            {updatedData.title.toUpperCase()}
          </h2>
        </div>
      </div>

      {[ 
        { field: "description", label: "Description", type: "textarea" },
        { field: "budget", label: "Budget", type: "number" },
        { field: "deadline", label: "Deadline", type: "date" },
        { field: "status", label: "Status", type: "text" },
        { field: "progress", label: "Progress", type: "number" },
        { field: "details", label: "Details", type: "textarea" },
      ].map(({ field, label, type }) => (
        <div key={field} className="flex justify-between items-center flex-wrap">
          <div className="w-full flex justify-between">
            <div className="w-full max-w-full">
              <h3 className="text-xl font-semibold text-teal-500">{label}:</h3>
              <p className="text-gray-400 whitespace-normal break-words">{updatedData[field as keyof ClientProjectForm]}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Update by Admin Checkbox */}
      <div className="flex justify-between items-center flex-wrap">
        <div className="w-full flex justify-between">
          <div className="w-full max-w-full">
            <h3 className="text-xl font-semibold text-teal-500">Approve:</h3>
            <input
              type="checkbox"
              checked={updatedData.update_by_admin === "Yes"} 
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-teal-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProjectCard;
