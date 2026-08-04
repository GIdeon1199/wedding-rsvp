"use client";

import Reveal from "@/components/Reveal";
import RSVPForm from "@/components/RSVPForm";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import { Gem, ArrowRight } from "lucide-react";

export default function RSVPPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F5E6D0" }}>
      {/* Hero Banner */}
      <section
        className="page-hero-banner relative h-72 sm:h-96 flex items-center justify-center"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/pre2.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(11,29,58,0.5), rgba(11,29,58,0.85))" }} />
        <div className="relative z-10 text-center px-4">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-5">
              <Gem size={14} strokeWidth={1.5} className="text-gold-400" />
              <p className="font-sans text-[12px] uppercase tracking-[0.4em] text-gold-400">
                Kindly respond by {WEDDING_CONFIG.rsvpDeadline}
              </p>
              <Gem size={14} strokeWidth={1.5} className="text-gold-400" />
            </div>
            <h1 className="font-display text-5xl sm:text-7xl font-light text-white">
              Will You Join Us?
            </h1>
            <p className="font-script text-2xl text-gold-300 mt-4">
              {WEDDING_CONFIG.scriptDisplay}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form section */}
      <section className="py-20 px-6">
        <div className="max-w-lg mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="font-sans text-[12px] uppercase tracking-[0.4em] text-gold-500 mb-3">
                RSVP Form
              </p>
              <h2 className="font-display text-4xl font-light text-navy-500 mb-5">
                Reserve Your Seat
              </h2>
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-12 bg-gold-400/50" />
                <div className="ornament-diamond" />
                <div className="h-px w-12 bg-gold-400/50" />
              </div>
              <p className="font-sans text-base text-navy-500/60 leading-relaxed">
                We can&apos;t wait to celebrate with you! Please fill out the form below
                so we can prepare a place for you at our table. No account or login required.
              </p>
            </div>
          </Reveal>

          {/* The form */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-cream-300/50">
            <RSVPForm />
          </div>

          {/* Reassurance */}
          <Reveal>
            <div className="mt-8 text-center space-y-2">
              <p className="font-sans text-[13px] text-navy-500/40">
                Your information is kept private and will only be used for wedding planning.
              </p>
              <p className="font-sans text-[13px] text-navy-500/40">
                Questions? Email us at{" "}
                <a href={`mailto:${WEDDING_CONFIG.contactEmail}`} className="text-gold-500 hover:underline">
                  {WEDDING_CONFIG.contactEmail}
                </a>{" "}
                or{" "}
                <a href={`mailto:${WEDDING_CONFIG.contactEmail2}`} className="text-gold-500 hover:underline">
                  {WEDDING_CONFIG.contactEmail2}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bottom decorative strip */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(to bottom, #F5E6D0, #E0C9A4)" }}
      >
        <Reveal>
          <p className="font-script text-5xl text-gold-500 mb-3">
            {WEDDING_CONFIG.weddingDateDisplay}
          </p>
          <p className="font-sans text-xs text-navy-500/45 uppercase tracking-[0.3em]">
            {WEDDING_CONFIG.ceremonyVenue} · Pawtucket, RI
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C47C3A)" }} />
            <div className="ornament-diamond" />
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C47C3A, transparent)" }} />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
