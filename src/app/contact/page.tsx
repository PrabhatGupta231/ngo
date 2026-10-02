"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Mail, MapPin, MessageSquare, Loader2, Send } from "lucide-react";

// Form Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Contact form payload:", data);
      setIsSuccess(true);
      setIsSubmitting(false);
      reset();
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50/50 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-primary-light uppercase tracking-widest">Support Hub</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Contact Our Team</h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              Have questions regarding 80G tax exemptions, corporate CSR integrations, or volunteering schedules? Reach out and we will respond within 12 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info Cards */}
        <div className="space-y-6 lg:col-span-1">
          {/* Card 1 */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 text-sm">
              <h4 className="font-extrabold text-secondary">Office Address</h4>
              <p className="text-slate-500 leading-relaxed">
                Plot No 20, Nahar Road, Madiyon, Lucknow, Uttar Pradesh, India - 226021
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 text-sm">
              <h4 className="font-extrabold text-secondary">Official Email</h4>
              <a href="mailto:info@sewaprith.org" className="text-slate-500 hover:text-primary transition-colors font-semibold block">
                info@sewaprith.org
              </a>
              <a href="mailto:donor@sewaprith.org" className="text-slate-400 hover:text-primary transition-colors font-medium text-xs block">
                donor@sewaprith.org (Receipt queries)
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 text-sm">
              <h4 className="font-extrabold text-secondary">Phone Number</h4>
              <a href="tel:+918417801736" className="text-slate-500 hover:text-primary transition-colors font-semibold block">
                +91 8417801736
              </a>
              <span className="text-[10px] text-slate-400 font-bold block">MON-SAT 9:00 AM to 6:00 PM</span>
            </div>
          </div>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/918417801736?text=Hi!%20I%20have%20a%20query%20regarding%20SewaPrith%20NGO."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366]/5 border border-[#25D366]/25 rounded-2xl p-6 shadow-sm flex items-center gap-4 hover:bg-[#25D366]/10 transition-colors group cursor-pointer"
          >
            <div className="w-10 h-10 bg-[#25D366] text-white rounded-xl flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div className="space-y-0.5 text-sm">
              <h4 className="font-extrabold text-secondary group-hover:text-primary transition-colors">WhatsApp Quick Chat</h4>
              <p className="text-xs text-slate-500">Connect directly with a coordinator.</p>
            </div>
          </a>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-secondary mb-6 border-b border-slate-50 pb-4">Send a Message</h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Your Name"
                  className={`w-full bg-slate-50 border text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-medium ${
                    errors.name ? "border-rose-450" : "border-slate-200"
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-500 font-semibold">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Your Email Address"
                  className={`w-full bg-slate-50 border text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-medium ${
                    errors.email ? "border-rose-450" : "border-slate-200"
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-500 font-semibold">{errors.email.message}</p>}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <input
                type="text"
                {...register("subject")}
                placeholder="Message Subject (e.g. CSR query, 80G help)"
                className={`w-full bg-slate-50 border text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-medium ${
                  errors.subject ? "border-rose-450" : "border-slate-200"
                }`}
              />
              {errors.subject && <p className="text-xs text-rose-500 font-semibold">{errors.subject.message}</p>}
            </div>

            {/* Message Body */}
            <div className="space-y-1">
              <textarea
                rows={5}
                {...register("message")}
                placeholder="How can we help you?"
                className={`w-full bg-slate-50 border text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-medium resize-none ${
                  errors.message ? "border-rose-450" : "border-slate-200"
                }`}
              />
              {errors.message && <p className="text-xs text-rose-500 font-semibold">{errors.message.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center py-3.5 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-hover shadow-md shadow-primary/15 transition-all cursor-pointer disabled:bg-slate-350 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  Send Message Securely
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </button>

            {isSuccess && (
              <p className="text-xs text-primary font-extrabold text-center bg-primary-light/50 border border-primary/20 rounded-xl py-3 animate-pulse">
                Thank you! Your query has been logged. Our ground coordinator will email you shortly.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm overflow-hidden aspect-[21/9] w-full min-h-[300px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2s0x390d03d3f5729d71:0x4d3f50cf0d5f479a!2sSafdarjung+Enclave,+New+Delhi,+Delhi!5m2!1s"
            className="w-full h-full border-0 rounded-2xl"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SewaPrith Office Google Map Location"
          />
        </div>
      </section>
    </div>
  );
}
