const deleteService = async (id: number): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(`http://localhost:8000/services/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json();
      console.error("Error from server:", errorData);
      return { success: false, error: errorData.message || "Failed to delete the service." };
    }
  } catch (error) {
    console.error("Error in deleting service:", error);
    return { success: false, error: "An error occurred while deleting the service." };
  }
};

export default deleteService;
