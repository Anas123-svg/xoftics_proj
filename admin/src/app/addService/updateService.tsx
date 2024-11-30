type Service = {
    id: number;
    title: string;
    description: string;
    content: string;
    images: string[];
    technologies: string[];
  };
  
  const updateService = async (
    id: number,
    updatedData: Partial<Service>
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log("Attempting to update service with ID:", id);
      console.log("Updated data:", updatedData);
  
      const response = await fetch(`http://localhost:8000/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        console.log("Service updated successfully");
        return { success: true };
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        return {
          success: false,
          error: errorData.message || "Failed to update the service.",
        };
      }
    } catch (error) {
      console.error("Error updating service:", error);
      return {
        success: false,
        error: "An error occurred while updating the service.",
      };
    }
  };
  
export default updateService;