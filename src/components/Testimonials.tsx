"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  type: "Donor" | "Beneficiary";
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh K. Singhal",
    role: "Regular Monthly Donor",
    quote: "SewaPrith sends detailed receipts with exact item breakdowns and photos of the food bags we funded. The 100% direct-ground impact and 0% administrative fee guarantee is why I choose to support them monthly.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    type: "Donor",
  },
  {
    id: 2,
    name: "Savita Devi",
    role: "Mother of scholarship recipient",
    quote: "My daughter was about to drop out after class 10 as we couldn't afford notebooks and school bus fees. SewaPrith stepped in, sponsored her higher education, and now she is preparing for college. They changed our lives.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    type: "Beneficiary",
  },
  {
    id: 3,
    name: "Meera Deshmukh",
    role: "Corporate CSR Partner",
    quote: "Working with SewaPrith on rural medical camps has been seamless. Their transparency reports are prompt, and their team works directly on the ground. We have set up 4 camps together and are very impressed.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
    type: "Donor",
  },
  {
    id: 4,
    name: "Raju Prasad",
    role: "Construction Worker",
    quote: "During the temporary lockdowns and when construction work stopped, we had no money for ration. SewaPrith community kitchen provided hot nutritious food for my family daily. We are eternally grateful.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    type: "Beneficiary",
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handleNext = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const current = testimonials[index];

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 md:px-12 py-8">
      {/* Background quote mark */}
      <Quote className="absolute top-0 left-0 w-24 h-24 text-slate-100 fill-current -z-10 opacity-60 dark:opacity-10" />

      <div className="overflow-hidden min-h-[250px] flex items-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
          >
            {/* Beneficiary Image */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full text-white ${
                current.type === "Donor" ? "bg-primary" : "bg-accent-coral"
              }`}>
                {current.type}
              </span>
            </div>

            {/* Quote details */}
            <div className="flex-grow space-y-4">
              <p className="text-lg md:text-xl italic text-secondary/80 font-medium leading-relaxed">
                &ldquo;{current.quote}&rdquo;
              </p>
              <div>
                <h4 className="text-base font-bold text-secondary">{current.name}</h4>
                <p className="text-xs text-primary font-semibold">{current.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex justify-center md:justify-end gap-3 mt-8">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full border border-slate-200 text-secondary hover:bg-slate-50 hover:text-primary transition-colors focus:outline-none"
          aria-label="Previous story"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full border border-slate-200 text-secondary hover:bg-slate-50 hover:text-primary transition-colors focus:outline-none"
          aria-label="Next story"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
