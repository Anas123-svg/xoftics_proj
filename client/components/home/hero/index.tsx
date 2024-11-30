"use client";
import { Sparkle } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { Button } from "@/components/general/button";
import GradualSpacing from "@/components/ui/gradual-spacing";
import { BorderBeam } from "@/components/ui/border-beam";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 75 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25 }}
      className="container relative flex justify-center items-center lg:h-screen w-full mt-28 lg:mt-10 py-12 overflow-hidden"
      id="#"
    >
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="w-[500px] h-[500px] absolute lg:right-[25%] top-[10%] bg-transparent rounded-full glow_shadow -z-[50]"></div>

      <div className="z-10 flex flex-col text-center items-center justify-center w-full gap-2">
        <div className="flex gap-3 items-center justify-center active relative">
          <Sparkle size={30} className="text-primary" />
          <p className="text-primary para-small para-large">
            Your Digital Creative Companion
          </p>
          <BorderBeam size={60} duration={20} />
        </div>
        <div className="md:px-32 p-5 flex flex-col justify-center items-center gap-4">
          <GradualSpacing
            className="heading-1 text-secondary font-black capitalize -tracking-widest"
            text="Elevate Your Business with Innovative Tech Solutions"
          />
          <p className="para-large text-para">
            Xoftics provides innovative digital solutions to help businesses
            grow and succeed. From web development to digital marketing, we
            tailor strategies that enhance your online presence and drive
            measurable growth.
          </p>
          <Button message="Get in Touch" />
        </div>
      </div>
    </motion.div>
  );
}

export default Hero;
