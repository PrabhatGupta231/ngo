"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heart, Sparkles, Check, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Validation Schema using Zod
const volunteerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().length(10, "Phone number must be exactly 10 digits").regex(/^[0-9]+$/, "Phone number must contain only numbers"),
  city: z.string().min(2, "Please enter a valid city"),
  skills: z.enum(["teaching", "medical", "food", "marketing", "administration"], {
    message: "Please select your primary skill area",
  }),
  availability: z.enum(["weekends", "weekdays", "both"], {
    message: "Please select your availability",
  }),
  message: z.string().min(10, "Please share a brief introduction (min 10 characters)"),
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

export default function Volunteer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
  });

  const onSubmit = async (data: VolunteerFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Submission failed. Please try again.");
      }

      setIsSuccess(true);

      // Fire confetti celebration
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Submission failed. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50/50 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-primary-light uppercase tracking-widest">Get Involved</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Become a Volunteer</h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              Dedicate your weekends or skill sets to make a real impact. Join our volunteer network and lead local food, education, or healthcare camper drives.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 w-full pt-12">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm relative">
          
          <div className="max-w-xl mb-8 space-y-2">
            <h2 className="text-xl font-extrabold text-secondary flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Volunteer Registration Form
            </h2>
            <p className="text-xs text-slate-500">
              Form configured for webhook integrations (Formspree / Tally). Fill out the details to join our community channels.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className={`w-full bg-slate-50 border text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-medium ${
                    errors.name ? "border-rose-450" : "border-slate-200"
                  }`}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="text-xs text-rose-500 font-semibold pl-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full bg-slate-50 border text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-medium ${
                    errors.email ? "border-rose-450" : "border-slate-200"
                  }`}
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-rose-500 font-semibold pl-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">10-Digit Mobile Number</label>
                <input
                  type="tel"
                  {...register("phone")}
                  className={`w-full bg-slate-50 border text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-medium ${
                    errors.phone ? "border-rose-450" : "border-slate-200"
                  }`}
                  placeholder="8417801736"
                />
                {errors.phone && (
                  <p className="text-xs text-rose-500 font-semibold pl-1">{errors.phone.message}</p>
                )}
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Residence City</label>
                <input
                  type="text"
                  {...register("city")}
                  className={`w-full bg-slate-50 border text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-medium ${
                    errors.city ? "border-rose-450" : "border-slate-200"
                  }`}
                  placeholder="e.g. New Delhi"
                />
                {errors.city && (
                  <p className="text-xs text-rose-500 font-semibold pl-1">{errors.city.message}</p>
                )}
              </div>

              {/* Primary Skill */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Interest / Skill</label>
                <select
                  {...register("skills")}
                  className={`w-full bg-slate-50 border text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-semibold ${
                    errors.skills ? "border-rose-450" : "border-slate-200"
                  }`}
                >
                  <option value="">Select a skill area</option>
                  <option value="teaching">Slum Digital Tutoring & English Classes</option>
                  <option value="medical">Healthcare camp diagnostic support</option>
                  <option value="food">Slum Food Drive Kitchen Assistance</option>
                  <option value="marketing">Social Media marketing & Photography</option>
                  <option value="administration">Event organization & Backoffice operations</option>
                </select>
                {errors.skills && (
                  <p className="text-xs text-rose-500 font-semibold pl-1">{errors.skills.message}</p>
                )}
              </div>

              {/* Availability */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Work Availability</label>
                <select
                  {...register("availability")}
                  className={`w-full bg-slate-50 border text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-semibold ${
                    errors.availability ? "border-rose-450" : "border-slate-200"
                  }`}
                >
                  <option value="">Select availability</option>
                  <option value="weekends">Saturdays & Sundays (Ground Drives)</option>
                  <option value="weekdays">Monday to Friday (Remote Support)</option>
                  <option value="both">Flexible availability (ground & remote)</option>
                </select>
                {errors.availability && (
                  <p className="text-xs text-rose-500 font-semibold pl-1">{errors.availability.message}</p>
                )}
              </div>
            </div>

            {/* Introduction Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Why do you want to join SewaPrith Foundation?</label>
              <textarea
                rows={4}
                {...register("message")}
                className={`w-full bg-slate-50 border text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-medium resize-none ${
                  errors.message ? "border-rose-450" : "border-slate-200"
                }`}
                placeholder="Share a brief introduction about your goals and any past volunteer experience..."
              />
              {errors.message && (
                <p className="text-xs text-rose-500 font-semibold pl-1">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center py-4 rounded-2xl text-base font-bold text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer hover:scale-101 active:scale-99 disabled:bg-slate-350 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending your application...
                </>
              ) : (
                <>
                  Submit Volunteer Application
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>

            {/* Inline Error Banner */}
            {submitError && (
              <div className="mt-3 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-sm text-rose-600 font-semibold">
                ⚠️ {submitError}
              </div>
            )}
          </form>

          {/* Success Modal Overlay */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
              >
                <div className="absolute inset-0" onClick={() => setIsSuccess(false)} />
                <motion.div
                  initial={{ scale: 0.95, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 15 }}
                  className="bg-white border border-slate-100 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6 z-10"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-secondary">Application Received!</h3>
                    <p className="text-sm text-slate-500">
                      Thank you for applying! A confirmation email has been sent to your inbox. Our community coordinator will message you on WhatsApp within 48 hours to add you to the volunteers channel.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSuccess(false)}
                    className="w-full py-3 rounded-xl font-bold bg-primary hover:bg-primary-hover text-white transition-colors cursor-pointer"
                  >
                    Back to Form
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
