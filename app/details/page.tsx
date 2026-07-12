"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import { MapPin, Clock, Info, Gem, Wine, Shirt, Car, Baby, Camera, Star } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

const detailCards = [
  {
    icon: <Gem size={24} strokeWidth={1.5} className="text-gold-400" />,
    label: "Ceremony",
    title: WEDDING_CONFIG.ceremonyVenue,
    items: [
      { icon: <Clock size={13} />, text: WEDDING_CONFIG.ceremonyTime },
      { icon: <MapPin size={13} />, text: WEDDING_CONFIG.ceremonyAddress },
      { icon: <Info size={13} />, text: "Please arrive 15 minutes early to be seated." },
    ],
    mapLink: `https://maps.google.com/?q=${encodeURIComponent(WEDDING_CONFIG.ceremonyAddress)}`,
  },
  {
    icon: <Wine size={24} strokeWidth={1.5} className="text-gold-400" />,
    label: "Reception",
    title: WEDDING_CONFIG.receptionVenue,
    items: [
      { icon: <Clock size={13} />, text: WEDDING_CONFIG.receptionTime },
      { icon: <MapPin size={13} />, text: WEDDING_CONFIG.receptionAddress },
      { icon: <Info size={13} />, text: "Cocktail hour begins immediately following the ceremony." },
    ],
    mapLink: `https://maps.google.com/?q=${encodeURIComponent(WEDDING_CONFIG.receptionAddress)}`,
  },
];

type Note = {
  icon: ReactNode;
  title: string;
  desc: ReactNode;
};

const notes: Note[] = [
  { icon: <Car size={20} strokeWidth={1.5} className="text-gold-400" />, title: "Parking", desc: "Free parking is available at the venue. There is ample space in the parking lot — please follow the signs upon arrival." },
  { icon: <Baby size={20} strokeWidth={1.5} className="text-gold-400" />, title: "Children", desc: <>We adore your little ones! This is an <strong>adults-only reception</strong>, however children are welcome at the ceremony.</> },
  { icon: <Camera size={20} strokeWidth={1.5} className="text-gold-400" />, title: "Photography", desc: <>We have a professional photographer. Please be fully present during the ceremony. <strong>Feel free to take photos at the reception!</strong></> },
  { icon: <Star size={20} strokeWidth={1.5} className="text-gold-400" />, title: "Flowers & Gifts", desc: <><strong>Please do not bring flowers to the venue</strong> — we have florals arranged. Gift table will be available at the reception.</> },
  { icon: <MapPin size={20} strokeWidth={1.5} className="text-gold-400" />, title: "RSVP Deadline", desc: <>Please RSVP by <strong>{WEDDING_CONFIG.rsvpDeadline}</strong> so we can finalize seating and catering.</> },
];

export default function DetailsPage() {
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
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(11,29,58,0.5), rgba(11,29,58,0.8))" }} />
        <div className="relative z-10 text-center px-4">
          <Reveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold-400 mb-3">
              All the information you need
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-light text-white">
              Wedding Details
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Venue Cards */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <SectionHeader
                label="Venue"
                title="Where to Find Us"
                subtitle={`The ceremony will be held at ${WEDDING_CONFIG.ceremonyVenue}, followed by a reception at the ${WEDDING_CONFIG.receptionVenue} in Pawtucket, Rhode Island.`}
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {detailCards.map((card, i) => (
              <Reveal key={card.label} delay={i * 0.15}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-300/50 card-hover">
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-${i === 0 ? "1438232992991-995b7058bbb3" : "1511795409834-ef04bbd61622"}?w=800&q=70')`,
                    }}
                  />
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-5">
                      {card.icon}
                      <div>
                        <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold-500 font-medium">
                          {card.label}
                        </p>
                        <h3 className="font-display text-2xl font-light text-center sm:text-left text-navy-500">
                          {card.title}
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      {card.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-3 text-sm text-navy-500/60 font-sans">
                          <span className="text-gold-400 mt-0.5 shrink-0">{item.icon}</span>
                          {item.text}
                        </div>
                      ))}
                    </div>
                    <a
                      href={card.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.2em] text-gold-500 hover:text-gold-600 transition-colors"
                    >
                      <MapPin size={13} />
                      Get Directions
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Notes */}
      <section className="py-16 px-6" style={{ background: "white" }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <SectionHeader label="Notes" title="Good to Know" />
          </Reveal>
          <div className="mt-10 space-y-4">
            {notes.map((note, i) => (
              <Reveal key={note.title} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-cream-300/60 hover:border-gold-400/40 transition-colors" style={{ background: "#FDFAF5" }}>
                  <div className="shrink-0 mt-0.5">{note.icon}</div>
                  <div>
                    <h4 className="font-display text-lg font-medium text-center sm:text-left text-navy-500 mb-1">{note.title}</h4>
                    <p className="font-sans text-sm text-navy-500/55 leading-relaxed">{note.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center" style={{ background: "#F5E6D0" }}>
        <Reveal>
          <p className="font-sans text-navy-500/45 text-xs mb-4 uppercase tracking-widest">
            Questions? Reach us at{" "}
            <a href={`mailto:${WEDDING_CONFIG.contactEmail}`} className="text-gold-500 hover:underline">
              {WEDDING_CONFIG.contactEmail}
            </a>{" "}
            or{" "}
            <a href={`mailto:${WEDDING_CONFIG.contactEmail2}`} className="text-gold-500 hover:underline">
              {WEDDING_CONFIG.contactEmail2}
            </a>
          </p>
          <Link
            href="/rsvp"
            className="btn-accent inline-flex items-center gap-3 px-10 py-4 text-white font-sans font-medium text-xs uppercase tracking-[0.25em]"
          >
            RSVP Now
            <ArrowRight size={13} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
