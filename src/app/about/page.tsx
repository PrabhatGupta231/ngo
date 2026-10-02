"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, Eye, Target, Compass, Linkedin, Mail, BadgeCheck, Banknote } from "lucide-react";

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

      {/* Our Credibility & Trust */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Why Trust Us</span>
            <h2 className="mt-2 text-3xl font-extrabold text-secondary tracking-tight">Our Credibility &amp; Trust</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0 }}
              className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BadgeCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-secondary">Registered Non-Profit</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Incorporated as a <span className="font-semibold text-secondary">Section 8 Non-Profit Organisation</span> under the Ministry of Corporate Affairs, Govt. of India
                  {" "}(Licence No: <span className="font-mono font-semibold">178498</span>).
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Banknote className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-secondary">80G Tax Exemption</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Eligible donations qualify for <span className="font-semibold text-secondary">tax deduction benefits</span> under Section 80G
                  {" "}(Provisional Approval u/s 354).
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-secondary">100% Transparency</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  All funds and project expenditures are strictly deployed towards our <span className="font-semibold text-secondary">core charitable initiatives</span> and public welfare.
                </p>
              </div>
            </motion.div>
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
