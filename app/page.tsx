"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import { Calendar, MapPin, User, Mail, ArrowRight } from "lucide-react";

/* ── Countdown helpers ──────────────────────────────────────────────── */
const WEDDING_DATE = WEDDING_CONFIG.weddingDate;

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}



/* ── Page ───────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const countUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  /* Couple names */
  const groomName = WEDDING_CONFIG.groom.split(" ")[0];
  const brideName = WEDDING_CONFIG.bride.split(" ")[0];

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          HERO — full-viewport, background image, no scrim overlay
      ════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: "100svh",
          minHeight: "760px",
          backgroundColor: "#F5E6D0",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/0707(2)-1.mp4"
        />
        {/* Blend layers */}
        <div className="absolute inset-0 z-0 bg-[#F5E6D0]/60 pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#F5E6D0]/30 via-transparent to-[#F5E6D0] pointer-events-none" />

        {/* Center text block */}
        <div
          className="absolute z-10 flex flex-col items-center text-center w-[86vw] max-w-[420px] top-[18%] left-1/2 -translate-x-1/2 sm:static sm:top-auto sm:left-auto sm:translate-x-0 sm:w-full sm:max-w-[580px] sm:px-6"
        >
          {/* Together with their families */}
          <motion.p
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="label-caps mb-5"
            style={{ 
              color: "#c9924a",
              fontSize: "14px",
              fontWeight: 500,
              textShadow: "0 1px 4px rgba(15, 28, 53, 0.5), 0 2px 10px rgba(15, 28, 53, 0.3)" 
            }}
          >
            Together with their families
          </motion.p>

          {/* GROOM */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-display leading-none uppercase"
            style={{
              fontSize: "clamp(3.6rem, 15vw, 6.5rem)",
              fontWeight: 400,
              color: "#1a1a1a",
              letterSpacing: "0.12em",
              textShadow: "0 0 30px rgba(245, 237, 224, 0.8), 0 0 15px rgba(245, 237, 224, 1)"
            }}
          >
            {groomName}
          </motion.h1>

          {/* and */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="font-script leading-none lowercase"
            style={{
              fontSize: "clamp(2.4rem, 10vw, 3.4rem)",
              color: "#c9924a",
              margin: "8px 0",
              textShadow: "0 1px 5px rgba(15, 28, 53, 0.4), 0 4px 15px rgba(15, 28, 53, 0.2)"
            }}
          >
            and
          </motion.p>

          {/* BRIDE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className="font-display leading-none uppercase"
            style={{
              fontSize: "clamp(3.6rem, 15vw, 6.5rem)",
              fontWeight: 400,
              color: "#1a1a1a",
              letterSpacing: "0.12em",
              textShadow: "0 0 30px rgba(245, 237, 224, 0.8), 0 0 15px rgba(245, 237, 224, 1)"
            }}
          >
            {brideName}
          </motion.h1>

          {/* Invite text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="mt-5 space-y-1"
            style={{ textShadow: "0 2px 10px rgba(245, 237, 224, 0.9)" }}
          >
            <p className="label-caps" style={{ color: "rgba(26,26,26,0.65)" }}>
              Invite you to celebrate
            </p>
            <p className="label-caps" style={{ color: "rgba(26,26,26,0.65)" }}>
              their wedding
            </p>
          </motion.div>

          {/* Diamond ornament */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="flex items-center gap-3 my-4"
          >
            <div className="h-px w-10" style={{ background: "rgba(201,146,74,0.5)" }} />
            <span style={{ color: "#c9924a", fontSize: "14px" }}>✦</span>
            <div className="h-px w-10" style={{ background: "rgba(201,146,74,0.5)" }} />
          </motion.div>

          {/* Date: 18 | 10 | 2026 */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="font-display"
            style={{
              fontSize: "clamp(1.6rem, 5vw, 3.3rem)",
              fontWeight: 600,
              color: "#1a1a1a",
              letterSpacing: "0.1em",
              textShadow: "0 0 20px rgba(245, 237, 224, 0.9)"
            }}
          >
            {/* format: 17 | 10 | 2026 */}
            17
            <span style={{ color: "#c9924a", margin: "0 10px" }}>|</span>
            10
            <span style={{ color: "#c9924a", margin: "0 10px" }}>|</span>
            2026
          </motion.p>

          {/* Venue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.9 }}
            className="mt-3 space-y-0.5"
            style={{ textShadow: "0 2px 10px rgba(245, 237, 224, 0.9)" }}
          >
            <p
              className="font-sans text-center font-medium"
              style={{ fontSize: "13px", letterSpacing: "0.15em", color: "rgba(26,26,26,0.75)", textTransform: "uppercase" }}
            >
              {WEDDING_CONFIG.ceremonyVenue}
            </p>
            <p
              className="font-sans text-center font-medium"
              style={{ fontSize: "13px", letterSpacing: "0.15em", color: "rgba(26,26,26,0.7)", textTransform: "uppercase" }}
            >
              Pawtucket, RI
            </p>
          </motion.div>

          {/* Mobile RSVP Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 2.1 }}
            className="mt-8 sm:hidden w-full max-w-[200px]"
          >
            <Link
              href="/rsvp"
              className="flex items-center justify-center w-full py-3.5 border border-gold-500/50 rounded-full bg-cream-100/90 backdrop-blur-sm"
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "Jost, sans-serif",
                color: "#1a1a1a",
              }}
            >
              RSVP Now
            </Link>
          </motion.div>
        </div>

        {/* Scroll cue — absolute bottom center */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute flex flex-col items-center gap-1.5"
          style={{ bottom: "2rem", left: "50%", transform: "translateX(-50%)" }}
        >
          <p className="label-caps" style={{ color: "#c9924a", fontSize: "11px", textShadow: "0 1px 4px rgba(15, 28, 53, 0.5)" }}>
            Scroll down to begin
          </p>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ color: "#c9924a", fontSize: "16px", textShadow: "0 1px 4px rgba(15, 28, 53, 0.5)" }}
          >
            ↓
          </motion.span>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          COUNTING DOWN TO FOREVER
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="countdown-band py-14 sm:py-16"
        style={{
          backgroundImage: "url('/TimerImgBg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="relative z-10 text-center px-4">
          <Reveal>
            {/* Heading in Great Vibes */}
            <p
              className="font-script mb-2"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#c9924a" }}
            >
              Counting Down to Forever
            </p>

            {/* Diamond separator */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-8" style={{ background: "rgba(201,146,74,0.4)" }} />
              <span style={{ color: "#c9924a", fontSize: "10px" }}>✦</span>
              <div className="h-px w-8" style={{ background: "rgba(201,146,74,0.4)" }} />
            </div>

            {/* Countdown units */}
            <div className="flex items-center justify-center gap-1 sm:gap-0 flex-nowrap w-full">
              {countUnits.map((unit, i) => (
                <div key={unit.label} className="flex items-center">
                  <div className="flex flex-col items-center px-2 sm:px-10">
                    <div className="countdown-number">{mounted ? unit.value : "0"}</div>
                    <div className="countdown-label mt-1">{unit.label}</div>
                  </div>
                  {i < 3 && (
                    <div
                      className="countdown-pipe select-none"
                      style={{ opacity: 0.55 }}
                    >
                      |
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          OUR STORY
      ════════════════════════════════════════════════════════════════ */}
      <section
        id="our-story"
        className="py-16 px-4 sm:py-20 sm:px-10 bg-[url('/StoryImgBg.png')] bg-cover bg-[position:85%_center] sm:bg-center"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT — text */}
            <Reveal direction="left">
              <div className="space-y-4 max-w-[85%] sm:max-w-md bg-white/85 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/60 shadow-lg">
                {/* Label */}
                <p className="label-caps" style={{ color: "#a87834" }}>
                  Our Story
                </p>

                {/* Large quote */}
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    color: "#0f1c35",
                  }}
                >
                  Two souls
                  <br />
                  One beautiful journey.
                </h2>

                {/* Body */}
                <p
                  className="font-sans leading-relaxed"
                  style={{ fontSize: "14px", color: "rgba(15,28,53,0.75)", maxWidth: "380px" }}
                >
                  From the moment we met, we knew our story was something special.
                  Today, we invite you to be part of the next chapter as we begin
                </p>
                <p
                  className="font-sans font-400 italic"
                  style={{ fontSize: "15px", color: "#a87834" }}
                >
                  forever together.
                </p>

                {/* CTA */}
                <div className="pt-4">
                  <Link
                    href="/story"
                    className="btn-accent inline-flex items-center gap-3 px-8 py-3 rounded-sm shadow-sm"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontFamily: "Jost, sans-serif",
                    }}
                  >
                    Read Our Story
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </Reveal>


          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          DETAILS FOOTER BAND
      ════════════════════════════════════════════════════════════════ */}
      <div className="details-bar relative py-9 sm:py-11">
        {/* DATE */}
        <div className="flex flex-col items-center gap-2.5 py-4 px-3">
          <Calendar size={26} strokeWidth={1.4} style={{ color: "#c9924a" }} />
          <div className="text-center">
            <p
              className="label-caps"
              style={{ color: "rgba(245,237,224,0.5)", fontSize: "10px", textDecoration: "underline", textDecorationColor: "rgba(245,237,224,0.2)" }}
            >
              Date
            </p>
            <p
              className="font-sans mt-1"
              style={{ fontSize: "12px", letterSpacing: "0.1em", color: "#f5ede0", textTransform: "uppercase" }}
            >
              17th October 2026
            </p>
            <p
              className="font-sans"
              style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(245,237,224,0.45)", textTransform: "uppercase" }}
            >
              Saturday
            </p>
          </div>
        </div>

        <div className="details-bar-divider" />

        {/* LOCATION */}
        <div className="flex flex-col items-center gap-2.5 py-4 px-3">
          <MapPin size={26} strokeWidth={1.4} style={{ color: "#c9924a" }} />
          <div className="text-center">
            <p
              className="label-caps"
              style={{ color: "rgba(245,237,224,0.5)", fontSize: "10px", textDecoration: "underline", textDecorationColor: "rgba(245,237,224,0.2)" }}
            >
              Location
            </p>
            <p
              className="font-sans mt-1"
              style={{ fontSize: "12px", letterSpacing: "0.1em", color: "#f5ede0", textTransform: "uppercase" }}
            >
              174 Portuguese Social Club Way
            </p>
            <p
              className="font-sans"
              style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(245,237,224,0.45)", textTransform: "uppercase" }}
            >
              Pawtucket, RI
            </p>
          </div>
        </div>

        <div className="details-bar-divider" />

        {/* DRESS CODE */}
        <div className="flex flex-col items-center gap-2.5 py-4 px-3">
          <User size={26} strokeWidth={1.4} style={{ color: "#c9924a" }} />
          <div className="text-center">
            <p
              className="label-caps"
              style={{ color: "rgba(245,237,224,0.5)", fontSize: "10px", textDecoration: "underline", textDecorationColor: "rgba(245,237,224,0.2)" }}
            >
              Dress Code
            </p>
            <p
              className="font-sans mt-1"
              style={{ fontSize: "12px", letterSpacing: "0.1em", color: "#f5ede0", textTransform: "uppercase" }}
            >
              {WEDDING_CONFIG.dressCode}
            </p>
          </div>
        </div>

        <div className="details-bar-divider" />

        {/* RSVP */}
        <div className="flex flex-col items-center gap-2.5 py-4 px-3">
          <Mail size={26} strokeWidth={1.4} style={{ color: "#c9924a" }} />
          <div className="text-center">
            <p
              className="label-caps"
              style={{ color: "rgba(245,237,224,0.5)", fontSize: "10px", textDecoration: "underline", textDecorationColor: "rgba(245,237,224,0.2)" }}
            >
              Kindly RSVP
            </p>
            <p
              className="font-sans mt-1"
              style={{ fontSize: "12px", letterSpacing: "0.1em", color: "#f5ede0", textTransform: "uppercase" }}
            >
              By {WEDDING_CONFIG.rsvpDeadline}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
