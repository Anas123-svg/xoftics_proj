import React, { useState } from "react";
import { FaProjectDiagram, FaFileUpload, FaFileInvoice, FaUser, FaQuestionCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    console.log("User logged out");
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Hamburger Button for Mobile View */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar} className="text-white">
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } w-64  text-white p-6 fixed top-0 left-0 mt-20 h-full shadow-lg overflow-y-auto md:block`}
      >
        <h1 className="flex justify-center">Menu</h1>
        <div className="flex items-center mb-8">
          <div className="w-12 h-15 overflow-hidden mr-4"></div>
        </div>
        <div onClick={() => router.push("/clientportal/CreateProject")} className="flex items-center mb-4 p-3  rounded-md cursor-pointer hover:bg-teal-950 transition-all duration-300">
          <FaProjectDiagram className="mr-3 text-xl" />
          <span>Create New Project</span>
        </div>
        <div onClick={() => router.push("/clientportal/UploadFiles")} className="flex items-center mb-4 p-3  rounded-md cursor-pointer hover:bg-teal-950 transition-all duration-300">
          <FaFileUpload className="mr-3 text-xl" />
          <span>Upload Files</span>
        </div>
        <div onClick={() => router.push("/clientportal/Reports")} className="flex items-center mb-4 p-3  rounded-md cursor-pointer hover:bg-teal-950 transition-all duration-300">
          <FaFileInvoice className="mr-3 text-xl" />
          <span>View Reports</span>
        </div>
        <div onClick={() => router.push("/clientportal/EditProfile")} className="flex items-center mb-4 p-3  rounded-md cursor-pointer hover:bg-teal-950 transition-all duration-300">
          <FaUser className="mr-3 text-xl" />
          <span>Edit Profile</span>
        </div>
        <div onClick={() => router.push("/clientportal/Contact")} className="flex items-center mb-4 p-3 rounded-md cursor-pointer hover:bg-teal-950 transition-all duration-300">
          <FaQuestionCircle className="mr-3 text-xl" />
          <span>Contact Support</span>
        </div>
        <div onClick={handleLogout} className="flex items-center mb-4 p-3 rounded-md cursor-pointer hover:bg-teal-950 transition-all duration-300">
          <FaSignOutAlt className="mr-3 text-xl" />
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
