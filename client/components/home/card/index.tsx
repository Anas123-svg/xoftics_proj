import React from "react";
import Image, { StaticImageData } from "next/image";
import Seo from "../../../app/assets/seo.png";

interface CardProps {
  image: string;
  serviceName: string;
  description: string;
  onClick?: () => void;
}

const Card = ({ image, serviceName, description, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className="w-full  sm:w-[31%] h-[380px] bg-white flex flex-col items-center  card_shadow bg-opacity-10 backdrop-blur-lg p-5  rounded-lg shadow-md transform transition duration-300 hover:scale-105 cursor-pointer"
    >
      <div className="flex justify-center">
        <img
          src={image}
          alt={"img"}
          width={250}
          height={250}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-xl font-semibold text-white mb-2 justify-center">
          {serviceName}
        </h3>
        <p className="text-para text-[18px] text-center">{description}</p>
      </div>
    </div>
  );
};

export default Card;
