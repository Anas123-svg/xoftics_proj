type Project = {
    id: number;
    title: string;
    description: string;
    content: string;
    client_review: string;
    site_url: string;
    technologies: string[];
    images?: string[];
  };
  
  const updateProject = async (
    id: number,
    updatedData: Partial<Project>
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log("Attempting to update project with ID:", id);
      console.log("Updated data:", updatedData);
  
      const response = await fetch(`http://localhost:8000/portfolio_projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        console.log("Project updated successfully");
        return { success: true };
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        return {
          success: false,
          error: errorData.message || "Failed to update the project.",
        };
      }
    } catch (error) {
      console.error("Error updating project:", error);
      return {
        success: false,
        error: "An error occurred while updating the project.",
      };
    }
  };
  
export default updateProject;