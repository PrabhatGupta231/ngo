  "use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight, ShieldCheck, Award, HeartHandshake, Instagram, Calendar, Clock, X, Youtube, Facebook, PlayCircle, ExternalLink } from "lucide-react";
import { formatINR } from "@/lib/formatCurrency";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "@/components/CountUp";
import Testimonials from "@/components/Testimonials";
import { campaigns } from "@/data/campaigns";
import { blogPosts } from "@/data/blog";
import { parseMediaUrl, Platform } from "@/lib/mediaParser";

// Default Fallbacks
const defaultHero = {
  tagline: "Small Acts, Big Impact.",
  headline: "Empowering India's Slums.",
  description: "We run direct diagnostics mobile clinics, sponsor higher education scholarships for slum girls, and serve nutritious food kitchens. 100% of your funds reach the beneficiaries.",
  bannerImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80"
};

const defaultStats = {
  livesImpacted: 15200,
  activeDrives: 50,
  transparency: 100,
  fundsDeployed: 45
};

const defaultPillars = [
  {
    title: "80G & 12A Certified",
    description: "All donations made to SewaPrith are eligible for a 50% tax deduction under Section 80G of the Indian Income Tax Act. Dynamic receipts are auto-generated instantly.",
    icon: Award
  },
  {
    title: "0% Admin Fee Leak",
    description: "Our founders fund all administrative, office setup, website domain, and Vercel hosting charges out of their pockets. 100% of public money directly purchases medicines or food.",
    icon: ShieldCheck
  },
  {
    title: "Direct Ground Reports",
    description: "We believe in proof. We share geotagged photos, hospital diagnosis summaries, patient bills, and receipt vouchers directly with respective donors via custom updates.",
    icon: HeartHandshake
  }
];

export default function Home() {
  const [liveProgress, setLiveProgress] = useState<Record<string, { raised: number; target: number }>>({});
  const [siteContent, setSiteContent] = useState<any>(null);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showFloatingPopup, setShowFloatingPopup] = useState(false);
  const [mediaFilter, setMediaFilter] = useState<Platform | 'all'>('all');

  useEffect(() => {
    // Fetch live progress
    fetch("/api/campaign-progress")
      .then((res) => res.json())
      .then((data) => setLiveProgress(data))
      .catch((err) => console.error("Error loading live progress:", err));

    // Fetch dynamic site content
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        const payload = data.data || data;
        setSiteContent(payload);
        if (payload?.announcement?.enabled) {
          setShowAnnouncement(true);
          // Auto trigger floating popup once per session
          if (!sessionStorage.getItem('popupShown')) {
             setTimeout(() => setShowFloatingPopup(true), 3000);
             sessionStorage.setItem('popupShown', 'true');
          }
        }
      })
      .catch((err) => console.error("Error loading site content:", err));
  }, []);

  const featuredCampaigns = campaigns.slice(0, 3);
  const featuredUpdates = blogPosts.slice(0, 3);

  // Safe Accessors with Fallbacks
  const hero = siteContent?.hero || defaultHero;
  const stats = siteContent?.impactStats || defaultStats;
  const announcement = siteContent?.announcement;
  
  const pillars = (siteContent?.trustPillars?.length ? siteContent.trustPillars : defaultPillars).map((p: any, i: number) => ({
    ...p,
    icon: [Award, ShieldCheck, HeartHandshake][i] || Award
  }));
  
  const activeMediaFeeds = siteContent?.socialMediaFeeds?.filter((f: any) => f.active) || [];
  const filteredMedia = mediaFilter === 'all' ? activeMediaFeeds : activeMediaFeeds.filter((f: any) => f.platform === mediaFilter);

  return (
    <div className="flex flex-col w-full relative">
      
      {/* TOP NOTIFICATION BANNER */}
      <AnimatePresence>
        {showAnnouncement && announcement && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`w-full relative z-50 flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white shadow-md ${
              announcement.type === 'urgent' ? 'bg-rose-600' : 
              announcement.type === 'success' ? 'bg-emerald-600' : 
              'bg-blue-600'
            }`}
          >
            <div className="flex items-center justify-center gap-2 max-w-7xl mx-auto flex-1 pr-8">
              <span>{announcement.message}</span>
              {announcement.link && (
                <Link href={announcement.link} className="underline font-bold hover:text-white/80 transition-colors whitespace-nowrap">
                  Learn more →
                </Link>
              )}
            </div>
            <button onClick={() => setShowAnnouncement(false)} className="absolute right-4 hover:bg-black/10 rounded-full p-1 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING NOTIFICATION POPUP */}
      <AnimatePresence>
        {showFloatingPopup && announcement && (
           <motion.div
             initial={{ opacity: 0, y: 50, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, scale: 0.9, y: 20 }}
             className="fixed bottom-6 right-6 z-[60] max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
           >
             <div className={`h-1.5 w-full ${
                announcement.type === 'urgent' ? 'bg-rose-500' : 
                announcement.type === 'success' ? 'bg-emerald-500' : 
                'bg-blue-500'
              }`} />
             <div className="p-5 relative pr-10">
               <button onClick={() => setShowFloatingPopup(false)} className="absolute top-4 right-4 text-slate-400 hover:bg-slate-100 rounded-full p-1 transition-colors">
                 <X className="w-4 h-4" />
               </button>
               <h4 className="font-extrabold text-slate-900 mb-2">Notice</h4>
               <p className="text-sm text-slate-600 mb-4 leading-relaxed">{announcement.message}</p>
               {announcement.link && (
                 <Link href={announcement.link} onClick={() => setShowFloatingPopup(false)} className="inline-block text-xs font-bold text-white bg-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                   View Details
                 </Link>
               )}
             </div>
           </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-950 overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero.bannerImage || defaultHero.bannerImage}
            alt="SewaPrith Children Education Relief"
            className="w-full h-full object-cover opacity-35 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary-light"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-primary-light animate-pulse" />
              100% Tax-Exempt NGO Under 80G
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              {hero.tagline?.split(',')[0] || "Small Acts"}{hero.tagline?.includes(',') ? "," : ""} <span className="text-primary-light">{hero.tagline?.split(',').slice(1).join(',') || "Big Impact."}</span> <br />
              {hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-slate-300 leading-relaxed max-w-2xl"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-white bg-accent-coral hover:bg-accent-coral-hover transition-colors shadow-lg shadow-accent-coral/25 hover:scale-102 duration-200"
              >
                Donate Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-white bg-secondary-light border border-slate-700 hover:bg-secondary transition-colors hover:border-slate-600 duration-200"
              >
                Become a Volunteer
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. LIVE IMPACT COUNTER */}
      <section className="relative -mt-16 z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl py-8 px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
            <div className="flex flex-col items-center justify-center text-center lg:first:pl-0 pt-6 sm:pt-0">
              <span className="text-3xl md:text-4xl font-extrabold text-primary flex items-center">
                {stats.livesImpacted > 0 && <CountUp end={stats.livesImpacted} suffix="+" />}
              </span>
              <span className="text-sm font-semibold text-slate-500 mt-2">Lives Impacted Directly</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center pt-6 sm:pt-0 lg:pl-6">
              <span className="text-3xl md:text-4xl font-extrabold text-primary flex items-center">
                {stats.activeDrives > 0 && <CountUp end={stats.activeDrives} suffix="+" />}
              </span>
              <span className="text-sm font-semibold text-slate-500 mt-2">Active Ground Drives</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center pt-6 sm:pt-0 lg:pl-6">
              <span className="text-3xl md:text-4xl font-extrabold text-primary flex items-center">
                {stats.transparency > 0 && <CountUp end={stats.transparency} suffix="%" />}
              </span>
              <span className="text-sm font-semibold text-slate-500 mt-2">Financial Transparency</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center pt-6 sm:pt-0 lg:pl-6">
              <span className="text-3xl md:text-4xl font-extrabold text-primary flex items-center">
                ₹{stats.fundsDeployed > 0 && <CountUp end={stats.fundsDeployed} suffix="L+" />}
              </span>
              <span className="text-sm font-semibold text-slate-500 mt-2">Funds Deployed on Ground</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACTIVE CAMPAIGNS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-xl">
              <h2 className="text-xs font-bold text-primary uppercase tracking-widest">Help Today</h2>
              <p className="text-3xl font-extrabold text-secondary mt-2 tracking-tight">Active Fundraising Campaigns</p>
              <p className="text-sm text-slate-500 mt-2">Sponsor healthcare equipment, digital notebooks, and meals. Track real-time progress on each cause.</p>
            </div>
            <Link
              href="/campaigns"
              className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-hover transition-colors gap-1.5 mt-4 md:mt-0"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign) => {
              const liveData = liveProgress[campaign.id];
              const raised = liveData ? liveData.raised : campaign.raised;
              const goal = liveData ? liveData.target : campaign.goal;
              const percent = Math.min(Math.round((raised / goal) * 100), 100);

              return (
                <div key={campaign.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full group">
                  <div className="relative aspect-video overflow-hidden bg-slate-100 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                    <span className="absolute top-3 left-3 bg-secondary/80 text-[10px] font-bold text-white uppercase px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {campaign.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-base font-extrabold text-secondary tracking-tight line-clamp-2 min-h-[48px] group-hover:text-primary transition-colors">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2 line-clamp-3 flex-grow">
                      {campaign.excerpt}
                    </p>

                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between items-end text-xs">
                        <div>
                          <span className="text-slate-400">Raised:</span>{" "}
                          <span className="font-extrabold text-secondary">₹{formatINR(raised)}</span>
                        </div>
                        <span className="font-extrabold text-primary bg-primary-light px-2 py-0.5 rounded text-[10px]">
                          {percent}%
                        </span>
                      </div>
                      
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Goal: ₹{formatINR(goal)}</span>
                        <span>{campaign.daysLeft} days left</span>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-50">
                      <Link
                        href={`/campaigns?id=${campaign.id}`}
                        className="w-full inline-flex items-center justify-center py-2.5 rounded-xl text-sm font-bold text-primary bg-primary-light hover:bg-primary/20 transition-colors"
                      >
                        Support This Cause
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHY SUPPORT US: TRUST PILLARS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest">Why SewaPrith?</h2>
            <p className="text-3xl font-extrabold text-secondary tracking-tight">Our Trust & Transparency Pillars</p>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">We are committed to building long-term local trust by proving every single transaction has a direct ground impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar: any, index: number) => {
              const Icon = pillar.icon;
              return (
                <div key={index} className="bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center space-y-4 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary">{pillar.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. LIVE MEDIA & SOCIAL UPDATES */}
      <section className="pt-28 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-8 space-y-3">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest">Connect With Us</h2>
            <p className="text-3xl font-extrabold text-secondary tracking-tight">Live Media & Social Updates</p>
            <p className="text-sm text-slate-500 max-w-lg">Watch our direct ground relief operations and campaigns across social media.</p>
          </div>

          {/* Social Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
             <button onClick={() => setMediaFilter('all')} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${mediaFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}>All Posts</button>
             <button onClick={() => setMediaFilter('youtube')} className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold transition-colors ${mediaFilter === 'youtube' ? 'bg-rose-600 text-white border-rose-600' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}><Youtube className="w-4 h-4" /> YouTube</button>
             <button onClick={() => setMediaFilter('instagram')} className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold transition-colors ${mediaFilter === 'instagram' ? 'bg-gradient-to-tr from-yellow-400 via-rose-500 to-fuchsia-600 text-white border-transparent' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}><Instagram className="w-4 h-4" /> Instagram</button>
             <button onClick={() => setMediaFilter('facebook')} className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold transition-colors ${mediaFilter === 'facebook' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}><Facebook className="w-4 h-4" /> Facebook</button>
          </div>

          {filteredMedia.length === 0 ? (
             <div className="text-center p-12 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-500">
                <PlayCircle className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                <p>No media posts available for this platform right now.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
              <AnimatePresence>
                {filteredMedia.map((post: any) => {
                  const { embedUrl, isShort, platform } = parseMediaUrl(post.url);
                  const isVertical = isShort || platform === 'instagram';
                  
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={post.id}
                      className="group relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-[350px] mx-auto aspect-[4/5] flex flex-col"
                    >
                      {/* Base Image / Iframe Container */}
                      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-slate-900">
                        {embedUrl ? (
                           <iframe 
                             src={embedUrl}
                             className={`w-full border-0 block ${
                               platform === 'instagram' 
                               ? 'h-[calc(100%+130px)] -mt-[65px]' 
                               : 'h-full'
                             }`}
                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                             allowFullScreen
                             scrolling="no"
                             loading="lazy"
                             style={{ overflow: 'hidden', border: 'none' }}
                           />
                        ) : (
                           <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                              <ExternalLink className="w-8 h-8 mb-2 opacity-50" />
                              <span className="text-xs font-bold">Invalid Media Link</span>
                           </div>
                        )}
                      </div>
                      
                      {/* Subtle play badge for video content on default view */}
                      {isVertical && (
                        <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm p-1.5 rounded-full text-white/90 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                          <PlayCircle className="w-5 h-5" />
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-20">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-3">
                          
                          {/* Caption */}
                          {post.caption ? (
                            <p className="text-sm text-slate-200 line-clamp-3 leading-relaxed">
                              {post.caption}
                            </p>
                          ) : (
                            <p className="text-sm text-slate-300 italic">
                              View this post on {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </p>
                          )}
                          
                          {/* Action Button */}
                          <a 
                            href={post.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full py-2.5 mt-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-sm font-bold transition-all shadow-lg hover:shadow-xl"
                          >
                            {platform === 'instagram' ? <Instagram className="w-4 h-4" /> : platform === 'youtube' ? <Youtube className="w-4 h-4" /> : <Facebook className="w-4 h-4" />}
                            {isShort || platform === 'instagram' ? 'Watch Reel' : 'View Post'}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest">Stories</h2>
            <p className="text-3xl font-extrabold text-secondary tracking-tight">Supporter & Beneficiary Voice</p>
          </div>
          
          <Testimonials />
        </div>
      </section>

      {/* 7. RECENT UPDATES / BLOG PREVIEW */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold text-primary uppercase tracking-widest">Get Updated</h2>
              <p className="text-3xl font-extrabold text-secondary mt-2 tracking-tight">Latest News & Press Releases</p>
            </div>
            <Link
              href="/updates"
              className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-hover transition-colors gap-1.5 mt-4 md:mt-0"
            >
              Browse All News
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredUpdates.map((post) => (
              <article key={post.slug} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full group">
                <Link href={`/updates/${post.slug}`} className="relative aspect-video overflow-hidden bg-slate-100 block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-grow space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-secondary leading-snug group-hover:text-primary transition-colors">
                    <Link href={`/updates/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex gap-2 pt-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-0.5 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. DUAL CALL TO ACTION BANNER */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary-hover text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_40%)]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to make a difference in someone&apos;s life?</h2>
          <p className="text-slate-200 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Whether you choose to sponsor a child&apos;s digital lab class or volunteer your weekends to teach, your action matters. Join the SewaPrith movement today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/donate"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-bold text-primary bg-white hover:bg-slate-50 transition-colors shadow-lg hover:scale-102 duration-200"
            >
              Donate Online
            </Link>
            <Link
              href="/volunteer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-bold text-white border border-white/30 hover:bg-white/10 transition-colors hover:scale-102 duration-200"
            >
              Volunteer Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
