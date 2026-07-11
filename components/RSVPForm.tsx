"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, ChevronLeft, Heart, Loader2 } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import toast from "react-hot-toast";

type Step = 1 | 2 | 3;

interface RSVPFormData {
  full_name: string;
  email: string;
  phone: string;
  attending: boolean | null;
  plus_one: boolean;
  guest_count: number;
  dietary_restrictions: string;
  message: string;
}

const initialForm: RSVPFormData = {
  full_name: "",
  email: "",
  phone: "",
  attending: null,
  plus_one: false,
  guest_count: 1,
  dietary_restrictions: "",
  message: "",
};

export default function RSVPForm() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<RSVPFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: keyof RSVPFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.full_name.trim()) e.full_name = "Please enter your full name.";
    if (!form.email.trim() && !form.phone.trim())
      e.email = "Please enter an email or phone number.";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Please enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (form.attending === null) e.attending = "Please let us know if you can attend.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  };

  const handleBack = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        full_name:            form.full_name.trim(),
        email:                form.email.trim() || null,
        phone:                form.phone.trim() || null,
        attending:            form.attending as boolean,
        plus_one:             form.attending ? form.plus_one : false,
        guest_count:          form.attending ? form.guest_count : 0,
        dietary_restrictions: form.dietary_restrictions.trim() || null,
        message:              form.message.trim() || null,
      };

      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKvFUKGXOaDQlDmqvjeLdJ67zczI2sLYdQYUDiux_zUA-_Cen39R2sOnWcCPmunakx/exec";

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── SUCCESS STATE ──────────────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-champagne-100 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={48} className="text-orange-500" />
        </motion.div>
        <h3 className="font-serif text-4xl font-light text-charcoal mb-4">
          {form.attending ? "You're on the list! 🎉" : "We'll miss you 🧡"}
        </h3>
        <p className="font-sans text-charcoal/60 text-base max-w-sm mx-auto leading-relaxed">
          {form.attending
            ? `Thank you, ${form.full_name}! We can't wait to celebrate with you on ${WEDDING_CONFIG.weddingDateDisplay}. A confirmation has been sent to ${form.email || form.phone}.`
            : `Thank you for letting us know, ${form.full_name}. You'll be missed! We'll make sure to share the memories with you.`}
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 text-orange-500">
          <Heart size={14} className="fill-orange-500" />
          <span className="font-sans text-sm">{WEDDING_CONFIG.hashtag}</span>
          <Heart size={14} className="fill-orange-500" />
        </div>
      </motion.div>
    );
  }

  // ── STEP INDICATOR ─────────────────────────────────────────────────────
  const steps = ["Your Info", "Attendance", "Message"];

  return (
    <div className="max-w-lg mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans font-medium transition-all duration-300 ${
                  step > i + 1
                    ? "bg-orange-500 text-white"
                    : step === i + 1
                    ? "bg-orange-500 text-white ring-4 ring-orange-100"
                    : "bg-champagne-100 text-charcoal/40"
                }`}
              >
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className="text-xs font-sans text-charcoal/50 hidden sm:block">
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-12 sm:w-16 h-0.5 mb-4 transition-colors duration-300 ${
                  step > i + 1 ? "bg-orange-500" : "bg-champagne-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form steps */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div>
              <label className="block font-sans text-sm font-medium text-charcoal mb-2">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                className="form-input"
                placeholder="Your full name"
                value={form.full_name}
                onChange={(e) => update("full_name", e.target.value)}
              />
              {errors.full_name && (
                <p className="text-red-500 text-xs mt-1 font-sans">{errors.full_name}</p>
              )}
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-charcoal mb-2">
                Email Address
              </label>
              <input
                className="form-input"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-sans">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-charcoal mb-2">
                Phone Number <span className="text-charcoal/40 font-normal">(optional)</span>
              </label>
              <input
                className="form-input"
                type="tel"
                placeholder="(401) 555-0000"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Attending */}
            <div>
              <label className="block font-sans text-sm font-medium text-charcoal mb-3">
                Will you be attending? <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: true,  label: "Joyfully accepts 🎉" },
                  { value: false, label: "Regretfully declines" },
                ].map((opt) => (
                  <button
                    key={String(opt.value)}
                    type="button"
                    onClick={() => update("attending", opt.value)}
                    className={`py-4 px-4 rounded-xl border-2 text-sm font-sans font-medium text-center transition-all duration-200 ${
                      form.attending === opt.value
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-champagne-200 bg-white text-charcoal hover:border-orange-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.attending && (
                <p className="text-red-500 text-xs mt-1 font-sans">{errors.attending}</p>
              )}
            </div>

            <AnimatePresence>
              {form.attending && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5 overflow-hidden"
                >
                  {/* Plus one */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-charcoal mb-3">
                      Bringing a plus one?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: true,  label: "Yes" },
                        { value: false, label: "No" },
                      ].map((opt) => (
                        <button
                          key={String(opt.value)}
                          type="button"
                          onClick={() => update("plus_one", opt.value)}
                          className={`py-3 px-4 rounded-xl border-2 text-sm font-sans font-medium transition-all duration-200 ${
                            form.plus_one === opt.value
                              ? "border-orange-500 bg-orange-50 text-orange-700"
                              : "border-champagne-200 bg-white text-charcoal hover:border-orange-300"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Guest count */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-charcoal mb-2">
                      Total guests in your party (including yourself)
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => update("guest_count", Math.max(1, form.guest_count - 1))}
                        className="w-10 h-10 rounded-full border-2 border-champagne-200 text-charcoal text-xl font-light hover:border-orange-400 transition-colors flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="font-serif text-4xl font-light text-charcoal w-8 text-center">
                        {form.guest_count}
                      </span>
                      <button
                        type="button"
                        onClick={() => update("guest_count", Math.min(8, form.guest_count + 1))}
                        className="w-10 h-10 rounded-full border-2 border-champagne-200 text-charcoal text-xl font-light hover:border-orange-400 transition-colors flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Dietary */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-charcoal mb-2">
                      Dietary restrictions{" "}
                      <span className="text-charcoal/40 font-normal">(optional)</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="Vegetarian, vegan, gluten-free, allergies..."
                      value={form.dietary_restrictions}
                      onChange={(e) => update("dietary_restrictions", e.target.value)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div>
              <label className="block font-sans text-sm font-medium text-charcoal mb-2">
                Leave a message for the couple{" "}
                <span className="text-charcoal/40 font-normal">(optional)</span>
              </label>
              <textarea
                className="form-input resize-none"
                rows={5}
                placeholder="Share your excitement, well-wishes, or a favourite memory..."
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
              />
              <p className="text-xs text-charcoal/40 mt-1 font-sans text-right">
                {form.message.length} / 500
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-champagne-50 rounded-2xl p-5 border border-champagne-200 space-y-2">
              <p className="font-sans text-xs uppercase tracking-widest text-orange-500 mb-3">
                Review your RSVP
              </p>
              <p className="font-sans text-sm text-charcoal">
                <span className="font-medium">Name:</span> {form.full_name}
              </p>
              {form.email && (
                <p className="font-sans text-sm text-charcoal">
                  <span className="font-medium">Email:</span> {form.email}
                </p>
              )}
              {form.phone && (
                <p className="font-sans text-sm text-charcoal">
                  <span className="font-medium">Phone:</span> {form.phone}
                </p>
              )}
              <p className="font-sans text-sm text-charcoal">
                <span className="font-medium">Attending:</span>{" "}
                {form.attending ? "Yes 🎉" : "Unable to attend"}
              </p>
              {form.attending && (
                <p className="font-sans text-sm text-charcoal">
                  <span className="font-medium">Guests:</span> {form.guest_count} (
                  {form.plus_one ? "with plus one" : "no plus one"})
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className={`flex mt-8 gap-3 ${step > 1 ? "justify-between" : "justify-end"}`}>
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 px-5 py-3 rounded-full border-2 border-champagne-200 text-charcoal font-sans text-sm font-medium hover:border-orange-400 transition-colors"
          >
            <ChevronLeft size={16} />
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn-accent flex items-center gap-2 px-8 py-3 rounded-full text-white font-sans text-sm font-medium"
          >
            Continue
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="btn-accent flex items-center gap-2 px-8 py-3 rounded-full text-white font-sans text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Heart size={16} className="fill-white" />
                Submit RSVP
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
