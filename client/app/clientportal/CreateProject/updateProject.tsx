interface ClientProjectForm {
  title?: string;
  description?: string;
  budget?: number;
  deadline?: string;
  status?: string;
  update_by_admin?: string;
  progress?: number;
  details?: string;
}

const updateClientProject = async (
  id: number,
  updatedData: ClientProjectForm
): Promise<{ success: boolean; error?: string }> => {
  try {
    
    console.log("updateClientProject function received id:", id);
    console.log("updateClientProject received data:", updatedData);

    const response = await fetch(`http://localhost:8000/client_projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData), 
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Failed to update the client project.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred while updating the client project.",
    };
  }
};

export default updateClientProject;
