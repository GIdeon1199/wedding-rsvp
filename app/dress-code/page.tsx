"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import { Shirt, X as XIcon, Check } from "lucide-react";

const attire = [
  {
    icon: "M",
    title: "Men",
    items: [
      "Tuxedo or dark formal suit",
      "White dress shirt",
      <>Tie or bow tie (<strong>midnight blue</strong> or <strong>burnt orange</strong> recommended)</>,
      "Polished dress shoes",
    ],
  },
  {
    icon: "W",
    title: "Women",
    items: [
      "Floor-length gown or elegant midi dress",
      "Cocktail dress for a more relaxed look",
      "Heels or dressy flats",
      "Evening accessories welcome",
    ],
  },
];

const avoid = [
  <><strong>All-white or cream</strong> (reserved for the bride)</>,
  "All-black only",
  "Casual jeans or t-shirts",
  "Bright neon colors",
];

export default function DressCodePage() {
  return (
    <div className="min-h-screen" style={{ background: "#F5E6D0" }}>
      {/* Hero Banner */}
      <section
        className="page-hero-banner relative h-64 sm:h-80 flex items-center justify-center"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/pre2.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(11,29,58,0.5), rgba(11,29,58,0.85))" }} />
        <div className="relative z-10 text-center px-4">
          <Reveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold-400 mb-3">
              Come looking your best
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-light text-white">
              Dress Code
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Attire Guide */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <SectionHeader
                label="Attire"
                title={WEDDING_CONFIG.dressCode}
                subtitle="We want you to feel beautiful and comfortable while celebrating with us. Here's our guide to help you prepare."
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
            {attire.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-8 border border-cream-300/50 card-hover">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 flex items-center justify-center border border-gold-400/40"
                      style={{ background: "linear-gradient(135deg, #0B1D3A, #1a3157)" }}
                    >
                      <Shirt size={20} strokeWidth={1.5} className="text-gold-300" />
                    </div>
                    <h3 className="font-display text-2xl font-light text-center sm:text-left text-navy-500">{a.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {a.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 font-sans text-sm text-navy-500/60">
                        <Check size={14} strokeWidth={2} className="text-gold-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Color Palette */}
          <Reveal>
            <div className="bg-white rounded-2xl p-8 border border-cream-300/50 mb-8">
              <h3 className="font-display text-2xl font-light text-navy-500 mb-2 text-center">
                Our Wedding Palette
              </h3>
              <p className="font-sans text-xs text-navy-500/45 text-center uppercase tracking-widest mb-8">
                These tones complement our wedding palette beautifully.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                {[
                  { name: "Midnight Blue", hex: "#0B1D3A" },
                  { name: "Steel Blue",    hex: "#4682B4" },
                  { name: "Burnt Orange",  hex: "#CC5500" },
                  { name: "Terracotta",    hex: "#C4724E" },
                  { name: "Champagne",     hex: "#F5E6D0" },
                  { name: "Navy",          hex: "#1B2A4A" },
                  { name: "Copper",        hex: "#B87333" },
                  { name: "Ivory",         hex: "#FFFDF7" },
                ].map((color) => (
                  <div key={color.name} className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 h-12 rounded-full shadow-md border-2 border-white"
                      style={{ background: color.hex }}
                    />
                    <span className="font-sans text-xs text-navy-500/50">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* What to avoid */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl p-8 border border-cream-300/50" style={{ background: "#FDFAF5" }}>
              <div className="flex items-center gap-3 mb-5">
                <XIcon size={18} strokeWidth={2} className="text-red-400" />
                <h3 className="font-display text-xl font-medium text-center sm:text-left text-navy-500">
                  Please Avoid
                </h3>
              </div>
              <ul className="space-y-3">
                {avoid.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 font-sans text-sm text-navy-500/60">
                    <XIcon size={13} strokeWidth={2} className="text-red-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-xs text-navy-500/35 mt-5 italic">
                {WEDDING_CONFIG.dressCodeNote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
