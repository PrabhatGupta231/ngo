"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Send, Phone, Mail, MapPin } from "lucide-react";

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
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">SewaPrith</span>
                <span className="block text-[9px] font-semibold text-primary tracking-widest uppercase">
                  Foundation
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400">
              SewaPrith Foundation is a registered non-profit organization dedicated to healthcare, education, and disaster relief for underserved communities.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p><span className="font-semibold text-slate-300">Reg No:</span> NGO/DEL/2026/894372</p>
              <p><span className="font-semibold text-slate-300">Darpan ID:</span> DL/2026/0401824</p>
              <p><span className="font-semibold text-slate-300">Tax Status:</span> 12A & 80G Tax Exempted</p>
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
                <span>124, Ground Floor, Sewa Bhawan, Outer Ring Road, Safdarjung Enclave, New Delhi - 110029</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:info@sewaprith.org" className="hover:text-primary transition-colors">info@sewaprith.org</a>
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
