"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/919876543210?text=Hello%20SewaPrith%20Foundation!%20I%20would%20like%20to%20know%20more%20about%20your%20campaigns%20and%20how%20I%20can%20contribute.";

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.4, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 pointer-events-auto"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20ba5a] active:scale-95 duration-200 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none -z-10" />

        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-250 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md">
          Chat With Us
          <span className="absolute top-1/2 left-full -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
        </span>
      </a>
    </motion.div>
  );
}
