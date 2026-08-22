"use client";

import Link from "next/link";
import { Heart, ArrowRight, ShieldCheck, Award, HeartHandshake, Instagram, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";
import Testimonials from "@/components/Testimonials";
import { campaigns } from "@/data/campaigns";
import { blogPosts } from "@/data/blog";

// Mock Instagram Posts Data
const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80",
    likes: "2.4k",
    comments: 84,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=400&q=80",
    likes: "1.8k",
    comments: 42,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80",
    likes: "3.1k",
    comments: 112,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=400&q=80",
    likes: "1.5k",
    comments: 29,
  },
];

export default function Home() {
  // Take top 3 campaigns for home page preview
  const featuredCampaigns = campaigns.slice(0, 3);
  // Take top 3 blog posts
  const featuredUpdates = blogPosts.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-950 overflow-hidden py-20">
        {/* Background Image with Dark Gradients */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80"
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
              Small Acts, <span className="text-primary-light">Big Impact.</span> <br />
              Empowering India&apos;s Slums.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-slate-300 leading-relaxed max-w-2xl"
            >
              We run direct diagnostics mobile clinics, sponsor higher education scholarships for slum girls, and serve nutritious food kitchens. 100% of your funds reach the beneficiaries.
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
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center text-center lg:first:pl-0 pt-6 sm:pt-0">
              <span className="text-3xl md:text-4xl font-extrabold text-primary flex items-center">
                <CountUp end={15200} suffix="+" />
              </span>
              <span className="text-sm font-semibold text-slate-500 mt-2">Lives Impacted Directly</span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center text-center pt-6 sm:pt-0 lg:pl-6">
              <span className="text-3xl md:text-4xl font-extrabold text-primary flex items-center">
                <CountUp end={50} suffix="+" />
              </span>
              <span className="text-sm font-semibold text-slate-500 mt-2">Active Ground Drives</span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center text-center pt-6 sm:pt-0 lg:pl-6">
              <span className="text-3xl md:text-4xl font-extrabold text-primary flex items-center">
                <CountUp end={100} suffix="%" />
              </span>
              <span className="text-sm font-semibold text-slate-500 mt-2">Financial Transparency</span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center text-center pt-6 sm:pt-0 lg:pl-6">
              <span className="text-3xl md:text-4xl font-extrabold text-primary flex items-center">
                ₹<CountUp end={45} suffix="L+" />
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
              const percent = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);
              return (
                <div key={campaign.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full group">
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
                    <h3 className="text-base font-extrabold text-secondary tracking-tight line-clamp-2 min-h-[48px] group-hover:text-primary transition-colors">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2 line-clamp-3 flex-grow">
                      {campaign.excerpt}
                    </p>

                    {/* Progress Bar */}
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
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Goal: ₹{campaign.goal.toLocaleString()}</span>
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
            {/* Pillar 1 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-secondary">80G & 12A Certified</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                All donations made to SewaPrith are eligible for a 50% tax deduction under Section 80G of the Indian Income Tax Act. Dynamic receipts are auto-generated instantly.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-secondary">0% Admin Fee Leak</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our founders fund all administrative, office setup, website domain, and Vercel hosting charges out of their pockets. 100% of public money directly purchases medicines or food.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-secondary">Direct Ground Reports</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                We believe in proof. We share geotagged photos, hospital diagnosis summaries, patient bills, and receipt vouchers directly with respective donors via custom updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIVE INSTAGRAM FEED SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12 space-y-3">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest">Connect With Us</h2>
            <p className="text-3xl font-extrabold text-secondary tracking-tight">Latest from our Instagram Feed</p>
            <p className="text-sm text-slate-500 max-w-lg">Follow <a href="https://instagram.com/sewaprith" target="_blank" rel="noreferrer" className="text-primary font-bold hover:underline">@sewaprith</a> on Instagram to get daily updates of our volunteering work, camps, and food drives.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href="https://instagram.com/sewaprith"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-200 border border-slate-100 block shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt="SewaPrith social post"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                  <div className="text-center space-y-1">
                    <Instagram className="w-7 h-7 mx-auto mb-1" />
                    <span className="block text-xs font-bold">{post.likes} Likes</span>
                    <span className="block text-[10px] text-slate-300">{post.comments} Comments</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
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
        {/* Decorative background shape */}
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
