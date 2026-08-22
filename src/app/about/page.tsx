"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, HeartHandshake, Eye, Target, Compass, Download, Linkedin, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Arjun Mehta",
    role: "Founder & Executive Director",
    bio: "Ex-software engineer turned social entrepreneur. Arjun founded SewaPrith in 2024 to bring software-grade efficiency and complete open ledger transparency to India's charity space.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300&q=80",
    linkedin: "https://linkedin.com",
    email: "arjun@sewaprith.org",
  },
  {
    name: "Pooja Sharma",
    role: "Head of Child Education Programs",
    bio: "Pooja holds a Master's in Social Work from TISS. She oversees our Slum Digital learning labs, syllabus curation, and coordinates our volunteer teaching program.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80",
    linkedin: "https://linkedin.com",
    email: "pooja@sewaprith.org",
  },
  {
    name: "Dr. Vikram Sen",
    role: "Chief Medical Coordinator",
    bio: "Dr. Vikram is a retired pediatrician with 30+ years of public health experience. He leads our diagnostic camps, coordinating pharmaceutical supplies and surgeon alliances.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=80",
    linkedin: "https://linkedin.com",
    email: "vikram@sewaprith.org",
  }
];

export default function About() {
  const downloadReport = (filename: string) => {
    // Generate a quick mock text file simulating a PDF download
    const element = document.createElement("a");
    const file = new Blob([`SewaPrith Foundation Mock Audited Report - ${filename}. This is a placeholder for the actual PDF.`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Page Header */}
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-4"
          >
            <span className="text-xs font-bold text-primary-light uppercase tracking-widest">Who We Are</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">About SewaPrith Foundation</h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              We are a registered 12A/80G non-profit organization driven by a team of social workers, medical professionals, and volunteers striving for grassroot empowerment in slum settlements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-secondary">Our Vision</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                An India where no slum dweller is neglected due to lack of medical attention, no child is deprived of basic digital education, and no community is left to fend for itself in disasters.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-secondary">Our Mission</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Conducting scheduled health Camps, creating state-of-the-art slum computer centers, providing regular feeding programs, and building rapid relief frameworks for emergencies.
              </p>
            </div>

            {/* Core Values */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-secondary">Our Core Values</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Radical accountability, complete data transparency, gender parity in school admissions, and zero administrative cost leakage from public funds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Legal Badges */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest">Compliance</h2>
            <h2 className="text-3xl font-extrabold text-secondary tracking-tight">Legal Registrations & Audit Downloads</h2>
            <p className="text-sm text-slate-500">We operate under full compliance with Indian non-profit regulations and upload quarterly audited ledgers for public scrutiny.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Registrations List */}
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-6 lg:col-span-2">
              <h3 className="text-lg font-bold text-secondary border-b border-slate-50 pb-4">NGO Details & Tax Certificates</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-1">
                  <span className="text-slate-400 block text-xs uppercase font-bold">Registered Legal Name</span>
                  <span className="font-extrabold text-secondary">SewaPrith Welfare Association Foundation</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 block text-xs uppercase font-bold">NGO Darpan ID (NITI Aayog)</span>
                  <span className="font-extrabold text-secondary">DL/2026/0401824</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 block text-xs uppercase font-bold">NGO Registration Number</span>
                  <span className="font-extrabold text-secondary">NGO/DEL/2026/894372 (Section 8 Companies Act)</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 block text-xs uppercase font-bold">Income Tax Exemption Status</span>
                  <span className="font-extrabold text-secondary">12A & 80G Certified (Approved for 50% Tax Rebate)</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 block text-xs uppercase font-bold">Office PAN Card</span>
                  <span className="font-extrabold text-secondary">AAAAS9283F</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 block text-xs uppercase font-bold">GSTIN Registration</span>
                  <span className="font-extrabold text-secondary">07AAAAS9283F1Z1 (For medical items purchase rebate)</span>
                </div>
              </div>
            </div>

            {/* Downloads Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-secondary border-b border-slate-50 pb-4">Annual Reports</h3>
              <p className="text-xs text-slate-500">Download audited statements, income details, program deployment expenses, and active ground drive ledgers.</p>
              
              <div className="space-y-3">
                <button
                  onClick={() => downloadReport("SewaPrith_Annual_Report_2025")}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-primary hover:text-primary transition-all text-sm font-bold text-secondary group text-left cursor-pointer"
                >
                  <span>Annual Report 2025 (PDF)</span>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                </button>

                <button
                  onClick={() => downloadReport("SewaPrith_Audited_Accounts_Q1_2026")}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-primary hover:text-primary transition-all text-sm font-bold text-secondary group text-left cursor-pointer"
                >
                  <span>Audited Ledgers Q1 2026 (PDF)</span>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                </button>

                <button
                  onClick={() => downloadReport("SewaPrith_80G_Tax_Exemption_Approval")}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-primary hover:text-primary transition-all text-sm font-bold text-secondary group text-left cursor-pointer"
                >
                  <span>80G Exemption Approval (PDF)</span>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest">Leadership</h2>
            <h2 className="text-3xl font-extrabold text-secondary tracking-tight">Our Core Foundation Team</h2>
            <p className="text-sm text-slate-500">Meet the dedicated team working directly with doctors, school administrations, and local slums.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-shadow group flex flex-col h-full">
                {/* Team member photo */}
                <div className="relative aspect-square overflow-hidden bg-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                </div>
                {/* Details */}
                <div className="p-6 space-y-3 flex flex-col flex-grow">
                  <div>
                    <h3 className="font-extrabold text-lg text-secondary">{member.name}</h3>
                    <p className="text-xs text-primary font-bold">{member.role}</p>
                  </div>
                  <p className="text-sm text-slate-500 flex-grow leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex gap-4 pt-4 border-t border-slate-150 text-slate-400">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label={`${member.name} LinkedIn`}>
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors" aria-label={`Email ${member.name}`}>
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
