import About from "@/components/home/about";
import Blogs from "@/components/home/blogs";
import Contact from "@/components/home/contact";
import Hero from "@/components/home/hero";
import { ProjectsCarousel } from "@/components/home/projects-carousel";
import Services from "@/components/home/services";
import {  Testimonials } from "@/components/home/testimonial-card";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero/>
      <About />
      <Services/>
      <Blogs/>
      <ProjectsCarousel/>
      <Testimonials/>
      <Contact/>
    </div>
  );
};

export default page;
