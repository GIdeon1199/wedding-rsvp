"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import { X, ZoomIn, Camera } from "lucide-react";

const photos = [
  { id: 1, src: "/pre1.jpg", alt: "", rotate: "-2deg", size: "lg" },
  { id: 2, src: "/pre2.jpg", alt: "", rotate: "1.5deg", size: "md" },
  { id: 3, src: "/pre3.jpg", alt: "", rotate: "-1deg", size: "md" },
  { id: 4, src: "/pre4.jpg", alt: "", rotate: "2deg", size: "lg" },
  { id: 5, src: "/pre5.jpg", alt: "", rotate: "-1.5deg", size: "sm" },
  { id: 6, src: "/pre6.jpg", alt: "", rotate: "1deg", size: "md" },
  { id: 7, src: "/pre7.jpg", alt: "", rotate: "-2.5deg", size: "sm" },
  { id: 8, src: "/pre8.jpg", alt: "", rotate: "1.5deg", size: "lg" },
  { id: 9, src: "/pre9.jpg", alt: "", rotate: "-1deg", size: "md" },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<(typeof photos)[0] | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#F5E6D0" }}>
      {/* Hero Banner */}
      <section
        className="page-hero-banner relative h-64 sm:h-80 flex items-center justify-center"
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url('/pre2.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(11,29,58,0.5), rgba(11,29,58,0.8))" }} />
        <div className="relative z-10 text-center px-4">
          <Reveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold-400 mb-3">
              Our Story in Photos
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-light text-white">
              Gallery
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <SectionHeader
              label="Engagement Shoot"
              title="Captured Moments"
              subtitle="A peek into our love story — from the moment we got engaged to the countdown to forever."
            />
          </Reveal>
        </div>
      </section>

      {/* Polaroid gallery */}
      <section className="py-12 px-6" style={{ background: "#F5E6D0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {photos.map((photo, i) => (
              <Reveal key={photo.id} delay={i * 0.07}>
                <motion.div
                  onClick={() => setSelected(photo)}
                  whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
                  className="relative bg-white p-4 cursor-pointer break-inside-avoid inline-block w-full group"
                  style={{
                    transform: `rotate(${photo.rotate})`,
                    borderRadius: "2px",
                    boxShadow: "0 4px 20px rgba(11,29,58,0.10)",
                  }}
                >
                  <div className="overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn
                        size={22}
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>

                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Hashtag prompt */}
          <Reveal>
            <div className="text-center mt-20 py-16 px-6 bg-white rounded-2xl border border-cream-300/50">
              <div className="flex justify-center mb-5">
                <Camera size={40} strokeWidth={1} className="text-gold-400" />
              </div>
              <h3 className="font-display text-3xl font-light text-navy-500 mb-3">
                Share Your Photos
              </h3>
              <p className="font-sans text-sm text-navy-500/55 max-w-md mx-auto mb-6 leading-relaxed">
                After the wedding, share your favourite moments using our hashtag and we&apos;ll
                add them to this gallery for everyone to enjoy.
              </p>
              <p className="font-script text-[clamp(1.3rem,4.5vw,2.5rem)] text-gold-500">
                {WEDDING_CONFIG.hashtag}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.src}
                alt={selected.alt}
                className="w-full h-full object-contain"
                style={{ maxHeight: "85vh" }}
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 bg-black/50 text-white w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X size={18} />
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
