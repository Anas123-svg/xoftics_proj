const deleteProject = async (id: number): Promise<{ success: boolean; error?: string }> => {
  console.log("deleteProject function received id:", id);
    try {
      const response = await fetch(`http://localhost:8000/client_projects/projects/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        return { success: true };
      } else {
        const errorData = await response.json();
        console.error("Error from server:", errorData);
        return { success: false, error: errorData.message || "Failed to delete the project." };
      }
    } catch (error) {
      console.error("Error in deleting project:", error);
      return { success: false, error: "An error occurred while deleting the project." };
    }
  };
  
  export default deleteProject;
  