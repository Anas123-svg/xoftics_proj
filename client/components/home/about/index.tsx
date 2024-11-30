import React from "react";
import { Check } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { IconCloudDemo } from "@/components/general/IconCloudDemo";

const About = () => {
  return (
    <div className="container py-12 px-6 my-12 w-full" id="about">
      <div className=" bg-black bg-opacity-50 w-full backdrop-blur-lg flex flex-col lg:flex-row md:justify-center items-center rounded-3xl lg:px-14 lg:py-8 box_shadow relative overflow-hidden">
        <BorderBeam size={200} duration={100} />

        <div className="flex flex-col gap-3 lg:w-[50%] p-4 pt-6">
          <p className="text-primary">Empowering Your Business</p>
          <h2 className="heading-2 font-semibold text-white">
            About <span className="text-primary italic">X</span>oft
            <span className="text-primary">i</span>
            cs
          </h2>
          {/* <ul className="space-y-4 mb-8 text-para para-large">
            <li className="flex items-center">
              <Check className="text-primary mr-2" />
              Comprehensive digital solutions to elevate your business.
            </li>
            <li className="flex items-start">
              <Check className="text-primary mr-2" />
              Innovative strategies for website development and design.
            </li>
            <li className="flex items-start">
              <Check className="text-primary mr-2" />
              Expert consultation to maximize growth potential.
            </li>
            <li className="flex items-start">
              <Check className="text-primary mr-2" />
              Customized solutions tailored to your unique needs.
            </li>
          </ul> */}
          <p className="mb-8 text-para para-large text-justify">
            Xoftics is a premier software development company specializing in
            mobile apps, web solutions, and custom software. Our expertise spans
            technologies like Flutter, MERN stack, Next.js, Laravel, FastAPI,
            and Node.js, enabling us to create secure, intuitive, cross-platform
            applications. We leverage cloud services such as AWS, Google Cloud,
            and Firebase to deliver scalable and robust solutions. Our
            collaborative approach fosters enduring partnerships across the US,
            UK, Germany, and Canada. At Xoftics, innovation and excellence drive
            our commitment to empowering businesses to excel in the digital
            landscape.
          </p>
          <button className="btn_primary max-w-[400px]">
            Contact us today
          </button>
        </div>

        <div className="lg:w-[50%]  flex justify-center items-center">
          <IconCloudDemo />
        </div>
      </div>
    </div>
  );
};

export default About;
