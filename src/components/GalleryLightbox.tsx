"use client";

import { useState } from "react";
import { Play, X, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
  id: number;
  title: string;
  type: "photo" | "video";
  category: "Education" | "Healthcare" | "Food Relief" | "Disaster Aid";
  thumbnail: string;
  fullUrl: string; // Image URL or YouTube ID (e.g. dL6h2S-fX8k)
  description: string;
}

const mediaItems: MediaItem[] = [
  {
    id: 1,
    title: "Distribution of school supplies to 100 slum children",
    type: "photo",
    category: "Education",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    fullUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    description: "Our volunteer team distributing standard syllabus textbooks, bags, notebooks, and writing materials in Sanjay Basti resettlement colony.",
  },
  {
    id: 2,
    title: "Rural eye check-up and surgical referral camp",
    type: "photo",
    category: "Healthcare",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    fullUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    description: "Doctor checking the eyesight of elderly villagers in Rewari. Over 40 cataract patients were successfully identified and scheduled for sponsored surgeries.",
  },
  {
    id: 3,
    title: "Community kitchen preparation and meal packaging",
    type: "photo",
    category: "Food Relief",
    thumbnail: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&w=600&q=80",
    fullUrl: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&w=1200&q=80",
    description: "Fresh lentils, rice, and healthy vegetable curries being prepared under strict hygiene standards for daily distribution.",
  },
  {
    id: 4,
    title: "Digital literacy classrooms introduction class",
    type: "photo",
    category: "Education",
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    fullUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    description: "Children getting hands-on keyboard experience at our newly set up community computer center.",
  },
  {
    id: 5,
    title: "SewaPrith Annual Ground Impact Documentary",
    type: "video",
    category: "Healthcare",
    thumbnail: "https://images.unsplash.com/photo-1504813184591-015556c5c522?auto=format&fit=crop&w=600&q=80",
    fullUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with real YouTube embed or placeholder
    description: "A short documentary capturing patient testimonials and the daily journey of our mobile diagnostic health clinic vans.",
  },
  {
    id: 6,
    title: "Volunteer Training & Ground Relief Drill",
    type: "video",
    category: "Disaster Aid",
    thumbnail: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80",
    fullUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Our core rescue team conducting training on immediate aid kit assembly, water sanitation table distribution, and temporary shelters.",
  }
];

export default function GalleryLightbox() {
  const [filter, setFilter] = useState<"all" | "photo" | "video">("all");
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);

  const filteredItems = mediaItems.filter(
    (item) => filter === "all" || item.type === filter
  );

  return (
    <div className="space-y-8">
      {/* Category selector */}
      <div className="flex justify-center gap-4">
        {(["all", "photo", "video"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-2 rounded-full text-sm font-bold capitalize transition-all duration-200 ${
              filter === type
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-slate-100 hover:bg-slate-200 text-secondary"
            }`}
          >
            {type === "all" ? "All Media" : `${type}s`}
          </button>
        ))}
      </div>

      {/* Grid container */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative"
            >
              {/* Media Image Overlay */}
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-85"
                />
                
                {/* Hover Play/Zoom Icons */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {item.type === "video" ? (
                    <div className="w-12 h-12 bg-accent-coral rounded-full flex items-center justify-center text-white shadow-lg">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                      <Eye className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Badge Category */}
                <span className="absolute top-3 left-3 bg-secondary/80 text-[10px] font-bold text-white uppercase px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {item.category}
                </span>
              </div>

              {/* Title Content */}
              <div className="p-4">
                <h3 className="font-bold text-secondary text-sm group-hover:text-primary transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Popups */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          >
            {/* Close trigger clicking backdrop */}
            <div className="absolute inset-0" onClick={() => setActiveItem(null)} />

            <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-800">
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Display */}
              <div className="aspect-video w-full bg-black flex items-center justify-center">
                {activeItem.type === "video" ? (
                  <iframe
                    src={activeItem.fullUrl}
                    title={activeItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeItem.fullUrl}
                    alt={activeItem.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Info text at the bottom */}
              <div className="p-6 bg-slate-950 text-white border-t border-slate-800">
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                  {activeItem.category} &bull; {activeItem.type}
                </span>
                <h2 className="text-lg font-bold mt-1 text-white">{activeItem.title}</h2>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  {activeItem.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
