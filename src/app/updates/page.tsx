"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";

export default function Updates() {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Gather all unique tags
  const allTags = ["All", ...Array.from(new Set(blogPosts.flatMap((post) => post.tags)))];

  const filteredPosts = blogPosts.filter(
    (post) => selectedTag === "All" || post.tags.includes(selectedTag)
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50/50 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-primary-light uppercase tracking-widest">Ground Updates</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">News & Press Releases</h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              Browse our transparency reports, community learning milestones, and emergency camp highlights.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        <div className="flex flex-wrap justify-center gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedTag === tag
                  ? "bg-primary text-white shadow-lg shadow-primary/10"
                  : "bg-slate-100 hover:bg-slate-200 text-secondary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full group"
            >
              <Link href={`/updates/${post.slug}`} className="relative aspect-video overflow-hidden bg-slate-100 block shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
              </Link>
              <div className="p-6 flex flex-col flex-grow space-y-3">
                <div className="flex items-center gap-4 text-xs text-slate-450 font-semibold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="text-base font-extrabold text-secondary leading-snug group-hover:text-primary transition-colors">
                  <Link href={`/updates/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-sm text-slate-500 line-clamp-3 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 shrink-0">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-2 py-0.5 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-primary shrink-0">
                  <span>Author: {post.author.split(" (")[0]}</span>
                  <Link href={`/updates/${post.slug}`} className="flex items-center gap-1 hover:underline">
                    Read More
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
