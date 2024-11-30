import React from "react";
import BlogCard from "./BlogCard";

interface Blog {
  id: number;
  title: string;
  description: string;
  content: string;
  images: string[]; 
}

interface BlogListProps {
  blogs: Blog[];
  onUpdate: (id: number, updatedData: Blog) => void;
  onDelete: (id: number) => void;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, onUpdate, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BlogList;
