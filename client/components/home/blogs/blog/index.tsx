import Image from "next/image";
import React from "react";
import { ExternalLink } from "lucide-react";

interface SingleBlogCardProps {
  category?: string; 
  title: string;
  description: string;
  image: string; 
  onClick: () => void;
}

const SingleBlogCard: React.FC<SingleBlogCardProps> = ({ title, description, image, onClick }) => {
  return (
    <div 
      className="bg-black bg-opacity-50 w-full backdrop-blur-lg flex flex-col items-start rounded-xl blog-card-shadow transform transition duration-300 hover:scale-105 min-h-[400px] max-w-[360px]"
      onClick={onClick} 
    >
      <div className="w-full flex justify-center">
        <img 
          src={image} 
          alt={title} 
          width={360} 
          height={300} 
          className="object-cover rounded-t-lg" 
        />
      </div>
      <div className="flex flex-col justify-start items-start p-5 gap-3">
        <h4 className="heading-4 text-secondary">{title}</h4>
        <p className="text-para text-[16px]">{description}</p>
        <button className="btn_primary flex gap-3 justify-between items-center">
          Read More
          <ExternalLink />
        </button>
      </div>
    </div>
  );
};

export default SingleBlogCard;
