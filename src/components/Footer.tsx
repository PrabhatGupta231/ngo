"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Send, Phone, Mail, MapPin, BadgeCheck } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-secondary text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Legal Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <div className="h-[70px] w-[160px] overflow-hidden flex items-center justify-center">
                <Image
                  src="/logoo.png"
                  alt="SewaPrith Foundation"
                  width={100}
                  height={64}
                  className="h-[50px] w-auto object-contain scale-[1.25]"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-400">
              SewaPrith Foundation is a registered non-profit organisation dedicated to healthcare, education, and community upliftment for underserved communities.
            </p>
            {/* Clean Trust Badges */}
            <div className="pt-1 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <BadgeCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                <span><span className="font-semibold text-white">Section 8 Non-Profit</span> · MCA, Govt. of India · Licence No: 178498</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><span className="font-semibold text-white">80G Approved</span> · Tax deduction eligible on all donations</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">About Our Mission</Link>
              </li>
              <li>
                <Link href="/campaigns" className="hover:text-primary transition-colors">Active Projects</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-primary transition-colors">Media Gallery</Link>
              </li>
              <li>
                <Link href="/updates" className="hover:text-primary transition-colors">News & Blogs</Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-primary transition-colors">Become a Volunteer</Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-primary transition-colors">Donate Online</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Plot No 20, Nahar Road, Madiyon, Lucknow, Uttar Pradesh, India - 226021</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+918417801736" className="hover:text-primary transition-colors">+91 8417801736</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:sevaprithfoundation@gmail.com" className="hover:text-primary transition-colors">sevaprithfoundation@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Subscribe to Updates</h3>
            <p className="text-sm text-slate-400 mb-4">
              Get monthly updates on our ground projects, donation drives, and transparency reports.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-primary text-white placeholder-slate-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors flex items-center justify-center shadow-lg shadow-primary/10"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-primary font-bold mt-2">
                Thank you! You have successfully subscribed.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SewaPrith Foundation. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Use</Link>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">All donations are tax-exempted under Section 80G of the Income Tax Act.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
