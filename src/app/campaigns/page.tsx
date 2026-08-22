"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, Calendar, ArrowRight, X, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { campaigns, Campaign } from "@/data/campaigns";

function CampaignsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [filter, setFilter] = useState<string>("All");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Parse campaign ID from query params to auto-open modal if linked from home page
  useEffect(() => {
    const campaignId = searchParams.get("id");
    if (campaignId) {
      const found = campaigns.find((c) => c.id === campaignId);
      if (found) {
        setSelectedCampaign(found);
      }
    }
  }, [searchParams]);

  const handleOpenDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    // Update URL query parameters without full page reload
    router.push(`/campaigns?id=${campaign.id}`, { scroll: false });
  };

  const handleCloseDetails = () => {
    setSelectedCampaign(null);
    router.push("/campaigns", { scroll: false });
  };

  const categories = ["All", "Education", "Healthcare", "Food Relief", "Emergency Aid"];

  const filteredCampaigns = campaigns.filter(
    (c) => filter === "All" || c.category === filter
  );

  return (
    <div className="space-y-12">
      {/* Categories Filter Grid */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              filter === cat
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-slate-100 hover:bg-slate-200 text-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCampaigns.map((campaign) => {
          const percent = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);
          return (
            <div
              key={campaign.id}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
            >
              {/* Card Image */}
              <div className="relative aspect-video overflow-hidden bg-slate-100 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <span className="absolute top-3 left-3 bg-secondary/80 text-[10px] font-bold text-white uppercase px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {campaign.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-extrabold text-secondary tracking-tight line-clamp-2 min-h-[48px] group-hover:text-primary transition-colors">
                  {campaign.title}
                </h3>
                
                <p className="text-sm text-slate-500 mt-2 line-clamp-3 flex-grow leading-relaxed">
                  {campaign.excerpt}
                </p>

                {/* Progress bar info */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between items-end text-xs">
                    <div>
                      <span className="text-slate-400">Raised:</span>{" "}
                      <span className="font-extrabold text-secondary">₹{campaign.raised.toLocaleString()}</span>
                    </div>
                    <span className="font-extrabold text-primary bg-primary-light px-2 py-0.5 rounded text-[10px]">
                      {percent}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Goal: ₹{campaign.goal.toLocaleString()}</span>
                    <span>{campaign.daysLeft} days left</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-50 flex gap-3">
                  <button
                    onClick={() => handleOpenDetails(campaign)}
                    className="flex-1 inline-flex items-center justify-center py-2.5 rounded-xl text-xs font-bold border border-slate-200 text-secondary hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Read Story
                  </button>
                  <Link
                    href={`/donate?campaign=${campaign.id}`}
                    className="flex-1 inline-flex items-center justify-center py-2.5 rounded-xl text-xs font-bold text-white bg-accent-coral hover:bg-accent-coral-hover shadow-md shadow-accent-coral/10 hover:scale-102 duration-200"
                  >
                    Donate
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Campaign Detail Modal */}
      <AnimatePresence>
        {selectedCampaign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            {/* Backdrop click close */}
            <div className="absolute inset-0" onClick={handleCloseDetails} />

            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-w-2xl w-full border border-slate-100 max-h-[90vh] flex flex-col relative"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover Image */}
              <div className="relative aspect-video w-full bg-slate-100 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedCampaign.image}
                  alt={selectedCampaign.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-primary text-[10px] font-bold text-white uppercase px-2.5 py-1 rounded-full">
                    {selectedCampaign.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white mt-2 leading-tight">
                    {selectedCampaign.title}
                  </h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-grow">
                {/* Stats Panel */}
                <div className="grid grid-cols-3 gap-4 bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Raised</span>
                    <span className="font-extrabold text-primary text-base md:text-lg">₹{selectedCampaign.raised.toLocaleString()}</span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Target Goal</span>
                    <span className="font-extrabold text-secondary text-base md:text-lg">₹{selectedCampaign.goal.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Donors</span>
                    <span className="font-extrabold text-secondary text-base md:text-lg">{selectedCampaign.donorCount}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-500">Fundraising Progress</span>
                    <span className="text-primary bg-primary-light px-2 py-0.5 rounded">
                      {Math.min(Math.round((selectedCampaign.raised / selectedCampaign.goal) * 100), 100)}% Funded
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${Math.min((selectedCampaign.raised / selectedCampaign.goal) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Story */}
                <div className="space-y-4">
                  <h3 className="font-extrabold text-secondary text-base flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-primary shrink-0" />
                    Campaign Story & Purpose
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {selectedCampaign.story}
                  </p>
                </div>

                {/* Extra Trust Banner */}
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3 text-xs text-primary leading-relaxed items-start">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-primary mt-0.5" />
                  <div>
                    <span className="font-bold block">100% Transparency Guaranteed</span>
                    Geotagged distribution bills, medical camp summaries, and direct recipient audits are published quarterly and mailed to donors.
                  </div>
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
                <span className="text-xs text-slate-400">Section 80G tax exemption active</span>
                <Link
                  href={`/donate?campaign=${selectedCampaign.id}`}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold text-white bg-accent-coral hover:bg-accent-coral-hover shadow-lg shadow-accent-coral/20 cursor-pointer hover:scale-102 duration-200"
                >
                  Sponsor This Cause Now
                  <Heart className="w-4 h-4 ml-2 fill-current" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Campaigns() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50/50 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-primary-light uppercase tracking-widest">Active Causes</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Our Projects & Campaigns</h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              Support healthcare diagnostics camps, school computer installations, slum meal distribution centers, and emergency relief works. 
            </p>
          </div>
        </div>
      </section>

      {/* Campaigns Listing Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <Suspense fallback={<div className="text-center py-12 text-slate-500 font-bold">Loading campaigns...</div>}>
          <CampaignsList />
        </Suspense>
      </section>
    </div>
  );
}
