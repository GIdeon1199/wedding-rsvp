"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import { Calendar, MapPin, User, Mail, ArrowRight, Menu } from "lucide-react";

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
  const [showFloatingRsvp, setShowFloatingRsvp] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);

    // Onboarding tutorial check
    const tutorialSeen = sessionStorage.getItem("tutorial_seen");
    if (!tutorialSeen) {
      setShowTutorial(true);
    }

    // Scroll listener for floating RSVP button
    const handleScroll = () => {
      setShowFloatingRsvp(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dismissTutorial = () => {
    setShowTutorial(false);
    sessionStorage.setItem("tutorial_seen", "true");
  };

  useEffect(() => {
    if (showTutorial) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showTutorial]);

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
            {/* format: 10 | 17 | 2026 */}
            10
            <span style={{ color: "#c9924a", margin: "0 10px" }}>|</span>
            17
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
              className="btn-accent flex items-center justify-center gap-3 w-full py-3 rounded-sm shadow-sm"
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "Jost, sans-serif",
              }}
            >
              RSVP Now
              <ArrowRight size={13} />
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
          <p className="font-sans font-extrabold text-center uppercase tracking-normal" style={{ color: "#c9924a", fontSize: "14px", textShadow: "0 1px 4px rgba(15, 28, 53, 0.5)" }}>
            Scroll down to reveal more
          </p>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ color: "#c9924a", fontSize: "20px", fontWeight: "bold", textShadow: "0 1px 4px rgba(15, 28, 53, 0.5)" }}
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
        className="py-16 px-4 sm:py-20 sm:px-10 bg-[url('/StoryImgBg.png')] bg-cover bg-left lg:bg-center"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT — text */}
            <Reveal direction="left" className="order-2 lg:order-1">
              <div className="space-y-4 max-w-[92%] sm:max-w-md mx-auto lg:mx-0 bg-white/85 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/60 shadow-lg">
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

            {/* RIGHT — image (only visible on mobile/tablet, since on desktop the background image shows it) */}
            <Reveal direction="right" className="block lg:hidden w-full order-1 lg:order-2">
              <div className="relative w-full aspect-[4/5] max-w-sm mx-auto rounded-t-full overflow-hidden border border-gold-400/20 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/StoryImgBg.png"
                  alt="Ishmael and Beryl"
                  className="w-full h-full object-cover object-[85%_center]"
                />
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
              {WEDDING_CONFIG.ceremonyVenue}
            </p>
            <p
              className="font-sans"
              style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(245,237,224,0.45)", textTransform: "uppercase" }}
            >
              {WEDDING_CONFIG.ceremonyAddress}
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

      {/* Floating RSVP Button */}
      <AnimatePresence>
        {showFloatingRsvp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <Link
              href="/rsvp"
              className="btn-accent flex items-center justify-center gap-2 px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-sans text-[11px] font-semibold uppercase tracking-[0.2em]"
            >
              RSVP
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Onboarding Tutorial Overlay */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-500/95 backdrop-blur-md flex flex-col justify-center p-4 text-white select-none overflow-y-auto"
          >
            <div className="w-full max-w-lg mx-auto flex flex-col justify-center py-6">
              {/* Header */}
              <div className="text-center mb-6">
                <span className="font-sans text-[11px] font-black uppercase tracking-[0.2em] bg-gold-400/20 text-gold-400 px-4.5 py-1.5 rounded-full border border-gold-400/30">
                  Website Tutorial / Guide
                </span>
                <h1 className="font-display text-3xl font-light text-white mt-4">
                  How to Use Our Website
                </h1>
                <p className="font-sans text-[13px] text-white/70 mt-2 leading-relaxed">
                  Welcome! We want to make sure you can find all the details. Here is a quick guide on how to navigate this site:
                </p>
              </div>

              {/* Steps Card */}
              <div className="space-y-5 my-5 bg-white/5 p-5 rounded-2xl border border-white/10 shadow-inner">
                {/* Step 1 */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/5">
                  <div className="flex-1 pr-2">
                    <h3 className="font-sans text-xs font-black text-gold-400 uppercase tracking-wider">
                      Step 1: Find Other Pages (Menu)
                    </h3>
                    <p className="font-sans text-[12px] text-white/80 mt-1 leading-relaxed">
                      Use the <strong>Menu Button</strong> in the top-right corner to visit our Schedule, Location, and Registry.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-gold-400 text-lg">→</span>
                    <div className="w-11 h-11 rounded-full border border-gold-400/40 flex items-center justify-center bg-navy-500/65 text-gold-400 shadow-md backdrop-blur-sm">
                      <Menu size={20} />
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/5">
                  <div className="flex-1 pr-2">
                    <h3 className="font-sans text-xs font-black text-gold-400 uppercase tracking-wider">
                      Step 2: Scroll for Details
                    </h3>
                    <p className="font-sans text-[12px] text-white/80 mt-1 leading-relaxed">
                      <strong>Scroll down</strong> on the screen to read our love story, see photos, and view the countdown timer.
                    </p>
                  </div>
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-gold-400 shrink-0 font-bold text-lg"
                  >
                    ↓
                  </motion.div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 pr-2">
                    <h3 className="font-sans text-xs font-black text-gold-400 uppercase tracking-wider">
                      Step 3: RSVP to Register
                    </h3>
                    <p className="font-sans text-[12px] text-white/80 mt-1 leading-relaxed">
                      Click the gold <strong>RSVP Button</strong> that appears in the bottom-right corner to register for the wedding.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-gold-400 text-lg">→</span>
                    <div className="btn-accent flex items-center justify-center gap-2 px-5 py-2.5 rounded-full shadow-md font-sans text-[10px] font-semibold uppercase tracking-[0.2em] pointer-events-none">
                      RSVP
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4.5 mb-6">
                <p className="font-sans text-[11px] text-red-300 leading-relaxed text-center font-semibold">
                  ⚠️ NOTE: The buttons and icons shown inside the box above are just pictures for practice. They will not click yet. Click the giant "OK" button below to open the website and start clicking.
                </p>
              </div>

              {/* OK Action Button */}
              <div className="text-center flex flex-col items-center gap-3">
                <p className="font-sans text-[11px] font-black text-gold-400 uppercase tracking-[0.25em] animate-pulse">
                  CLICK OK TO CONTINUE
                </p>
                <button
                  onClick={dismissTutorial}
                  className="btn-accent px-20 py-6 rounded-full font-sans text-[14px] uppercase tracking-widest font-black shadow-xl hover:shadow-2xl transition-all duration-300 scale-105 hover:scale-110 active:scale-95 cursor-pointer"
                  style={{
                    border: "2px solid rgba(255,255,255,0.25)",
                    minWidth: "240px",
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
