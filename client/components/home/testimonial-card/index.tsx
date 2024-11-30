"use client";
import { motion } from "framer-motion";
import Marquee from "@/components/ui/marquee";
import Client1 from "../../../app/assets/client1.png";
import Client2 from "../../../app/assets/client2.png";
import Client3 from "../../../app/assets/client3.png";
import Image, { StaticImageData } from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";

interface TestimonialCardProps {
  name: string;
  designation: string;
  testimonial: string;
  image: StaticImageData;
}

const reviews = [
  {
    name: "John Doe",
    designation: "CEO, Company XYZ",
    testimonial: "This service has been a game changer for our business!",
    image: Client1,
  },
  {
    name: "Jane Smith",
    designation: "Marketing Manager, Company ABC",
    testimonial: "Exceptional support and amazing results!",
    image: Client2,
  },
  {
    name: "Mike Johnson",
    designation: "Product Owner, Company 123",
    testimonial: "Highly recommend! Will definitely use again.",
    image: Client3,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  designation,
  testimonial,
  image,
}) => {
  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-md flex flex-col card_shadow">
      <div className="flex items-center mb-4">
        <Image
          src={image}
          alt={name}
          width={50}
          height={50}
          className="rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-sm text-gray-400">{designation}</p>
        </div>
      </div>
      <p className="text-white">{testimonial}</p>
    </div>
  );
};

export function Testimonials() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl my-32">
      <motion.div
        initial={{ opacity: 0, y: -65 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="flex flex-col justify-center items-center gap-2"
      >
        <div className="text-primary active relative">
          Wall of Love
          <BorderBeam size={70} duration={20} />{" "}
        </div>
        <h2 className="heading-2 text-white text-center mb-8 font-medium">
          What Our Clients Say!
        </h2>
      </motion.div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <TestimonialCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <TestimonialCard key={review.name} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
