import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import { GridPattern } from "./ui/animated-grid-pattern";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div>
    <motion.div
      initial={{ opacity: 0, y: -65 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25 }}
      
      className="relative rounded-sm border border-teal-950 bg-teal-800 opacity-90 px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark hover:bg-teal-800 hover:shadow-lg hover:opacity-100 transition duration-300 ease-in-out">
       <GridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={20}
        repeatDelay={1}
        className={cn(
          "absolute inset-0",
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="relative z-10 flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>
      
      <div className="relative z-10 mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-white dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp && "text-meta-3"
          } ${levelDown && "text-meta-5"} `}
        >
          {rate}

          {levelUp && (
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          )}
          {levelDown && (
            <svg
              className="fill-meta-5"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                fill=""
              />
            </svg>
          )}
        </span>
      </div>
    </motion.div>
    </div>
  );

};

export default CardDataStats;
