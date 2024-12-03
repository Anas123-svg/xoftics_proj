import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

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
  onUpdate: (id: number, updatedData: ClientProjectForm) => void;
  onDelete: (id: number) => void;
};

const ClientProjectCard: React.FC<Props> = ({ project, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    title: false,
    description: false,
    budget: false,
    deadline: false,
    status: false,
    progress: false,
    details: false,
  });

  const [updatedData, setUpdatedData] = useState<ClientProjectForm>(project);

  const handleSave = () => {
    onUpdate(project.id, updatedData);
    setIsEditing({
      title: false,
      description: false,
      budget: false,
      deadline: false,
      status: false,
      progress: false,
      details: false,
    });
  };

  const handleCancel = () => {
    setUpdatedData(project);
    setIsEditing({
      title: false,
      description: false,
      budget: false,
      deadline: false,
      status: false,
      progress: false,
      details: false,
    });
  };

  const handleFieldEdit = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="bg-teal-800/10 p-6 rounded-lg shadow-lg flex flex-col space-y-6 mx-auto min-h-[450px] max-w-lg w-full border border-teal-400">
      {/* Title Section */}
      <div className="flex justify-between items-center">
        {isEditing.title ? (
          <>
            <input
              type="text"
              value={updatedData.title}
              onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
              placeholder="Title"
              className="border p-2 rounded w-full text-black"
            />
            <div className="flex space-x-2">
              <FaSave size={20} onClick={handleSave} className="cursor-pointer text-green-500" />
              <FaTimes size={20} onClick={handleCancel} className="cursor-pointer text-red-500" />
            </div>
          </>
        ) : (
          <div className="w-full flex justify-between">
            <h2 className="text-2xl font-bold border-b border-teal-400 pb-2 text-teal-200 truncate">
              {updatedData.title.toUpperCase()}
            </h2>
            <FaEdit size={20} onClick={() => handleFieldEdit("title")} className="cursor-pointer text-teal-100" />
          </div>
        )}
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
          {isEditing[field] ? (
            <>
              {type === "textarea" ? (
                <textarea
                  value={updatedData[field as keyof ClientProjectForm]}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      [field]: e.target.value,
                    })
                  }
                  placeholder={label}
                  className="border p-2 rounded w-full text-black max-h-40 resize-y whitespace-normal"
                />
              ) : (
                <input
                  type={type}
                  value={updatedData[field as keyof ClientProjectForm] as string | number}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      [field]: type === "number" ? +e.target.value : e.target.value,
                    })
                  }
                  placeholder={label}
                  className="border p-2 rounded w-full text-black"
                />
              )}
              <div className="flex space-x-2">
                <FaSave size={20} onClick={handleSave} className="cursor-pointer text-green-500" />
                <FaTimes size={20} onClick={handleCancel} className="cursor-pointer text-red-500" />
              </div>
            </>
          ) : (
            <div className="w-full flex justify-between">
              <div className="w-full max-w-full">
                <h3 className="text-xl font-semibold text-teal-500">{label}:</h3>
                <p className="text-gray-400 whitespace-normal break-words">{updatedData[field as keyof ClientProjectForm]}</p>
              </div>
              <FaEdit size={20} onClick={() => handleFieldEdit(field)} className="cursor-pointer text-teal-100" />
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center flex-wrap">
        <div className="w-full flex justify-between">
          <div className="w-full max-w-full">
            <h3 className="text-xl font-semibold text-teal-500">Approved by Xoftics:</h3>
            <p className="text-gray-400 whitespace-normal break-words">{updatedData.update_by_admin}</p>
          </div>
        </div>
      </div>

      
      <div className="flex justify-end mt-4">
        <FaTrash
          size={20}
          onClick={() => onDelete(project.id)}
          className="cursor-pointer text-red-500 hover:text-red-700"
        />
      </div>
    </div>
  );
};

export default ClientProjectCard;
