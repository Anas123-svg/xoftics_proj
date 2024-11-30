type Blog = {
    id: number;
    title: string;
    description: string;
    content: string;
    image?: string;  
  };
  
  const updateBlog = async (
    id: number,
    updatedData: Blog
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`http://localhost:8000/blogs/${id}`, {
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
          error: errorData.message || "Failed to update the blog.",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: "An error occurred while updating the blog.",
      };
    }
  };
  
  export default updateBlog;
  