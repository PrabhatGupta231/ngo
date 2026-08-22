import GalleryLightbox from "@/components/GalleryLightbox";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Gallery",
  description: "View photos and YouTube video summaries of SewaPrith Foundation's slum learning labs, disaster aid drives, and diagnostic health clinics on the ground.",
};

export default function GalleryPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50/50 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-primary-light uppercase tracking-widest">Ground Work</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Our Media & Gallery</h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              Take a look at real-time ground photos and video recordings of our operations, volunteer distributions, and medical setups.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <GalleryLightbox />
      </section>
    </div>
  );
}
