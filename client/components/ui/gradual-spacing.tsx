import { AnimatePresence, motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

export default function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
}: GradualSpacingProps) {
  const words = text.split(" ");

  return (
    <div className="flex flex-wrap justify-center">
      <AnimatePresence>
       <h1>
       {words.map((word, wordIndex) => (
          <motion.span 
            key={wordIndex} 
            className={cn("inline-block", className, "mr-4")} // Adjust margin for word spacing
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={framerProps}
                transition={{ duration, delay: (wordIndex * words.length + charIndex) * delayMultiple }}
                className={cn("inline-block drop-shadow-sm", className, "tracking-wide")}
              >
                {char === " " ? <span>&nbsp;</span> : char}
              </motion.span>
            ))}
          </motion.span>
        ))}
       </h1>
      </AnimatePresence>
    </div>
  );
}
