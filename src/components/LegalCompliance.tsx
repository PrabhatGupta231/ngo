"use client";

import { motion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  BadgeCheck,
  Building2,
  FileText,
  MapPin,
  Calendar,
  Hash,
  AlertCircle,
  Banknote,
  Receipt,
  Info,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 ml-2 whitespace-nowrap">
      <BadgeCheck className="w-3 h-3" />
      Verified
    </span>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  verified = false,
  mono = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  verified?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="mt-0.5 w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className={`text-sm font-bold text-secondary mt-0.5 break-all ${mono ? "font-mono" : ""}`}>
          {value}
          {verified && <VerifiedBadge />}
        </p>
      </div>
    </div>
  );
}

export default function LegalCompliance() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 bg-primary/8 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <ShieldCheck className="w-4 h-4" />
            Legal &amp; Compliance
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-secondary leading-tight">
            Registrations, Transparency &amp;{" "}
            <span className="text-primary">Tax Benefits</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
            SEVAPRITH FOUNDATION is a fully registered, government-compliant non-profit. Every
            registration, licence and tax number below is publicly verifiable.
          </p>
        </motion.div>

        {/* Two Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

          {/* ── Card 1: Legal Accreditations ── */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-slate-150 shadow-sm shadow-slate-200/60 overflow-hidden"
          >
            {/* Card Header */}
            <div className="flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-primary/5 to-transparent border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-extrabold text-secondary text-base">Legal Accreditations</h3>
                <p className="text-[11px] text-slate-400 font-medium">Company &amp; Registration Details</p>
              </div>
            </div>

            {/* Rows */}
            <div className="px-6 pb-2">
              <Row
                icon={Building2}
                label="Legal Name"
                value="SEVAPRITH FOUNDATION"
              />
              <Row
                icon={FileText}
                label="Entity Type"
                value="Section 8 Company — Non-Profit (Companies Act, 2013)"
              />
              <Row
                icon={Hash}
                label="Section 8 Licence Number"
                value="178498"
                verified
                mono
              />
              <Row
                icon={Calendar}
                label="Date of Incorporation"
                value="14 January 2026"
              />
              <Row
                icon={ShieldCheck}
                label="Permanent Account Number (PAN)"
                value="ABSCS4274Q"
                verified
                mono
              />
              <Row
                icon={Info}
                label="Nature of Activities"
                value="Charitable"
              />
              <Row
                icon={MapPin}
                label="Registered Office Address"
                value="Plot No 20, Nahar Road, Madiyon, Lucknow, Uttar Pradesh — 226021"
              />
            </div>
          </motion.div>

          {/* ── Card 2: Tax Exemption Information ── */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-slate-150 shadow-sm shadow-slate-200/60 overflow-hidden"
          >
            {/* Card Header */}
            <div className="flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-emerald-50 to-transparent border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Receipt className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h3 className="font-extrabold text-secondary text-base">Tax Exemption Information</h3>
                <p className="text-[11px] text-slate-400 font-medium">Income Tax Registrations &amp; Donor Benefits</p>
              </div>
            </div>

            <div className="px-6 pb-2">
              {/* 12A Block */}
              <div className="mt-4 mb-2">
                <span className="inline-block text-[10px] font-extrabold text-primary bg-primary/8 px-3 py-1 rounded-full uppercase tracking-widest">
                  Income Tax Registration (12A Equivalent)
                </span>
              </div>
              <Row
                icon={FileText}
                label="Registered Under Section"
                value="332"
                mono
              />
              <Row
                icon={Hash}
                label="Unique Registration Number (URN)"
                value="ABSCS4274QE20261"
                verified
                mono
              />
              <Row
                icon={Calendar}
                label="Validity (Assessment Years)"
                value="2026-27 to 2028-29"
              />

              {/* 80G Block */}
              <div className="mt-5 mb-2">
                <span className="inline-block text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                  Tax Exemption on Donations (80G Equivalent)
                </span>
              </div>
              <Row
                icon={Banknote}
                label="Approved Under Section"
                value="354"
                mono
              />
              <Row
                icon={Hash}
                label="Unique Registration Number (URN)"
                value="ABSCS4274QF20261"
                verified
                mono
              />
              <Row
                icon={Calendar}
                label="Validity (Assessment Years)"
                value="2026-27 to 2028-29"
              />
            </div>
          </motion.div>
        </div>

        {/* ── Donor Notice Banner ── */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 md:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="space-y-3">
              <h4 className="font-extrabold text-secondary text-base">
                Important Notice for Donors — Tax Deduction Eligibility
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                All donations made to{" "}
                <span className="font-bold text-secondary">SEVAPRITH FOUNDATION</span> are eligible
                for tax deduction benefits under provisional approval{" "}
                <span className="font-bold text-secondary">u/s 354</span>{" "}
                <span className="font-mono text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                  (URN: ABSCS4274QF20261)
                </span>.
              </p>
              <div className="flex items-start gap-2 bg-white/70 border border-amber-100 rounded-xl px-4 py-3">
                <Banknote className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-bold text-amber-700">Cash Donation Limit:</span> As per
                  Income Tax guidelines,{" "}
                  <span className="font-bold text-secondary">
                    cash donations exceeding ₹2,000 are not eligible for 80G tax benefits.
                  </span>{" "}
                  Please donate via <span className="font-semibold">digital modes / bank transfer</span>{" "}
                  to receive your{" "}
                  <span className="font-semibold text-primary">Form 10BE donation certificate</span>.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
